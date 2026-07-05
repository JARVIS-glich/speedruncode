-- Speed Run Code — quiz questions for Tracks 4-7
-- Run AFTER 006_new_tracks.sql and 003_quiz.sql

-- ─── TRACK 4 — No-Code App Builders ──────────────────────────────────────────

-- bubble-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'bubble-intro' AND tracks.slug = 'no-code-builders')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'What makes Bubble different from website builders like Wix?',
 '["Better templates","Bubble includes a full database, user auth, workflows, and visual UI — not just a design tool","Cheaper pricing","It runs on mobile only"]', 1),
((SELECT id FROM l), 2, 'In Bubble, the three core concepts are:',
 '["Pages, images, and buttons","Elements on the page, data types, and workflows","Rows, columns, and grids","Users, admins, and guests"]', 1),
((SELECT id FROM l), 3, 'A Bubble workflow is:',
 '["A CSS animation","Logic that runs when something happens (e.g. button clicked → create record)","A type of database table","A color theme"]', 1);

-- bubble-database
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'bubble-database' AND tracks.slug = 'no-code-builders')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'In Bubble, "data types" are equivalent to:',
 '["CSS classes","Database tables","JavaScript functions","UI components"]', 1),
((SELECT id FROM l), 2, 'Privacy rules in Bubble control:',
 '["Font sizes","Who can read or write each data type — must be set before going live","Color schemes","Which users see which pages"]', 1),
((SELECT id FROM l), 3, 'A Repeating Group in Bubble is used to:',
 '["Add animations","Display a list of items from a data type","Create a navigation menu","Add a video"]', 1),
((SELECT id FROM l), 4, 'Which Bubble field type creates a relationship between two data types?',
 '["Text field","Number field","Linked field (type: another data type)","Date field"]', 2);

-- bubble-saas
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'bubble-saas' AND tracks.slug = 'no-code-builders')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'The most common mistake when building a SaaS in Bubble is:',
 '["Using too many colors","Building the UI before designing the data model","Adding too many users","Not using Tailwind"]', 1),
((SELECT id FROM l), 2, 'To make content user-specific in Bubble, you use:',
 '["A global variable","The Current User expression in your data queries and workflows","A cookie","A special plugin"]', 1),
((SELECT id FROM l), 3, 'Building a SaaS in Bubble follows which order?',
 '["Deploy first, then design","UI → Data → Workflows","Data model → UI pages → Workflows","Workflows → Data → UI"]', 2);

-- webflow-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'webflow-intro' AND tracks.slug = 'no-code-builders')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'Webflow is best described as:',
 '["A database platform","A visual web builder that outputs clean HTML/CSS without plugins","An app store","A payment processor"]', 1),
((SELECT id FROM l), 2, 'The key difference between Webflow and Wix/Squarespace is:',
 '["Webflow is free","Webflow gives you full CSS control visually — margin, padding, flex, grid","Webflow has more templates","Webflow is mobile-only"]', 1),
((SELECT id FROM l), 3, 'Webflow is best suited for:',
 '["Complex app logic with databases","Marketing sites, portfolios, and content-driven websites","Mobile apps","Machine learning dashboards"]', 1);

-- webflow-cms
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'webflow-cms' AND tracks.slug = 'no-code-builders')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'A Webflow CMS Collection is:',
 '["A folder of images","A structured content type — like a Blog Posts table with defined fields","A navigation menu","A payment plan"]', 1),
((SELECT id FROM l), 2, 'A Collection Page in Webflow:',
 '["Is a single static page","Is a template that generates one page per CMS item automatically","Only works with images","Requires code"]', 1),
((SELECT id FROM l), 3, 'CMS makes a Webflow site scalable because:',
 '["You no longer need hosting","You define a template once and Webflow generates pages for every content item","It adds a database backend","It connects to Supabase"]', 1);

-- flutterflow-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'flutterflow-intro' AND tracks.slug = 'no-code-builders')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'FlutterFlow is different from other no-code tools because:',
 '["It is free","It generates real Flutter code that compiles to native iOS and Android — not a web wrapper","It only works on desktop","It requires Xcode"]', 1),
((SELECT id FROM l), 2, 'Local state in FlutterFlow is used for:',
 '["Data that persists across the whole app","UI toggles and interactions within a single screen","User authentication","Database queries"]', 1),
((SELECT id FROM l), 3, 'App state in FlutterFlow is used for:',
 '["Styling buttons","User data and values that need to be available across multiple screens","Animations","Network requests"]', 1);

-- glide-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'glide-intro' AND tracks.slug = 'no-code-builders')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'Glide builds apps from:',
 '["Figma designs","Google Sheets or Glide Tables — turning spreadsheet data into mobile-first apps","HTML files","Python scripts"]', 1),
((SELECT id FROM l), 2, 'Glide is best used for:',
 '["Complex SaaS products","Internal tools, directories, and event apps where data already lives in a spreadsheet","Machine learning","Video streaming"]', 1),
((SELECT id FROM l), 3, 'When should you use Bubble instead of Glide?',
 '["When you need a simple list view","When you need complex app logic, user roles, and custom workflows","When you have a Google Sheet","When you want a free app"]', 1);

-- ─── TRACK 5 — Backend & Database ────────────────────────────────────────────

-- airtable-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'airtable-intro' AND tracks.slug = 'backend-database')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'The key difference between Airtable and Google Sheets is:',
 '["Airtable is older","Airtable has typed fields, relational linking, and multiple views — it thinks like a database","Airtable is only for images","Airtable is offline-only"]', 1),
((SELECT id FROM l), 2, 'Airtable Views allow you to:',
 '["Change font sizes","See the same data as Grid, Kanban, Calendar, or Gallery without changing the underlying data","Delete records","Add formulas"]', 1),
((SELECT id FROM l), 3, 'Airtable is best for:',
 '["Production APIs at scale","Prototyping data models and internal tools quickly before building a real backend","Replacing Supabase","Mobile apps"]', 1);

-- airtable-relations
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'airtable-relations' AND tracks.slug = 'backend-database')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'A Linked Record field in Airtable:',
 '["Embeds a URL","Creates a relationship between two tables — like a foreign key","Changes the row color","Adds a formula"]', 1),
((SELECT id FROM l), 2, 'A Rollup field in Airtable:',
 '["Uploads files","Aggregates data from linked records — e.g. count orders per product","Changes the view","Sends an email"]', 1),
((SELECT id FROM l), 3, 'Understanding relational data in Airtable prepares you for:',
 '["Using Webflow","Real backends like Xano, Supabase, or Firebase — the concepts are identical with SQL underneath","Only Airtable itself","No-code mobile apps"]', 1);

-- xano-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'xano-intro' AND tracks.slug = 'backend-database')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'Xano is best described as:',
 '["A UI builder","A no-code backend — real Postgres database, visual API builder, and authentication you own","A mobile app tool","A payment processor"]', 1),
((SELECT id FROM l), 2, 'In Xano, everything is structured as:',
 '["Components","API endpoints that your frontend calls to read and write data","Themes","Plugins"]', 1),
((SELECT id FROM l), 3, 'Xano sits between your:',
 '["Domain and server","Frontend (Bubble, FlutterFlow, etc.) and your database","Database and email","Users and payments"]', 1),
((SELECT id FROM l), 4, 'You should move from Airtable to Xano when:',
 '["You need a fancier spreadsheet","You need real API endpoints, auth you control, and business logic","Your team grows to 5 people","You want a mobile app"]', 1);

-- supabase-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'supabase-intro' AND tracks.slug = 'backend-database')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'Supabase provides:',
 '["Only a database","Postgres database, authentication, file storage, and auto-generated APIs — all in one","Only authentication","Only hosting"]', 1),
((SELECT id FROM l), 2, 'Row Level Security (RLS) in Supabase:',
 '["Limits the number of rows you can store","SQL policies that enforce who can read or write which rows on every query","Encrypts your database","Backs up your data"]', 1),
((SELECT id FROM l), 3, 'You should always enable RLS:',
 '["Never — it slows things down","Only on the profiles table","On every table before going live","Only on paid plans"]', 2),
((SELECT id FROM l), 4, 'Supabase is the preferred backend for:',
 '["Only Bubble apps","AI coding tools like Cursor and Lovable — it is the most developer-friendly choice","Only mobile apps","Only enterprise apps"]', 1);

-- firebase-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'firebase-intro' AND tracks.slug = 'backend-database')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'Firestore (Firebase database) is:',
 '["A SQL database like Postgres","A NoSQL database — collections of documents (JSON objects) instead of tables and rows","A spreadsheet","A file storage system"]', 1),
((SELECT id FROM l), 2, 'Firebase Security Rules are equivalent to Supabase:',
 '["Migrations","Row Level Security (RLS) — they run on every read/write and enforce access","API keys","Backups"]', 1),
((SELECT id FROM l), 3, 'Firebase is the natural choice when:',
 '["You use Cursor or Lovable","You are building with FlutterFlow or need Google ecosystem integrations","You need SQL queries","You want the cheapest option"]', 1);

-- backend-which-one
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'backend-which-one' AND tracks.slug = 'backend-database')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'If you are building with Cursor or Lovable, the best backend is:',
 '["Airtable","Xano","Supabase — most developer-friendly for code-based frontends","Firebase"]', 2),
((SELECT id FROM l), 2, 'If you are building a no-code app in Bubble or Webflow, the best backend is:',
 '["Supabase","Xano — visual API builder designed for no-code frontends","Airtable","Firebase"]', 1),
((SELECT id FROM l), 3, 'The golden rule for choosing a backend is:',
 '["Always use the newest tool","Pick the cheapest option","Match your backend to your frontend tool","Always use Firebase"]', 2),
((SELECT id FROM l), 4, 'Airtable is best when:',
 '["You need production-grade APIs","You just need to structure data quickly and share it with a team","You are building a mobile app","You need user authentication"]', 1);

-- ─── TRACK 6 — Automation & Workflows ────────────────────────────────────────

-- zapier-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'zapier-intro' AND tracks.slug = 'automation')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'A Zapier "Zap" consists of:',
 '["Only a trigger","A Trigger (something that happens) and one or more Actions (things Zapier does in response)","Only actions","A database and a webhook"]', 1),
((SELECT id FROM l), 2, 'Zapier is best for:',
 '["Complex branching logic with loops","Simple linear automations — when X happens, do Y","Building databases","Writing code"]', 1),
((SELECT id FROM l), 3, 'Zapier connects apps using:',
 '["APIs you write yourself","Field mapping — data from the trigger payload is mapped to action fields","SQL queries","JavaScript"]', 1);

-- zapier-advanced
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'zapier-advanced' AND tracks.slug = 'automation')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'A Filter step in Zapier:',
 '["Transforms data formats","Stops the Zap from continuing if a condition is not met","Adds a new action","Creates a branch"]', 1),
((SELECT id FROM l), 2, 'Zapier Paths allow:',
 '["Looping through arrays","Branching — different actions based on different conditions","Running code","Calling any API"]', 1),
((SELECT id FROM l), 3, 'The main limitation of Zapier compared to Make/n8n is:',
 '["Fewer integrations","It cannot do complex looping, error handling, or non-sequential logic","It is slower","It has no free plan"]', 1);

-- make-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'make-intro' AND tracks.slug = 'automation')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'Make (Integromat) has an advantage over Zapier because:',
 '["It has more integrations","It supports real branching (Routers), loops (Iterators), and error handling","It is cheaper","It is older"]', 1),
((SELECT id FROM l), 2, 'A Router module in Make:',
 '["Connects to a server","Creates conditional branches — different paths based on conditions","Sends an HTTP request","Iterates through an array"]', 1),
((SELECT id FROM l), 3, 'Make is better than Zapier when:',
 '["You need simple A to B automation","You need to process lists, handle errors, or do conditional branching","You want a faster setup","You only use Gmail"]', 1);

-- make-advanced
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'make-advanced' AND tracks.slug = 'automation')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'An Iterator module in Make:',
 '["Sends emails","Takes an array and processes each item one-by-one through the rest of the scenario","Filters data","Creates a branch"]', 1),
((SELECT id FROM l), 2, 'The HTTP module in Make lets you:',
 '["Send emails","Call any API endpoint — even ones without a native Make integration","Create database tables","Loop through arrays"]', 1),
((SELECT id FROM l), 3, 'An Aggregator in Make:',
 '["Splits data into parts","Collects results from an Iterator back into a single bundle","Filters records","Calls a webhook"]', 1);

-- n8n-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'n8n-intro' AND tracks.slug = 'automation')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'n8n is unique compared to Zapier and Make because:',
 '["It has fewer integrations","It is open-source, can be self-hosted for free, and supports code nodes and AI natively","It is the most expensive","It only works with webhooks"]', 1),
((SELECT id FROM l), 2, 'Every node in n8n receives and outputs:',
 '["A single value","Items — an array of objects","A string","A database connection"]', 1),
((SELECT id FROM l), 3, 'Understanding the n8n items model means:',
 '["Knowing how to use Make","Understanding that every node processes an array of items and outputs an array — this is key to chaining nodes correctly","Knowing JavaScript","Using webhooks only"]', 1);

-- n8n-advanced
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'n8n-advanced' AND tracks.slug = 'automation')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'The Code node in n8n lets you:',
 '["Only filter data","Write JavaScript to transform data in any way with no restrictions","Send emails","Create HTTP routes"]', 1),
((SELECT id FROM l), 2, 'In the Code node, the correct pattern for transforming items is:',
 '["items.filter(item => item.json.field)","items.map(item => ({ json: { ...item.json, newField: transform(item.json.oldField) } }))","items.reduce()","items.forEach()"]', 1),
((SELECT id FROM l), 3, 'n8n + AI is the foundation of AI agent systems because:',
 '["n8n is cheaper than OpenAI","A trigger fires → data is fetched → AI processes it → results are stored or sent — this is the infrastructure for AI products","n8n writes the AI prompts for you","n8n hosts AI models"]', 1);

-- ─── TRACK 7 — AI Agents & Monetization ──────────────────────────────────────

-- chatgpt-architect
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'chatgpt-architect' AND tracks.slug = 'ai-agents-money')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'Before building, spending 20 minutes talking to AI about your product helps because:',
 '["It writes the code for you","AI can pattern-match your idea to the right stack and surface risks you may not have considered","It deploys your app","It creates your database"]', 1),
((SELECT id FROM l), 2, 'The best prompts when using AI as a product architect include:',
 '["Just the app name","Your constraints (budget, timeline, skill level), your users, and asking for tradeoffs — not just recommendations","Only the tech stack","A list of features"]', 1),
((SELECT id FROM l), 3, 'Asking AI "why would I NOT use Bubble for this?" is valuable because:',
 '["It confuses the AI","It forces AI to surface tradeoffs and limitations rather than just agreeing with you","It gives a cheaper answer","It generates more code"]', 1);

-- voiceflow-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'voiceflow-intro' AND tracks.slug = 'ai-agents-money')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'Voiceflow is used to build:',
 '["Mobile apps","Customer-facing AI chat and voice agents — without code","SQL databases","Payment flows"]', 1),
((SELECT id FROM l), 2, 'A Capture block in Voiceflow:',
 '["Sends a message","Waits for and stores user input","Calls an external API","Ends the conversation"]', 1),
((SELECT id FROM l), 3, 'Voiceflow agents can be deployed to:',
 '["Only Voiceflow.com","Any website, Intercom, or via API — no engineering required","Only mobile apps","Only Slack"]', 1);

-- lindy-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'lindy-intro' AND tracks.slug = 'ai-agents-money')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'Lindy differs from n8n and Make because:',
 '["It has more integrations","Lindy uses AI to decide what actions to take based on plain English instructions — you do not define every step","It is cheaper","It has a visual canvas"]', 1),
((SELECT id FROM l), 2, 'The three components of a Lindy agent are:',
 '["Input, output, and storage","Trigger (when), Instructions (what to do), and Tools (the apps it can use)","Prompt, model, and response","Database, API, and UI"]', 1),
((SELECT id FROM l), 3, 'The best practice when first setting up a Lindy is:',
 '["Give it broad permissions immediately","Start with one well-defined task before expanding its permissions and scope","Connect all your apps at once","Let it run for a week before reviewing"]', 1);

-- relevance-ai
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'relevance-ai' AND tracks.slug = 'ai-agents-money')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'In Relevance AI, a "tool" is:',
 '["A Zapier integration","A small AI-powered function — like research a company or write an email","A database table","A webhook"]', 1),
((SELECT id FROM l), 2, 'The key advantage of Relevance AI over raw OpenAI is:',
 '["Lower API costs","Structured outputs, retry logic, and tool chaining without raw prompt engineering","Better models","More integrations"]', 1),
((SELECT id FROM l), 3, 'Relevance AI agents combine multiple tools to:',
 '["Replace your entire team","Run a sequence of AI-powered steps toward a business goal","Generate images","Send SMS messages"]', 1);

-- gumloop-intro
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'gumloop-intro' AND tracks.slug = 'ai-agents-money')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'Gumloop is best described as:',
 '["A no-code website builder","A visual AI workflow builder — like n8n but with AI processing built natively at every step","A database tool","A payment processor"]', 1),
((SELECT id FROM l), 2, 'MCP (Model Context Protocol) support in Gumloop means:',
 '["Gumloop hosts AI models","AI agents can plug into external tools and data sources natively","Gumloop is open-source","MCP reduces costs"]', 1),
((SELECT id FROM l), 3, 'Gumloop is best used for:',
 '["Simple A to B automations","AI data pipelines — content generation at scale, lead enrichment, and document processing","Building mobile apps","Creating databases"]', 1);

-- stripe-payments
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'stripe-payments' AND tracks.slug = 'ai-agents-money')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'For no-code builders, the easiest way to accept payments with Stripe is:',
 '["Write a payment API from scratch","Use Stripe Payment Links — a shareable URL that accepts payment with zero code","Use PayPal instead","Add a bank transfer form"]', 1),
((SELECT id FROM l), 2, 'The Customer Portal in Stripe allows users to:',
 '["View analytics","Self-manage their subscription — upgrade, downgrade, or cancel","Edit their profile","View your code"]', 1),
((SELECT id FROM l), 3, 'The complete no-code Stripe integration flow is:',
 '["Build a payment form in HTML","Create a Payment Link → send users there when they upgrade → listen for successful payment via webhook → update your database","Deploy a Node.js server","Use a Stripe SDK"]', 1);

-- ship-your-product
WITH l AS (SELECT lessons.id FROM public.lessons JOIN public.tracks ON tracks.id = lessons.track_id
  WHERE lessons.slug = 'ship-your-product' AND tracks.slug = 'ai-agents-money')
INSERT INTO public.lesson_quizzes (lesson_id, sort_order, question, options, answer) VALUES
((SELECT id FROM l), 1, 'When combining tools to ship a product, you should:',
 '["Pick one tool for everything","Know which tool to reach for based on the job — UI builder, backend, automation, AI agents, payments","Always use the newest tools","Start with payments first"]', 1),
((SELECT id FROM l), 2, 'The builder who ships 10x faster is the one who:',
 '["Knows one tool extremely well","Knows when to use each tool in the stack — and does not use one tool for everything","Has the most experience","Uses only open-source tools"]', 1),
((SELECT id FROM l), 3, 'Layer 1 of building any product should be:',
 '["The payment system","The marketing page","The data model — what data do you need to store?","The AI agent"]', 2);
