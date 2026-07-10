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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => loadUser());
    return () => subscription.unsubscribe();
  }, []);

  const isLoading = username === undefined;

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-card-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          SpeedRunCode
        </Link>

        <nav className="flex items-center gap-8 text-sm">
          <Link 
            href="/tracks" 
            className="text-muted hover:text-foreground transition-colors font-medium"
          >
            Tracks
          </Link>
          <Link 
            href="/leaderboard" 
            className="text-muted hover:text-foreground transition-colors font-medium"
          >
            Leaderboard
          </Link>

          {isLoading ? (
            <div className="h-4 w-20 rounded animate-pulse bg-card-border" />
          ) : username ? (
            <>
              <Link 
                href="/dashboard" 
                className="text-muted hover:text-foreground transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/profile" 
                className="text-foreground font-semibold"
              >
                {username}
              </Link>
              <form action={signOut}>
                <button 
                  type="submit" 
                  className="text-muted hover:text-error transition-colors font-medium"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link 
              href="/login" 
              className="bg-foreground text-background px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
