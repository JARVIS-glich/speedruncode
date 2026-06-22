export type Profile = {
  id: string;
  username: string | null;
  learning_goals: string | null;
  onboarding_completed: boolean;
  xp: number;
  streak_count: number;
  last_active_date: string | null;
  created_at: string;
};

export type Track = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  sort_order: number;
  created_at: string;
};

export type Lesson = {
  id: string;
  track_id: string;
  slug: string;
  title: string;
  description: string | null;
  youtube_video_id: string;
  challenge_prompt: string;
  xp_value: number;
  sort_order: number;
  level: number;
  summary: string | null;
  created_at: string;
};

export type LessonWithCompletion = Lesson & {
  completed: boolean;
};

export type QuizQuestion = {
  id: string;
  lesson_id: string;
  sort_order: number;
  question: string;
  options: string[];
  answer: number;
};

export type LeaderboardEntry = Pick<
  Profile,
  "id" | "username" | "xp" | "streak_count" | "last_active_date"
>;
