-- Speed Run Code — lesson quizzes
-- Run this in Supabase SQL Editor after 002_seed_content.sql

CREATE TABLE IF NOT EXISTS public.lesson_quizzes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id   uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  sort_order  int  NOT NULL DEFAULT 0,
  question    text NOT NULL,
  options     jsonb NOT NULL,   -- array of strings, e.g. ["A","B","C","D"]
  answer      int  NOT NULL,    -- 0-based index of the correct option
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quizzes_lesson_id ON public.lesson_quizzes(lesson_id);

-- RLS
ALTER TABLE public.lesson_quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quizzes are viewable by everyone"
  ON public.lesson_quizzes FOR SELECT USING (true);
