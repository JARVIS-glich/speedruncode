import Link from "next/link";
import { redirect } from "next/navigation";
import { getCompletedLessonsCount, getCurrentProfile } from "@/lib/queries/profile";
import { getUserRank } from "@/lib/queries/leaderboard";
import { todayUtc } from "@/lib/streak";

export default async function ProfilePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  if (!profile.onboarding_completed) redirect("/onboarding");

  const [completedCount, rank] = await Promise.all([
    getCompletedLessonsCount(profile.id),
    getUserRank(profile.id),
  ]);

  const activeToday = profile.last_active_date === todayUtc();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your profile</h1>
          <p className="mt-1 text-muted">@{profile.username}</p>
        </div>
        {activeToday && (
          <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">
            Active today
          </span>
        )}
      </div>

      <div className="rounded-xl border border-card-border bg-card p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total XP", value: profile.xp.toLocaleString() },
            { label: "Streak", value: profile.streak_count || "—" },
            { label: "Lessons completed", value: completedCount },
            { label: "Leaderboard rank", value: rank ? `#${rank}` : "—" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xs text-muted">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>

        {profile.learning_goals && (
          <div>
            <p className="text-sm font-medium text-muted">Learning goals</p>
            <p className="mt-2">{profile.learning_goals}</p>
          </div>
        )}

        <div className="flex gap-4 pt-2">
          <Link
            href={`/users/${profile.username}`}
            className="text-sm text-accent hover:underline"
          >
            View public profile →
          </Link>
          <Link
            href="/leaderboard"
            className="text-sm text-muted hover:text-foreground"
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
