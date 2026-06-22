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
  let tracks: Awaited<ReturnType<typeof getTracks>> = [];
  let user = null;

  try {
    tracks = await getTracks();
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // env vars not set or DB unreachable — render empty state
  }

  const trackStats = await Promise.all(
    tracks.map(async (track) => {
      try {
        const lessons = await getLessonsWithCompletion(track.id, user?.id ?? null);
        const completed = lessons.filter((l) => l.completed).length;
        return { trackId: track.id, total: lessons.length, completed };
      } catch {
        return { trackId: track.id, total: 0, completed: 0 };
      }
    })
  );
  const statsMap = Object.fromEntries(trackStats.map((s) => [s.trackId, s]));

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">

      <div className="mb-16 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          Learning tracks
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-5">
          Seven tracks.<br />Zero fluff.
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Beginner to mastery — every tool you need to build and ship a real product.
          Start at Level 1 and work your way up.
        </p>
      </div>

      {tracks.length === 0 && (
        <p className="text-muted">No tracks found. Make sure you have run the seed SQL in Supabase.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tracks.map((track) => {
          const meta = TRACK_META[track.slug] ?? { color: "from-muted/10 to-transparent" };
          const stats = statsMap[track.id];
          const pct = stats?.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

          return (
            <Link key={track.id} href={`/tracks/${track.slug}`}
              className="card-luxury rounded-3xl p-8 group block relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${meta.color} pointer-events-none`} />
              <div className="relative">
                <h2 className="text-lg font-bold mb-3">{track.title}</h2>
                {track.description && (
                  <p className="text-muted leading-relaxed mb-6 text-sm">{track.description}</p>
                )}
                {stats && stats.total > 0 && (
                  <div className="mb-5">
                    <div className="flex justify-between text-xs text-muted mb-1.5">
                      <span>{stats.total} lessons</span>
                      {user && <span>{pct}%</span>}
                    </div>
                    <div className="h-1 w-full rounded-full bg-card-border overflow-hidden">
                      <div className="h-full rounded-full bg-accent transition-all duration-500"
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )}
                <span className="text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform inline-block">
                  Start →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
