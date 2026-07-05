"use client";

import { useState } from "react";
import { completeOnboarding } from "@/lib/actions/profile";
import type { Track } from "@/types/database";
import { recommendTracksFromAnswers } from "@/lib/recommendations";

interface OnboardingWizardProps {
  tracks: Track[];
}

const SKILL_LEVELS = [
  { id: "beginner", label: "Complete beginner", emoji: "🌱", desc: "I'm new to coding and AI tools" },
  { id: "some",     label: "Some experience",   emoji: "⚡", desc: "I've dabbled but want structure" },
  { id: "builder",  label: "Active builder",    emoji: "🚀", desc: "I build regularly and want to go faster" },
];

const GOALS = [
  { id: "ai-tools",    label: "Use AI coding tools",     emoji: "🤖", desc: "Cursor, Copilot, GitHub Copilot" },
  { id: "no-code",     label: "Build without code",      emoji: "🏗️",  desc: "Bubble, Webflow, FlutterFlow" },
  { id: "ship-fast",   label: "Ship projects faster",    emoji: "⚡", desc: "Go from idea to live product" },
  { id: "automate",    label: "Automate workflows",      emoji: "🔄", desc: "Zapier, Make, n8n" },
  { id: "ai-agents",   label: "Build AI agents",         emoji: "🧠", desc: "Deploy agents that work for you" },
  { id: "backend",     label: "Learn backend & databases", emoji: "🗄️", desc: "Supabase, Firebase, Xano" },
];

export function OnboardingWizard({ tracks }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [username, setUsername]         = useState("");
  const [skillLevel, setSkillLevel]     = useState<string | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [error, setError]               = useState<string | null>(null);
  const [submitting, setSubmitting]     = useState(false);

  const TOTAL_STEPS = 4;

  function toggleGoal(id: string) {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  const recommendations = recommendTracksFromAnswers(tracks, skillLevel, selectedGoals);

  async function handleFinish() {
    setSubmitting(true);
    setError(null);

    const goalsText = selectedGoals
      .map((id) => GOALS.find((g) => g.id === id)?.label ?? id)
      .join(", ");

    const formData = new FormData();
    formData.set("username", username);
    formData.set("learning_goals", `Skill level: ${skillLevel}. Goals: ${goalsText}.`);

    const result = await completeOnboarding(formData);
    if (result?.error) {
      setError(result.error);
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* Progress bar */}
      <div className="mb-10 flex gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i + 1 <= step ? "bg-accent" : "bg-card-border"
            }`}
          />
        ))}
      </div>

      {/* ── Step 1: Username ── */}
      {step === 1 && (
        <div className="space-y-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Step 1 of {TOTAL_STEPS}</p>
            <h1 className="text-3xl font-bold">Pick your username</h1>
            <p className="mt-2 text-muted">How others will find you on the leaderboard.</p>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1.5">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              placeholder="speedrunner_42"
              className="w-full rounded-xl border border-card-border bg-background px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-base"
            />
            <p className="mt-1.5 text-xs text-muted">Lowercase letters, numbers, and underscores only.</p>
          </div>
          <button
            type="button"
            disabled={username.length < 3}
            onClick={() => setStep(2)}
            className="w-full rounded-xl bg-accent px-4 py-3 font-semibold text-white hover:bg-accent-hover disabled:opacity-40 transition-colors"
          >
            Continue →
          </button>
        </div>
      )}

      {/* ── Step 2: Skill level ── */}
      {step === 2 && (
        <div className="space-y-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Step 2 of {TOTAL_STEPS}</p>
            <h1 className="text-3xl font-bold">Where are you starting from?</h1>
            <p className="mt-2 text-muted">We'll tailor your experience based on your level.</p>
          </div>
          <div className="space-y-3">
            {SKILL_LEVELS.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => setSkillLevel(level.id)}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  skillLevel === level.id
                    ? "border-accent bg-accent/8"
                    : "border-card-border bg-card hover:border-accent/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{level.emoji}</span>
                  <div>
                    <p className="font-semibold">{level.label}</p>
                    <p className="text-sm text-muted">{level.desc}</p>
                  </div>
                  {skillLevel === level.id && (
                    <span className="ml-auto text-accent font-bold">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)}
              className="flex-1 rounded-xl border border-card-border px-4 py-3 font-medium hover:bg-card transition-colors">
              Back
            </button>
            <button type="button" disabled={!skillLevel} onClick={() => setStep(3)}
              className="flex-1 rounded-xl bg-accent px-4 py-3 font-semibold text-white hover:bg-accent-hover disabled:opacity-40 transition-colors">
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Goals ── */}
      {step === 3 && (
        <div className="space-y-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Step 3 of {TOTAL_STEPS}</p>
            <h1 className="text-3xl font-bold">What do you want to learn?</h1>
            <p className="mt-2 text-muted">Pick everything that applies — we'll suggest the best tracks.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {GOALS.map((goal) => {
              const selected = selectedGoals.includes(goal.id);
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => toggleGoal(goal.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    selected
                      ? "border-accent bg-accent/8"
                      : "border-card-border bg-card hover:border-accent/40"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{goal.emoji}</span>
                  <p className="font-semibold text-sm leading-tight">{goal.label}</p>
                  <p className="text-xs text-muted mt-1">{goal.desc}</p>
                  {selected && (
                    <span className="mt-2 inline-block text-xs font-bold text-accent">✓ Selected</span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)}
              className="flex-1 rounded-xl border border-card-border px-4 py-3 font-medium hover:bg-card transition-colors">
              Back
            </button>
            <button type="button" disabled={selectedGoals.length === 0} onClick={() => setStep(4)}
              className="flex-1 rounded-xl bg-accent px-4 py-3 font-semibold text-white hover:bg-accent-hover disabled:opacity-40 transition-colors">
              See my tracks →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 4: Recommendations ── */}
      {step === 4 && (
        <div className="space-y-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Step 4 of {TOTAL_STEPS}</p>
            <h1 className="text-3xl font-bold">Your recommended tracks</h1>
            <p className="mt-2 text-muted">
              Picked for you based on your goals. You can explore all tracks later.
            </p>
          </div>

          {recommendations.length > 0 ? (
            <ul className="space-y-3">
              {recommendations.map((track, i) => (
                <li key={track.id} className="rounded-xl border border-card-border bg-card p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
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
              <p>Tracks loading — you can pick from all of them after signup.</p>
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(3)}
              className="flex-1 rounded-xl border border-card-border px-4 py-3 font-medium hover:bg-card transition-colors">
              Back
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={handleFinish}
              className="flex-1 rounded-xl bg-accent px-4 py-3 font-semibold text-white hover:bg-accent-hover disabled:opacity-40 transition-colors"
            >
              {submitting ? "Setting up…" : "Start learning 🚀"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
