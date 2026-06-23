import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompletedLessonsCount, getProfileByUsername } from "@/lib/queries/profile";
import { getUserRank } from "@/lib/queries/leaderboard";
import { todayUtc } from "@/lib/streak";

interface UserProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { username } = await params;

  let profile = null;
  try {
    profile = await getProfileByUsername(username);
  } catch {
    notFound();
  }

  if (!profile || !profile.onboarding_completed) notFound();

  const [completedCount, rank] = await Promise.all([
    getCompletedLessonsCount(profile.id).catch(() => 0),
    getUserRank(profile.id).catch(() => null),
  ]);

  const activeToday = profile.last_active_date === todayUtc();

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <div className="rounded-3xl border border-card-border bg-card p-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs text-muted uppercase tracking-widest mb-2">Learner profile</p>
            <h1 className="text-3xl font-bold">@{profile.username}</h1>
          </div>
          {activeToday && (
            <span className="rounded-full bg-success/15 border border-success/25 px-4 py-1.5 text-xs font-semibold text-success">
              Active today
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
          {[
            { label: "XP", value: profile.xp.toLocaleString() },
            { label: "Streak", value: profile.streak_count ? `${profile.streak_count}d` : "—" },
            { label: "Lessons", value: completedCount },
            { label: "Rank", value: rank ? `#${rank}` : "—" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-background border border-card-border p-4 text-center">
              <p className="text-xs text-muted mb-1">{stat.label}</p>
              <p className="text-xl font-bold tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>

        {profile.learning_goals && (
          <div className="mb-6">
            <p className="text-xs text-muted uppercase tracking-wide mb-2">Learning goals</p>
            <p className="text-sm leading-relaxed">{profile.learning_goals}</p>
          </div>
        )}

        <p className="text-xs text-muted">
          Member since{" "}
          {new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/leaderboard" className="text-sm text-accent hover:underline">
          ← Back to leaderboard
        </Link>
      </div>
    </div>
  );
}
