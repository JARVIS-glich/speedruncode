import { Suspense } from "react";
import { LeaderboardSearch } from "@/components/leaderboard/LeaderboardSearch";
import { getLeaderboard, searchUsers } from "@/lib/queries/leaderboard";
import { createClient } from "@/lib/supabase/server";

interface LeaderboardPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function LeaderboardPage({
  searchParams,
}: LeaderboardPageProps) {
  const { q = "" } = await searchParams;
  const [topUsers, searchResults, supabase] = await Promise.all([
    getLeaderboard(50),
    q.trim() ? searchUsers(q) : Promise.resolve([]),
    createClient(),
  ]);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="mt-1 text-muted">
          Public rankings by XP. Search any learner by username.
        </p>
      </div>

      <Suspense fallback={<div className="text-muted">Loading…</div>}>
        <LeaderboardSearch
          initialQuery={q}
          initialResults={searchResults}
          topUsers={topUsers}
          currentUserId={user?.id}
        />
      </Suspense>
    </div>
  );
}
