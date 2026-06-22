"use client";

import { useState } from "react";
import { completeOnboarding } from "@/lib/actions/profile";
import type { Track } from "@/types/database";
import { recommendTracks } from "@/lib/recommendations";

interface OnboardingWizardProps {
  tracks: Track[];
}

export function OnboardingWizard({ tracks }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [learningGoals, setLearningGoals] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const recommendations = recommendTracks(tracks, learningGoals);

  async function handleFinish() {
    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.set("username", username);
    formData.set("learning_goals", learningGoals);

    const result = await completeOnboarding(formData);
    if (result?.error) {
      setError(result.error);
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-8 flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-accent" : "bg-card-border"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Pick your username</h1>
            <p className="mt-2 text-muted">
              This is how others will find you on the leaderboard.
            </p>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1.5">
              Username
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              placeholder="speedrunner_42"
              className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <p className="mt-1.5 text-xs text-muted">
              Lowercase letters, numbers, and underscores only.
            </p>
          </div>
          <button
            type="button"
            disabled={username.length < 3}
            onClick={() => setStep(2)}
            className="w-full rounded-lg bg-accent px-4 py-2.5 font-medium text-white hover:bg-accent-hover disabled:opacity-50 transition-colors"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">What are you trying to learn?</h1>
            <p className="mt-2 text-muted">
              Tell us your goals so we can recommend the right tracks.
            </p>
          </div>
          <div>
            <label htmlFor="goals" className="block text-sm font-medium mb-1.5">
              Learning goals
            </label>
            <textarea
              id="goals"
              rows={4}
              value={learningGoals}
              onChange={(e) => setLearningGoals(e.target.value)}
              placeholder="I want to build full-stack apps with Next.js and get better at using AI coding tools like Cursor…"
              className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 rounded-lg border border-card-border px-4 py-2.5 font-medium hover:bg-card transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              disabled={learningGoals.length < 10}
              onClick={() => setStep(3)}
              className="flex-1 rounded-lg bg-accent px-4 py-2.5 font-medium text-white hover:bg-accent-hover disabled:opacity-50 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Your recommended tracks</h1>
            <p className="mt-2 text-muted">
              Based on your goals, here&apos;s where we think you should start.
            </p>
          </div>

          {recommendations.length > 0 ? (
            <ul className="space-y-3">
              {recommendations.map((track, i) => (
                <li
                  key={track.id}
                  className="rounded-xl border border-card-border bg-card p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{track.title}</p>
                      {track.description && (
                        <p className="mt-1 text-sm text-muted">{track.description}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-card-border p-6 text-center text-muted">
              <p>No tracks in the database yet.</p>
              <p className="mt-1 text-sm">
                Add tracks via the Supabase table editor — they&apos;ll show up here.
              </p>
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 rounded-lg border border-card-border px-4 py-2.5 font-medium hover:bg-card transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={handleFinish}
              className="flex-1 rounded-lg bg-accent px-4 py-2.5 font-medium text-white hover:bg-accent-hover disabled:opacity-50 transition-colors"
            >
              {submitting ? "Setting up…" : "Start learning"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
