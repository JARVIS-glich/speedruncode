import { createClient } from "@/lib/supabase/server";
import type { Lesson, LessonWithCompletion } from "@/types/database";

export async function getLessonsByTrack(trackId: string): Promise<Lesson[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lessons")
    .select("*")
    .eq("track_id", trackId)
    .order("sort_order", { ascending: true });

  return data ?? [];
}

export async function getLessonBySlug(
  trackId: string,
  lessonSlug: string
): Promise<Lesson | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lessons")
    .select("*")
    .eq("track_id", trackId)
    .eq("slug", lessonSlug)
    .maybeSingle();

  return data ?? null;
}

export async function getLessonsWithCompletion(
  trackId: string,
  userId: string | null
): Promise<LessonWithCompletion[]> {
  const supabase = await createClient();
  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("track_id", trackId)
    .order("sort_order", { ascending: true });

  if (!lessons) return [];

  if (!userId) {
    return lessons.map((l) => ({ ...l, completed: false }));
  }

  const { data: completions } = await supabase
    .from("lesson_completions")
    .select("lesson_id")
    .eq("user_id", userId)
    .in(
      "lesson_id",
      lessons.map((l) => l.id)
    );

  const completedSet = new Set((completions ?? []).map((c) => c.lesson_id));
  return lessons.map((l) => ({ ...l, completed: completedSet.has(l.id) }));
}

export async function getTrackBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tracks")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  return data ?? null;
}

export async function isLessonCompleted(
  lessonId: string,
  userId: string
): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lesson_completions")
    .select("id")
    .eq("lesson_id", lessonId)
    .eq("user_id", userId)
    .maybeSingle();

  return !!data;
}

export async function getQuizQuestions(lessonId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("lesson_quizzes")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("sort_order", { ascending: true });

  return data ?? [];
}
