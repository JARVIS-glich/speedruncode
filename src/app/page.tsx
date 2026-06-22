import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const TRACKS = [
  { slug: "ai-fundamentals",  title: "AI Fundamentals",    desc: "Cursor · Copilot · Prompting · Debugging",    accent: "rgba(99,179,237,0.18)" },
  { slug: "cursor-mastery",   title: "Cursor Mastery",      desc: "Composer · Agent Mode · Context Engineering", accent: "rgba(255,98,0,0.18)" },
  { slug: "ship-with-ai",     title: "Ship with AI",        desc: "Lovable · Replit · v0 · Bolt",                accent: "rgba(167,139,250,0.18)" },
  { slug: "no-code-builders", title: "No-Code Builders",    desc: "Bubble · Webflow · FlutterFlow · Glide",      accent: "rgba(52,211,153,0.18)" },
  { slug: "backend-database", title: "Backend & Database",  desc: "Airtable · Xano · Supabase · Firebase",       accent: "rgba(56,189,248,0.18)" },
  { slug: "automation",       title: "Automation",          desc: "Zapier · Make · n8n",                         accent: "rgba(251,191,36,0.18)" },
  { slug: "ai-agents-money",  title: "AI Agents & Revenue", desc: "Voiceflow · Lindy · Stripe · Gumloop",        accent: "rgba(244,114,182,0.18)" },
];

const TICKER = [
  "+10 XP earned","7-day streak","Lesson complete","Rank #12",
  "+20 XP earned","14-day streak","Track complete","Challenge done",
  "+15 XP earned","Rank #5","30-day streak","Level unlocked",
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 flex flex-col items-center text-center overflow-hidden px-6">

        {/* Background: deep purple-tinted glow, no circles */}
        <div className="glow-blob"
          style={{
            width: "80vw", height: "60vh",
            top: "0%", left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse, rgba(255,98,0,0.22) 0%, rgba(120,40,200,0.08) 45%, transparent 70%)",
          }} />
        <div className="glow-blob"
          style={{
            width: "40vw", height: "40vh",
            bottom: "10%", right: "-5%",
            background: "radial-gradient(ellipse, rgba(100,60,255,0.12) 0%, transparent 65%)",
            animationDelay: "4s",
          }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="animate-fade-up mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(255,98,0,0.7)" }}>
            Speed Run Code
          </p>

          <h1 className="animate-fade-up delay-100 font-bold tracking-[-0.03em] mb-5"
            style={{ fontSize: "clamp(3.2rem, 9vw, 7.5rem)", lineHeight: 0.95 }}>
            Get unstuck.
            <br />
            <span className="shimmer-text">Level up fast.</span>
          </h1>

          <p className="animate-fade-up delay-200 mb-8 max-w-lg mx-auto"
            style={{ color: "var(--muted)", fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.75 }}>
            44 lessons across 7 tracks — from your first AI prompt to shipping a real product with payments.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
            {user ? (
              <Link href="/dashboard" className="btn-primary rounded-full px-10 py-3.5 text-sm inline-block">
                Continue learning →
              </Link>
            ) : (
              <Link href="/login" className="btn-primary animate-pulse-glow rounded-full px-10 py-3.5 text-sm inline-block">
                Start for free →
              </Link>
            )}
            <Link href="/tracks" className="btn-ghost rounded-full px-10 py-3.5 text-sm inline-block">
              Browse tracks
            </Link>
          </div>

          <div className="animate-fade-up delay-500 flex items-center justify-center gap-12 sm:gap-20">
            {[
              { v: "44", l: "Lessons" },
              { v: "7",  l: "Tracks"  },
              { v: "100%", l: "Free"  },
            ].map((s, i) => (
              <div key={s.l} className="text-center">
                <p className="font-bold gradient-text tabular-nums"
                  style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", animationDelay: `${0.6+i*0.1}s` }}>
                  {s.v}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] mt-1" style={{ color: "var(--muted)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────── */}
      <div className="py-4 overflow-hidden" style={{ background: "rgba(255,98,0,0.04)" }}>
        <div className="flex animate-scroll-left whitespace-nowrap select-none" style={{ width: "max-content" }}>
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="text-xs font-semibold uppercase tracking-[0.22em] px-10"
              style={{ color: "rgba(240,240,245,0.25)" }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── TRACKS ───────────────────────────────────────────── */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="glow-blob"
          style={{
            width: "50vw", height: "50vh",
            top: "20%", right: "-10%",
            background: "radial-gradient(ellipse, rgba(100,60,255,0.07) 0%, transparent 65%)",
          }} />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className="section-label mb-6">The curriculum</p>
            <h2 className="font-bold tracking-[-0.025em] leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Everything you need.<br />
              <span className="shimmer-text">Beginner to mastery.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {TRACKS.map((track, i) => (
              <Link key={track.slug} href="/tracks"
                className="animate-fade-up card-luxury rounded-2xl p-6 group flex flex-col gap-10"
                style={{ animationDelay: `${i*0.06}s` }}>
                {/* Top accent dot */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: track.accent }}>
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1.5 group-hover:text-accent transition-colors duration-300">
                    {track.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{track.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE METHOD ───────────────────────────────────────── */}
      <section className="relative px-6 py-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,98,0,0.03) 50%, transparent 100%)" }}>
        <div className="glow-blob"
          style={{
            width: "45vw", height: "45vh",
            bottom: "0%", left: "-5%",
            background: "radial-gradient(ellipse, rgba(255,98,0,0.07) 0%, transparent 65%)",
          }} />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — heading */}
            <div className="lg:sticky lg:top-24">
              <p className="section-label mb-8">The method</p>
              <h2 className="font-bold tracking-[-0.025em] leading-[0.95] mb-8"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}>
                Short video.<br />
                Real challenge.<br />
                <span className="shimmer-text">Keep the streak.</span>
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.9 }}>
                Every lesson pairs a handpicked video with something you actually build.
                Complete it, earn XP, protect your streak. Miss a day and it resets —
                same mechanic that makes Duolingo dangerous.
              </p>
            </div>

            {/* Right — steps */}
            <div className="space-y-4">
              {[
                { n: "01", h: "Watch", d: "Under 15 minutes. Handpicked for speed and clarity — no fluff." },
                { n: "02", h: "Read the notes", d: "Written summary below every video. Catch what the video missed." },
                { n: "03", h: "Do the challenge", d: "Build something real. Not multiple choice — actual output required." },
                { n: "04", h: "Earn XP & streak", d: "Complete it. Stack XP. Come back tomorrow or the streak resets." },
              ].map((step, i) => (
                <div key={step.n}
                  className={`animate-fade-up delay-${(i+1)*100} card-luxury rounded-2xl px-7 py-6 flex items-start gap-6`}>
                  <span className="text-xs font-bold pt-0.5 shrink-0" style={{ color: "rgba(255,98,0,0.5)" }}>
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-bold mb-1.5">{step.h}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative px-6 py-32 text-center overflow-hidden">
        <div className="glow-blob"
          style={{
            width: "70vw", height: "70vh",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(ellipse, rgba(255,98,0,0.18) 0%, rgba(120,40,200,0.06) 40%, transparent 65%)",
          }} />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="section-label justify-center mb-10">Ready?</p>
          <h2 className="animate-fade-up font-bold tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.93 }}>
            Start your<br />
            <span className="shimmer-text">speed run.</span>
          </h2>
          <p className="animate-fade-up delay-100 mb-14"
            style={{ color: "var(--muted)", fontSize: "1.1rem", fontWeight: 300, letterSpacing: "0.02em" }}>
            Free. No credit card. No fluff.
          </p>
          <div className="animate-fade-up delay-200">
            {user ? (
              <Link href="/dashboard" className="btn-primary rounded-full px-16 py-5 text-base inline-block">
                Go to dashboard →
              </Link>
            ) : (
              <Link href="/login" className="btn-primary animate-pulse-glow rounded-full px-16 py-5 text-base inline-block">
                Create free account →
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
