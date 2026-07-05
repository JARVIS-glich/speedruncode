"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/actions/auth";

export function Navbar() {
  const [username, setUsername] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setUsername(null); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username, onboarding_completed")
        .eq("id", user.id)
        .maybeSingle();

      setUsername(profile?.onboarding_completed ? (profile.username ?? null) : null);
    }

    loadUser();

    // Keep in sync on auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  // undefined = still loading (show skeleton)
  const isLoading = username === undefined;

  return (
    <header
      className="sticky top-0 z-50 px-6"
      style={{
        background: "rgba(3,3,10,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
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

          {isLoading ? (
            /* Skeleton so nav doesn't jump */
            <div className="h-4 w-20 rounded bg-card-border animate-pulse" />
          ) : username ? (
            <>
              <Link href="/dashboard" className="text-muted hover:text-foreground transition-colors duration-200 font-medium">
                Dashboard
              </Link>
              <Link href={`/users/${username}`} className="text-muted hover:text-foreground transition-colors duration-200 font-medium">
                @{username}
              </Link>
              <form action={signOut}>
                <button type="submit" className="text-muted hover:text-foreground transition-colors duration-200 font-medium">
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
