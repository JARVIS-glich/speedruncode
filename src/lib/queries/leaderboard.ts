import { createClient } from "@/lib/supabase/server";
import type { LeaderboardEntry } from "@/types/database";

export async function getLeaderboard(
  limit = 50
): Promise<LeaderboardEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, username, xp, streak_count, last_active_date")
    .not("username", "is", null)
    .eq("onboarding_completed", true)
    .order("xp", { ascending: false })
    .limit(limit);

  return data ?? [];
}

export async function searchUsers(
  query: string
): Promise<LeaderboardEntry[]> {
  if (!query.trim()) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, username, xp, streak_count, last_active_date")
    .not("username", "is", null)
    .eq("onboarding_completed", true)
    .ilike("username", `%${query.trim().toLowerCase()}%`)
    .order("xp", { ascending: false })
    .limit(20);

  return data ?? [];
}

export async function getUserRank(userId: string): Promise<number | null> {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", userId)
    .single();

  if (!profile) return null;

  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .not("username", "is", null)
    .eq("onboarding_completed", true)
    .gt("xp", profile.xp);

  return (count ?? 0) + 1;
}
