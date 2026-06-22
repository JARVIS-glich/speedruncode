import type { Track } from "@/types/database";

export function recommendTracks(
  tracks: Track[],
  learningGoals: string
): Track[] {
  if (!learningGoals.trim()) return tracks.slice(0, 3);

  const keywords = learningGoals.toLowerCase().split(/\W+/).filter(Boolean);
  const scored = tracks.map((track) => {
    const haystack =
      `${track.title} ${track.description ?? ""}`.toLowerCase();
    const score = keywords.reduce(
      (acc, kw) => acc + (haystack.includes(kw) ? 1 : 0),
      0
    );
    return { track, score };
  });

  scored.sort(
    (a, b) => b.score - a.score || a.track.sort_order - b.track.sort_order
  );
  return scored.slice(0, 3).map((s) => s.track);
}
