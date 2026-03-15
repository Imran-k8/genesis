# Quiet Journal

> Built with [Railtracks](https://railtracks.ai)

Quiet Journal is a private journaling app built with Next.js, Supabase, and AI-powered entry analysis. Users can create an account, write journal entries, review their archive, search past reflections, and view lightweight mood and emotion trends over time.

When AI analysis is available, each entry can include:
- normalized emotion scores across a fixed set of emotions
- a short reflective note written in a supportive tone
- optional support recommendations from a separate Railtracks microservice when the app detects a sustained pattern of struggle

> **Naming note:** this repo still contains mixed legacy naming. The package name is `quiet-journal`, some agent files still use `MindPulse`, and this README refers to the product as **Quiet Journal**.

---

## What the app does

### Core journaling flow
- Email/password sign up and login with Supabase Auth
- Protected journal pages per user
- Create, view, search, and delete journal entries
- Row-level security so users only access their own data

### AI-assisted reflection
- New entries attempt AI analysis automatically on save
- Analysis stores:
  - emotion scores for `joy`, `sadness`, `anxiety`, `anger`, `gratitude`, `calm`, `loneliness`, and `hope`
  - a short reflection note grounded in the entry text
- Older entries can also be re-analyzed manually from the entry detail page

### Insights and trends
- Dashboard cards for entry count, weekly activity, and total words written
- Search across titles, entry text, saved AI notes, and emotion labels
- Insights page for mood trends, recurring emotions, and wellbeing metrics based on saved analysis

### Optional support recommendations
- If an entry is marked as a **struggling** entry and the previous two analyzed entries were also struggling, the app can call a separate Railtracks service
- That service returns supportive Toronto-area resources and crisis/help options when appropriate
- Recommendations are shown on the journal entry detail page only when the service is configured and responds successfully

---

## Tech stack

| Area | Technology |
|---|---|
| App framework | Next.js 16 + React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| Auth + database | Supabase |
| AI analysis | OpenAI SDK with a configurable OpenAI-compatible endpoint |
| Optional recommendation service | Railtracks + FastAPI |

---

## How recommendations are triggered

Recommendations are intentionally conservative.

1. A journal entry is analyzed for emotion scores.
2. The app checks whether the heavier emotions (`sadness`, `anxiety`, `anger`, `loneliness`) add up to at least `0.45`.
3. If the current entry qualifies, the app looks at the previous two entries.
4. If all three are struggling entries, the app calls the Railtracks service at `POST /recommend`.
5. If the service returns suggestions, they are saved in `analysis_recommendations` and shown on the entry page.

If the Railtracks service is not running, the entry still saves normally.

---

## Project structure

```text
app/
  (auth)/                # Login and signup pages
  (protected)/           # Dashboard, journal, insights, profile
  actions.ts             # Auth, entry creation, analysis, deletion
  auth/callback/         # Supabase auth callback route
components/
  auth/                  # Authentication UI
  dashboard/             # Stats, archive list, emotion overview
  entries/               # New entry form, entry cards, analysis panel, resource card
  insights/              # Mood trend chart, emotion patterns, wellbeing metrics
  layout/                # App shell and navigation
  profile/               # Profile summary
  ui/                    # Shared UI primitives
hooks/
  use-journal-search.ts  # Client-side archive search
lib/
  auth.ts                # Current user / auth guards
  insights.ts            # Aggregated insight calculations
  journal-ai.ts          # AI analysis + reflection note generation
  journal-analysis.ts    # Emotion normalization and struggling-entry logic
  journal.ts             # Journal data loading and stats
  recommend.ts           # Next.js -> Railtracks service connector
  supabase/              # Supabase clients and middleware helpers
railtracks-agent/
  agent.py               # Railtracks recommendation agent
  app.py                 # FastAPI server exposing /recommend
  resources.py           # Resource list used by the agent
supabase/
  schema.sql             # Journal table, RLS policies, timestamps
types/
  database.ts            # Generated database types
```

---

## Getting started

### Prerequisites
- Node.js 20+
- npm
- Python 3.11+ (only if you want to run the Railtracks service)
- A Supabase project

### 1) Install dependencies

```bash
npm install
```

### 2) Add environment variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-api-key

# Optional overrides
OPENAI_BASE_URL=https://your-openai-compatible-endpoint/v1
OPENAI_MODEL=your-model-name
OPENAI_MAX_TOKENS=700
OPENAI_TEMPERATURE=0.4
RAILTRACKS_URL=http://localhost:8000
```

### 3) Create the database schema

Run `supabase/schema.sql` in the Supabase SQL editor.

This creates:
- the `journal_entries` table
- timestamp handling for updates
- row-level security policies
- the optional `analysis_recommendations` JSON column

### 4) Configure Supabase Auth

Enable Email auth in Supabase. For local development, you can disable email confirmation if you want immediate sign-in during testing.

### 5) Start the Next.js app

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Running the optional Railtracks service

The main app works without the recommendation service, but support suggestions will only appear if this service is running.

```bash
cd railtracks-agent
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

The service exposes:
- `GET /health`
- `POST /recommend`

If you deploy the Railtracks service separately, set `RAILTRACKS_URL` in the Next.js app to that deployed base URL.

---

## Typical demo flow

1. Create an account and sign in.
2. Save a journal entry.
3. Open the saved entry and review the AI reflection note and emotion chips.
4. Add a few more entries and explore the dashboard search.
5. Visit the Insights page to view mood and emotion trends.
6. If the Railtracks service is enabled and three consecutive entries are flagged as struggling, open the latest entry to see support recommendations.

---

## Deployment notes

### Next.js app
Deploy to Vercel or any Node-compatible host, then add the same environment variables used locally.

### Railtracks microservice
Deploy `railtracks-agent/` to a Python host such as Railway, Render, or Fly.io, then point `RAILTRACKS_URL` at that service.

### Supabase
Add your production domain and `/auth/callback` URL to the allowed redirect URLs in Supabase Auth.

---

## Current scope

This repo is a polished MVP. It currently supports:
- account-based private journaling
- automatic AI analysis on new entries
- per-entry re-analysis
- searchable archive views
- basic insight dashboards
- optional recommendation handoff to Railtracks

It does **not** currently include entry editing, collaboration, file uploads, or a mobile app.
