import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    return data ?? null;
  } catch {
    return null;
  }
}

export async function getProfileByUsername(
  username: string
): Promise<Profile | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username.toLowerCase())
      .maybeSingle();

    return data ?? null;
  } catch {
    return null;
  }
}

export async function getCompletedLessonsCount(userId: string): Promise<number> {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("lesson_completions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    return count ?? 0;
  } catch {
    return 0;
  }
}
