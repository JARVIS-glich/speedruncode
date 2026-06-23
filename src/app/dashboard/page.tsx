import Link from "next/link";
import { redirect } from "next/navigation";
import { recordDailyVisit } from "@/lib/actions/auth";
import { StatCard } from "@/components/dashboard/StatCard";
import { getUserRank, getLeaderboard } from "@/lib/queries/leaderboard";
import { getCompletedLessonsCount, getCurrentProfile } from "@/lib/queries/profile";
import { getTracks } from "@/lib/queries/tracks";
import { getLessonsWithCompletion } from "@/lib/queries/lessons";
import { todayUtc } from "@/lib/streak";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  await recordDailyVisit();

  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/login");
    return null;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [rank, completedCount, tracks, leaderboard] = await Promise.all([
    getUserRank(profile.id),
    getCompletedLessonsCount(profile.id),
    getTracks(),
    getLeaderboard(5),
  ]);

  let continueHref: string | null = null;
  let continueLabel: string | null = null;
  let continueTrack: string | null = null;
  for (const track of tracks) {
    const lessons = await getLessonsWithCompletion(track.id, user?.id ?? null);
    const next = lessons.find((l) => !l.completed);
    if (next) {
      continueHref = `/tracks/${track.slug}/${next.slug}`;
      continueLabel = next.title;
      continueTrack = track.title;
      break;
    }
  }
  if (!continueHref && tracks.length > 0) {
    continueHref = "/tracks";
    continueLabel = "View all tracks";
    continueTrack = "All lessons complete";
  }

  const activeToday = profile.last_active_date === todayUtc();

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">

      <div className="mb-12">
        <p className="text-sm text-muted mb-2 uppercase tracking-widest font-semibold">Dashboard</p>
        <h1 className="text-4xl font-bold">Hey, {profile.username}</h1>
        {activeToday && (
          <p className="mt-3 text-muted">
            You&apos;re active today —{" "}
            <span className="text-success font-medium">keep the streak going.</span>
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <StatCard label="Total XP" value={profile.xp.toLocaleString()} highlight />
        <StatCard label="Day streak" value={profile.streak_count > 0 ? profile.streak_count : "—"} />
        <StatCard label="Lessons done" value={completedCount} />
        <StatCard label="Leaderboard rank" value={rank ? `#${rank}` : "—"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-10">
        <div className="rounded-3xl border border-card-border bg-card p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Up next</p>
          <h2 className="text-xl font-bold mb-4">Continue learning</h2>
          {continueHref ? (
            <>
              <p className="text-xs text-accent font-medium mb-1">{continueTrack}</p>
              <p className="text-muted mb-6">{continueLabel}</p>
              <Link href={continueHref}
                className="btn-primary rounded-xl px-6 py-3 text-sm inline-block">
                Continue →
              </Link>
            </>
          ) : (
            <p className="text-muted">
              <Link href="/tracks" className="text-accent hover:underline">View tracks</Link>
            </p>
          )}
        </div>

        <div className="rounded-3xl border border-card-border bg-card p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Status</p>
              <h2 className="text-xl font-bold">Today</h2>
            </div>
            {activeToday && (
              <span className="rounded-full bg-success/15 border border-success/25 px-4 py-1.5 text-xs font-semibold text-success">
                Active
              </span>
            )}
          </div>
          <p className="text-muted leading-relaxed">
            {activeToday
              ? "You've shown up today. Complete a lesson to earn XP and grow your streak."
              : "Complete a lesson today to stay active and protect your streak."}
          </p>
          {profile.streak_count > 0 && (
            <div className="mt-6 rounded-2xl bg-background border border-card-border px-5 py-4">
              <p className="text-xs text-muted uppercase tracking-wide mb-1">Current streak</p>
              <p className="text-3xl font-bold">{profile.streak_count} days</p>
            </div>
          )}
        </div>
      </div>

      {tracks.length > 0 && (
        <div className="rounded-3xl border border-card-border bg-card p-8 mb-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Learning</p>
              <h2 className="text-xl font-bold">Your tracks</h2>
            </div>
            <Link href="/tracks" className="text-sm text-accent hover:underline font-medium">View all →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tracks.map((track) => (
              <Link key={track.id} href={`/tracks/${track.slug}`}
                className="rounded-2xl border border-card-border bg-background p-5 hover:border-accent/30 transition-colors group">
                <h3 className="font-semibold mb-1">{track.title}</h3>
                <p className="text-xs text-muted group-hover:text-accent transition-colors">View lessons →</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-card-border bg-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">Rankings</p>
            <h2 className="text-xl font-bold">Top learners</h2>
          </div>
          <Link href="/leaderboard" className="text-sm text-accent hover:underline font-medium">View all →</Link>
        </div>
        <ul className="space-y-1">
          {leaderboard.map((u, i) => (
            <li key={u.id}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 hover:bg-background transition-colors">
              <span className="flex items-center gap-4">
                <span className="text-sm text-muted w-6 text-right tabular-nums">#{i + 1}</span>
                <Link href={`/users/${u.username}`} className="font-medium hover:text-accent transition-colors">
                  @{u.username}
                </Link>
              </span>
              <span className="text-sm tabular-nums text-muted">{u.xp.toLocaleString()} XP</span>
            </li>
          ))}
          {leaderboard.length === 0 && (
            <li className="text-muted text-sm py-4 text-center">No learners yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
