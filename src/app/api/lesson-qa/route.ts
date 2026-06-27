import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter: max 5 questions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_HOUR = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= MAX_PER_HOUR) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const { question, lessonTitle, lessonSummary } = await req.json();

  if (!question?.trim()) {
    return NextResponse.json({ error: "No question provided." }, { status: 400 });
  }

  // Rate limit by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { answer: "You've reached the Q&A limit for this hour. Come back later!" },
      { status: 200 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { answer: "Q&A is not configured yet." },
      { status: 200 }
    );
  }

  // Keep prompt short to minimise token usage
  const prompt = `Tutor for "${lessonTitle}". Context: ${(lessonSummary ?? "").slice(0, 300)}

Q: ${question}

Answer in 2 sentences max. Be direct. No filler.`;

  try {
    // Use gemini-1.5-flash-8b — cheapest model, still great for short Q&A
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 80,
            temperature: 0.4,
          },
        }),
      }
    );

    if (!res.ok) {
      if (res.status === 429) {
        return NextResponse.json(
          { answer: "Q&A is temporarily unavailable. Try again soon." },
          { status: 200 }
        );
      }
      return NextResponse.json({ answer: "Could not get an answer right now." }, { status: 200 });
    }

    const data = await res.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No answer returned.";
    return NextResponse.json({ answer: answer.trim() });
  } catch {
    return NextResponse.json({ answer: "Failed to reach AI service." }, { status: 200 });
  }
}
