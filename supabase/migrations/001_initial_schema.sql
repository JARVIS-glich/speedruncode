-- Speed Run Code — initial schema
-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)

-- profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  learning_goals text,
  onboarding_completed boolean NOT NULL DEFAULT false,
  xp int NOT NULL DEFAULT 0,
  streak_count int NOT NULL DEFAULT 0,
  last_active_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- tracks
CREATE TABLE IF NOT EXISTS public.tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- lessons
CREATE TABLE IF NOT EXISTS public.lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
  slug text NOT NULL,
  title text NOT NULL,
  description text,
  youtube_video_id text NOT NULL,
  challenge_prompt text NOT NULL,
  xp_value int NOT NULL DEFAULT 10,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (track_id, slug)
);

-- lesson_completions
CREATE TABLE IF NOT EXISTS public.lesson_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);

-- stuck_posts (community — built in later phase)
CREATE TABLE IF NOT EXISTS public.stuck_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  track_id uuid REFERENCES public.tracks(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  resolved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- stuck_replies
CREATE TABLE IF NOT EXISTS public.stuck_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.stuck_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- indexes
CREATE INDEX IF NOT EXISTS idx_lessons_track_id ON public.lessons(track_id);
CREATE INDEX IF NOT EXISTS idx_completions_user_id ON public.lesson_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_stuck_posts_created_at ON public.stuck_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stuck_replies_post_id ON public.stuck_replies(post_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON public.profiles(xp DESC);

-- auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stuck_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stuck_replies ENABLE ROW LEVEL SECURITY;

-- profiles policies
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- tracks & lessons (public read)
CREATE POLICY "Tracks are viewable by everyone"
  ON public.tracks FOR SELECT USING (true);

CREATE POLICY "Lessons are viewable by everyone"
  ON public.lessons FOR SELECT USING (true);

-- lesson_completions
CREATE POLICY "Users can view own completions"
  ON public.lesson_completions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions"
  ON public.lesson_completions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- stuck_posts
CREATE POLICY "Stuck posts are viewable by everyone"
  ON public.stuck_posts FOR SELECT USING (true);

CREATE POLICY "Users can insert own stuck posts"
  ON public.stuck_posts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stuck posts"
  ON public.stuck_posts FOR UPDATE USING (auth.uid() = user_id);

-- stuck_replies
CREATE POLICY "Stuck replies are viewable by everyone"
  ON public.stuck_replies FOR SELECT USING (true);

CREATE POLICY "Users can insert own stuck replies"
  ON public.stuck_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
