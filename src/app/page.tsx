import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const TRACKS = [
  { slug: "ai-fundamentals",  label: "01", title: "AI_FUNDAMENTALS",   desc: "Cursor · Copilot · Prompting · Debugging"        },
  { slug: "cursor-mastery",   label: "02", title: "CURSOR_MASTERY",     desc: "Composer · Agent Mode · Context Engineering"     },
  { slug: "ship-with-ai",     label: "03", title: "SHIP_WITH_AI",       desc: "Lovable · Replit · v0 · Bolt"                    },
  { slug: "no-code-builders", label: "04", title: "NO_CODE_BUILDERS",   desc: "Bubble · Webflow · FlutterFlow · Glide"          },
  { slug: "backend-database", label: "05", title: "BACKEND_DATABASE",   desc: "Airtable · Xano · Supabase · Firebase"          },
  { slug: "automation",       label: "06", title: "AUTOMATION",          desc: "Zapier · Make · n8n"                             },
  { slug: "ai-agents-money",  label: "07", title: "AI_AGENTS_REVENUE",  desc: "Voiceflow · Lindy · Stripe · Gumloop"            },
];

const STEPS = [
  { n: "01", title: "WATCH",       desc: "Under 15 minutes. Handpicked for speed — no filler." },
  { n: "02", title: "READ_NOTES",  desc: "Written summary below every video. Reinforce the key ideas." },
  { n: "03", title: "TAKE_QUIZ",   desc: "Answer 3–5 questions. Score 60%+ to unlock the next step." },
  { n: "04", title: "DO_CHALLENGE",desc: "Build something real. XP + streak only unlock when you finish." },
];

const REVIEWS = [
  { name: "Marcus T.",  role: "Indie hacker",               text: "Finished Cursor Mastery in 3 days. Now shipping features in half the time. The debugging lesson alone was worth it." },
  { name: "Priya S.",   role: "Freelance developer",        text: "The AI Fundamentals track changed how I write prompts. I used to get garbage output. Now I get what I want first try." },
  { name: "James O.",   role: "Non-technical founder",      text: "Built my first Bubble app after the No-Code track. It has real users now. Lessons are short, challenges make it stick." },
  { name: "Sofia R.",   role: "CS student",                 text: "Kept a 21-day streak across three tracks. The XP leaderboard makes it feel like a game — but everything is real skills." },
  { name: "Arjun M.",   role: "Agency owner",               text: "Went from not knowing n8n to automating my entire client onboarding in a week. Automation track is incredibly well structured." },
  { name: "Lena K.",    role: "Designer learning to code",  text: "I've tried four other AI coding courses. This is the only one I finished. 15 min lessons + real challenge = the format that works." },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen" style={{ background: "#000" }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="px-6 pt-24 pb-20">
        <div className="mx-auto max-w-4xl">

          {/* System boot text */}
          <div className="mb-8 font-mono text-xs" style={{ color: "var(--muted)" }}>
            <p>&gt; SYSTEM: SPEED_RUN_CODE_v2.0</p>
            <p>&gt; STATUS: ONLINE</p>
            <p>&gt; ACCESS: FREE</p>
          </div>

          {/* Main headline */}
          <h1 className="mb-6 font-bold leading-none tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "var(--accent)" }}>
            <span className="neon-glow">GET UNSTUCK.</span>
            <br />
            <span style={{ color: "var(--foreground)" }}>LEVEL UP FAST.</span>
          </h1>

          <p className="mb-10 max-w-xl text-sm leading-relaxed" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            44 lessons · 7 tracks · From your first AI prompt to shipping a real product with payments.
            <br />
            No fluff. No filler. No credit card.
          </p>

          {/* Stats row */}
          <div className="mb-10 flex gap-10">
            {[{ v: "44", l: "LESSONS" }, { v: "7", l: "TRACKS" }, { v: "FREE", l: "FOREVER" }].map((s) => (
              <div key={s.l}>
                <p className="text-2xl font-bold neon-text">{s.v}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{s.l}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            {user ? (
              <Link href="/dashboard" className="btn-matrix rounded-lg px-8 py-3 text-sm inline-block">
                CONTINUE_LEARNING →
              </Link>
            ) : (
              <Link href="/login" className="btn-matrix rounded-lg px-8 py-3 text-sm inline-block">
                START_FREE →
              </Link>
            )}
            <Link href="/tracks" className="btn-matrix-ghost rounded-lg px-8 py-3 text-sm inline-block">
              BROWSE_TRACKS
            </Link>
          </div>

        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--card-border)", marginBottom: 0 }} />

      {/* ── TRACKS ───────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">

          <div className="mb-10">
            <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>&gt; LOADING CURRICULUM...</p>
            <h2 className="text-2xl font-bold neon-text tracking-widest">THE_TRACKS</h2>
          </div>

          <div className="space-y-2">
            {TRACKS.map((track) => (
              <Link
                key={track.slug}
                href={`/tracks/${track.slug}`}
                className="flex items-center gap-6 rounded-lg border p-4 transition-all hover:border-[var(--accent)] hover:bg-[var(--card)] hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] group"
                style={{ borderColor: "var(--card-border)" }}
              >
                <span className="text-xs font-bold w-6 shrink-0" style={{ color: "var(--muted)" }}>
                  {track.label}
                </span>
                <span className="font-bold text-sm tracking-wider group-hover:neon-text transition-all" style={{ color: "var(--foreground)" }}>
                  {track.title}
                </span>
                <span className="text-xs ml-auto" style={{ color: "var(--muted)" }}>
                  {track.desc}
                </span>
                <span className="text-accent text-xs ml-4 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                  [ENTER]
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--card-border)" }} />

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">

          <div className="mb-10">
            <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>&gt; PROCESS_SEQUENCE</p>
            <h2 className="text-2xl font-bold neon-text tracking-widest">HOW_IT_WORKS</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {STEPS.map((step) => (
              <div key={step.n}
                className="matrix-card rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: "var(--muted)" }}>
                    {step.n}
                  </span>
                  <div>
                    <p className="font-bold text-sm tracking-widest mb-2" style={{ color: "var(--accent)" }}>
                      {step.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--card-border)" }} />

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">

          <div className="mb-10">
            <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>&gt; USER_LOGS</p>
            <h2 className="text-2xl font-bold neon-text tracking-widest">WHAT_THEY_SAY</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="matrix-card rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "var(--card-border)", color: "var(--accent)", border: "1px solid var(--card-border)" }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "var(--foreground)" }}>{r.name}</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>{r.role}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--card-border)" }} />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>&gt; READY_TO_BEGIN?</p>
          <h2 className="text-4xl font-bold mb-6 neon-glow tracking-widest">
            START_YOUR_RUN
          </h2>
          <p className="text-sm mb-10" style={{ color: "var(--muted)" }}>
            Free. No credit card. No fluff. Just skills.
          </p>
          {user ? (
            <Link href="/dashboard" className="btn-matrix rounded-lg px-12 py-4 text-sm inline-block">
              GO_TO_DASHBOARD →
            </Link>
          ) : (
            <Link href="/login" className="btn-matrix rounded-lg px-12 py-4 text-sm inline-block">
              CREATE_ACCOUNT →
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
