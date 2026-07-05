"use client";

import { useState } from "react";
import { LessonQuiz } from "@/components/lessons/LessonQuiz";
import { LessonClient } from "@/components/lessons/LessonClient";
import type { QuizQuestion } from "@/types/database";

interface LessonQuizWrapperProps {
  questions: QuizQuestion[];
  lessonId: string;
  xpValue: number;
  trackSlug: string;
  lessonSlug: string;
  isCompleted: boolean;
  isLoggedIn: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
  challengePrompt: string;
}

export function LessonQuizWrapper({
  questions,
  lessonId,
  xpValue,
  trackSlug,
  lessonSlug,
  isCompleted,
  isLoggedIn,
  prevSlug,
  nextSlug,
  challengePrompt,
}: LessonQuizWrapperProps) {
  // If already completed OR no quiz questions, skip the gate
  const hasQuiz = questions.length > 0;
  const [quizPassed, setQuizPassed] = useState(!hasQuiz || isCompleted);

  const Challenge = (
    <div className="rounded-3xl border border-accent/25 p-8"
      style={{ background: "rgba(249,115,22,0.04)" }}>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xl">🎯</span>
        <h2 className="font-bold text-lg">Your Challenge</h2>
        <span className="ml-auto text-sm font-bold text-accent">+{xpValue} XP</span>
      </div>
      <p className="text-muted leading-[1.9]">{challengePrompt}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Quiz — always shown when there are questions */}
      {hasQuiz && (
        <LessonQuiz
          questions={questions}
          onPass={() => setQuizPassed(true)}
          isCompleted={isCompleted}
        />
      )}

      {/* Challenge + Mark Complete — locked behind quiz pass */}
      {quizPassed ? (
        <div className="space-y-6">
          {Challenge}
          <LessonClient
            lessonId={lessonId}
            xpValue={xpValue}
            trackSlug={trackSlug}
            lessonSlug={lessonSlug}
            isCompleted={isCompleted}
            isLoggedIn={isLoggedIn}
            prevSlug={prevSlug}
            nextSlug={nextSlug}
          />
        </div>
      ) : (
        /* Locked state — shown while quiz not yet passed */
        <div className="space-y-6 opacity-50 pointer-events-none select-none">
          {Challenge}
          <div className="w-full rounded-2xl border border-card-border bg-card px-4 py-4 text-center text-sm text-muted font-medium">
            🔒 Pass the quiz above to unlock
          </div>
        </div>
      )}
    </div>
  );
}
