# Tasks

## Task 1: Create tracks query utilities
**Status**: not_started  
**Dependencies**: none

Create database query functions for fetching tracks and lessons data.

### Subtasks:
- Create `src/lib/queries/tracks.ts` file
- Implement `getAllTracks()`: Query all tracks ordered by sort_order
- Implement `getTrackBySlug(slug)`: Query single track with validation
- Implement `getLessonsByTrackId(trackId)`: Query all lessons for a track ordered by sort_order
- Implement `getLessonBySlug(trackSlug, lessonSlug)`: Query single lesson with track validation
- Use Supabase server client from `src/lib/supabase/server.ts`
- Return typed objects or null for not found cases

---

## Task 2: Create lesson completion query utilities  
**Status**: not_started  
**Dependencies**: none

Create database query functions for lesson completions and user progress.

### Subtasks:
- Create `src/lib/queries/lessons.ts` file  
- Implement `getUserCompletions(userId)`: Query all lesson_ids completed by user
- Implement `isLessonCompleted(userId, lessonId)`: Check if specific lesson is completed
- Implement `getNextIncompleteLesson(userId)`: Query next lesson to complete (lowest track sort_order, then lowest lesson sort_order)
- Use Supabase server client
- Return typed objects

---

## Task 3: Implement lesson completion Server Action
**Status**: not_started  
**Dependencies**: Task 2

Create the Server Action that handles marking a lesson as complete, awarding XP, and updating streaks.

### Subtasks:
- Create or update `src/lib/actions/lesson.ts`
- Implement `completeLessonAction(lessonId: string)` function
- Get authenticated user from Supabase session, return error if not authenticated
- Query lesson to get xp_value
- Check if already completed (idempotent), return early if yes
- Get current profile (xp, streak_count, last_active_date)
- Calculate new streak using `computeNewStreak()` from `src/lib/streak.ts` with `todayUtc()`
- Insert into lesson_completions table
- Update profiles table: increment xp, update streak_count and last_active_date
- Use Supabase transaction if possible, or handle rollback on error
- Call `revalidatePath()` for lesson page and dashboard
- Return success object with updated values

---

## Task 4: Build tracks index page
**Status**: not_started  
**Dependencies**: Task 1

Create the `/tracks` page that lists all available learning tracks.

### Subtasks:
- Create `src/app/tracks/page.tsx` as Server Component
- Import `getAllTracks()` from queries
- Fetch all tracks
- Render page header "Learning Tracks"
- Map tracks to cards/list items with title, description, and link to `/tracks/[slug]`
- Handle empty state: "No tracks available yet."
- Style with existing Tailwind patterns (orange/black theme)
- Ensure responsive layout

---

## Task 5: Build track lesson list page
**Status**: not_started  
**Dependencies**: Task 1, Task 2

Create the `/tracks/[trackSlug]` page that shows all lessons in a track with completion indicators.

### Subtasks:
- Create `src/app/tracks/[trackSlug]/page.tsx` as Server Component
- Import `getTrackBySlug()`, `getLessonsByTrackId()`, `getUserCompletions()` from queries
- Fetch track by slug, call `notFound()` if not found
- Fetch lessons for the track
- Get authenticated user from Supabase
- If authenticated, fetch user's completions
- Render breadcrumb: "Tracks > [Track Title]"
- Render track header (title, description)
- Map lessons to list items showing title, description preview
- Show checkmark (✓) next to completed lessons for authenticated users
- Make each lesson clickable → `/tracks/[trackSlug]/[lessonSlug]`
- Handle empty lessons state
- Style consistently with existing theme

---

## Task 6: Build lesson detail page structure
**Status**: not_started  
**Dependencies**: Task 1, Task 2

Create the main `/tracks/[trackSlug]/[lessonSlug]` page structure without the completion action (that's next task).

### Subtasks:
- Create `src/app/tracks/[trackSlug]/[lessonSlug]/page.tsx` as Server Component
- Import lesson queries
- Fetch track and lesson, call `notFound()` if either not found
- Get authenticated user
- Check if lesson is completed (for authenticated users)
- Render breadcrumb: "Tracks > [Track Title] > [Lesson Title]"
- Embed YouTube iframe:
  - URL: `https://www.youtube-nocookie.com/embed/${lesson.youtube_video_id}`
  - Add `allow` attribute: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  - Make responsive with aspect-ratio
- Display lesson title, description, XP value badge
- Display challenge section with heading "Your Challenge" and full `challenge_prompt`
- Add placeholder for completion button (will be implemented in Task 7)
- For unauthenticated users: show "Sign in to track your progress" with link to `/login`
- Style with existing theme

---

## Task 7: Add lesson completion action to lesson page
**Status**: not_started  
**Dependencies**: Task 3, Task 6

Integrate the lesson completion action into the lesson detail page with proper client/server boundary.

### Subtasks:
- Create `src/components/lessons/LessonCompleteButton.tsx` as Client Component
- Accept props: `lessonId`, `isCompleted`
- If `isCompleted`, render "Completed ✓" badge (no button)
- If not completed, render "Mark Complete" button
- Import `completeLessonAction` from `src/lib/actions/lesson.ts`
- On button click, call the action with `lessonId`
- Show loading state during action (disable button, show spinner)
- Handle errors with toast/alert
- Use optimistic UI update to show success immediately
- In lesson page (`src/app/tracks/[trackSlug]/[lessonSlug]/page.tsx`):
  - Import and render `LessonCompleteButton` in place of placeholder
  - Pass `lessonId` and `isCompleted` props
- Test completion flow: XP awarded, streak updated, button changes to completed state

---

## Task 8: Update dashboard with "Continue Learning" link
**Status**: not_started  
**Dependencies**: Task 2

Enhance the existing dashboard to show a direct link to the next incomplete lesson.

### Subtasks:
- Open `src/app/dashboard/page.tsx`
- Import `getNextIncompleteLesson()` from queries
- Get authenticated user
- Fetch next incomplete lesson for user
- Update the existing "Continue learning" card/section:
  - If next lesson exists: render "Continue →" button with `href="/tracks/{trackSlug}/{lessonSlug}"`
  - Display lesson title and track title as context
  - If no incomplete lessons: show "All caught up! 🎉"
  - If no lessons in database: show "No tracks yet."
- Ensure link is prominent and styled consistently
- Test with different user states (new user, some progress, all complete)

---

## Task 9: Add "Tracks" link to navbar
**Status**: not_started  
**Dependencies**: Task 4

Add a navigation link to the tracks index page in the main navbar.

### Subtasks:
- Open `src/components/layout/Navbar.tsx`
- Add a new Link component with `href="/tracks"` and text "Tracks"
- Position between existing nav items (e.g., after "Dashboard", before "Leaderboard")
- Style consistently with existing nav items
- Ensure link is visible and accessible
- Test navigation on desktop and mobile viewports

---

## Task 10: Create community query utilities
**Status**: not_started  
**Dependencies**: none

Create database query functions for community stuck posts and replies.

### Subtasks:
- Create `src/lib/queries/community.ts` file
- Implement `getAllStuckPosts()`: Query posts with author username and track title, ordered by created_at DESC
- Implement `getStuckPostById(postId)`: Query single post with author and track info
- Implement `getRepliesByPostId(postId)`: Query all replies for a post with author usernames, ordered by created_at ASC
- Use Supabase server client with JOIN queries
- Return typed objects or null for not found

---

## Task 11: Build community feed page
**Status**: not_started  
**Dependencies**: Task 10

Create the `/community` page that lists all stuck posts.

### Subtasks:
- Create `src/app/community/page.tsx` as Server Component
- Import `getAllStuckPosts()` from queries
- Get authenticated user
- Fetch all posts
- Render page header "Community"
- If authenticated: render "New Post" button → `/community/new`
- If unauthenticated: render "Sign in to post questions" with link
- Map posts to list items showing:
  - Post title (clickable → `/community/[postId]`)
  - Author username (clickable → `/users/[username]`)
  - Relative timestamp ("2 hours ago")
  - Track badge if associated
  - "Resolved ✓" badge if resolved
- Handle empty state: "No posts yet. Be the first to ask a question!"
- Style with existing theme

---

## Task 12: Create community Server Actions
**Status**: not_started  
**Dependencies**: none

Create Server Actions for creating posts, replying, and marking posts as resolved.

### Subtasks:
- Create `src/lib/actions/community.ts` file
- Implement `createStuckPostAction(title, description, trackId)`:
  - Validate auth
  - Validate title (1-200 chars) and description (1-2000 chars)
  - Insert into stuck_posts table
  - Return postId or error
- Implement `replyToPostAction(postId, content)`:
  - Validate auth
  - Validate content (1-2000 chars)
  - Insert into stuck_replies table
  - Call revalidatePath for post page
  - Return success or error
- Implement `markPostResolvedAction(postId)`:
  - Validate auth
  - Update stuck_posts.resolved = true
  - RLS will enforce author-only access
  - Call revalidatePath for post page and community feed
  - Return success or error
- Use Supabase server client

---

## Task 13: Build create stuck post page
**Status**: not_started  
**Dependencies**: Task 1, Task 12

Create the `/community/new` page with a form to create a stuck post.

### Subtasks:
- Create `src/app/community/new/page.tsx` as Server Component
- Check authentication, redirect to `/login` if not authenticated
- Import `getAllTracks()` to populate track dropdown
- Create `src/components/community/CreatePostForm.tsx` as Client Component
- Form fields:
  - Title (text input, required, max 200 chars)
  - Description (textarea, required, max 2000 chars)
  - Track (select dropdown, optional): "General question" (null) + all track titles
- Import `createStuckPostAction`
- On submit, call action with form data
- Show loading state during submission
- Display validation errors inline if action returns error
- On success, redirect to `/community/[postId]`
- Style form with existing patterns
- Ensure mobile-friendly layout

---

## Task 14: Build single post view page
**Status**: not_started  
**Dependencies**: Task 10, Task 12

Create the `/community/[postId]` page showing a post and its replies with interaction capabilities.

### Subtasks:
- Create `src/app/community/[postId]/page.tsx` as Server Component
- Import `getStuckPostById()` and `getRepliesByPostId()`
- Fetch post, call `notFound()` if not found
- Fetch replies for post
- Get authenticated user
- Render breadcrumb: "Community > [Post Title]"
- Render post header:
  - Title
  - Author username + creation date
  - Track badge (if associated)
  - "Resolved ✓" badge (if resolved)
  - "Mark as Resolved" button (only if user is author AND not resolved)
- Render post body (description)
- Render replies section:
  - Header: "X Replies"
  - List replies with author username, timestamp, content
- If authenticated: render reply form
- If unauthenticated: show "Sign in to reply" message
- Create `src/components/community/ReplyForm.tsx` as Client Component:
  - Textarea for content (max 2000 chars)
  - "Post Reply" button
  - Import and call `replyToPostAction`
  - Show loading state and validation errors
  - Optimistic UI update to show reply immediately
- Create `src/components/community/MarkResolvedButton.tsx` as Client Component:
  - Import and call `markPostResolvedAction`
  - Show loading state
  - Optimistic UI update
- Style consistently with existing theme

---

## Task 15: Add "Community" link to navbar
**Status**: not_started  
**Dependencies**: Task 11

Add a navigation link to the community feed in the main navbar.

### Subtasks:
- Open `src/components/layout/Navbar.tsx`
- Add a new Link component with `href="/community"` and text "Community"
- Position appropriately in nav items order
- Style consistently with existing nav items
- Ensure link is visible and accessible
- Test navigation

---

## Task 16: End-to-end testing and polish
**Status**: not_started  
**Dependencies**: Task 1, Task 2, Task 3, Task 4, Task 5, Task 7, Task 8, Task 9, Task 11, Task 13, Task 14, Task 15

Perform comprehensive testing of all features and fix any issues.

### Subtasks:
- Test unauthenticated user flow:
  - Browse tracks and lessons
  - View community posts
  - See sign-in prompts for actions
- Test new user flow:
  - Sign up → Onboard
  - Browse tracks from navbar
  - Select a track, view lessons
  - Complete first lesson, verify XP and streak = 1
  - Check dashboard shows next lesson
  - Complete second lesson same day, verify streak still 1
  - Simulate next day completion (manually adjust date or test logic), verify streak = 2
- Test returning user:
  - Log in
  - Dashboard shows correct next incomplete lesson
  - Click "Continue" goes to correct lesson
  - Complete lesson, verify updates
- Test community flow:
  - Create a stuck post with track association
  - View post, add a reply
  - Mark post as resolved (as author)
  - Verify non-author cannot mark resolved
- Test streak reset:
  - Complete lesson today
  - Simulate 3-day gap
  - Complete lesson, verify streak reset to 1
- Test idempotent completions:
  - Complete same lesson twice
  - Verify XP only awarded once
  - Verify no duplicate completion records
- Test edge cases:
  - Invalid track/lesson slugs → 404
  - Invalid post IDs → 404
  - Empty states (no tracks, no posts, all complete)
- Polish:
  - Fix any styling inconsistencies
  - Ensure all loading states work
  - Verify all error messages are user-friendly
  - Check responsive design on mobile
  - Verify breadcrumb navigation works
  - Test all navbar links
- Final verification:
  - All 10 requirements from requirements.md are met
  - No console errors
  - All TypeScript types are correct
  - Code follows existing project patterns
