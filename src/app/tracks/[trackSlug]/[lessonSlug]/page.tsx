import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getTrackBySlug,
  getLessonBySlug,
  getLessonsWithCompletion,
  isLessonCompleted,
  getQuizQuestions,
} from "@/lib/queries/lessons";
import { LessonQuizWrapper } from "@/components/lessons/LessonQuizWrapper";
import { LessonClient } from "@/components/lessons/LessonClient";

interface LessonPageProps {
  params: Promise<{ trackSlug: string; lessonSlug: string }>;
}

const LEVEL_COLORS: Record<number, string> = {
  1: "text-success bg-success/10 border-success/20",
  2: "text-accent bg-accent/10 border-accent/20",
  3: "text-purple-400 bg-purple-400/10 border-purple-400/20",
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { trackSlug, lessonSlug } = await params;

  const track = await getTrackBySlug(trackSlug);
  if (!track) notFound();

  const lesson = await getLessonBySlug(track.id, lessonSlug);
  if (!lesson) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [allLessons, completed, quizQuestions] = await Promise.all([
    getLessonsWithCompletion(track.id, user?.id ?? null),
    user ? isLessonCompleted(lesson.id, user.id) : Promise.resolve(false),
    getQuizQuestions(lesson.id),
  ]);

  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const levelColor = LEVEL_COLORS[lesson.level] ?? "text-muted bg-card border-card-border";

  const hasQuiz = quizQuestions.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/tracks" className="hover:text-foreground transition-colors">Tracks</Link>
        <span>/</span>
        <Link href={`/tracks/${trackSlug}`} className="hover:text-foreground transition-colors truncate max-w-[180px]">
          {track.title}
        </Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px]">{lesson.title}</span>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8 flex-col xl:flex-row">

        {/* ── LEFT: main content ── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Title */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-widest ${levelColor}`}>
                Level {lesson.level}
              </span>
              {completed && (
                <span className="rounded-full border border-success/20 bg-success/10 px-3.5 py-1 text-xs font-bold text-success">
                  ✓ Completed
                </span>
              )}
              {hasQuiz && !completed && (
                <span className="rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 text-xs font-bold text-accent">
                  🧠 Quiz required
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{lesson.title}</h1>
            {lesson.description && (
              <p className="mt-3 text-muted text-lg">{lesson.description}</p>
            )}
          </div>

          {/* Video */}
          <div className="relative w-full rounded-lg overflow-hidden bg-black shadow-xl"
            style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${lesson.youtube_video_id}?rel=0&modestbranding=1`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Lesson notes */}
          {lesson.summary && (
            <div className="rounded-3xl border border-card-border bg-card p-8">
              <h2 className="font-bold text-lg mb-5">Lesson Notes</h2>
              <p className="text-muted leading-[1.9] whitespace-pre-line">{lesson.summary}</p>
            </div>
          )}

          {/* Quiz + Challenge + Mark Complete */}
          {hasQuiz ? (
            <LessonQuizWrapper
              questions={quizQuestions}
              lessonId={lesson.id}
              xpValue={lesson.xp_value}
              trackSlug={trackSlug}
              lessonSlug={lessonSlug}
              isCompleted={completed}
              isLoggedIn={!!user}
              prevSlug={prevLesson?.slug ?? null}
              nextSlug={nextLesson?.slug ?? null}
              challengePrompt={lesson.challenge_prompt}
            />
          ) : (
            /* No quiz for this lesson — show challenge + complete directly */
            <div className="space-y-6">
              <div className="rounded-3xl border border-accent/25 p-8"
                style={{ background: "rgba(249,115,22,0.04)" }}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-lg">Your Challenge</h2>
                  <span className="text-sm font-bold text-accent">+{lesson.xp_value} XP</span>
                </div>
                <p className="text-muted leading-[1.9]">{lesson.challenge_prompt}</p>
              </div>
              <LessonClient
                lessonId={lesson.id}
                xpValue={lesson.xp_value}
                trackSlug={trackSlug}
                lessonSlug={lessonSlug}
                isCompleted={completed}
                isLoggedIn={!!user}
                prevSlug={prevLesson?.slug ?? null}
                nextSlug={nextLesson?.slug ?? null}
              />
            </div>
          )}
        </div>

        {/* ── RIGHT: sidebar ── */}
        <div className="w-full xl:w-72 shrink-0 space-y-5">
          <div className="rounded-3xl border border-card-border bg-card p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-5">
              Track Progress
            </h3>
            <ul className="space-y-1">
              {allLessons.map((l) => (
                <li key={l.id}>
                  <Link href={`/tracks/${trackSlug}/${l.slug}`}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      l.slug === lessonSlug
                        ? "bg-accent/10 text-accent font-semibold"
                        : l.completed
                        ? "text-success hover:bg-success/8"
                        : "text-muted hover:bg-background"
                    }`}>
                    <span className="shrink-0 text-xs">
                      {l.completed ? "✓" : l.slug === lessonSlug ? "▶" : "○"}
                    </span>
                    <span className="truncate">{l.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
