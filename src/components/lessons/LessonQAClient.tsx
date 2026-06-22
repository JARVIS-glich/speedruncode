"use client";

import { useState, useRef, useEffect } from "react";

interface Message { role: "user" | "ai"; text: string; }

export function LessonQAClient({ lessonTitle, lessonSummary }: { lessonTitle: string; lessonSummary: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((p) => [...p, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await fetch("/api/lesson-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, lessonTitle, lessonSummary }),
      });
      const data = await res.json();
      setMessages((p) => [...p, { role: "ai", text: data.answer ?? data.error ?? "Something went wrong." }]);
    } catch {
      setMessages((p) => [...p, { role: "ai", text: "Could not reach the Q&A service." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-card-border bg-card flex flex-col overflow-hidden" style={{ height: "440px" }}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-card-border">
        <p className="text-xs font-bold uppercase tracking-widest text-muted">Ask a question</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        {messages.length === 0 && (
          <p className="text-sm text-muted leading-relaxed">
            Didn&apos;t understand something in the video or notes? Ask anything about this lesson.
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <span className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[88%] text-left ${
              msg.role === "user"
                ? "bg-accent text-white"
                : "bg-background text-foreground border border-card-border"
            }`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <span className="inline-block rounded-2xl border border-card-border bg-background px-4 py-3 text-sm text-muted">
              Thinking…
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-card-border px-4 py-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
          placeholder="Type your question…"
          disabled={loading}
          className="w-full rounded-xl bg-background border border-card-border px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 transition-colors"
        />
      </div>
    </div>
  );
}
