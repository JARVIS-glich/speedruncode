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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => loadUser());
    return () => subscription.unsubscribe();
  }, []);

  const isLoading = username === undefined;

  return (
    <header
      className="sticky top-0 z-50 px-6"
      style={{
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,255,65,0.15)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between">

        <Link href="/" className="font-bold text-sm tracking-widest uppercase neon-text hover:neon-glow transition-all">
          ⚡ SPEED_RUN_CODE
        </Link>

        <nav className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
          <Link href="/tracks" className="transition-all" style={{ color: "var(--muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
            TRACKS
          </Link>
          <Link href="/leaderboard" className="transition-all" style={{ color: "var(--muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
            RANKINGS
          </Link>

          {isLoading ? (
            <div className="h-3 w-20 rounded animate-pulse" style={{ background: "var(--card-border)" }} />
          ) : username ? (
            <>
              <Link href="/dashboard" className="transition-all" style={{ color: "var(--muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
                DASHBOARD
              </Link>
              <span className="neon-text">&gt;{username}</span>
              <form action={signOut}>
                <button type="submit" className="transition-all text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#ff4444")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
                  EXIT
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="btn-matrix rounded px-4 py-1.5 text-xs inline-block">
              ENTER
            </Link>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
