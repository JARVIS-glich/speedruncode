"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getEmailByUsername(username: string): Promise<string | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("email")
      .eq("username", username.trim().toLowerCase())
      .maybeSingle();
    return (data as { email?: string } | null)?.email ?? null;
  } catch {
    return null;
  }
}

export async function signUpUser(
  email: string,
  username: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedEmail = email.trim().toLowerCase();

    // Check username availability server-side (bypasses RLS)
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", trimmedUsername)
      .maybeSingle();

    if (existing) {
      return { success: false, error: "That username is already taken." };
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: { data: { username: trimmedUsername } },
    });

    if (signUpError) {
      if (signUpError.message.toLowerCase().includes("already registered")) {
        return { success: false, error: "An account with that email already exists. Try signing in." };
      }
      return { success: false, error: signUpError.message };
    }

    if (data.user) {
      await supabase
        .from("profiles")
        .update({
          username: trimmedUsername,
          email: trimmedEmail,
          onboarding_completed: true,
        })
        .eq("id", data.user.id);
    }

    return { success: true };
  } catch (e) {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function recordDailyVisit() {
  // Intentionally no-op — last_active_date is owned by completeLesson
}
