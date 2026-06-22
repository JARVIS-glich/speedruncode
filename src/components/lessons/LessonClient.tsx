"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { completeLesson } from "@/lib/actions/lesson";

interface LessonClientProps {
  lessonId: string;
  xpValue: number;
  trackSlug: string;
  lessonSlug: string;
  isCompleted: boolean;
  isLoggedIn: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
}

export function LessonClient({
  lessonId, xpValue, trackSlug, lessonSlug,
  isCompleted, isLoggedIn, prevSlug, nextSlug,
}: LessonClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(isCompleted);
  const [xpEarned, setXpEarned] = useState(false);

  async function handleComplete() {
    if (!isLoggedIn) { router.push("/login"); return; }
    startTransition(async () => {
      const result = await completeLesson(lessonId, xpValue, trackSlug, lessonSlug);
      if (result.success && !result.alreadyCompleted) {
        setDone(true);
        setXpEarned(true);
      } else if (result.success) {
        setDone(true);
      }
    });
  }

  return (
    <div className="space-y-5 pt-2">
      {xpEarned && (
        <div className="rounded-2xl border border-success/25 bg-success/8 px-6 py-4 text-success font-semibold">
          🎉 +{xpValue} XP earned! Streak updated.
        </div>
      )}

      <button onClick={handleComplete} disabled={done || isPending}
        className={`w-full rounded-2xl py-4 text-base font-bold transition-all ${
          done
            ? "bg-success/10 text-success border border-success/25 cursor-default"
            : "bg-accent text-white hover:bg-accent-hover disabled:opacity-60 shadow-lg shadow-accent/20"
        }`}>
        {isPending ? "Saving…"
          : done ? "✓ Lesson Complete"
          : isLoggedIn ? `Mark Complete  +${xpValue} XP`
          : "Sign in to Mark Complete"}
      </button>

      <div className="flex gap-3">
        {prevSlug ? (
          <Link href={`/tracks/${trackSlug}/${prevSlug}`}
            className="flex-1 rounded-2xl border border-card-border bg-card px-4 py-3 text-center text-sm font-semibold hover:bg-card-hover transition-colors">
            ← Previous
          </Link>
        ) : <div className="flex-1" />}
        {nextSlug ? (
          <Link href={`/tracks/${trackSlug}/${nextSlug}`}
            className="flex-1 rounded-2xl border border-card-border bg-card px-4 py-3 text-center text-sm font-semibold hover:bg-card-hover transition-colors">
            Next →
          </Link>
        ) : (
          <Link href={`/tracks/${trackSlug}`}
            className="flex-1 rounded-2xl border border-card-border bg-card px-4 py-3 text-center text-sm font-semibold hover:bg-card-hover transition-colors">
            Back to track
          </Link>
        )}
      </div>
    </div>
  );
}
