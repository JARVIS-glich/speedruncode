"use client";

import { useState } from "react";
import { submitFeedback } from "@/lib/actions/feedback";

export function FeedbackWidget() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError(null);

    const result = await submitFeedback(message);
    setLoading(false);

    if (result.success) {
      setSent(true);
      setMessage("");
    } else {
      setError(result.error ?? "Failed to send.");
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-success/20 bg-success/5 p-8 text-center">
        <p className="font-semibold text-success mb-1">Thanks for the feedback</p>
        <p className="text-sm text-muted">We read every message.</p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-xs text-muted hover:text-foreground transition-colors underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-card-border bg-card p-8">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Feedback</p>
        <h2 className="text-xl font-bold">Tell us what you think</h2>
        <p className="mt-1 text-sm text-muted">
          Found a bug? Want a new track? Something confusing? We want to know.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind..."
          disabled={loading}
          className="w-full rounded-2xl border border-card-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none transition-colors disabled:opacity-50 text-sm"
        />

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="btn-primary rounded-2xl px-7 py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Sending…" : "Send feedback"}
        </button>
      </form>
    </div>
  );
}
