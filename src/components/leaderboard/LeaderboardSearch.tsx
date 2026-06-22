"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { LeaderboardEntry } from "@/types/database";

interface LeaderboardSearchProps {
  initialQuery: string;
  initialResults: LeaderboardEntry[];
  topUsers: LeaderboardEntry[];
  currentUserId?: string;
}

export function LeaderboardSearch({
  initialQuery,
  initialResults,
  topUsers,
  currentUserId,
}: LeaderboardSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }
      router.replace(`/leaderboard?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, router, searchParams]);

  const displayList = initialQuery.trim() ? initialResults : topUsers;

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="search" className="sr-only">
          Search users
        </label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by username…"
          className="w-full rounded-lg border border-card-border bg-card px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-card-border">
        <table className="w-full text-sm">
          <thead className="border-b border-card-border bg-card text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Rank</th>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium text-right">XP</th>
              <th className="px-4 py-3 font-medium text-right">Streak</th>
            </tr>
          </thead>
          <tbody>
            {displayList.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  {initialQuery.trim()
                    ? "No users found."
                    : "No learners on the board yet. Be the first!"}
                </td>
              </tr>
            ) : (
              displayList.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-card-border last:border-0 ${
                    user.id === currentUserId ? "bg-accent/5" : ""
                  }`}
                >
                  <td className="px-4 py-3 tabular-nums text-muted">
                    {initialQuery.trim() ? "—" : index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`/users/${user.username}`}
                      className="font-medium hover:text-accent transition-colors"
                    >
                      @{user.username}
                      {user.id === currentUserId && (
                        <span className="ml-2 text-xs text-accent">(you)</span>
                      )}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium">
                    {user.xp.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {user.streak_count > 0 ? `🔥 ${user.streak_count}` : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
