import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTrackBySlug, getLessonsWithCompletion } from "@/lib/queries/lessons";

interface TrackPageProps {
  params: Promise<{ trackSlug: string }>;
}

const LEVEL_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Beginner",     color: "text-success bg-success/10 border-success/20" },
  2: { label: "Intermediate", color: "text-accent bg-accent/10 border-accent/20" },
  3: { label: "Advanced",     color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
};

export default async function TrackPage({ params }: TrackPageProps) {
  const { trackSlug } = await params;
  const track = await getTrackBySlug(trackSlug);
  if (!track) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const lessons = await getLessonsWithCompletion(track.id, user?.id ?? null);
  const byLevel = lessons.reduce<Record<number, typeof lessons>>((acc, l) => {
    const lvl = l.level ?? 1;
    if (!acc[lvl]) acc[lvl] = [];
    acc[lvl].push(l);
    return acc;
  }, {});
  const levels = Object.keys(byLevel).map(Number).sort((a, b) => a - b);

  const totalCompleted = lessons.filter((l) => l.completed).length;
  const pct = lessons.length > 0 ? Math.round((totalCompleted / lessons.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">

      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/tracks" className="text-sm text-muted hover:text-foreground transition-colors">
          ← All tracks
        </Link>
      </div>

      {/* Header */}
      <div className="mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{track.title}</h1>
        {track.description && (
          <p className="text-lg text-muted leading-relaxed mb-8 max-w-2xl">{track.description}</p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted mb-6">
          <span>{lessons.length} lessons</span>
          <span>·</span>
          <span>{levels.length} levels</span>
          {user && (
            <>
              <span>·</span>
              <span className="text-foreground font-medium">{totalCompleted}/{lessons.length} done</span>
            </>
          )}
        </div>

        {/* Progress bar */}
        {user && lessons.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted">
              <span>Progress</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-card-border overflow-hidden">
              <div className="h-full rounded-full bg-accent transition-all duration-700"
                style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Levels */}
      <div className="space-y-14">
        {levels.map((level) => {
          const meta = LEVEL_LABELS[level] ?? { label: `Level ${level}`, color: "text-muted bg-card-border" };
          return (
            <section key={level}>
              <div className="flex items-center gap-4 mb-6">
                <span className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${meta.color}`}>
                  Level {level}
                </span>
                <span className="text-sm text-muted">{meta.label}</span>
                <div className="flex-1 h-px bg-card-border" />
              </div>

              <div className="space-y-3">
                {byLevel[level].map((lesson, idx) => (
                  <Link key={lesson.id} href={`/tracks/${trackSlug}/${lesson.slug}`}
                    className={`group flex items-center gap-5 rounded-2xl border p-5 transition-all ${
                      lesson.completed
                        ? "border-success/20 bg-success/5 hover:bg-success/8"
                        : "border-card-border bg-card hover:border-accent/25 hover:bg-card-hover"
                    }`}>

                    {/* Index / check */}
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      lesson.completed ? "bg-success text-white" : "bg-background text-muted border border-card-border"
                    }`}>
                      {lesson.completed ? "✓" : idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{lesson.title}</p>
                      {lesson.description && (
                        <p className="mt-0.5 text-sm text-muted truncate">{lesson.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs text-muted tabular-nums font-medium">+{lesson.xp_value} XP</span>
                      <span className="text-muted group-hover:text-foreground transition-colors text-lg">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
