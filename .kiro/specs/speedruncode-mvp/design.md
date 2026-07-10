# Design Document

## System Architecture

### Technology Stack
- **Frontend**: Next.js 15 App Router, React Server Components, TypeScript, Tailwind CSS 4
- **Backend**: Next.js Server Actions, Server Components
- **Database**: Supabase Postgres with Row Level Security (RLS)
- **Auth**: Supabase Auth

### Application Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── tracks/            # Track and lesson pages
│   ├── community/         # Community stuck posts
│   └── dashboard/         # User dashboard
├── components/            # React components
├── lib/
│   ├── actions/          # Server Actions
│   ├── queries/          # Database queries
│   ├── supabase/         # Supabase clients
│   └── streak.ts         # Streak utilities
```

---

## Component Design

### 1. Tracks Index Page (`/tracks`)

**File**: `src/app/tracks/page.tsx`

**Type**: Server Component

**Data Sources**:
- Query: `SELECT * FROM tracks ORDER BY sort_order ASC`

**UI Elements**:
- Page header: "Learning Tracks"
- Track cards grid/list showing:
  - Track title
  - Track description
  - Link to `/tracks/[trackSlug]`
- Empty state: "No tracks available yet."

---

### 2. Track Lesson List Page (`/tracks/[trackSlug]`)

**File**: `src/app/tracks/[trackSlug]/page.tsx`

**Type**: Server Component

**Data Sources**:
- Track: `SELECT * FROM tracks WHERE slug = $1`
- Lessons: `SELECT * FROM lessons WHERE track_id = $1 ORDER BY sort_order ASC`
- Completions (if authenticated): `SELECT lesson_id FROM lesson_completions WHERE user_id = $1`

**UI Elements**:
- Breadcrumb: `Tracks > [Track Title]`
- Track header (title, description)
- Lesson list ordered by `sort_order`:
  - Lesson title
  - Lesson description preview
  - Completion checkmark (✓) for authenticated users
  - Click → navigate to `/tracks/[trackSlug]/[lessonSlug]`
- Empty state: "No lessons yet."

**Error Handling**:
- Invalid `trackSlug` → `notFound()`

---

### 3. Lesson Detail Page (`/tracks/[trackSlug]/[lessonSlug]`)

**File**: `src/app/tracks/[trackSlug]/[lessonSlug]/page.tsx`

**Type**: Server Component

**Data Sources**:
- Track: `SELECT * FROM tracks WHERE slug = $1`
- Lesson: `SELECT * FROM lessons WHERE track_id = $1 AND slug = $2`
- Completion status (if authenticated): `SELECT EXISTS(SELECT 1 FROM lesson_completions WHERE user_id = $1 AND lesson_id = $2)`

**UI Elements**:
- Breadcrumb: `Tracks > [Track Title] > [Lesson Title]`
- YouTube iframe embed:
  - URL: `https://www.youtube-nocookie.com/embed/[youtube_video_id]`
  - Allow: `accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`
  - Responsive sizing
- Lesson metadata:
  - Title
  - Description
  - XP value display (e.g., "Worth 10 XP")
- Challenge section:
  - Section header: "Your Challenge"
  - Full `challenge_prompt` text (markdown/formatted)
- Action button (authenticated users):
  - If not completed: "Mark Complete" button → triggers Server Action
  - If completed: "Completed ✓" badge (no action)
- Sign-in prompt (unauthenticated users):
  - "Sign in to track your progress and earn XP"
  - Link to `/login`

**Error Handling**:
- Invalid `trackSlug` or `lessonSlug` → `notFound()`

**Client Component Wrapper**: `src/components/lessons/LessonClient.tsx`
- Wraps the "Mark Complete" button for optimistic UI updates
- Handles loading state during completion

---

### 4. Lesson Completion Action

**File**: `src/lib/actions/lesson.ts`

**Function**: `async function completeLessonAction(lessonId: string)`

**Type**: Server Action

**Algorithm**:
```typescript
1. Get authenticated user from Supabase session
2. If not authenticated → throw error "Not authenticated"
3. Query lesson: SELECT id, xp_value FROM lessons WHERE id = lessonId
4. If lesson not found → throw error "Lesson not found"
5. Check existing completion: 
   SELECT id FROM lesson_completions WHERE user_id = userId AND lesson_id = lessonId
6. If already completed → return early (idempotent)
7. Get current profile: 
   SELECT xp, streak_count, last_active_date FROM profiles WHERE id = userId
8. Calculate new streak:
   const today = todayUtc()
   const newStreak = computeNewStreak(currentStreak, lastActiveDate, today)
9. Insert completion:
   INSERT INTO lesson_completions (user_id, lesson_id) VALUES (userId, lessonId)
10. Update profile:
    UPDATE profiles SET 
      xp = xp + lesson.xp_value,
      streak_count = newStreak,
      last_active_date = today
    WHERE id = userId
11. Revalidate paths:
    - revalidatePath(`/tracks/${trackSlug}/${lessonSlug}`)
    - revalidatePath('/dashboard')
12. Return success with updated XP and streak
```

**Error Handling**:
- Unauthenticated: Return error object `{ error: "Not authenticated" }`
- Database errors: Log and return `{ error: "Failed to complete lesson" }`

---

### 5. Dashboard "Continue Learning" Enhancement

**File**: `src/app/dashboard/page.tsx`

**Enhancement**: Update the existing dashboard to compute next lesson

**Query Logic**:
```sql
-- Get the next incomplete lesson with lowest sort_order
SELECT 
  l.id, l.slug AS lesson_slug, l.title AS lesson_title,
  t.slug AS track_slug, t.title AS track_title, t.sort_order AS track_order
FROM lessons l
JOIN tracks t ON l.track_id = t.id
LEFT JOIN lesson_completions lc ON lc.lesson_id = l.id AND lc.user_id = $1
WHERE lc.id IS NULL
ORDER BY t.sort_order ASC, l.sort_order ASC
LIMIT 1
```

**UI Changes**:
- If next lesson exists: "Continue →" button with `href="/tracks/{track_slug}/{lesson_slug}"`
- If no incomplete lessons: "All caught up! 🎉" message
- If no lessons in database: "No tracks yet." message

---

### 6. Navbar "Tracks" Link

**File**: `src/components/layout/Navbar.tsx`

**Enhancement**: Add navigation link

**Implementation**:
- Convert Navbar from async server component to client component (already done per context)
- Add `<Link href="/tracks">Tracks</Link>` to navigation items
- Style consistently with existing nav items

---

### 7. Community Feed Page (`/community`)

**File**: `src/app/community/page.tsx`

**Type**: Server Component

**Data Sources**:
```sql
SELECT 
  sp.id, sp.title, sp.resolved, sp.created_at,
  p.username AS author_username,
  t.title AS track_title
FROM stuck_posts sp
JOIN profiles p ON sp.user_id = p.id
LEFT JOIN tracks t ON sp.track_id = t.id
ORDER BY sp.created_at DESC
```

**UI Elements**:
- Page header: "Community"
- New post button (authenticated): "New Post" → `/community/new`
- Sign-in prompt (unauthenticated): "Sign in to post questions"
- Post list:
  - Post title (clickable → `/community/[postId]`)
  - Author username (clickable → `/users/[username]`)
  - Creation date (relative: "2 hours ago")
  - Track badge (if associated)
  - Resolved badge (if `resolved = true`)
- Empty state: "No posts yet. Be the first to ask a question!"

---

### 8. Create Stuck Post Page (`/community/new`)

**File**: `src/app/community/new/page.tsx`

**Type**: Server Component with Client Form

**Auth Guard**: Redirect to `/login` if not authenticated

**Form Fields**:
- Title (text input, required, max 200 chars)
- Description (textarea, required, max 2000 chars)
- Track (select dropdown, optional)
  - Query tracks: `SELECT id, title FROM tracks ORDER BY sort_order ASC`
  - Options: "General question" (null) + all track titles

**Server Action**: `src/lib/actions/community.ts` → `createStuckPostAction`

**Action Algorithm**:
```typescript
1. Validate auth
2. Validate title: 1-200 chars
3. Validate description: 1-2000 chars
4. Insert post:
   INSERT INTO stuck_posts (user_id, track_id, title, description)
   VALUES ($1, $2, $3, $4)
   RETURNING id
5. Redirect to /community/{postId}
```

**Validation Errors**:
- Display inline error messages
- Preserve form values on error

---

### 9. Single Post View Page (`/community/[postId]`)

**File**: `src/app/community/[postId]/page.tsx`

**Type**: Server Component with Client Components

**Data Sources**:
```sql
-- Post
SELECT 
  sp.*,
  p.username AS author_username,
  t.title AS track_title
FROM stuck_posts sp
JOIN profiles p ON sp.user_id = p.id
LEFT JOIN tracks t ON sp.track_id = t.id
WHERE sp.id = $1

-- Replies
SELECT 
  sr.*,
  p.username AS author_username
FROM stuck_replies sr
JOIN profiles p ON sr.user_id = p.id
WHERE sr.post_id = $1
ORDER BY sr.created_at ASC
```

**UI Elements**:
- Breadcrumb: `Community > [Post Title]`
- Post header:
  - Title
  - Author username + creation date
  - Track badge (if associated)
  - Resolved badge (if resolved)
  - "Mark as Resolved" button (only for post author, only if not resolved)
- Post body (description, formatted)
- Replies section:
  - Reply count header: "3 Replies"
  - Reply list (chronological):
    - Author username + timestamp
    - Reply content (formatted)
- Reply form (authenticated users):
  - Textarea (required, max 2000 chars)
  - "Post Reply" button
- Sign-in prompt (unauthenticated): "Sign in to reply"

**Error Handling**:
- Invalid `postId` → `notFound()`

**Server Actions**:
- `replyToPostAction(postId, content)` → Insert reply, revalidate page
- `markPostResolvedAction(postId)` → Update post, revalidate page

**Client Components**:
- `ReplyForm.tsx` → Handles reply submission with optimistic updates
- `MarkResolvedButton.tsx` → Handles resolve action with optimistic updates

---

## Database Interaction Patterns

### Query Organization
- All queries in `src/lib/queries/` organized by domain:
  - `tracks.ts`: Track and lesson queries
  - `lessons.ts`: Lesson completion queries
  - `community.ts`: Stuck posts and replies queries

### Server Actions Organization
- All mutations in `src/lib/actions/` organized by domain:
  - `lesson.ts`: Lesson completion action
  - `community.ts`: Create post, reply, mark resolved actions

### Supabase Client Usage
- Server Components: Use `createServerClient()` from `src/lib/supabase/server.ts`
- Server Actions: Use `createServerClient()` (with cookies)
- Client Components: Use `createBrowserClient()` from `src/lib/supabase/client.ts`

---

## Styling Approach

### Design System
- **Theme**: Current orange/black theme (keep existing)
- **Typography**: Existing sans-serif font stack
- **Animations**: Minimal fade-up effects only (already implemented)

### Component Patterns
- Server-rendered pages with minimal client interactivity
- Optimistic updates for mutations (completion, replies, resolve)
- Loading states using React Suspense boundaries
- Error boundaries for graceful error handling

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- YouTube iframe responsive with aspect-ratio utilities

---

## Authentication & Authorization

### Authentication Flow
- Handled by existing Supabase Auth
- Middleware already configured at `src/lib/supabase/middleware.ts`

### Authorization Rules
- **Tracks/Lessons**: Public read access
- **Lesson Completions**: Users can only insert/view their own
- **Stuck Posts**: Anyone can read, users can create/update their own
- **Stuck Replies**: Anyone can read, users can create their own
- **Mark as Resolved**: Only post author (enforced by RLS)

### Auth States
- **Authenticated + Onboarded**: Full access
- **Authenticated + Not Onboarded**: Redirect to `/onboarding`
- **Unauthenticated**: Read-only access, prompts to sign in for actions

---

## Performance Considerations

### Server-Side Rendering
- All list pages use RSC for instant initial load
- No client-side JavaScript required for content display

### Database Optimization
- Indexes already exist (see `001_initial_schema.sql`)
- Use `SELECT` with explicit columns (avoid `SELECT *` in production)
- Paginate community posts if volume grows (future enhancement)

### Caching Strategy
- Static pages: `/tracks` (revalidate on new track creation)
- Dynamic pages: Track/lesson pages (revalidate on completion)
- Use Next.js `revalidatePath()` after mutations

---

## Error Handling

### Page-Level Errors
- 404: Use Next.js `notFound()` for invalid slugs/IDs
- 500: Use Next.js error boundaries for unexpected errors

### Action-Level Errors
- Return error objects: `{ error: "message" }`
- Display errors inline in forms
- Log errors to console (future: error tracking service)

### User-Facing Messages
- Validation errors: Specific, actionable messages
- Server errors: Generic "Something went wrong" messages
- Success messages: Brief confirmations (e.g., "Lesson completed!")

---

## Testing Strategy

### Manual Testing Checklist
- [ ] Unauthenticated users can browse tracks and lessons
- [ ] Authenticated users can complete lessons and earn XP
- [ ] Streak increments correctly (consecutive days)
- [ ] Streak resets after gap
- [ ] Idempotent completions (no duplicate XP)
- [ ] Dashboard "Continue" links to next incomplete lesson
- [ ] Community posts and replies work
- [ ] Only post author can mark as resolved

### Test User Scenarios
1. **New User Journey**: Sign up → Onboard → Browse tracks → Complete first lesson → Check XP/streak
2. **Returning User**: Log in → Check dashboard → Continue learning → Complete lesson
3. **Community Helper**: Browse community → Reply to post → Author marks resolved
4. **Stuck Learner**: Create post with track → Get reply → Mark resolved

---

## Future Enhancements (Out of Scope)

- Search/filter tracks and lessons
- User profiles with public progress
- Leaderboards (already exists per context)
- Notifications for post replies
- Rich text editor for posts/replies
- Image uploads in posts
- Post voting/helpful replies
- Lesson notes and bookmarks
