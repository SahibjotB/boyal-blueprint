import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ===== FILE CACHES =====
const __dirname = path.resolve();
const DATA_DIR = path.join(__dirname, "data");
const LISTINGS_FILE = path.join(DATA_DIR, "listings.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

let cachedListings = [];

// Load existing cache on startup
try {
  if (fs.existsSync(LISTINGS_FILE)) {
    cachedListings = JSON.parse(fs.readFileSync(LISTINGS_FILE, "utf-8"));
    console.log(`🗂️ Loaded ${cachedListings.length} cached MLS listings`);
  }
} catch (err) {
  console.warn("⚠️ Could not read listings cache:", err.message);
}

function saveFile(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`❌ Failed to save ${file}:`, err.message);
  }
}

async function fetchAmpreListings(limit = 10000 , pages = 1000) {
  const baseUrl = process.env.AMPRE_IDX_BASE_URL;
  const token = process.env.AMPRE_VOW_TOKEN || process.env.AMPRE_IDX_TOKEN;

  console.log("⚙️ Fetching MLS data from:", baseUrl);
  if (!token) {
    console.error("❌ Missing MLS API token.");
    return [];
  }

  const tasks = [];
  for (let i = 0; i < pages; i++) {
    const skip = i * limit;
    const url = `${baseUrl}Property?$top=${limit}&$skip=${skip}&$orderby=ModificationTimestamp desc&$select=ListingKey,ListPrice,UnparsedAddress,City,StandardStatus,BedroomsTotal,BathroomsTotalInteger,PostalCode`;
    tasks.push(
      fetch(url, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      })
        .then((r) => r.json())
        .then((d) => d.value || [])
        .catch((err) => {
          console.warn(`⚠️ Failed to fetch page ${i + 1}:`, err.message);
          return [];
        })
    );
  }

  const all = (await Promise.all(tasks)).flat();
  console.log(`📦 Retrieved ${all.length} MLS listings`);

  if (all.length) {
    saveFile(LISTINGS_FILE, all);
    console.log("💾 Saved listings locally for faster reloads");
  }

  return all;
}

app.get("/api/listings", async (req, res) => {
  try {
    if (!cachedListings.length) {
      console.log("⚙️ Cache empty — fetching fresh MLS data...");
      cachedListings = await fetchAmpreListings();
    }

    if (!cachedListings.length) {
      console.warn("⚠️ Still no listings — using fallback");
      cachedListings = [
        {
          ListingKey: "FALLBACK1",
          UnparsedAddress: "123 Front St W",
          City: "Toronto",
          ListPrice: 899000,
          BedroomsTotal: 2,
          BathroomsTotalInteger: 2,
        },
      ];
    }

    res.json(cachedListings);
  } catch (err) {
    console.error("❌ Error in /api/listings:", err.message);
    res.status(500).json({ error: "Failed to load listings" });
  }
});

app.post("/api/refresh", async (req, res) => {
  cachedListings = await fetchAmpreListings();
  res.json({ refreshed: cachedListings.length });
});

app.post("/api/ai-search", async (req, res) => {
  const { query, listings } = req.body;
  if (!query || !listings) {
    return res.status(400).json({ error: "Missing query or listings data." });
  }

  try {
    const prompt = `You are an intelligent real estate assistant.
User request: "${query}"
You have access to the following MLS listings (JSON):
${JSON.stringify(listings.slice(0, 50))}

Filter and return only listings (as a JSON array) that match the user's request.
Respond ONLY with valid JSON, no extra text.
Each result must include: ListingKey, UnparsedAddress, City, ListPrice, BedroomsTotal, BathroomsTotalInteger.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const text = response.choices?.[0]?.message?.content?.trim();

    let parsedResults = [];
    try {
      parsedResults = JSON.parse(text);
    } catch {
      console.warn("⚠️ Could not parse GPT response, returning empty array.");
    }

    res.json({ results: parsedResults });
  } catch (err) {
    console.error("❌ AI Search Error:", err.message);
    res.status(500).json({ error: "Failed to process AI search" });
  }
});

app.post("/api/search-mls", async (req, res) => {
  const token = process.env.AMPRE_IDX_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "Missing AMPRE IDX token in environment" });
  }

  const {
    city,
    minPrice,
    maxPrice,
    bedroomsMin,
    bathroomsMin,
    propertyType,
    keywords,
    limit = 50,
    sort = "priceAsc"
  } = req.body;

  const filters = [];

  if (city) filters.push(`City eq '${city}'`);
  if (minPrice) filters.push(`ListPrice ge ${minPrice}`);
  if (maxPrice) filters.push(`ListPrice le ${maxPrice}`);
  if (bedroomsMin) filters.push(`BedroomsTotal ge ${bedroomsMin}`);
  if (bathroomsMin) filters.push(`BathroomsTotalInteger ge ${bathroomsMin}`);
  if (keywords) filters.push(`contains(tolower(PublicRemarks), tolower('${keywords}'))`);

  filters.push(`StandardStatus eq Odata.Models.StandardStatus'Active'`);

  const filterString = filters.join(" and ");

  let orderby = "ListPrice asc";
  if (sort === "priceDesc") orderby = "ListPrice desc";
  else if (sort === "newest") orderby = "ModificationTimestamp desc";
  else if (sort === "oldest") orderby = "ModificationTimestamp asc";

  const queryParams = new URLSearchParams({
    $filter: filterString,
    $select: [
      "ListingKey",
      "UnparsedAddress",
      "City",
      "PostalCode",
      "ListPrice",
      "BedroomsTotal",
      "BathroomsTotalInteger",
      "PropertyType",
      "StandardStatus",
      "PublicRemarks",
      "Latitude",
      "Longitude"
    ].join(","),
    $orderby: orderby,
    $top: limit.toString(),
    $expand: "Media"
  });

  const url = `https://query.ampre.ca/odata/Property?${queryParams}`;

  try {
    const mlsRes = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!mlsRes.ok) {
      const text = await mlsRes.text();
      return res.status(mlsRes.status).json({ error: `MLS error: ${text}` });
    }

    const data = await mlsRes.json();
    res.status(200).json({ results: data.value });
  } catch (err) {
    console.error("❌ MLS API call failed", err.message);
    res.status(500).json({ error: "MLS API request failed" });
  }
});

app.listen(PORT, async () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  if (!cachedListings.length) {
    console.log("🚀 Initial MLS data fetch...");
    cachedListings = await fetchAmpreListings();
  }
});