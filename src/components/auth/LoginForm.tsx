"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getEmailByUsername } from "@/lib/actions/auth";

type Mode = "signin" | "signup";

const inputClass =
  "w-full rounded-2xl border border-card-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");

  // sign-in fields
  const [identifier, setIdentifier] = useState(""); // email or username
  const [signInPassword, setSignInPassword] = useState("");

  // sign-up fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function switchMode(m: Mode) {
    setMode(m);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    /* ── SIGN UP ─────────────────────────────────────── */
    if (mode === "signup") {
      const trimmedUsername = username.trim().toLowerCase();
      const trimmedEmail = email.trim().toLowerCase();

      if (trimmedUsername.length < 3) {
        setError("Username must be at least 3 characters.");
        setLoading(false);
        return;
      }
      if (!/^[a-z0-9_]+$/.test(trimmedUsername)) {
        setError("Username can only contain lowercase letters, numbers, and underscores.");
        setLoading(false);
        return;
      }
      if (signUpPassword.length < 6) {
        setError("Password must be at least 6 characters.");
        setLoading(false);
        return;
      }

      // Check username availability
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", trimmedUsername)
        .maybeSingle();

      if (existing) {
        setError("That username is already taken.");
        setLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: signUpPassword,
        options: { data: { username: trimmedUsername } },
      });

      if (signUpError) {
        if (signUpError.message.toLowerCase().includes("already registered")) {
          setError("An account with that email already exists. Try signing in.");
        } else if (signUpError.message.toLowerCase().includes("invalid api") || signUpError.message.toLowerCase().includes("api key")) {
          setError("Server configuration error. Please contact support.");
        } else {
          setError(signUpError.message);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        await supabase
          .from("profiles")
          .update({
            username: trimmedUsername,
            email: trimmedEmail,
            onboarding_completed: true,
          })
          .eq("id", data.user.id);
      }

      router.push("/dashboard");
      router.refresh();
      return;
    }

    /* ── SIGN IN ─────────────────────────────────────── */
    const raw = identifier.trim();
    let resolvedEmail = raw;

    // If it doesn't look like an email, treat it as a username
    if (!raw.includes("@")) {
      const found = await getEmailByUsername(raw);
      if (!found) {
        setError("No account found with that username.");
        setLoading(false);
        return;
      }
      resolvedEmail = found;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: resolvedEmail,
      password: signInPassword,
    });

    if (signInError) {
      setError("Incorrect email/username or password.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div>
      {/* Mode toggle */}
      <div className="mb-8 flex rounded-2xl border border-card-border p-1.5 gap-1">
        {(["signin", "signup"] as Mode[]).map((m) => (
          <button key={m} type="button" onClick={() => switchMode(m)}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
              mode === m
                ? "btn-primary"
                : "text-muted hover:text-foreground"
            }`}>
            {m === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {mode === "signin" ? (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted">
                Email or username
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com or your_username"
                autoComplete="username"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted">
                Password
              </label>
              <input
                type="password"
                required
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
                className={inputClass}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_username"
                autoComplete="username"
                className={inputClass}
              />
              <p className="mt-1.5 text-xs text-muted">Lowercase letters, numbers, underscores only</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted">
                Password
              </label>
              <input
                type="password"
                required
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                className={inputClass}
              />
            </div>
          </>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading}
          className="btn-primary w-full rounded-2xl py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed mt-2">
          {loading
            ? mode === "signup" ? "Creating account…" : "Signing in…"
            : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
