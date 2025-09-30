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
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      console.log("🚀 Sending to proxy backend /api/chat...");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content;

      if (botReply) {
        setMessages([...updatedMessages, { role: "assistant", content: botReply }]);
      } else {
        setMessages([
          ...updatedMessages,
          {
            role: "assistant",
            content: "❌ No response from GPT. Try again later.",
          },
        ]);
      }
    } catch (err) {
      console.error("❌ Error talking to backend:", err);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "⚠️ Something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black dark:text-white p-6 flex flex-col items-center">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Real Estate Knowledge Hub</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Ask your GTA real estate expert anything!
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-lg flex flex-col h-[590px] overflow-hidden">
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
                    : "bg-gray-200 dark:bg-neutral-800"
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

        <div className="border-t border-gray-300 dark:border-neutral-700 px-4 py-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask a real estate question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded-lg px-4 py-2 text-sm text-black dark:text-white focus:outline-none"
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
