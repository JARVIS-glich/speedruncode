# Requirements Document

## Introduction

This spec covers the core learning loop and community board for Speed Run Code — a gamified coding learning platform for self-taught builders. The missing pieces are: track and lesson browsing pages, a lesson completion action that awards XP and updates streaks, a community "stuck posts" board for peer support, and minor navigation improvements to wire the dashboard to the correct next lesson.

The stack is Next.js (App Router, TypeScript), Tailwind CSS 4, and Supabase (Postgres + RLS + Auth). All database tables, RLS policies, and streak utility functions are already in place and must be reused as-is.

## Glossary

- **System**: The Speed Run Code Next.js web application.
- **Track_Page**: The `/tracks/[trackSlug]` server-rendered page that lists all lessons in a track.
- **Lesson_Page**: The `/tracks/[trackSlug]/[lessonSlug]` server-rendered page for a single lesson.
- **Completion_Action**: The Next.js Server Action responsible for recording a lesson completion and updating the learner's profile.
- **Community_Feed**: The `/community` page that displays all stuck posts.
- **Post_Page**: The `/community/[postId]` page that shows a single stuck post and its replies.
- **Navbar**: The existing `src/components/layout/Navbar.tsx` server component.
- **Dashboard**: The existing `/dashboard` page.
- **Learner**: An authenticated user who has completed onboarding.
- **Visitor**: A user who is not authenticated, or is authenticated but has not completed onboarding.
- **Streak**: The consecutive-day activity count tracked in `profiles.streak_count` using the existing `computeStreakUpdate` and `applyStreakDelta` utilities.
- **XP**: Experience points stored in `profiles.xp`, awarded per lesson via `lessons.xp_value`.

---

## Requirements

### Requirement 1: Track Lesson List Page

**User Story:** As a Learner, I want to browse all lessons in a track, so that I can see what I will learn and track my progress through the material.

#### Acceptance Criteria

1. WHEN a Visitor navigates to `/tracks/[trackSlug]`, THE Track_Page SHALL display the track title, description, and a list of all lessons ordered by `lessons.sort_order` ascending.
2. WHEN a Learner navigates to `/tracks/[trackSlug]`, THE Track_Page SHALL display a completion checkmark indicator next to each lesson the Learner has already completed.
3. WHEN a Visitor navigates to `/tracks/[trackSlug]`, THE Track_Page SHALL display lesson list items without completion indicators.
4. WHEN a user navigates to `/tracks/[trackSlug]` and the `trackSlug` does not match any row in the `tracks` table, THE Track_Page SHALL return a Next.js `notFound()` response.
5. WHEN a user clicks a lesson list item, THE Track_Page SHALL navigate the user to `/tracks/[trackSlug]/[lessonSlug]`.

---

### Requirement 2: Lesson Detail Page

**User Story:** As a Learner, I want to watch a lesson video and read the challenge prompt, so that I can complete the learning activity and earn XP.

#### Acceptance Criteria

1. WHEN a user navigates to `/tracks/[trackSlug]/[lessonSlug]`, THE Lesson_Page SHALL embed the YouTube player using the standard YouTube iframe embed URL (`https://www.youtube.com/embed/[youtube_video_id]`) with the lesson's `youtube_video_id`.
2. WHEN a user navigates to `/tracks/[trackSlug]/[lessonSlug]`, THE Lesson_Page SHALL display the lesson title, description, and full `challenge_prompt` text.
3. WHEN a user navigates to `/tracks/[trackSlug]/[lessonSlug]` and the `lessonSlug` does not match any lesson in the given track, THE Lesson_Page SHALL return a Next.js `notFound()` response.
4. WHEN a Learner navigates to `/tracks/[trackSlug]/[lessonSlug]` and the lesson has not yet been completed, THE Lesson_Page SHALL display a "Mark complete" button.
5. WHEN a Learner navigates to `/tracks/[trackSlug]/[lessonSlug]` and the lesson has already been completed, THE Lesson_Page SHALL display a "Completed ✓" indicator in place of the "Mark complete" button.
6. WHEN a Visitor navigates to `/tracks/[trackSlug]/[lessonSlug]`, THE Lesson_Page SHALL display the lesson content without a "Mark complete" button, and SHALL display a prompt to sign in.
7. THE Lesson_Page SHALL display a breadcrumb or back-link that navigates to the parent `/tracks/[trackSlug]` page.

---

### Requirement 3: Lesson Completion Action

**User Story:** As a Learner, I want to mark a lesson as complete, so that I earn XP, maintain my streak, and see my progress reflected immediately.

#### Acceptance Criteria

1. WHEN a Learner submits the "Mark complete" action for a lesson, THE Completion_Action SHALL insert a row into `lesson_completions` with `user_id` set to the Learner's authenticated user ID and `lesson_id` set to the lesson's ID.
2. WHEN a Learner submits the "Mark complete" action for a lesson the Learner has already completed, THE Completion_Action SHALL perform no insert and SHALL return without error (idempotent behavior due to the `UNIQUE(user_id, lesson_id)` constraint).
3. WHEN a Learner submits the "Mark complete" action for a lesson that has not yet been completed, THE Completion_Action SHALL add the lesson's `xp_value` to `profiles.xp` for the Learner.
4. WHEN a Learner submits the "Mark complete" action, THE Completion_Action SHALL call `computeStreakUpdate` with `profiles.last_active_date` and `todayUtc()`, then call `applyStreakDelta` with the current `profiles.streak_count` and the returned delta, and SHALL write the resulting `streak_count` and `last_active_date` back to the Learner's profile row.
5. IF an unauthenticated user invokes the Completion_Action, THEN THE Completion_Action SHALL return an error without modifying any database rows.
6. WHEN a Learner successfully completes a lesson, THE Completion_Action SHALL revalidate the Lesson_Page and the Dashboard paths so the UI reflects the updated state.

---

### Requirement 4: Dashboard "Continue Learning" Deep Link

**User Story:** As a Learner, I want the "Continue learning" card on my dashboard to link directly to my next incomplete lesson, so that I can resume where I left off without extra navigation.

#### Acceptance Criteria

1. WHEN the Dashboard renders for a Learner who has at least one incomplete lesson, THE Dashboard SHALL compute the next incomplete lesson as the lesson with the lowest `sort_order` within the track with the lowest `sort_order` that the Learner has not yet completed, and SHALL render the "Continue →" link with `href` set to `/tracks/[trackSlug]/[lessonSlug]`.
2. WHEN the Dashboard renders for a Learner who has completed all available lessons, THE Dashboard SHALL display a "All caught up!" message in place of the "Continue →" link.
3. WHEN the Dashboard renders for a Learner and no lessons exist in the database, THE Dashboard SHALL display a "No tracks yet." message in the "Continue learning" card.

---

### Requirement 5: Navbar "Tracks" Link

**User Story:** As a user, I want a "Tracks" link in the navbar, so that I can discover and navigate to learning tracks from any page.

#### Acceptance Criteria

1. THE Navbar SHALL include a "Tracks" navigation link with `href` set to `/tracks`.
2. WHEN a user clicks the "Tracks" link, THE Navbar SHALL navigate the user to `/tracks`.

---

### Requirement 6: Tracks Index Page

**User Story:** As a user, I want a page that lists all available tracks, so that I can choose which track to start or continue.

#### Acceptance Criteria

1. WHEN a user navigates to `/tracks`, THE System SHALL display a list of all tracks ordered by `tracks.sort_order` ascending.
2. WHEN a user clicks a track, THE System SHALL navigate the user to `/tracks/[trackSlug]`.
3. WHEN no tracks exist in the database, THE System SHALL display a "No tracks available yet." message on the `/tracks` page.

---

### Requirement 7: Community Feed Page

**User Story:** As a user, I want to browse stuck posts from the community, so that I can find answers to problems and see what others are working on.

#### Acceptance Criteria

1. WHEN a user navigates to `/community`, THE Community_Feed SHALL display all `stuck_posts` rows ordered by `created_at` descending.
2. WHEN a user navigates to `/community`, THE Community_Feed SHALL display for each post: the post title, the author's username, the creation date, the resolved status, and the associated track title if `track_id` is not null.
3. WHEN a Learner navigates to `/community`, THE Community_Feed SHALL display a "New post" button that navigates to `/community/new`.
4. WHEN a Visitor navigates to `/community`, THE Community_Feed SHALL display a sign-in prompt in place of the "New post" button.
5. WHEN a user clicks a post in the Community_Feed, THE Community_Feed SHALL navigate the user to `/community/[postId]`.

---

### Requirement 8: Create Stuck Post

**User Story:** As a Learner, I want to create a stuck post with a title, description, and optional track association, so that I can get help from the community when I am blocked.

#### Acceptance Criteria

1. WHEN a Learner navigates to `/community/new`, THE System SHALL display a form with fields for: title (required, text), description (required, text), and track association (optional, select from available tracks).
2. WHEN a Learner submits the create post form with a valid title (1–200 characters) and a valid description (1–2000 characters), THE System SHALL insert a row into `stuck_posts` with `user_id` set to the Learner's authenticated user ID, `resolved` set to `false`, and `track_id` set to the selected track's ID or `null` if no track was selected.
3. WHEN the post is successfully created, THE System SHALL redirect the Learner to `/community/[postId]` for the newly created post.
4. IF a Learner submits the create post form with an empty title or empty description, THEN THE System SHALL display a validation error message and SHALL NOT insert any row into `stuck_posts`.
5. IF a Visitor navigates to `/community/new`, THEN THE System SHALL redirect the Visitor to `/login`.

---

### Requirement 9: Single Post View and Replies

**User Story:** As a user, I want to view a stuck post and its replies, and as a Learner I want to reply, so that the community can collaborate on solving problems.

#### Acceptance Criteria

1. WHEN a user navigates to `/community/[postId]`, THE Post_Page SHALL display the post title, description, author username, creation date, resolved status, and all `stuck_replies` for that post ordered by `created_at` ascending.
2. WHEN a user navigates to `/community/[postId]` and the `postId` does not match any row in `stuck_posts`, THE Post_Page SHALL return a Next.js `notFound()` response.
3. WHEN a Learner navigates to `/community/[postId]`, THE Post_Page SHALL display a reply form with a text content field (required, 1–2000 characters).
4. WHEN a Learner submits the reply form with valid content, THE System SHALL insert a row into `stuck_replies` with `post_id`, `user_id`, and `content` set appropriately, and SHALL re-render the Post_Page to show the new reply.
5. IF a Learner submits the reply form with empty content, THEN THE System SHALL display a validation error and SHALL NOT insert any row into `stuck_replies`.
6. WHEN a Visitor navigates to `/community/[postId]`, THE Post_Page SHALL display all posts and replies but SHALL display a sign-in prompt in place of the reply form.

---

### Requirement 10: Mark Post as Resolved

**User Story:** As a Learner who authored a stuck post, I want to mark my post as resolved, so that the community knows the problem has been solved.

#### Acceptance Criteria

1. WHEN a Learner who is the author of a post navigates to `/community/[postId]`, THE Post_Page SHALL display a "Mark as resolved" button.
2. WHEN the post author clicks "Mark as resolved", THE System SHALL update `stuck_posts.resolved` to `true` for that post.
3. WHEN `stuck_posts.resolved` is `true`, THE Post_Page SHALL display a "Resolved ✓" badge and SHALL hide the "Mark as resolved" button.
4. WHEN a Learner who is not the post author navigates to `/community/[postId]`, THE Post_Page SHALL NOT display the "Mark as resolved" button.
5. IF an unauthenticated user or non-author invokes the resolve action directly, THEN THE System SHALL return an error without modifying any database rows (enforced by the existing RLS `UPDATE` policy on `stuck_posts`).
