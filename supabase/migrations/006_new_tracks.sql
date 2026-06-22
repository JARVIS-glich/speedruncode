-- Speed Run Code — 4 new tracks: No-Code Builders, Backend & Database, Automation, AI Agents & Monetization
-- Run this in Supabase SQL Editor after 002_seed_content.sql

-- ─── NEW TRACKS ───────────────────────────────────────────────────────────────

INSERT INTO public.tracks (slug, title, description, sort_order) VALUES
  ('no-code-builders',   'No-Code App Builders',       'Build real web and mobile apps without writing code — Bubble, Webflow, FlutterFlow, and Glide from zero to shipped.', 4),
  ('backend-database',   'Backend & Database',          'Every app needs data. Learn Airtable, Xano, Supabase, and Firebase — from fake backends to production-grade APIs.', 5),
  ('automation',         'Automation & Workflows',      'Connect your tools, eliminate manual work, and build systems that run themselves — Zapier, Make, and n8n.', 6),
  ('ai-agents-money',    'AI Agents & Monetization',    'Deploy AI agents that work for you, add payments to anything, and use AI as your product architect — Voiceflow, Lindy, Stripe, and more.', 7)
ON CONFLICT (slug) DO NOTHING;

-- ─── TRACK 4: No-Code App Builders ───────────────────────────────────────────

WITH t AS (SELECT id FROM public.tracks WHERE slug = 'no-code-builders')
INSERT INTO public.lessons (track_id, slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
SELECT t.id, l.slug, l.title, l.description, l.youtube_video_id, l.challenge_prompt, l.xp_value, l.sort_order, l.level, l.summary
FROM t, (VALUES
  (
    'bubble-intro',
    'Bubble: Build a Web App in 10 Minutes',
    'The fastest way to understand what Bubble can do — from zero to running app.',
    'axeOmRNpXMM',
    'Go to bubble.io and create a free account. Build a single-page app that lets a user type their name and see "Hello, [name]!" displayed below. Deploy it and share the link.',
    10, 1, 1,
    'Bubble is the most powerful no-code platform for building real web apps. Unlike website builders, Bubble gives you a full database, user authentication, workflows (logic), and a visual UI editor — all without code. The core mental model: everything in Bubble is either (1) an element on the page, (2) data in a type, or (3) a workflow that runs when something happens. Master these three concepts and you can build anything.'
  ),
  (
    'bubble-database',
    'Bubble Database, Workflows & User Roles',
    'How Bubble handles real data, business logic, and permissions.',
    'OAhjiBVzvCM',
    'In your Bubble app, create a data type called "Task" with fields: title (text), done (boolean), created_by (User). Build a workflow that creates a new Task when a button is clicked, and display all tasks for the current user in a repeating group.',
    15, 2, 1,
    'Bubble''s database uses "data types" (like tables) and "fields" (like columns). Relationships between types use "linked fields" — e.g., a Task has a "created_by" field of type User. Workflows are Bubble''s version of code: "When button clicked → Create a new Task → Set title to Input''s value." Privacy rules (under Data tab) control who can read or write each type — always set these before going live.'
  ),
  (
    'bubble-saas',
    'Build a SaaS App with Bubble',
    'Full walkthrough of building a multi-user SaaS product in Bubble.',
    'MS4DIljH4PM',
    'Add a simple subscription flow to your Bubble app: create a "Plan" type (free/pro), add a "plan" field to your User type, and build a workflow that upgrades the current user to "pro" when they click an upgrade button. (No real payment yet — we cover Stripe in Track 7.)',
    20, 3, 2,
    'Building a SaaS in Bubble means thinking in three layers: (1) Data — what types and fields does your product need? (2) UI — what pages and elements does each user role see? (3) Workflows — what happens when users take actions? The most common mistake is building the UI before the data model. Always design your data types first, then build pages around them. Bubble''s "Current User" expression is the key to making everything user-specific.'
  ),
  (
    'webflow-intro',
    'Learn Webflow in 16 Minutes',
    'The fastest intro to building beautiful, responsive sites in Webflow.',
    'vvyPj5bTcgQ',
    'Create a free Webflow account. Build a simple landing page with: a hero section (headline + subtitle + CTA button), a 3-column features grid, and a footer. Publish it to your free webflow.io subdomain.',
    10, 4, 2,
    'Webflow is a visual web builder that generates clean HTML/CSS — no plugins, no page builders, just code-quality output with a visual interface. The core difference from Wix or Squarespace: Webflow gives you full CSS control visually. Every element has a box model (margin, padding, size), display type (flex, grid, block), and states (hover, focus). Learn these and you can build any layout. Webflow is best for marketing sites and content — it''s not built for complex app logic.'
  ),
  (
    'webflow-cms',
    'Webflow CMS: Dynamic Content at Scale',
    'Use Webflow CMS to build blogs, portfolios, and content-driven sites.',
    'brrC1W6LXRk',
    'Add a CMS Collection called "Blog Posts" to your Webflow site with fields: title, slug, date, thumbnail, body (rich text). Create 3 dummy posts, build a blog listing page, and a blog post template page. Publish and test the links.',
    15, 5, 2,
    'Webflow CMS lets you define structured content types (Collections) and bind them to your design. Instead of hardcoding each blog post as a page, you create one template page and Webflow generates a page for every CMS item. Key concepts: Collection List (shows multiple items), Collection Page (template for one item), and dynamic binding (connecting CMS fields to text/image elements). CMS is what separates a static Webflow site from a scalable content platform.'
  ),
  (
    'flutterflow-intro',
    'FlutterFlow: Build Native Mobile Apps',
    'Build a real iOS/Android app visually — no Swift or Kotlin needed.',
    'GpXjU-ieAKU',
    'Create a FlutterFlow account and start a new project. Build a two-screen app: a home screen with a list of items (hardcoded for now) and a detail screen that shows more info when you tap an item. Use FlutterFlow''s navigation to connect them. Run it in the preview.',
    15, 6, 2,
    'FlutterFlow generates real Flutter code — which means your app compiles to native iOS and Android, not a web wrapper. The visual editor maps directly to Flutter widgets: Column, Row, Container, Text, Image, etc. The most important concept is "state" — local state (one screen) vs app state (whole app). Use local state for UI toggles, app state for user data that needs to persist across screens. You can export the full Flutter code at any time and continue in an IDE.'
  ),
  (
    'glide-intro',
    'Glide: Turn a Spreadsheet into an App',
    'Build a mobile app from a Google Sheet in under 20 minutes.',
    '3m0yBuamrvY',
    'Go to glideapps.com. Connect a Google Sheet with columns: Name, Category, Description, Image URL. Build a Glide app that shows items in a list, with a detail view for each. Share the app link.',
    10, 7, 3,
    'Glide turns Google Sheets (or Glide Tables) into mobile-first apps with zero setup. Each sheet tab becomes a "table," each column becomes a field, and Glide auto-generates a list + detail UI. The killer use case: internal tools, directories, client portals, and event apps — anything where the data already lives in a spreadsheet. Glide is not for complex app logic (use Bubble for that) but for getting something usable in front of real users in under an hour.'
  )
) AS l(slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
ON CONFLICT (track_id, slug) DO NOTHING;

-- ─── TRACK 5: Backend & Database ─────────────────────────────────────────────

WITH t AS (SELECT id FROM public.tracks WHERE slug = 'backend-database')
INSERT INTO public.lessons (track_id, slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
SELECT t.id, l.slug, l.title, l.description, l.youtube_video_id, l.challenge_prompt, l.xp_value, l.sort_order, l.level, l.summary
FROM t, (VALUES
  (
    'airtable-intro',
    'Airtable: Your First Real Database',
    'Stop using spreadsheets. Learn Airtable and how it thinks about data.',
    'GuG0RC4BGuE',
    'Create a free Airtable account. Build a base called "My Products" with a table that has: Name (text), Price (currency), Category (single select: Physical/Digital), In Stock (checkbox). Add 5 records. Switch between Grid, Gallery, and Kanban views.',
    10, 1, 1,
    'Airtable is the best "fake backend" for beginners — it looks like a spreadsheet but thinks like a database. Key differences from Google Sheets: (1) Typed fields — each column has a type (text, number, date, attachment, linked record). (2) Views — the same data shown as grid, kanban, calendar, gallery. (3) Linked records — you can relate tables to each other like a real database. Airtable is perfect for prototyping data models before you build the real backend.'
  ),
  (
    'airtable-relations',
    'Airtable Relational Data & Linked Records',
    'How to model real-world relationships — customers, orders, products.',
    'TioyjpdzjDA',
    'In your Airtable base, add a second table called "Orders". Link each Order to a Product using a Linked Record field. Add a Rollup field on the Products table that counts how many orders each product has. Build a view that filters to only show products with more than 2 orders.',
    15, 2, 1,
    'Relational data is the difference between a toy database and a real one. In Airtable, a Linked Record field creates a relationship between two tables — like "this Order belongs to this Customer." Lookup fields pull data from the linked record into the current table. Rollup fields aggregate across linked records (count, sum, average). This is the mental model you need before moving to Xano, Supabase, or any real backend — the concepts are identical, just with SQL under the hood.'
  ),
  (
    'xano-intro',
    'Xano: Real No-Code Backend',
    'Build production-grade APIs, auth, and business logic without code.',
    'pZK-D8k3m3k',
    'Create a Xano account. Build a database table called "todos" with fields: title (text), completed (boolean), user_id (integer). Create a GET endpoint that returns all todos and a POST endpoint that creates one. Test both in Xano''s API request builder.',
    15, 3, 2,
    'Xano is what you graduate to when Airtable can''t keep up. It gives you: a real Postgres database, a visual API builder (no code), built-in authentication (signup/login endpoints you own), and business logic with branching and transformations. The key mental model: everything in Xano is an API endpoint. Your frontend (Bubble, FlutterFlow, Webflow, or anything) calls these endpoints to read and write data. Xano sits between your UI and your database.'
  ),
  (
    'supabase-intro',
    'Supabase: Open-Source Backend in Minutes',
    'Auth, Postgres database, and storage — all in one platform.',
    'Ufx6fdRMxjU',
    'Create a Supabase project. Enable email/password authentication. Create a "profiles" table with columns: id (uuid, references auth.users), username (text), created_at. Enable Row Level Security and add a policy: "Users can only read and update their own profile." Test signup and profile creation.',
    15, 4, 2,
    'Supabase is an open-source alternative to Firebase — it gives you a Postgres database, authentication, file storage, and auto-generated REST/GraphQL APIs. The most important feature for security is Row Level Security (RLS): SQL policies that run on every query and enforce who can read or write which rows. Always enable RLS on every table before you go live. Supabase pairs natively with Lovable, Cursor, and most AI builders — it''s the backend of choice for the modern AI app stack.'
  ),
  (
    'firebase-intro',
    'Firebase: Google''s Backend for Mobile & Web',
    'Authentication, Firestore database, and hosting — the Google way.',
    'WM178YopjfI',
    'Create a Firebase project. Add email/password authentication. Create a Firestore collection called "notes" with a document structure: title (string), body (string), userId (string), createdAt (timestamp). Write a security rule that only allows users to read and write their own notes.',
    15, 5, 2,
    'Firebase is Google''s backend platform — the default choice when building with FlutterFlow or any Google-ecosystem app. Firestore (the database) is NoSQL: instead of tables and rows, you have collections and documents. A document is a JSON object. Collections can be nested inside documents. Security Rules are Firebase''s version of Row Level Security — they run on every read/write and use the authenticated user''s ID to enforce access. Firebase also includes Authentication (10+ providers), Storage (files/images), and Hosting (1-click deploy).'
  ),
  (
    'backend-which-one',
    'Which Backend Should You Use?',
    'Airtable vs Xano vs Supabase vs Firebase — the honest comparison.',
    'Ufx6fdRMxjU',
    'Map out a simple app idea you want to build. Write down: (1) What data does it need to store? (2) Does it need user accounts? (3) Will you use a no-code UI builder or write frontend code? Based on your answers, pick the right backend and write a one-paragraph justification.',
    20, 6, 3,
    'The decision framework: Start with Airtable if you just need to structure data quickly and share it. Use Xano if you''re building with a no-code UI (Bubble, FlutterFlow, Webflow) and need real APIs and auth you control. Use Supabase if you''re using AI coding tools (Cursor, Lovable, Bolt) or writing any frontend code — it''s the most developer-friendly. Use Firebase if you''re building a mobile app with FlutterFlow or need Google ecosystem integrations. The golden rule: match your backend to your frontend tool.'
  )
) AS l(slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
ON CONFLICT (track_id, slug) DO NOTHING;

-- ─── TRACK 6: Automation & Workflows ─────────────────────────────────────────

WITH t AS (SELECT id FROM public.tracks WHERE slug = 'automation')
INSERT INTO public.lessons (track_id, slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
SELECT t.id, l.slug, l.title, l.description, l.youtube_video_id, l.challenge_prompt, l.xp_value, l.sort_order, l.level, l.summary
FROM t, (VALUES
  (
    'zapier-intro',
    'Zapier: Automate Anything in Minutes',
    'The fastest way to connect two apps and automate repetitive work.',
    'JtdUgJGI_Oo',
    'Create a free Zapier account. Build a Zap: when a new row is added to a Google Sheet, send yourself a Slack message (or email) with the row''s content. Test it by adding a row. Describe what you automated and why it''s useful.',
    10, 1, 1,
    'Zapier connects apps using "Zaps" — automated workflows with a Trigger (something that happens) and one or more Actions (things Zapier does in response). With 6,000+ app integrations, it''s the broadest automation tool available. The key concept: Zapier maps data between apps using "fields." When your trigger fires, it produces a data payload, and you map those fields into your action. No logic, no branching — just "when X happens, do Y." For simple linear automations, Zapier is the fastest tool on earth.'
  ),
  (
    'zapier-advanced',
    'Zapier Filters, Paths & Multi-Step Zaps',
    'Build smarter automations with conditions, branching, and multiple actions.',
    'lD8Llq2heis',
    'Upgrade your Zap: add a Filter step that only continues if the Google Sheet row has a value in a specific column (e.g., Status = "Done"). Add a second action that creates a record in Airtable. Test with rows that both pass and fail the filter.',
    15, 2, 1,
    'Multi-step Zaps can have unlimited actions in sequence. Filters stop the Zap if a condition isn''t met — e.g., "Only continue if Status is Done." Paths (available on paid plans) let you branch: "If Status is Done, do X. If Status is Cancelled, do Y." Formatter steps transform data (change date formats, split text, do math). The limit of Zapier: it''s sequential and can''t do complex looping or error handling — that''s where Make and n8n come in.'
  ),
  (
    'make-intro',
    'Make: Visual Automation with Real Logic',
    'Build powerful automations on a canvas — branching, loops, and more.',
    'UL76TS335Vs',
    'Create a free Make.com account. Build a scenario: when a new Typeform response arrives, use a Router to branch — if the respondent selected "Interested", add them to an Airtable table. If they selected "Not interested", do nothing. Test with both responses.',
    15, 3, 2,
    'Make (formerly Integromat) uses a visual canvas where modules connect with lines — it looks like a flowchart. The key advantage over Zapier: real branching logic with Routers, iterators (loops through arrays), aggregators (combine multiple items), and error handlers. Make is better for: processing lists of items, conditional branching, working with complex JSON data, and scenarios that need to retry on failure. The learning curve is steeper than Zapier but the power ceiling is much higher.'
  ),
  (
    'make-advanced',
    'Make Advanced: Routers, Iterators & API Calls',
    'Process lists, call any API, and build production automation systems.',
    'yEk-y5DtRfk',
    'Build a Make scenario that: (1) gets a list of records from Airtable, (2) uses an Iterator to loop through each record, (3) makes an HTTP POST request to a webhook URL for each one, (4) updates the Airtable record to mark it as "processed". Verify all records are updated.',
    20, 4, 2,
    'The Iterator module is Make''s superpower — it takes an array and processes each item one by one through the rest of the scenario. The HTTP module lets you call any API endpoint, even ones Make doesn''t have a native integration for. The Set Variable and Get Variable modules let you store values across iterations. Aggregators collect results back into a single bundle after an Iterator. These four modules together let you build any data pipeline without writing code.'
  ),
  (
    'n8n-intro',
    'n8n: The Most Powerful Free Automation Tool',
    'Self-hostable, open-source, and capable of building real AI workflows.',
    'Fy1UCBcgF2o',
    'Go to n8n.io and start a free cloud account. Build a workflow: when triggered manually, fetch the top 3 posts from a subreddit using the Reddit node (or HTTP Request node), format the titles into a bulleted list, and send it to yourself via email. Activate and run it.',
    15, 5, 2,
    'n8n is the most capable automation tool — it has 400+ integrations, supports code nodes (JavaScript/Python), can call any API, and runs AI/LLM steps natively. Unlike Zapier and Make, n8n is open-source and can be self-hosted for free (you only pay for cloud hosting). The UI is a canvas like Make but the data model is more explicit — every node receives "items" (an array of objects) and outputs "items." Understanding this items model is the key to unlocking n8n''s full power.'
  ),
  (
    'n8n-advanced',
    'n8n: JSON, Code Nodes & AI Integration',
    'Master data transformation, JavaScript nodes, and connecting AI to your workflows.',
    'FMP7Hegx1tk',
    'Build an n8n workflow that: (1) receives a webhook with a JSON body, (2) uses a Code node to extract and transform specific fields, (3) calls the OpenAI API to summarize a text field, (4) inserts the result into a Supabase table. Test end-to-end with a real webhook payload.',
    25, 6, 3,
    'The Code node in n8n lets you write JavaScript to transform data in any way — no limitations. The key pattern: items.map(item => ({ json: { ...item.json, newField: transform(item.json.oldField) } })). For AI integration, the OpenAI node (or HTTP Request node) lets you send prompts and receive completions inside any workflow. n8n with AI is the foundation of most "AI agent" systems — a trigger fires, data is fetched, AI processes it, results are stored or sent somewhere. This is the infrastructure layer that makes AI products work.'
  )
) AS l(slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
ON CONFLICT (track_id, slug) DO NOTHING;

-- ─── TRACK 7: AI Agents & Monetization ───────────────────────────────────────

WITH t AS (SELECT id FROM public.tracks WHERE slug = 'ai-agents-money')
INSERT INTO public.lessons (track_id, slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
SELECT t.id, l.slug, l.title, l.description, l.youtube_video_id, l.challenge_prompt, l.xp_value, l.sort_order, l.level, l.summary
FROM t, (VALUES
  (
    'chatgpt-architect',
    'Use AI to Plan Your Product Before You Build',
    'How to use ChatGPT and Claude to make smart build decisions and avoid wasting weeks.',
    'XRU-CjzYt_o',
    'Take an app idea you have (or make one up). Have a conversation with Claude or ChatGPT where you: (1) describe the app, (2) ask it to suggest a tech stack from the tools you''ve learned, (3) ask it to identify the 3 biggest technical risks. Paste the conversation summary here.',
    10, 1, 1,
    'Before you build anything, spend 20 minutes talking to Claude or ChatGPT about your product. Describe what you want to build and ask: "What are the right tools for this? What are the risks? What should I build first?" AI is exceptionally good at this because it has seen thousands of software products and can pattern-match your idea to the right stack instantly. The prompts that work best: be specific about your constraints (budget, timeline, technical skill level), describe your users, and ask for tradeoffs — not just "what should I use" but "why would I NOT use Bubble for this?"'
  ),
  (
    'voiceflow-intro',
    'Voiceflow: Build AI Chat Agents',
    'Design and deploy customer-facing AI chat agents without code.',
    'OV1EX7d3fbY',
    'Create a Voiceflow account. Build a simple customer support agent for a hypothetical SaaS product: it should handle 3 intents — "pricing question", "how to cancel", and "technical issue" (escalate to human). Publish it and test all three flows.',
    15, 2, 1,
    'Voiceflow is a drag-and-drop tool for building conversational AI agents — chatbots and voice assistants for customer support, sales, and onboarding. The core building blocks: Speak (agent says something), Capture (agent waits for user input), Condition (branches based on what the user said), and Integration (calls an API). Connect an AI model (GPT-4, Claude) to a "Talk to AI" step and it handles open-ended questions. Voiceflow agents can be embedded on any website, in Intercom, or via API — no engineering needed.'
  ),
  (
    'lindy-intro',
    'Lindy: Your First AI Employee',
    'Deploy an AI agent that handles your inbox, calendar, and meetings in minutes.',
    'D-m-eJp8DhE',
    'Create a Lindy account. Set up a Lindy that monitors your Gmail for emails containing a specific keyword (e.g., "meeting request") and drafts a reply suggesting a time. Activate it and test with a real or dummy email. Describe what it did and what you would change.',
    15, 3, 2,
    'Lindy is the easiest "AI employee" tool — you describe what you want your agent to do in plain English, connect your tools (Gmail, Calendar, Slack, Notion), and Lindy runs autonomously. Unlike n8n or Make (which need you to define every step), Lindy uses AI to decide what actions to take based on your instructions. The key concept: Lindy agents have a "trigger" (new email, scheduled time, webhook), "instructions" (what you want it to do), and "tools" (the apps it can interact with). Start with one well-defined task before giving it broad permissions.'
  ),
  (
    'relevance-ai',
    'Relevance AI: Build Business AI Agents',
    'Create AI agents for sales, ops, and research with prebuilt templates.',
    '0C4JaEiuzkc',
    'Sign up for Relevance AI. Use one of their prebuilt agent templates (e.g., lead research or content writer). Run it with real inputs, review the output, and customize one step in the agent. Export or share the result.',
    15, 4, 2,
    'Relevance AI lets you build AI agents using a visual "tool" builder — each tool is a small AI-powered function (research a company, write an email, score a lead). Agents combine multiple tools and run them in sequence based on a goal. The platform comes with prebuilt templates for common business workflows: outbound sales research, content generation, customer support, and data enrichment. The key advantage over raw OpenAI: structured outputs, retry logic, and the ability to chain tools without writing prompt engineering from scratch.'
  ),
  (
    'gumloop-intro',
    'Gumloop: Visual AI Workflow Builder',
    'Build complex AI pipelines visually — scraping, processing, and acting on data.',
    'Jxacz1_YHuo',
    'Create a Gumloop account. Build a workflow that: takes a list of company names as input, searches for each company''s website, extracts a one-sentence description, and outputs a CSV. Run it with 3 company names and verify the output.',
    20, 5, 2,
    'Gumloop is a visual AI workflow builder — think n8n but with AI nodes built natively at every step. You can scrape web pages, extract structured data with AI, call APIs, and act on results all in a drag-and-drop canvas. What makes Gumloop powerful for builders: MCP (Model Context Protocol) support, which means your AI agents can plug into external tools and data sources natively. Use Gumloop when you need to build data pipelines that involve AI processing — content generation at scale, lead enrichment, competitive research, or document processing.'
  ),
  (
    'stripe-payments',
    'Add Payments to Any App with Stripe',
    'Accept real money in your product — the right way, in under an hour.',
    'tr1ZUkAqpdM',
    'Create a Stripe test account. Use Stripe''s no-code Payment Link feature to create a product called "Pro Plan" for $10/month. Share the payment link. Then explore the Stripe dashboard: find where successful payments appear, how to issue a refund, and where to see your payout schedule.',
    20, 6, 3,
    'Stripe is the payments infrastructure used by most startups — it handles credit cards, bank transfers, subscriptions, invoicing, and payouts worldwide. For no-code builders, you never write payment code — you use Stripe''s hosted tools: Payment Links (shareable URL that accepts payment), Checkout (embeddable payment page), and the Customer Portal (self-service subscription management). Connect Stripe to your app by: (1) creating a Payment Link, (2) sending users there when they click "Upgrade", (3) using a Zapier/Make/n8n webhook to listen for successful payments and update your database. That''s the full payment integration without touching code.'
  ),
  (
    'ship-your-product',
    'From Idea to Live Product: The Full Stack',
    'How to combine everything you''ve learned into one cohesive build.',
    'XRU-CjzYt_o',
    'Design your next product on paper first. Write: (1) What it does in one sentence. (2) Which builder you''ll use for the UI (Bubble/Lovable/FlutterFlow). (3) Which backend (Supabase/Xano/Firebase). (4) Which automation handles key workflows (Zapier/Make/n8n). (5) Whether it needs AI agents (Voiceflow/Lindy). (6) How it makes money (Stripe). Start building Layer 1 (the data model) this week.',
    25, 7, 3,
    'The full modern product stack for a no-code/AI builder: UI (Bubble for complex logic, Lovable/Bolt for AI-assisted code, Webflow for content sites, FlutterFlow for mobile) + Backend (Supabase for developer-friendly, Xano for pure no-code) + Automation (Zapier for simple connections, Make for logic, n8n for AI pipelines) + AI Agents (Voiceflow for chat, Lindy for email/calendar, Gumloop for data workflows) + Payments (Stripe, always). The builder who knows when to use each tool ships 10x faster than the one who picks one tool for everything. Your job is not to be an expert in all of them — it''s to know which one to reach for.'
  )
) AS l(slug, title, description, youtube_video_id, challenge_prompt, xp_value, sort_order, level, summary)
ON CONFLICT (track_id, slug) DO NOTHING;
