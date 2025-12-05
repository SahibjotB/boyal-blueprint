// pages/api/chat.js
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  console.log("🔑 API KEY Exists:", !!process.env.OPENAI_API_KEY);

  try {
    const { messages } = req.body;
    if (!messages || !messages.length) {
      return res.status(400).json({ error: "Missing messages" });
    }

    // Load MLS listings JSON
    const filePath = path.join(process.cwd(), "data", "listings.json");
    const fileRaw = fs.readFileSync(filePath, "utf-8");
    const listingsData = JSON.parse(fileRaw).value || [];

    // Build prompt including listings context
    const latestUserMsg = messages[messages.length - 1].content;
    const prompt = `
You are a helpful real estate assistant. A user sent you the following request:
"${latestUserMsg}"

Here are current MLS listings data (please use this data when relevant to answer the user's question):
${JSON.stringify(listingsData.slice(0, 50))}

Respond to the user clearly and concisely, referring to any applicable listings from the data above when helpful.
`;

    // Append system/user message structure for OpenAI
    const openaiMessages = [
      { role: "system", content: "You are a real estate assistant with access to MLS listing data." },
      { role: "user", content: prompt }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: openaiMessages,
        temperature: 0.3
      }),
    });

    const text = await response.text();
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch (e) {
      console.error("❌ Failed to parse OpenAI response:", text);
      res.status(500).json({ error: "Failed to parse OpenAI response" });
    }

  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
