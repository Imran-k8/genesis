# Quiet Journal

> Built with [Railtracks](https://railtracks.ai)

Quiet Journal is a private journaling app built with Next.js, Supabase, and AI-powered entry analysis. Users can create an account, write journal entries, review their archive, search past reflections, and view lightweight mood and emotion trends over time.

When AI analysis is available, each entry can include:
- normalized emotion scores across a fixed set of emotions
- a short reflective note written in a supportive tone
- optional support recommendations from a separate Railtracks microservice when the app detects a sustained pattern of struggle

> **Naming note:** this repo still contains mixed legacy naming. The package name is `quiet-journal`, some agent files still use `MindPulse`, and this README refers to the product as **Quiet Journal**.

---

## Inspiration

Everyone goes through different experiences every day, and not all of them are easy to talk about. Sometimes people just want to get something off their chest without having to explain it to friends, family, or anyone else. We were inspired by that feeling.

We wanted to create something that gives people a private space to be honest with themselves, while still receiving some kind of support. Traditional journals already do a great job of letting people express themselves freely, but we thought there was room to make that experience even more helpful with AI.

Another big reason behind Quiet Journal is that people often forget what they went through and how they truly felt in the moment. Over time, those emotions can get buried or ignored. We wanted to build a tool that helps people capture those moments, reflect on them, and recognize emotional patterns over time instead of losing them.

---

## What it does

Quiet Journal is a private journaling platform that allows users to write down their thoughts, feelings, and experiences in a safe space.

Like a traditional journal, it lets users express themselves freely. On top of that, it adds AI-powered features that help users reflect on what they wrote by providing feedback, emotional insights, and gentle suggestions on how they might approach or deal with certain situations.

The app also helps users keep track of how they feel over time. Instead of letting emotions and experiences fade away, Quiet Journal stores them so users can look back, understand their past mindset, and notice trends in their emotional wellbeing.

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

## How we built it

We built Quiet Journal as a full-stack web application.

On the frontend, we focused on creating a clean and calming user experience that feels simple and natural to use, just like writing in a normal journal. On the backend, we implemented authentication, secure data storage, and private journal entry management so each user can safely access their own entries.

We also integrated AI-powered analysis to help process journal entries and generate reflections or emotional insights. This allowed us to combine the familiarity of journaling with the added value of smart feedback and pattern tracking.

Overall, the goal was to merge traditional journaling with modern AI in a way that feels useful, supportive, and easy to use.

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

## Challenges we ran into

One of the biggest challenges was finding the right balance between journaling and AI. We did not want the AI to feel intrusive or like it was taking over the experience. Journaling is personal, so the technology needed to feel supportive, not overpowering.

Another challenge was designing the platform in a way that felt private and comforting. Since the app deals with emotions and personal thoughts, the user experience had to feel safe, clear, and uncluttered.

We also had to think carefully about how emotional feedback should be shown. It is easy to display information, but much harder to make that information feel meaningful, understandable, and actually helpful to the user.

---

## Accomplishments that we're proud of

We are proud that we built something that goes beyond being just another notes app. Quiet Journal creates a space where people can write honestly and also get meaningful reflection from what they write.

We are also proud of how we combined private journaling with AI-powered emotional insight in a way that still feels simple and human. The ability to track feelings and experiences over time gives the project a deeper purpose than just storing text.

Most importantly, we are proud that the project addresses a real and relatable need. Almost everyone has moments they want to express but do not always want to share out loud, and Quiet Journal gives them another way to process those experiences.

---

## What we learned

Through building Quiet Journal, we learned that technology can be used for much more than just productivity or convenience. It can also be used to support reflection, awareness, and emotional understanding.

We learned a lot about designing for sensitive and personal use cases. Building a project like this is not only about making features work, but also about making the experience feel safe, respectful, and helpful.

We also learned how important it is to balance technical functionality with human-centered design. The AI might be one of the main features, but the real value comes from how naturally it fits into the journaling experience.

---

## What's next for Quiet Journal

Our next step is to make Quiet Journal even more personalized and helpful.

We want to improve the AI so it can provide more thoughtful and context-aware reflections while still keeping the experience supportive and non-intrusive. We also want to expand the emotion tracking features so users can better visualize their emotional patterns over longer periods of time.

In the future, we would also like to add features such as stronger mood trend analytics, more personalized guidance, reminders for consistent journaling, and an even more polished mobile-friendly experience.

Ultimately, our vision for Quiet Journal is to become a tool that helps people not only record their thoughts, but also better understand themselves over time.

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
