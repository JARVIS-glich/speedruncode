import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const TRACKS = [
  { slug: "ai-fundamentals",  title: "AI Fundamentals",   desc: "Master Cursor, Copilot, prompting, and AI-powered debugging" },
  { slug: "cursor-mastery",   title: "Cursor Mastery",     desc: "Deep dive into Composer, Agent Mode, and context engineering" },
  { slug: "ship-with-ai",     title: "Ship with AI",       desc: "Build complete apps with Lovable, Replit, v0, and Bolt" },
  { slug: "no-code-builders", title: "No-Code Builders",   desc: "Create powerful apps with Bubble, Webflow, FlutterFlow, and Glide" },
  { slug: "backend-database", title: "Backend & Database", desc: "Set up backends with Airtable, Xano, Supabase, and Firebase" },
  { slug: "automation",       title: "Automation",         desc: "Automate workflows with Zapier, Make, and n8n" },
  { slug: "ai-agents-money",  title: "AI Agents & Revenue", desc: "Build and monetize AI agents with Voiceflow, Lindy, and Stripe" },
];

const STEPS = [
  { n: "1", title: "Watch", desc: "Concise video lessons under 15 minutes. No filler, just what you need to know." },
  { n: "2", title: "Read", desc: "Written notes below each video reinforce the key concepts." },
  { n: "3", title: "Quiz", desc: "Answer 3-5 questions. Score 60%+ to unlock the challenge." },
  { n: "4", title: "Build", desc: "Complete a real challenge. Earn XP and maintain your streak." },
];

const REVIEWS = [
  { name: "Marcus T.",  role: "Indie hacker",          text: "Finished Cursor Mastery in 3 days. Now shipping features in half the time. The debugging lesson alone was worth it." },
  { name: "Priya S.",   role: "Freelance developer",   text: "The AI Fundamentals track changed how I write prompts. I used to get garbage output. Now I get what I want first try." },
  { name: "James O.",   role: "Non-technical founder", text: "Built my first Bubble app after the No-Code track. It has real users now. Lessons are short, challenges make it stick." },
  { name: "Sofia R.",   role: "CS student",            text: "Kept a 21-day streak across three tracks. The XP leaderboard makes it feel like a game — but everything is real skills." },
  { name: "Arjun M.",   role: "Agency owner",          text: "Went from not knowing n8n to automating my entire client onboarding in a week. Automation track is incredibly well structured." },
  { name: "Lena K.",    role: "Designer learning to code", text: "I've tried four other AI coding courses. This is the only one I finished. 15 min lessons + real challenge = the format that works." },
];

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Animated background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-up">
            Master AI-powered
            <br />
            <span className="text-muted">development in days</span>
          </h1>

          <p className="text-lg text-muted mb-8 max-w-2xl leading-relaxed animate-fade-up delay-100">
            44 hands-on lessons across 7 tracks. From your first AI prompt to shipping real products with payments.
          </p>

          <div className="flex gap-6 mb-12 animate-fade-up delay-200">
            <div>
              <p className="text-3xl font-bold">44</p>
              <p className="text-sm text-muted">Lessons</p>
            </div>
            <div>
              <p className="text-3xl font-bold">7</p>
              <p className="text-sm text-muted">Tracks</p>
            </div>
            <div>
              <p className="text-3xl font-bold">Free</p>
              <p className="text-sm text-muted">Forever</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
            {user ? (
              <Link href="/dashboard" 
                className="bg-foreground text-background px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Continue learning →
              </Link>
            ) : (
              <Link href="/login" 
                className="bg-foreground text-background px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Start for free →
              </Link>
            )}
            <Link href="/tracks" 
              className="border border-card-border px-8 py-3 rounded-lg font-semibold hover:border-foreground transition-colors">
              Browse tracks
            </Link>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="px-6 py-16 bg-card/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">All tracks</h2>

          <div className="grid gap-4">
            {TRACKS.map((track, i) => (
              <Link
                key={track.slug}
                href={`/tracks/${track.slug}`}
                className="group p-5 rounded-lg border border-card-border hover:border-foreground bg-card/50 transition-all hover:bg-card animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <h3 className="font-bold text-lg mb-2 group-hover:text-foreground transition-colors">
                  {track.title}
                </h3>
                <p className="text-muted text-sm">
                  {track.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">How it works</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.n} 
                className="p-6 rounded-lg border border-card-border bg-card/30 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm shrink-0">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="px-6 py-16 bg-card/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">What people are saying</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={r.name} 
                className="p-6 rounded-lg border border-card-border bg-card/50 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-card-border flex items-center justify-center font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{r.name}</p>
                    <p className="text-xs text-muted">{r.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
            Ready to start?
          </h2>
          <p className="text-lg text-muted mb-8 animate-fade-up delay-100">
            Free forever. No credit card required. Start learning in 30 seconds.
          </p>
          {user ? (
            <Link href="/dashboard" 
              className="bg-foreground text-background px-10 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity inline-block animate-fade-up delay-200">
              Go to dashboard →
            </Link>
          ) : (
            <Link href="/login" 
              className="bg-foreground text-background px-10 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity inline-block animate-fade-up delay-200">
              Create account →
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
