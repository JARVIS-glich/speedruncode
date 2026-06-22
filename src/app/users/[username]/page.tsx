import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCompletedLessonsCount,
  getProfileByUsername,
} from "@/lib/queries/profile";
import { getUserRank } from "@/lib/queries/leaderboard";
import { todayUtc } from "@/lib/streak";

interface UserProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);

  if (!profile || !profile.onboarding_completed) {
    notFound();
  }

  const [completedCount, rank] = await Promise.all([
    getCompletedLessonsCount(profile.id),
    getUserRank(profile.id),
  ]);

  const activeToday = profile.last_active_date === todayUtc();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-xl border border-card-border bg-card p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted">Learner profile</p>
            <h1 className="mt-1 text-3xl font-bold">@{profile.username}</h1>
          </div>
          {activeToday && (
            <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">
              Active today
            </span>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "XP", value: profile.xp.toLocaleString() },
            { label: "Streak", value: profile.streak_count || "—" },
            { label: "Lessons", value: completedCount },
            { label: "Rank", value: rank ? `#${rank}` : "—" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-background p-3 text-center">
              <p className="text-xs text-muted">{stat.label}</p>
              <p className="mt-1 text-xl font-bold tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>

        {profile.learning_goals && (
          <div className="mt-6">
            <p className="text-sm font-medium text-muted">Learning goals</p>
            <p className="mt-2 text-sm">{profile.learning_goals}</p>
          </div>
        )}

        <p className="mt-6 text-xs text-muted">
          Member since{" "}
          {new Date(profile.created_at).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
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
