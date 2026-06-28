"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitFeedback(
  message: string
): Promise<{ success: boolean; error?: string }> {
  if (!message.trim()) return { success: false, error: "Message is empty." };

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Not logged in." };

    const { error } = await supabase
      .from("feedback")
      .insert({ user_id: user.id, message: message.trim() });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong." };
  }
}
