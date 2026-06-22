-- Speed Run Code — quiz questions seed
-- Run AFTER 003_quiz.sql

-- Helper: insert quiz questions by lesson slug + track slug
-- Track 1: ai-fundamentals
-- Track 2: cursor-mastery
-- Track 3: ship-with-ai

-- ─── TRACK 1 — AI Coding Fundamentals ────────────────────────────────────────

-- Lesson: what-are-ai-coding-tools (3 questions — intro, simple)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'what-are-ai-coding-tools' AND tracks.slug = 'ai-fundamentals'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'What is the primary purpose of an AI coding tool like Cursor?',
 '["To replace developers entirely","To autocomplete and generate code alongside you","To deploy apps to production","To design UI layouts"]', 1),
((SELECT id FROM l), 2,
 'Which of these is the best way to think about an AI coding assistant?',
 '["A magic button that always produces correct code","A search engine for Stack Overflow","A pair programmer that needs your guidance and review","An automated testing tool"]', 2),
((SELECT id FROM l), 3,
 'Why is it important to read the code that AI generates?',
 '["It is always wrong","AI tools have daily usage limits","The code may have bugs or not match your intent","Reading it earns bonus XP"]', 2);

-- Lesson: writing-better-prompts (5 questions — high importance skill)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'writing-better-prompts' AND tracks.slug = 'ai-fundamentals'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'Which prompt is most likely to produce useful output from an AI coding tool?',
 '["make a login","Build a React login form with email and password fields, validation, and a loading state using Tailwind CSS","do authentication","fix my code"]', 1),
((SELECT id FROM l), 2,
 'What does including "context" in a prompt mean?',
 '["Writing longer sentences","Telling the AI which language, framework, and codebase you are working in","Copying your entire project into the prompt","Adding emojis"]', 1),
((SELECT id FROM l), 3,
 'What is a "constraint" in a prompt?',
 '["A bug in your code","Something you DO NOT want the AI to do or include","The maximum token limit","A type of variable"]', 1),
((SELECT id FROM l), 4,
 'If the AI produces a wrong answer, the best next step is:',
 '["Start a new project","Add more context and retry with a more specific follow-up prompt","Assume the tool is broken","Delete the output and write everything manually"]', 1),
((SELECT id FROM l), 5,
 'Specifying the output format in a prompt (e.g., "return a function") is useful because:',
 '["It makes the prompt longer","It helps the AI produce exactly the structure you need without extra editing","Output format does not affect the result","It is required by the API"]', 1);

-- Lesson: cursor-top-features (4 questions — intermediate)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'cursor-top-features' AND tracks.slug = 'ai-fundamentals'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'What does Cmd+K (or Ctrl+K) do in Cursor?',
 '["Opens the file explorer","Triggers an inline AI edit on selected code","Commits your changes to git","Runs your tests"]', 1),
((SELECT id FROM l), 2,
 'What is the Cursor chat sidebar (Cmd+L) best used for?',
 '["Writing CSS","Asking questions about your code and getting explanations","Running terminal commands","Previewing your UI"]', 1),
((SELECT id FROM l), 3,
 'The @ symbol in Cursor chat is used to:',
 '["Tag a teammate","Mention a GitHub issue","Pull specific files, folders, or docs into the AI context","Format code blocks"]', 2),
((SELECT id FROM l), 4,
 'Cursor Tab (autocomplete) learns from:',
 '["Only public GitHub repos","Only the current file","Your codebase and recent edits to predict the next logical change","Your keyboard shortcuts"]', 2);

-- Lesson: github-copilot-basics (3 questions)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'github-copilot-basics' AND tracks.slug = 'ai-fundamentals'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'What is the fastest way to trigger a useful Copilot suggestion?',
 '["Press F5","Write a detailed comment describing what you want, then press Enter","Open a new file","Install more extensions"]', 1),
((SELECT id FROM l), 2,
 'How do you accept a GitHub Copilot suggestion?',
 '["Enter","Ctrl+Space","Tab","Escape"]', 2),
((SELECT id FROM l), 3,
 'Copilot Chat is different from autocomplete because:',
 '["It costs more","It lets you ask questions and have a conversation about your code","It only works in Python","It requires an internet connection"]', 1);

-- Lesson: ai-inline-chat (4 questions — new concept)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'ai-inline-chat' AND tracks.slug = 'ai-fundamentals'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'What makes Agent Mode different from regular AI chat?',
 '["It is faster","It can read your codebase, make a plan, and edit multiple files to complete a task","It only works online","It requires a paid plan"]', 1),
((SELECT id FROM l), 2,
 'Agent Mode is best suited for:',
 '["Fixing a single typo","Small one-line changes","Larger tasks like adding auth or migrating a component to TypeScript","Writing documentation only"]', 2),
((SELECT id FROM l), 3,
 'After Agent Mode makes changes, you should:',
 '["Deploy immediately","Always review the diff before accepting any changes","Restart your computer","Delete all the changes and redo manually"]', 1),
((SELECT id FROM l), 4,
 'Agent Mode acts rather than advises. This means:',
 '["It talks you through the steps","It directly edits your files","It only generates suggestions you manually apply","It writes tests for you"]', 1);

-- Lesson: debugging-with-ai (4 questions — critical skill)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'debugging-with-ai' AND tracks.slug = 'ai-fundamentals'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'When pasting an error into AI for debugging, you should include:',
 '["Only the last line of the error","The full error message AND stack trace","Just the file name","Your entire codebase"]', 1),
((SELECT id FROM l), 2,
 'If the AI first answer does not fix the bug, the best approach is:',
 '["Give up and rewrite everything","Add more context — paste the relevant function or component too","Try a completely different AI tool","Ignore the AI and Google it"]', 1),
((SELECT id FROM l), 3,
 'AI is especially good at debugging because:',
 '["It runs your code for you","It can decode cryptic error messages that would take long to research manually","It never makes mistakes","It replaces the need for a debugger"]', 1),
((SELECT id FROM l), 4,
 'What is the correct debugging workflow described in the lesson?',
 '["Copy error → paste to AI → ask to explain AND fix → apply → verify","Just search Google","Ask AI without any error message","Delete the file and start over"]', 0);

-- ─── TRACK 2 — Cursor Mastery ─────────────────────────────────────────────────

-- Lesson: cursor-composer-intro (4 questions)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'cursor-composer-intro' AND tracks.slug = 'cursor-mastery'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'What shortcut opens Cursor Composer?',
 '["Cmd+K","Cmd+L","Cmd+Shift+I","Cmd+P"]', 2),
((SELECT id FROM l), 2,
 'Composer is designed for:',
 '["Single-line edits","Multi-file, multi-step feature generation from a single prompt","Renaming variables","Running tests"]', 1),
((SELECT id FROM l), 3,
 'After Composer generates a feature, the best practice is:',
 '["Deploy it immediately","Review the output, then iterate with follow-up prompts","Discard it and write manually","Accept everything without reading"]', 1),
((SELECT id FROM l), 4,
 'For best Composer results, your prompt should include:',
 '["Only a one-word description","The tech stack and a clear, scoped task description","Your full codebase","Only the feature name"]', 1);

-- Lesson: cursor-rules (4 questions — high value)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'cursor-rules' AND tracks.slug = 'cursor-mastery'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'Where does the .cursorrules file go?',
 '["In the src folder","In your home directory","In the project root","In node_modules"]', 2),
((SELECT id FROM l), 2,
 'What is the main benefit of .cursorrules?',
 '["It speeds up autocomplete","Every AI interaction in that project follows your defined rules automatically","It adds type checking","It connects to GitHub"]', 1),
((SELECT id FROM l), 3,
 'Which of these is a good .cursorrules entry?',
 '["Run faster","Always use TypeScript. Use Tailwind for styling. Prefer functional components.","Make it look nice","Generate more suggestions"]', 1),
((SELECT id FROM l), 4,
 '.cursorrules is especially useful for teams because:',
 '["It is required by Cursor","It enforces coding conventions across all AI-generated code in the project","It backs up your code","It reduces API costs"]', 1);

-- Lesson: cursor-agent-mode (5 questions — complex topic)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'cursor-agent-mode' AND tracks.slug = 'cursor-mastery'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'Cursor Agent Mode can:',
 '["Only edit one file at a time","Browse your codebase, run commands, and edit multiple files to complete a task","Only generate comments","Only work on JavaScript"]', 1),
((SELECT id FROM l), 2,
 'The best tasks for Agent Mode are:',
 '["Fixing a single typo","Trivial one-line changes","Specific but non-trivial tasks that span 2-3 files","Rewriting your entire codebase"]', 2),
((SELECT id FROM l), 3,
 'Think of Agent Mode like:',
 '["A senior dev who never needs review","A junior dev — fast but needs supervision","An automated CI/CD pipeline","A linter"]', 1),
((SELECT id FROM l), 4,
 'Before accepting Agent Mode changes you should:',
 '["Run git push","Review the diff view carefully","Restart Cursor","Nothing — it is always correct"]', 1),
((SELECT id FROM l), 5,
 'A task that is "too vague" for Agent Mode would be:',
 '["Add error handling to the login function","Fix the TypeScript types in auth.ts","Make my app better","Refactor the UserCard component to use Tailwind"]', 2);

-- Lesson: refactoring-with-cursor (3 questions)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'refactoring-with-cursor' AND tracks.slug = 'cursor-mastery'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'To refactor a function with Cursor, you should:',
 '["Retype the whole function","Select the code, press Cmd+K, and describe the improvement","Ask in the chat sidebar only","Use find and replace"]', 1),
((SELECT id FROM l), 2,
 'Which of these is a strong refactoring prompt?',
 '["make it better","Add TypeScript types, break this into smaller functions, and add error handling","change colors","delete this"]', 1),
((SELECT id FROM l), 3,
 'AI refactoring preserves:',
 '["Nothing — it rewrites from scratch","The original logic while improving structure, readability, or types","Only the comments","Only the variable names"]', 1);

-- Lesson: cursor-context-engineering (4 questions — advanced)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'cursor-context-engineering' AND tracks.slug = 'cursor-mastery'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'In Cursor, the @ symbol in chat lets you:',
 '["Tag another user","Inject specific files, folders, or docs as context into your prompt","Search the internet","Access terminal commands"]', 1),
((SELECT id FROM l), 2,
 'Why is providing context so important in AI coding?',
 '["It makes prompts longer","The more relevant context you give, the less the AI hallucinates or guesses","It is required by the API","Context slows down the response"]', 1),
((SELECT id FROM l), 3,
 'Which prompt makes better use of context?',
 '["fix my auth","Looking at @auth.ts and @middleware.ts, why is the session not persisting after login?","help","auth broken"]', 1),
((SELECT id FROM l), 4,
 '@docs in Cursor is used to:',
 '["Add code comments","Pull in external documentation (like framework docs) as AI context","Open the Cursor documentation","List all files in your project"]', 1);

-- Lesson: cursor-full-stack-build (4 questions)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'cursor-full-stack-build' AND tracks.slug = 'cursor-mastery'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'When building full stack with Cursor, the recommended order is:',
 '["UI first, then database","Data model and types → API/server actions → UI","All at once in one prompt","Deploy first, then build"]', 1),
((SELECT id FROM l), 2,
 'The biggest mistake when prompting Cursor for a full app is:',
 '["Using TypeScript","Asking for everything at once instead of one layer at a time","Adding too many comments","Using Tailwind"]', 1),
((SELECT id FROM l), 3,
 'When using Composer for different layers, you should:',
 '["Reuse the exact same prompt","Provide explicit context about what you already built in each new Composer prompt","Start a new project for each layer","Ignore previous layers"]', 1),
((SELECT id FROM l), 4,
 'After Cursor generates a full stack scaffold, your next step should be:',
 '["Deploy immediately","Read through all generated files before running anything","Delete everything and start over","Add more features immediately"]', 1);

-- ─── TRACK 3 — Ship with AI Tools ─────────────────────────────────────────────

-- Lesson: lovable-starter (4 questions)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'lovable-starter' AND tracks.slug = 'ship-with-ai'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'Lovable is best described as:',
 '["A code editor like VS Code","A prompt-to-app platform that generates a full React codebase and deploys it","A database tool","A design tool like Figma"]', 1),
((SELECT id FROM l), 2,
 'For best Lovable results, your initial prompt should include:',
 '["Just the app name","Both the UI description AND the data model you need","Only the color scheme","Only the tech stack"]', 1),
((SELECT id FROM l), 3,
 'After the initial Lovable build, you can:',
 '["Never change anything","Iterate with follow-up prompts like add filter by status","Only change the colors","Export to PDF"]', 1),
((SELECT id FROM l), 4,
 'Lovable is best for:',
 '["Building OS kernels","MVPs, prototypes, and internal tools","Machine learning models","Mobile app binaries"]', 1);

-- Lesson: replit-ai-agent (3 questions)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'replit-ai-agent' AND tracks.slug = 'ship-with-ai'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'Replit is useful for beginners because:',
 '["It requires no installations — everything runs in the browser","It is the cheapest option","It only supports Python","It has the most AI features"]', 0),
((SELECT id FROM l), 2,
 'After the Replit AI Agent makes a change, you should:',
 '["Deploy immediately","Read what it wrote before running it","Restart the browser","Delete the change"]', 1),
((SELECT id FROM l), 3,
 'Replit Agent is best for:',
 '["Large production apps","Quick experiments and learning without a local setup","Deploying to AWS","Writing machine learning models"]', 1);

-- Lesson: lovable-deploy (4 questions)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'lovable-deploy' AND tracks.slug = 'ship-with-ai'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'Lovable deployment is:',
 '["Manual — you push to GitHub yourself","One-click — every prompt change automatically rebuilds and redeploys","Requires a paid server","Requires Docker"]', 1),
((SELECT id FROM l), 2,
 'Lovable full stack includes:',
 '["React, Supabase, and a CDN-hosted URL","React and AWS Lambda","Vue.js and Firebase","Angular and MySQL"]', 0),
((SELECT id FROM l), 3,
 'The "Lovable to Cursor" handoff means:',
 '["Lovable replaces Cursor","You export the Lovable code to GitHub and continue building in Cursor","Cursor runs inside Lovable","You lose all your Lovable work"]', 1),
((SELECT id FROM l), 4,
 'When should you move from Lovable to Cursor?',
 '["Never","When you need complex custom logic beyond what Lovable prompts can handle","When you run out of Lovable credits","Only for mobile apps"]', 1);

-- Lesson: v0-ui-builder (3 questions)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'v0-ui-builder' AND tracks.slug = 'ship-with-ai'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'v0 by Vercel is focused on:',
 '["Generating full backend APIs","Generating clean React + Tailwind UI components from text","Database schema design","CI/CD pipelines"]', 1),
((SELECT id FROM l), 2,
 'v0 output is:',
 '["A deployed live URL","Copy-pasteable React component code you add to your project","A Figma file","A video tutorial"]', 1),
((SELECT id FROM l), 3,
 'After getting a v0 component, you can:',
 '["Never change it","Iterate with follow-ups like make the CTA bigger or add a FAQ section","Only use it in Vercel projects","Print it"]', 1);

-- Lesson: bolt-new-fullstack (4 questions)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'bolt-new-fullstack' AND tracks.slug = 'ship-with-ai'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'Bolt.new generates:',
 '["Only HTML files","A full stack codebase you can download or run instantly","A video walkthrough","A Figma prototype"]', 1),
((SELECT id FROM l), 2,
 'Bolt is great for learning because:',
 '["It hides all code from you","You get real code to study, unlike black-box no-code tools","It only uses Python","It auto-deploys to production"]', 1),
((SELECT id FROM l), 3,
 'When running a Bolt project locally, the first thing to check is:',
 '["The color scheme","The README — it usually includes setup steps and required env variables","Your internet speed","The Bolt website"]', 1),
((SELECT id FROM l), 4,
 'Bolt.new is best for:',
 '["Large enterprise apps","Quick full stack experiments you want to run and study locally","Only static websites","Only mobile apps"]', 1);

-- Lesson: ship-fast-workflow (5 questions — capstone lesson)
WITH l AS (
  SELECT lessons.id FROM public.lessons
  JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'ship-fast-workflow' AND tracks.slug = 'ship-with-ai'
)
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1,
 'The fastest way to get something visible quickly is:',
 '["Plan for 2 weeks first","Start with Lovable or Bolt to scaffold in 30 minutes","Write everything from scratch","Wait for a perfect idea"]', 1),
((SELECT id FROM l), 2,
 'When should you move from Lovable/Bolt to Cursor?',
 '["Never — stick to one tool","When you need complex custom logic or want deeper control","Only after 100 users","When you change your mind about the idea"]', 1),
((SELECT id FROM l), 3,
 'Why should you deploy early and often?',
 '["It saves API credits","A live URL is more motivating and forces real feedback faster","It is required by Supabase","It reduces code size"]', 1),
((SELECT id FROM l), 4,
 'MVP scoping means:',
 '["Building every feature you can think of","Cutting ruthlessly — every feature you skip is shipping time saved","Only building the design","Adding as much as possible to impress users"]', 1),
((SELECT id FROM l), 5,
 '"Done is better than perfect" for an MVP means:',
 '["Ship broken code","A live, working product with limited features is more valuable than an unfinished perfect one","Never improve after shipping","Ignore user feedback"]', 1);
