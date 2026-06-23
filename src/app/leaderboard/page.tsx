import { Suspense } from "react";
import { LeaderboardSearch } from "@/components/leaderboard/LeaderboardSearch";
import { getLeaderboard, searchUsers } from "@/lib/queries/leaderboard";
import { createClient } from "@/lib/supabase/server";
import type { LeaderboardEntry } from "@/types/database";

interface LeaderboardPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function LeaderboardPage({ searchParams }: LeaderboardPageProps) {
  const { q = "" } = await searchParams;

  let topUsers: LeaderboardEntry[] = [];
  let searchResults: LeaderboardEntry[] = [];
  let userId: string | undefined;

  try {
    [topUsers, searchResults] = await Promise.all([
      getLeaderboard(50),
      q.trim() ? searchUsers(q) : Promise.resolve([]),
    ]);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id;
  } catch {
    // DB unavailable — show empty state
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">Rankings</p>
        <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted">Public XP rankings. Search any learner by username.</p>
      </div>

      <Suspense fallback={<div className="text-muted">Loading…</div>}>
        <LeaderboardSearch
          initialQuery={q}
          initialResults={searchResults}
          topUsers={topUsers}
          currentUserId={userId}
        />
      </Suspense>
    </div>
  );
}
