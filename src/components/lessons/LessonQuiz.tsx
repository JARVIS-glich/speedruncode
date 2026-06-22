"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/types/database";

interface LessonQuizProps {
  questions: QuizQuestion[];
  onPass: () => void; // called when user scores ≥ 60%
}

type Phase = "quiz" | "result";

export function LessonQuiz({ questions, onPass }: LessonQuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<Phase>("quiz");
  const [score, setScore] = useState(0);

  const total = questions.length;
  const allAnswered = Object.keys(answers).length === total;

  function select(questionId: string, optionIndex: number) {
    if (phase === "result") return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function submit() {
    if (!allAnswered) return;
    const correct = questions.filter((q) => answers[q.id] === q.answer).length;
    const pct = Math.round((correct / total) * 100);
    setScore(pct);
    setPhase("result");
    if (pct >= 60) {
      // small delay so user sees the result before unlock
      setTimeout(() => onPass(), 1200);
    }
  }

  function retry() {
    setAnswers({});
    setPhase("quiz");
    setScore(0);
  }

  const passed = score >= 60;

  // ── RESULT SCREEN ──────────────────────────────────────────
  if (phase === "result") {
    return (
      <div className="rounded-3xl border bg-card p-8 space-y-8"
        style={{ borderColor: passed ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)" }}>

        {/* Score header */}
        <div className="text-center space-y-3">
          <span className="text-5xl">{passed ? "🎉" : "😅"}</span>
          <h3 className="text-2xl font-bold">{passed ? "Passed!" : "Not quite"}</h3>
          <div className="inline-flex items-center gap-2">
            <span className={`text-5xl font-bold tabular-nums ${passed ? "text-success" : "text-red-400"}`}>
              {score}%
            </span>
          </div>
          <p className="text-muted">
            {passed
              ? "Great work — lesson unlocked below."
              : `You need 60% to pass. You scored ${score}%. Review the answers below and try again.`}
          </p>

          {/* Progress bar */}
          <div className="mx-auto max-w-xs">
            <div className="h-2 w-full rounded-full bg-card-border overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${passed ? "bg-success" : "bg-red-400"}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>0%</span>
              <span className="text-accent font-medium">60% to pass</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Answer review */}
        <div className="space-y-5">
          {questions.map((q, qi) => {
            const userAnswer = answers[q.id];
            const correct = userAnswer === q.answer;
            return (
              <div key={q.id} className={`rounded-2xl border p-5 ${
                correct ? "border-success/20 bg-success/5" : "border-red-400/20 bg-red-400/5"
              }`}>
                <p className="font-semibold mb-4 flex items-start gap-2">
                  <span className={`shrink-0 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ${
                    correct ? "bg-success text-white" : "bg-red-400 text-white"
                  }`}>
                    {correct ? "✓" : "✗"}
                  </span>
                  <span>Q{qi + 1}. {q.question}</span>
                </p>
                <ul className="space-y-2 pl-8">
                  {q.options.map((opt, oi) => {
                    const isCorrect = oi === q.answer;
                    const isUserWrong = oi === userAnswer && !correct;
                    return (
                      <li key={oi} className={`text-sm rounded-xl px-4 py-2.5 ${
                        isCorrect
                          ? "bg-success/15 text-success font-semibold border border-success/20"
                          : isUserWrong
                          ? "bg-red-400/15 text-red-400 border border-red-400/20 line-through"
                          : "text-muted"
                      }`}>
                        {opt}
                        {isCorrect && <span className="ml-2 text-xs">← correct</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {!passed && (
          <button onClick={retry}
            className="w-full rounded-2xl bg-accent py-4 font-bold text-white hover:bg-accent-hover transition-colors">
            Try again
          </button>
        )}
      </div>
    );
  }

  // ── QUIZ SCREEN ────────────────────────────────────────────
  return (
    <div className="rounded-3xl border border-card-border bg-card p-8 space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xl">🧠</span>
          <h2 className="text-lg font-bold">Quick Check</h2>
          <span className="ml-auto text-xs text-muted font-medium">
            {Object.keys(answers).length}/{total} answered · 60% to pass
          </span>
        </div>
        <div className="h-1 w-full rounded-full bg-card-border overflow-hidden">
          <div className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${(Object.keys(answers).length / total) * 100}%` }} />
        </div>
      </div>

      <div className="space-y-8">
        {questions.map((q, qi) => (
          <div key={q.id}>
            <p className="font-semibold mb-4 leading-relaxed">
              <span className="text-accent font-bold mr-2">Q{qi + 1}.</span>
              {q.question}
            </p>
            <ul className="space-y-2.5">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                return (
                  <li key={oi}>
                    <button
                      onClick={() => select(q.id, oi)}
                      className={`w-full text-left rounded-2xl border px-5 py-3.5 text-sm transition-all ${
                        selected
                          ? "border-accent bg-accent/12 text-foreground font-medium"
                          : "border-card-border bg-background text-muted hover:border-muted/50 hover:text-foreground"
                      }`}
                    >
                      <span className={`inline-block w-6 h-6 rounded-full border mr-3 text-xs font-bold text-center leading-5 shrink-0 ${
                        selected ? "bg-accent border-accent text-white" : "border-muted/50"
                      }`}>
                        {String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <button
        onClick={submit}
        disabled={!allAnswered}
        className="w-full rounded-2xl bg-accent py-4 font-bold text-white hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        {allAnswered ? "Submit answers" : `Answer all ${total} questions to submit`}
      </button>
    </div>
  );
}
