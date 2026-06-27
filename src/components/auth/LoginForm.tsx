"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getEmailByUsername, signUpUser } from "@/lib/actions/auth";

type Mode = "signin" | "signup";

const inputClass =
  "w-full rounded-2xl border border-card-border bg-background px-5 py-3.5 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [identifier, setIdentifier] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function switchMode(m: Mode) { setMode(m); setError(null); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    /* ── SIGN UP — runs through server action to bypass RLS ── */
    if (mode === "signup") {
      const trimmedUsername = username.trim().toLowerCase();

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

      const result = await signUpUser(email.trim(), trimmedUsername, signUpPassword);

      if (!result.success) {
        setError(result.error ?? "Sign up failed. Please try again.");
        setLoading(false);
        return;
      }

      // Sign in immediately after successful signup
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: signUpPassword,
      });

      if (signInError) {
        // Account created but auto-sign-in failed — ask them to sign in manually
        setError("Account created! Please sign in.");
        setMode("signin");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
      return;
    }

    /* ── SIGN IN ── */
    const supabase = createClient();
    const raw = identifier.trim();
    let resolvedEmail = raw;

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
      <div className="mb-8 flex rounded-2xl border border-card-border p-1.5 gap-1">
        {(["signin", "signup"] as Mode[]).map((m) => (
          <button key={m} type="button" onClick={() => switchMode(m)}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
              mode === m ? "btn-primary" : "text-muted hover:text-foreground"
            }`}>
            {m === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signin" ? (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted">Email or username</label>
              <input type="text" required value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com or your_username"
                autoComplete="username" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted">Password</label>
              <input type="password" required value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                placeholder="Your password" autoComplete="current-password" className={inputClass} />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted">Email address</label>
              <input type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" autoComplete="email" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted">Username</label>
              <input type="text" required value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_username" autoComplete="username" className={inputClass} />
              <p className="mt-1.5 text-xs text-muted">Lowercase letters, numbers, underscores only</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-muted">Password</label>
              <input type="password" required value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                placeholder="At least 6 characters" autoComplete="new-password" className={inputClass} />
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
