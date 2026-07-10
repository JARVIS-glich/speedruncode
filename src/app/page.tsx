import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CodeBackground } from "@/components/effects/CodeBackground";

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
      
      {/* Animated code background */}
      <CodeBackground />

      {/* Gliding white lines background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="gliding-line glide-h-1" />
        <div className="gliding-line glide-h-2" />
        <div className="gliding-line glide-v-1" />
        <div className="gliding-line glide-v-2" />
        <div className="gliding-line glide-d-1" />
        <div className="gliding-line glide-d-2" />
      </div>

      {/* Hero - Centered */}
      <section className="relative px-6 py-32 min-h-[85vh] flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal mb-8 leading-[1.05] tracking-tight animate-fade-up">
            Learn AI development.
            <br />
            Ship real products.
          </h1>

          <p className="text-xl md:text-2xl text-muted font-light mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-up delay-100">
            Master AI-powered development with hands-on lessons. From first prompt to shipped product.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-up delay-200">
            {user ? (
              <Link href="/dashboard" 
                className="bg-foreground text-background px-10 py-4 rounded-full font-medium text-lg hover:opacity-90 transition-all hover:scale-105">
                Continue learning
              </Link>
            ) : (
              <Link href="/login" 
                className="bg-foreground text-background px-10 py-4 rounded-full font-medium text-lg hover:opacity-90 transition-all hover:scale-105">
                Start free
              </Link>
            )}
            <Link href="/tracks" 
              className="border-2 border-card-border px-10 py-4 rounded-full font-medium text-lg hover:border-foreground transition-all">
              Browse tracks
            </Link>
          </div>

          <div className="flex gap-16 justify-center animate-fade-up delay-300">
            <div>
              <p className="text-5xl font-light mb-2">44</p>
              <p className="text-sm text-muted uppercase tracking-wider font-light">Lessons</p>
            </div>
            <div>
              <p className="text-5xl font-light mb-2">7</p>
              <p className="text-sm text-muted uppercase tracking-wider font-light">Tracks</p>
            </div>
            <div>
              <p className="text-5xl font-light mb-2">Free</p>
              <p className="text-sm text-muted uppercase tracking-wider font-light">Forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks - Centered */}
      <section className="relative px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal mb-4">Tracks</h2>
            <p className="text-xl text-muted font-light">Choose your path to mastery</p>
          </div>

          <div className="space-y-4">
            {TRACKS.map((track, i) => (
              <Link
                key={track.slug}
                href={`/tracks/${track.slug}`}
                className="group block p-8 rounded-2xl border border-card-border hover:border-foreground bg-card/50 hover:bg-card transition-all hover-lift animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="text-center">
                  <h3 className="font-medium text-2xl mb-3">
                    {track.title}
                  </h3>
                  <p className="text-muted text-lg font-light">
                    {track.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Centered */}
      <section className="relative px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal mb-4">How it works</h2>
            <p className="text-xl text-muted font-light">Four simple steps</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { n: "1", title: "Watch", desc: "Concise video lessons under 15 minutes. Learn the essentials, skip the fluff." },
              { n: "2", title: "Read", desc: "Written notes reinforce every concept. Review anytime, anywhere." },
              { n: "3", title: "Quiz", desc: "Test your understanding. Score 60%+ to prove you're ready." },
              { n: "4", title: "Build", desc: "Complete real challenges. Earn XP and build your portfolio." },
            ].map((step, i) => (
              <div key={step.n} 
                className="p-10 rounded-2xl border border-card-border bg-card/50 hover:bg-card transition-all hover-lift animate-fade-up text-center"
                style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 mx-auto rounded-full bg-foreground text-background flex items-center justify-center font-light text-2xl mb-6">
                  {step.n}
                </div>
                <h3 className="font-medium text-2xl mb-4">{step.title}</h3>
                <p className="text-muted text-lg leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof - Centered */}
      <section className="relative px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-normal mb-4">Trusted by builders</h2>
            <p className="text-xl text-muted font-light">Join thousands learning to ship faster</p>
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-card-border flex items-center justify-center font-light text-xl">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-lg">{r.name}</p>
                    <p className="text-muted font-light">{r.role}</p>
                  </div>
                </div>
                <p className="text-muted text-lg leading-relaxed font-light">
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Centered */}
      <section className="relative px-6 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-normal mb-8 leading-tight">
            Start learning today.
          </h2>
          <p className="text-2xl text-muted font-light mb-12">
            Free forever. No credit card. Start in 30 seconds.
          </p>
          {user ? (
            <Link href="/dashboard" 
              className="bg-foreground text-background px-12 py-5 rounded-full font-medium text-xl hover:opacity-90 transition-all hover:scale-105 inline-block">
              Go to dashboard
            </Link>
          ) : (
            <Link href="/login" 
              className="bg-foreground text-background px-12 py-5 rounded-full font-medium text-xl hover:opacity-90 transition-all hover:scale-105 inline-block">
              Create account
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}
