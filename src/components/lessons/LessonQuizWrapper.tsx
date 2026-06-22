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
  // If already completed, skip the quiz gate entirely
  const [quizPassed, setQuizPassed] = useState(isCompleted);

  return (
    <div className="space-y-6">
      {/* Quiz */}
      <LessonQuiz
        questions={questions}
        onPass={() => setQuizPassed(true)}
      />

      {/* Challenge + complete — only visible after passing */}
      {quizPassed && (
        <div className="space-y-6 animate-fade-up">
          {/* Challenge */}
          <div className="rounded-3xl border border-accent/25 p-8"
            style={{ background: "rgba(249,115,22,0.04)" }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl">🎯</span>
              <h2 className="font-bold text-lg">Your Challenge</h2>
              <span className="ml-auto text-sm font-bold text-accent">+{xpValue} XP</span>
            </div>
            <p className="text-muted leading-[1.9]">{challengePrompt}</p>
          </div>

          {/* Complete button */}
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
      )}

      {/* Challenge + complete always visible (quiz is advisory for now) */}
      {!quizPassed && (
        <div className="space-y-6 animate-fade-up">
          <div className="rounded-3xl border border-accent/25 p-8"
            style={{ background: "rgba(249,115,22,0.04)" }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl">🎯</span>
              <h2 className="font-bold text-lg">Your Challenge</h2>
              <span className="ml-auto text-sm font-bold text-accent">+{xpValue} XP</span>
            </div>
            <p className="text-muted leading-[1.9]">{challengePrompt}</p>
          </div>

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
      )}
    </div>
  );
}
