import Link from "next/link";
import { getTracks } from "@/lib/queries/tracks";
import { createClient } from "@/lib/supabase/server";
import { getLessonsWithCompletion } from "@/lib/queries/lessons";

const TRACK_META: Record<string, { color: string }> = {
  "ai-fundamentals":  { color: "from-blue-500/10 to-transparent" },
  "cursor-mastery":   { color: "from-accent/10 to-transparent" },
  "ship-with-ai":     { color: "from-purple-500/10 to-transparent" },
  "no-code-builders": { color: "from-green-500/10 to-transparent" },
  "backend-database": { color: "from-cyan-500/10 to-transparent" },
  "automation":       { color: "from-yellow-500/10 to-transparent" },
  "ai-agents-money":  { color: "from-pink-500/10 to-transparent" },
};

export default async function TracksPage() {
  const tracks = await getTracks();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const trackStats = await Promise.all(
    tracks.map(async (track) => {
      const lessons = await getLessonsWithCompletion(track.id, user?.id ?? null);
      const completed = lessons.filter((l) => l.completed).length;
      return { trackId: track.id, total: lessons.length, completed };
    })
  );
  const statsMap = Object.fromEntries(trackStats.map((s) => [s.trackId, s]));

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">

      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Learning tracks</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-5">
          Three tracks.<br />Zero fluff.
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Each track is short, practical, and built around the tools you actually use to ship.
          Start at Level 1 — work your way up.
        </p>
      </div>

      {/* Track cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tracks.map((track) => {
          const meta = TRACK_META[track.slug] ?? { color: "from-muted/10 to-transparent" };
          const stats = statsMap[track.id];
          const pct = stats?.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

          return (
            <Link key={track.id} href={`/tracks/${track.slug}`}
              className="card-luxury rounded-3xl p-10 group block relative overflow-hidden">
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${meta.color} pointer-events-none`} />

              <div className="relative">
                <h2 className="text-xl font-bold mb-4">{track.title}</h2>
                {track.description && (
                  <p className="text-muted leading-relaxed mb-8 text-sm">{track.description}</p>
                )}

                {stats && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-muted mb-2">
                      <span>{stats.total} lessons</span>
                      {user && <span>{pct}% complete</span>}
                    </div>
                    <div className="h-1 w-full rounded-full bg-card-border overflow-hidden">
                      <div className="h-full rounded-full bg-accent transition-all duration-500"
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )}

                <span className="text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform inline-block">
                  Start track →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
