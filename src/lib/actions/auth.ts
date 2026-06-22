"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

/**
 * Resolve a username to its email address.
 * Runs server-side so RLS policies don't block it.
 */
export async function getEmailByUsername(
  username: string
): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("email")
    .eq("username", username.trim().toLowerCase())
    .maybeSingle();

  return (data as { email?: string } | null)?.email ?? null;
}

export async function recordDailyVisit() {
  // Intentionally no-op — last_active_date is owned by completeLesson
}
