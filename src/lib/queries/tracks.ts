import { createClient } from "@/lib/supabase/server";
import type { Track } from "@/types/database";

export async function getTracks(): Promise<Track[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tracks")
    .select("*")
    .order("sort_order", { ascending: true });

  return data ?? [];
}
