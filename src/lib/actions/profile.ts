"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type OnboardingState = {
  step: number;
  username: string;
  learningGoals: string;
  recommendedTrackSlugs: string[];
};

export async function completeOnboarding(formData: FormData) {
  const username = (formData.get("username") as string)?.trim().toLowerCase();
  const learningGoals = (formData.get("learning_goals") as string)?.trim();

  if (!username || username.length < 3) {
    return { error: "Username must be at least 3 characters." };
  }

  if (!/^[a-z0-9_]+$/.test(username)) {
    return {
      error: "Username can only contain lowercase letters, numbers, and underscores.",
    };
  }

  if (!learningGoals || learningGoals.length < 10) {
    return { error: "Tell us a bit more about what you're trying to learn." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", user.id)
    .maybeSingle();

  if (existing) {
    return { error: "That username is already taken." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      learning_goals: learningGoals,
      onboarding_completed: true,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/profile");
  redirect("/dashboard");
}
