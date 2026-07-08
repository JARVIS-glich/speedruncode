"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={theme === "dark" ? "LIGHT_MODE.exe" : "DARK_MODE.exe"}
      className="flex items-center gap-1.5 rounded-lg border border-card-border bg-card px-3 py-1.5 text-xs font-bold text-accent uppercase tracking-widest hover:border-accent hover:shadow-[0_0_10px_var(--accent)] transition-all"
    >
      <span>{theme === "dark" ? "☀" : "⬛"}</span>
      <span className="hidden sm:inline">{theme === "dark" ? "DAY" : "MATRIX"}</span>
    </button>
  );
}
