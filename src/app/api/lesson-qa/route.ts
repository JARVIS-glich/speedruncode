import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question, lessonTitle, lessonSummary } = await req.json();

  if (!question?.trim()) {
    return NextResponse.json({ error: "No question provided." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { answer: "Q&A is not configured yet. Add GEMINI_API_KEY to .env.local." },
      { status: 200 }
    );
  }

  const prompt = `You are a concise coding tutor for the lesson "${lessonTitle}".

Lesson context:
${lessonSummary ?? ""}

Student question: ${question}

Answer in 3 sentences or fewer. Be direct and practical. No filler phrases.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 150,
            temperature: 0.5,
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      const msg = err?.error?.message ?? "Gemini request failed.";
      // Quota exhausted — show friendly message instead of raw error
      if (res.status === 429) {
        return NextResponse.json(
          { answer: "Q&A is temporarily unavailable (API quota reached). Check back soon." },
          { status: 200 }
        );
      }
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const data = await res.json();
    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No answer returned.";

    return NextResponse.json({ answer: answer.trim() });
  } catch {
    return NextResponse.json({ error: "Failed to reach AI service." }, { status: 500 });
  }
}
