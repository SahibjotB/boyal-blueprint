// pages/api/search-mls.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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

  // Construct $filter query string
  const filters = [];

  if (city) filters.push(`City eq '${city}'`);
  if (minPrice) filters.push(`ListPrice ge ${minPrice}`);
  if (maxPrice) filters.push(`ListPrice le ${maxPrice}`);
  if (bedroomsMin) filters.push(`BedroomsTotal ge ${bedroomsMin}`);
  if (bathroomsMin) filters.push(`BathroomsTotalInteger ge ${bathroomsMin}`);
  if (keywords) {
    filters.push(`contains(tolower(PublicRemarks), tolower('${keywords}'))`);
  }

  // Always get active listings
  filters.push(`StandardStatus eq Odata.Models.StandardStatus'Active'`);

  const filterString = filters.join(" and ");

  // Build $orderby
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
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!mlsRes.ok) {
      const text = await mlsRes.text();
      return res.status(mlsRes.status).json({ error: `MLS error: ${text}` });
    }

    const data = await mlsRes.json();
    res.status(200).json({ results: data.value });

  } catch (err) {
    console.error("MLS API call failed", err);
    res.status(500).json({ error: "MLS API request failed" });
  }
}
