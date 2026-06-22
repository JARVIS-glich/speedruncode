import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let username: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username, onboarding_completed")
      .eq("id", user.id)
      .single();
    if (profile?.onboarding_completed) username = profile.username;
  }

  return (
    <header className="sticky top-0 z-50 px-6"
      style={{
        background: "rgba(3,3,10,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-base tracking-tight group">
          <span className="text-xl text-accent group-hover:animate-float inline-block transition-transform">⚡</span>
          <span className="text-foreground">Speed Run Code</span>
        </Link>

        <nav className="flex items-center gap-7 text-sm">
          <Link href="/tracks" className="text-muted hover:text-foreground transition-colors duration-200 font-medium">
            Tracks
          </Link>
          <Link href="/leaderboard" className="text-muted hover:text-foreground transition-colors duration-200 font-medium">
            Leaderboard
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-muted hover:text-foreground transition-colors duration-200 font-medium">
                Dashboard
              </Link>
              {username && (
                <Link href={`/users/${username}`}
                  className="text-muted hover:text-foreground transition-colors duration-200 font-medium">
                  @{username}
                </Link>
              )}
              <form action={signOut}>
                <button type="submit"
                  className="text-muted hover:text-foreground transition-colors duration-200 font-medium">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="btn-primary rounded-xl px-5 py-2 text-sm inline-block">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
