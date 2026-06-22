-- Speed Run Code — seed tracks, levels, and lessons
-- Run this in Supabase SQL Editor after 001_initial_schema.sql

-- Add level column to lessons if not present
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS level int NOT NULL DEFAULT 1;
-- Add summary column for AI-written lesson notes
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS summary text;

-- ─── TRACKS ───────────────────────────────────────────────────────────────────

INSERT INTO public.tracks (slug, title, description, sort_order) VALUES
  ('ai-fundamentals',   'AI Coding Fundamentals',   'Learn what AI coding tools are, how to talk to them, and how to get unstuck fast.', 1),
  ('cursor-mastery',    'Cursor Mastery',            'Go from Cursor beginner to power user — composer, agent mode, multi-file editing and more.', 2),
  ('ship-with-ai',      'Ship with AI Tools',        'Build and deploy real projects using Lovable, Replit, v0, and Bolt — fast.', 3)
ON CONFLICT (slug) DO NOTHING;

-- ─── LESSONS — Track 1: AI Coding Fundamentals ────────────────────────────────

WITH t AS (SELECT id FROM public.tracks WHERE slug = 'ai-fundamentals')
INSERT INTO public.lessons (track_id, slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
SELECT t.id, l.slug, l.title, l.description, l.youtube_video_id, l.challenge_prompt, l.xp_value, l.sort_order, l.level, l.summary
FROM t, (VALUES
  (
    'what-are-ai-coding-tools',
    'What Are AI Coding Tools?',
    'A plain-English intro to Cursor, Copilot, and why they exist.',
    'ocMOZpuAMw4',
    'Open Cursor (or any AI editor you have). Type a comment like "// fetch user data from an API" and let the AI autocomplete it. Screenshot or paste the result.',
    10, 1, 1,
    'AI coding tools are editors or plugins that use large language models to predict, write, and explain code alongside you. Instead of googling every error, you describe what you want in plain English and the AI generates a starting point. The key insight: these tools are best used as a pair programmer, not a magic button — you still need to read and understand what they produce.'
  ),
  (
    'writing-better-prompts',
    'Writing Better Prompts',
    'How to talk to AI so it actually does what you want.',
    'P08jrZhyNxw',
    'Take a vague prompt like "make a login form" and rewrite it as a specific, detailed prompt. Then paste both into your AI tool and compare the output quality.',
    10, 2, 1,
    'Prompt quality is the single biggest factor in output quality. A good prompt includes: (1) context — what language/framework you are using, (2) the goal — what you want built or fixed, (3) constraints — what it should NOT do, and (4) output format — should it be a function, a component, a SQL query? The more specific you are, the less you have to edit.'
  ),
  (
    'cursor-top-features',
    'Cursor Top Features Walkthrough',
    'The 10 Cursor features that actually save you time.',
    'hSFeDdZWHt0',
    'Use Cursor''s inline chat (Cmd+K) to refactor a function you wrote. Ask it to "make this more readable" or "add error handling". Compare before and after.',
    15, 3, 2,
    'Cursor''s most powerful features are: Tab autocomplete (learns your codebase), Cmd+K inline edit (rewrite a selection with a prompt), Cmd+L chat sidebar (ask questions about your code), and @ symbols to pull in specific files or docs as context. Start with Cmd+K — it is the fastest way to feel the speed difference.'
  ),
  (
    'github-copilot-basics',
    'GitHub Copilot Basics',
    'Get productive with Copilot immediately — no fluff.',
    'jXp5D5ZnxGM',
    'Install GitHub Copilot in VS Code. Write a comment describing a utility function (e.g., "// convert array of objects to CSV string") and accept the suggestion. Test that it works.',
    10, 4, 2,
    'GitHub Copilot completes code as you type, using the context of the current file and your recent edits. The best way to use it: write a comment first describing exactly what you want, then press Enter and wait for the ghost text. Accept with Tab, reject with Esc. Copilot Chat (the sidebar) lets you ask follow-up questions about any selected code.'
  ),
  (
    'ai-inline-chat',
    'AI Inline Chat & Agent Mode',
    'How VS Code Agent Mode changes everything about AI-assisted editing.',
    'dutyOc_cAEU',
    'Open VS Code with an existing project. Use the Agent panel to ask it to "add a loading spinner to this component". Watch how it edits across multiple files and explain what each change does.',
    15, 5, 2,
    'Agent Mode goes beyond autocomplete — it can read your whole codebase, make a plan, and edit multiple files at once to complete a task. The difference from chat: agent mode acts, not just advises. Use it for bigger tasks like "add auth to this app" or "migrate this component to TypeScript". Always review the diff before accepting.'
  ),
  (
    'debugging-with-ai',
    'Debugging with AI Tools',
    'The fastest way to fix errors using AI — copy, paste, fix.',
    '2h8WSChA1-o',
    'Find a real error in your current project (or create one intentionally). Paste the full error stack trace into your AI tool and ask it to explain the error and suggest a fix. Apply the fix and verify it works.',
    20, 6, 3,
    'The fastest debugging workflow with AI: (1) Copy the full error message and stack trace — not just the last line. (2) Paste it into AI chat with "why is this happening and how do I fix it?" (3) If the first answer doesn''t work, add more context: paste the relevant function or component too. AI is especially good at decoding cryptic error messages that would take 20 minutes to Google.'
  )
) AS l(slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
ON CONFLICT (track_id, slug) DO NOTHING;

-- ─── LESSONS — Track 2: Cursor Mastery ───────────────────────────────────────

WITH t AS (SELECT id FROM public.tracks WHERE slug = 'cursor-mastery')
INSERT INTO public.lessons (track_id, slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
SELECT t.id, l.slug, l.title, l.description, l.youtube_video_id, l.challenge_prompt, l.xp_value, l.sort_order, l.level, l.summary
FROM t, (VALUES
  (
    'cursor-composer-intro',
    'Cursor Composer: Build Features Fast',
    'Use Composer to generate entire features from a single prompt.',
    'ocMOZpuAMw4',
    'Open Cursor Composer (Cmd+Shift+I). Give it a multi-step task: "Create a React component for a product card with image, title, price, and an add-to-cart button using Tailwind." Review the output and ask it to adjust one thing.',
    15, 1, 1,
    'Cursor Composer is different from inline chat — it is designed for multi-file, multi-step tasks. You describe a whole feature and it plans the changes across your codebase. Best practice: give it a clear, scoped task with the tech stack mentioned. Then iterate with follow-up prompts rather than starting over.'
  ),
  (
    'cursor-rules',
    'Cursor Rules: Make AI Follow Your Style',
    'Set up .cursorrules so AI always codes the way you want.',
    'FpJ48a5S5lU',
    'Create a .cursorrules file in your project root. Write rules for your stack (e.g., "Always use TypeScript. Use Tailwind for styling. Prefer functional components."). Ask Cursor to generate a new component and check if it follows your rules.',
    15, 2, 1,
    'Cursor Rules is a plain text file (.cursorrules) you put in your project root. Every AI interaction in that project will follow those rules. Use it to enforce: preferred language/framework, naming conventions, forbidden patterns (like "never use any"), and even tone ("explain changes in comments"). This is the single biggest quality-of-life improvement for team projects.'
  ),
  (
    'cursor-agent-mode',
    'Cursor Agent Mode: Let AI Drive',
    'Cursor 2.0 agent mode builds whole features autonomously.',
    '7iAWXJO-MbY',
    'Give Cursor Agent a real task from your project backlog — something that touches 2-3 files. Let it run, then review every file it changed. Write down one thing it did correctly and one thing you had to fix.',
    20, 3, 2,
    'Cursor Agent Mode can browse your codebase, run terminal commands, and make changes across many files to complete a task. The key to using it well: give it a task that is specific but not trivial (too simple = overkill, too vague = chaos). Always use the diff view to review changes before accepting. Think of it as a junior dev — fast but needs supervision.'
  ),
  (
    'refactoring-with-cursor',
    'Refactoring Code with Cursor',
    'How to clean up messy code fast using AI suggestions.',
    'pt-Xqr6DjM8',
    'Pick the messiest function in your current project. Select it all, hit Cmd+K, and prompt: "Refactor this to be more readable, add TypeScript types, and add a JSDoc comment." Accept or adjust the output.',
    15, 4, 2,
    'AI-assisted refactoring is one of the highest-ROI uses of Cursor. Select any block of code, use Cmd+K, and describe the improvement. Good refactoring prompts: "add error handling", "break this into smaller functions", "add TypeScript types", "make this more readable", "remove duplication". The AI keeps the logic the same while improving structure.'
  ),
  (
    'cursor-context-engineering',
    'Context Engineering in Cursor',
    'How the 1% use @files and codebase context to get perfect output.',
    'QgA55EnmUp4',
    'In a Cursor chat, use the @ symbol to pull in 2-3 specific files as context. Ask it to explain how those files interact with each other. Then ask it to make a change that spans all of them.',
    20, 5, 2,
    'Context is everything in AI coding. Cursor lets you use @filename, @folder, @docs, and @web to inject specific context into any prompt. The more relevant context you give, the less the AI hallucinates. Pro tip: instead of asking "fix my auth", say "looking at @auth.ts and @middleware.ts, why is the session not persisting after login?"'
  ),
  (
    'cursor-full-stack-build',
    'Build a Full Stack App with Cursor',
    'Watch a complete app get built from scratch using only Cursor.',
    'uSgeH_02VRA',
    'Use Cursor to scaffold a new mini-project from scratch. Start with: "Create a Next.js page that shows a list of items fetched from a mock API, with a loading state and error handling." Get it running locally.',
    25, 6, 3,
    'Building full stack with Cursor works best when you go layer by layer: (1) scaffold the data model/types first, (2) build the API/server actions, (3) build the UI that consumes them. Use Composer for each layer with explicit context about what you already built. The biggest mistake is asking for everything at once — scope each prompt to one layer or component.'
  )
) AS l(slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
ON CONFLICT (track_id, slug) DO NOTHING;

-- ─── LESSONS — Track 3: Ship with AI Tools ────────────────────────────────────

WITH t AS (SELECT id FROM public.tracks WHERE slug = 'ship-with-ai')
INSERT INTO public.lessons (track_id, slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
SELECT t.id, l.slug, l.title, l.description, l.youtube_video_id, l.challenge_prompt, l.xp_value, l.sort_order, l.level, l.summary
FROM t, (VALUES
  (
    'lovable-starter',
    'Master Lovable in 17 Minutes',
    'Build and deploy a full app from a text prompt with Lovable.',
    'Vf2K0pcTLEo',
    'Go to lovable.dev. Start a new project with the prompt: "Build a simple task manager with the ability to add, complete, and delete tasks. Use a clean minimal design." Share or screenshot the deployed URL.',
    15, 1, 1,
    'Lovable is a prompt-to-app platform — you describe the app you want and it generates a full React codebase, connects a Supabase backend, and gives you a live URL. Best for: MVPs, prototypes, and internal tools. The trick is being specific about both the UI and the data model in your initial prompt. You can then iterate with follow-up prompts like "add a filter by status" or "make the design dark mode".'
  ),
  (
    'replit-ai-agent',
    'Replit AI Agent: Build Apps in the Browser',
    'Use Replit''s AI Agent to build and run a full app without installing anything.',
    'qpIDMZZIv3s',
    'Open replit.com and start a new Repl. Use the AI Agent to build a simple REST API with two routes: GET /items and POST /items. Test it with the built-in HTTP tool.',
    15, 2, 1,
    'Replit is a browser-based IDE with an AI Agent that can write code, run it, fix errors, and iterate — all without you installing anything locally. It is perfect for beginners or quick experiments. The Agent can read your existing code and make targeted changes. Key tip: after the Agent makes a change, always read what it wrote before running it.'
  ),
  (
    'lovable-deploy',
    'Build and Deploy with Lovable',
    'From zero to live URL — full Lovable deployment walkthrough.',
    'ZD9pr2AWW7E',
    'Take the task manager app you built in Level 1 and add one new feature using a follow-up Lovable prompt (e.g., "add due dates to tasks" or "add a priority level"). Redeploy and share the link.',
    20, 3, 2,
    'Lovable''s deployment is one-click — every change you prompt automatically rebuilds and redeploys. The full stack includes React (frontend), Supabase (database and auth), and a CDN-hosted URL. When you want to go beyond Lovable''s UI, you can export the code to GitHub and continue in Cursor. This "Lovable to Cursor" handoff is a powerful workflow for going from prototype to production.'
  ),
  (
    'v0-ui-builder',
    'v0 by Vercel: Generate UI Instantly',
    'Use Vercel''s v0 to generate production-ready React components from text.',
    '41SR07p243Q',
    'Go to v0.dev. Prompt it: "Create a pricing page with three tiers: Free, Pro, and Enterprise. Use a dark background and highlight the Pro tier." Copy the generated code into your project and verify it renders.',
    15, 4, 2,
    'v0 by Vercel generates React + Tailwind components from text descriptions. Unlike full-app builders, v0 focuses purely on UI — you get clean, copy-pasteable component code. Best use case: you know what a page should look like but don''t want to write all the Tailwind by hand. Iterate with follow-ups like "make the CTA button bigger" or "add an FAQ section below".'
  ),
  (
    'bolt-new-fullstack',
    'Bolt.new: Full Stack Apps for Free',
    'Build and run full stack AI apps locally with Bolt.',
    'PgbwgPkoPTw',
    'Go to bolt.new. Prompt it to build a simple notes app with markdown support. Download the project, install dependencies, and run it locally. Note any errors you hit and how you fixed them.',
    20, 5, 2,
    'Bolt.new generates a full stack codebase (typically React + a simple backend) from a single prompt and lets you download or run it instantly. It is great for learning because you get real code you can study, unlike black-box no-code tools. When running locally, read the README it generates — it usually includes setup steps and environment variables you need.'
  ),
  (
    'ship-fast-workflow',
    'How to Ship AI Side Projects Fast',
    'The exact workflow to go from idea to live product in hours.',
    '_5TqFCrrE9s',
    'Plan a micro-project you could realistically ship this week. Write out: (1) the one-sentence description, (2) the tech stack and AI tool you will use, (3) the MVP feature list (max 3 features). Post it in the community board.',
    25, 6, 3,
    'The fastest way to ship with AI tools: (1) Start with Lovable or Bolt for the initial scaffold — get something visible in 30 minutes. (2) Move to Cursor for any complex logic or customization. (3) Deploy early and often — a live URL is more motivating than local development. (4) Scope ruthlessly — every feature you cut is shipping time saved. Done is better than perfect for a first MVP.'
  )
) AS l(slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
ON CONFLICT (track_id, slug) DO NOTHING;
