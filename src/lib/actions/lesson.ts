"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { todayUtc, computeNewStreak } from "@/lib/streak";

export async function completeLesson(
  lessonId: string,
  xpValue: number,
  trackSlug: string,
  lessonSlug: string
): Promise<{ success: boolean; error?: string; alreadyCompleted?: boolean }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Not authenticated." };

  // Check if already completed (idempotent)
  const { data: existing } = await supabase
    .from("lesson_completions")
    .select("id")
    .eq("lesson_id", lessonId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) return { success: true, alreadyCompleted: true };

  // Insert completion record
  const { error: insertError } = await supabase
    .from("lesson_completions")
    .insert({ lesson_id: lessonId, user_id: user.id });

  if (insertError) return { success: false, error: insertError.message };

  // Fetch current profile stats
  const { data: profile } = await supabase
    .from("profiles")
    .select("xp, streak_count, last_active_date")
    .eq("id", user.id)
    .single();

  if (profile) {
    const today = todayUtc();
    const newStreak = computeNewStreak(
      profile.streak_count,
      profile.last_active_date,
      today
    );

    await supabase
      .from("profiles")
      .update({
        xp: profile.xp + xpValue,
        streak_count: newStreak,
        last_active_date: today,
      })
      .eq("id", user.id);
  }

  revalidatePath(`/tracks/${trackSlug}`);
  revalidatePath(`/tracks/${trackSlug}/${lessonSlug}`);
  revalidatePath("/dashboard");

  return { success: true };
}
