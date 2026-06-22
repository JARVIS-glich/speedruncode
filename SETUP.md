# Speed Run Code — Setup

## 1. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL` — your project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the **anon public** key (NOT service_role)

> **Security:** Never put the service_role key in client-side env vars or commit it to git.

## 2. Run the database migration

In [Supabase SQL Editor](https://supabase.com/dashboard/project/gfciytjoyuaslhpawaed/sql/new), paste and run:

`supabase/migrations/001_initial_schema.sql`

## 3. Configure auth redirect URLs

In Supabase Dashboard → Authentication → URL Configuration:

- **Site URL:** `http://localhost:3000`
- **Redirect URLs:** add `http://localhost:3000/auth/callback`

## 4. Enable email auth

Dashboard → Authentication → Providers → Email → enable Magic Link.

## 5. Run locally

```bash
npm run dev
```

## Phase 1 test checklist

- [ ] Visit `/` — landing page loads
- [ ] `/leaderboard` — public, no login required
- [ ] `/login` — enter email, receive magic link
- [ ] Click magic link → redirected to `/onboarding`
- [ ] Complete onboarding (username, goals, recommendations)
- [ ] Land on `/dashboard` — XP, streak, rank visible
- [ ] `/users/your-username` — public profile works
- [ ] Search yourself on `/leaderboard`

## Rotate your service role key

If you shared your service_role key in chat, rotate it in Supabase Dashboard → Settings → API.
