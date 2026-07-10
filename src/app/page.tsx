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

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative min-h-screen">
      
      {/* Dot grid background */}
      <div className="fixed inset-0 -z-10 dot-grid" />

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight animate-fade-up">
            Learn AI development.
            <br />
            Ship real products.
          </h1>

          <p className="text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up delay-100">
            Master AI-powered development with hands-on lessons. From first prompt to shipped product in weeks, not months.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-up delay-200">
            {user ? (
              <Link href="/dashboard" 
                className="bg-foreground text-background px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all hover:scale-105">
                Continue learning
              </Link>
            ) : (
              <Link href="/login" 
                className="bg-foreground text-background px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all hover:scale-105">
                Start free
              </Link>
            )}
            <Link href="/tracks" 
              className="border-2 border-card-border px-8 py-4 rounded-full font-semibold text-lg hover:border-foreground transition-all">
              Browse tracks
            </Link>
          </div>

          <div className="flex gap-12 justify-center mt-16 text-center animate-fade-up delay-300">
            <div>
              <p className="text-5xl font-bold mb-2">44</p>
              <p className="text-sm text-muted">Lessons</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">7</p>
              <p className="text-sm text-muted">Tracks</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">Free</p>
              <p className="text-sm text-muted">Forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Tracks</h2>
            <p className="text-xl text-muted">From fundamentals to monetization</p>
          </div>

          <div className="space-y-3">
            {TRACKS.map((track, i) => (
              <Link
                key={track.slug}
                href={`/tracks/${track.slug}`}
                className="group block p-6 rounded-2xl border border-card-border hover:border-foreground bg-background transition-all hover-lift animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-foreground transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-muted">
                      {track.desc}
                    </p>
                  </div>
                  <svg className="w-6 h-6 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-6 py-32 dot-grid-dense">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-muted">Four steps to mastery</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { n: "1", title: "Watch", desc: "Concise video lessons under 15 minutes. Learn the essentials, skip the fluff." },
              { n: "2", title: "Read", desc: "Written notes reinforce every concept. Review anytime, anywhere." },
              { n: "3", title: "Quiz", desc: "Test your understanding. Score 60%+ to prove you're ready." },
              { n: "4", title: "Build", desc: "Complete real challenges. Earn XP and build your portfolio." },
            ].map((step, i) => (
              <div key={step.n} 
                className="p-8 rounded-2xl border border-card-border bg-card/50 hover:bg-card transition-all hover-lift animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xl shrink-0">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-3">{step.title}</h3>
                    <p className="text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Trusted by builders</h2>
            <p className="text-xl text-muted">Join thousands learning to ship faster</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Marcus T.", role: "Indie hacker", text: "Finished Cursor Mastery in 3 days. Now shipping features in half the time." },
              { name: "Priya S.", role: "Freelance developer", text: "The AI Fundamentals track changed how I write prompts. First-try results now." },
              { name: "James O.", role: "Non-technical founder", text: "Built my first real app after the No-Code track. It has users." },
              { name: "Sofia R.", role: "CS student", text: "21-day streak across three tracks. The gamification makes learning addictive." },
            ].map((r, i) => (
              <div key={r.name} 
                className="p-8 rounded-2xl border border-card-border bg-card/30 hover:bg-card transition-all hover-lift animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-card-border flex items-center justify-center font-bold text-lg">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-muted">{r.role}</p>
                  </div>
                </div>
                <p className="text-muted leading-relaxed">
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-6 py-32 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Start learning today.
          </h2>
          <p className="text-xl text-muted mb-10">
            Free forever. No credit card. Start in 30 seconds.
          </p>
          {user ? (
            <Link href="/dashboard" 
              className="bg-foreground text-background px-10 py-5 rounded-full font-semibold text-xl hover:opacity-90 transition-all hover:scale-105 inline-block">
              Go to dashboard
            </Link>
          ) : (
            <Link href="/login" 
              className="bg-foreground text-background px-10 py-5 rounded-full font-semibold text-xl hover:opacity-90 transition-all hover:scale-105 inline-block">
              Create account
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
