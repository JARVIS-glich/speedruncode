"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/actions/auth";
import { ThemeToggle } from "./ThemeToggle";

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
        background: "rgba(13,2,8,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,255,65,0.2)",
        boxShadow: "0 2px 30px rgba(0,255,65,0.08)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-base tracking-widest group uppercase">
          <span className="text-xl text-accent group-hover:animate-float inline-block transition-transform neon-text">⚡</span>
          <span className="text-accent neon-text tracking-widest">SPEED_RUN_CODE</span>
        </Link>

        <nav className="flex items-center gap-5 text-xs font-bold uppercase tracking-widest">
          <Link href="/tracks" className="text-muted hover:text-accent hover:shadow-[0_0_8px_var(--accent)] transition-all duration-200">
            [TRACKS]
          </Link>
          <Link href="/leaderboard" className="text-muted hover:text-accent hover:shadow-[0_0_8px_var(--accent)] transition-all duration-200">
            [RANKINGS]
          </Link>

          {isLoading ? (
            <div className="h-4 w-24 rounded bg-card-border animate-pulse" />
          ) : username ? (
            <>
              <Link href="/dashboard" className="text-muted hover:text-accent hover:shadow-[0_0_8px_var(--accent)] transition-all duration-200">
                [DASHBOARD]
              </Link>
              <Link href={`/users/${username}`} className="text-accent neon-text">
                &gt;{username}
              </Link>
              <form action={signOut}>
                <button type="submit" className="text-muted hover:text-red-400 transition-all duration-200">
                  [EXIT]
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="btn-primary rounded-lg px-4 py-2 text-xs inline-block">
              ENTER_SYSTEM
            </Link>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
