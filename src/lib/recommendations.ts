import type { Track } from "@/types/database";

// Maps goal IDs to track slugs they strongly match
const GOAL_TRACK_MAP: Record<string, string[]> = {
  "ai-tools":   ["ai-fundamentals", "cursor-mastery"],
  "no-code":    ["no-code-builders", "ship-with-ai"],
  "ship-fast":  ["ship-with-ai", "ai-fundamentals", "cursor-mastery"],
  "automate":   ["automation"],
  "ai-agents":  ["ai-agents-money", "automation"],
  "backend":    ["backend-database"],
};

// Beginner gets foundational tracks first
const BEGINNER_PRIORITY = ["ai-fundamentals", "no-code-builders", "ship-with-ai"];

export function recommendTracksFromAnswers(
  tracks: Track[],
  skillLevel: string | null,
  goals: string[]
): Track[] {
  if (!tracks.length) return [];

  // Build a score map
  const scores: Record<string, number> = {};
  tracks.forEach((t) => (scores[t.slug] = 0));

  // Score based on goals
  goals.forEach((goal) => {
    const matched = GOAL_TRACK_MAP[goal] ?? [];
    matched.forEach((slug) => {
      if (scores[slug] !== undefined) scores[slug] += 10;
    });
  });

  // Beginners get a boost on foundational tracks
  if (skillLevel === "beginner") {
    BEGINNER_PRIORITY.forEach((slug, i) => {
      if (scores[slug] !== undefined) scores[slug] += 5 - i;
    });
  }

  return tracks
    .slice()
    .sort((a, b) => {
      const diff = (scores[b.slug] ?? 0) - (scores[a.slug] ?? 0);
      return diff !== 0 ? diff : a.sort_order - b.sort_order;
    })
    .slice(0, 3);
}

// Legacy helper kept for any existing callers
export function recommendTracks(
  tracks: Track[],
  learningGoals: string
): Track[] {
  if (!learningGoals.trim()) return tracks.slice(0, 3);

  const keywords = learningGoals.toLowerCase().split(/\W+/).filter(Boolean);
  const scored = tracks.map((track) => {
    const haystack = `${track.title} ${track.description ?? ""}`.toLowerCase();
    const score = keywords.reduce(
      (acc, kw) => acc + (haystack.includes(kw) ? 1 : 0),
      0
    );
    return { track, score };
  });

  scored.sort((a, b) => b.score - a.score || a.track.sort_order - b.track.sort_order);
  return scored.slice(0, 3).map((s) => s.track);
}
