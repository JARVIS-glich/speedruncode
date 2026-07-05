import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  let userId: string | null = null;
  try {
    const { data } = await supabase.auth.getUser();
    userId = data.user?.id ?? null;
  } catch {
    return supabaseResponse;
  }

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname === "/login" || pathname.startsWith("/auth/");
  const isPublicRoute =
    pathname === "/" ||
    pathname === "/leaderboard" ||
    pathname.startsWith("/users/") ||
    pathname.startsWith("/tracks") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api");

  // Not logged in → redirect to login
  if (!userId && !isAuthRoute && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Already logged in → skip login page
  if (userId && pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Onboarding check — only on protected pages that aren't /dashboard or /onboarding
  // (dashboard does its own profile fetch)
  if (
    userId &&
    !isAuthRoute &&
    !isPublicRoute &&
    pathname !== "/onboarding" &&
    pathname !== "/dashboard"
  ) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", userId)
        .maybeSingle();

      if (profile && !profile.onboarding_completed) {
        const url = request.nextUrl.clone();
        url.pathname = "/onboarding";
        return NextResponse.redirect(url);
      }
    } catch {
      // DB error — continue
    }
  }

  // If already completed onboarding, skip /onboarding
  if (userId && pathname === "/onboarding") {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", userId)
        .maybeSingle();

      if (profile?.onboarding_completed) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    } catch {
      // continue
    }
  }

  return supabaseResponse;
}
