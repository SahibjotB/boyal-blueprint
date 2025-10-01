// api/chat.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { messages } = req.body;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });

    const text = await openaiRes.text();
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (parseErr) {
      console.error("❌ Failed to parse OpenAI response:", text);
      return res.status(500).json({ error: "Failed to parse OpenAI response" });
    }

  } catch (err) {
    console.error("❌ Chat API error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

