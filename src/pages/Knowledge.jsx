import React, { useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export default function Knowledge() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm your real estate expert specializing in the Greater Toronto Area. Ask me anything about buying, selling, or investing in real estate.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a professional real estate expert focused on the Greater Toronto Area. Provide clear, reliable, and specific answers to questions about housing, market trends, and investment.",
            },
            ...updatedMessages,
          ],
        }),
      });

      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content;
      if (botReply) {
        setMessages([...updatedMessages, { role: "assistant", content: botReply }]);
      }
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Sorry, something went wrong. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white p-6 flex flex-col items-center">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Real Estate Knowledge Hub</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Ask your GTA real estate expert anything!
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-lg flex flex-col h-[600px] overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-xl px-4 py-3 max-w-[75%] text-sm whitespace-pre-line shadow-sm ${
                  msg.role === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 dark:bg-zinc-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-sm text-gray-500">Thinking...</div>
          )}
        </div>

        <div className="border-t border-gray-300 dark:border-zinc-700 px-4 py-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask a real estate question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg px-4 py-2 text-sm text-black dark:text-white focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              disabled={loading}
            >
              <PaperPlaneIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
