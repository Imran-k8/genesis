# Quiet Journal

Quiet Journal is a hackathon-ready journaling MVP built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase. It includes authentication, protected routes, private journal storage, dashboard statistics, profile details, row-level security, and local setup documentation.

## Project Overview

Users can:

- create an account
- log in with Supabase Auth
- create private journal entries
- review entries in a dashboard
- open an individual entry
- see profile and journaling stats
- log out securely

The app is structured as a single Next.js codebase with server actions and Supabase-backed data access.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase Auth
- Supabase PostgreSQL
- Next.js proxy for protected routes
- Server actions for auth and journal writes

## Folder Structure

```text
app/
  (auth)/
    login/page.tsx
    signup/page.tsx
    layout.tsx
  (protected)/
    dashboard/page.tsx
    journal/
      new/page.tsx
      [id]/page.tsx
    profile/page.tsx
    layout.tsx
    loading.tsx
  auth/callback/route.ts
  actions.ts
  error.tsx
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx
components/
  auth/
  dashboard/
  entries/
  layout/
  profile/
  ui/
hooks/
  use-journal-search.ts
lib/
  auth.ts
  journal.ts
  validators.ts
  supabase/
    client.ts
    config.ts
proxy.ts
    server.ts
supabase/
  schema.sql
types/
  database.ts
utils/
  date.ts
.env.local.example
MANUAL_SETUP_CHECKLIST.md
EVERYTHING_STILL_LEFT_FOR_ME_TO_DO.md
```

Note: the repository also contains `main.py`, which is not used by this Next.js app.

## Setup Instructions

### Prerequisites

- Node.js 20 or newer
- npm
- a Supabase account

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Copy `.env.local.example` to `.env.local` and add your Supabase project values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Create your Supabase database schema

Open the Supabase SQL Editor and run the contents of [supabase/schema.sql](/c:/Users/khani/OneDrive/Documents/genesis/genesis/supabase/schema.sql).

### 4. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

### Create a project

1. Go to the Supabase dashboard.
2. Create a new project.
3. Wait for the database and API services to finish provisioning.

### Get the project URL and anon key

1. Open `Project Settings`.
2. Open `API`.
3. Copy:
   - `Project URL`
   - `anon public` key
4. Paste both values into `.env.local`.

### Auth setup

The app uses Supabase email/password authentication.

Recommended local-dev setting:

- Disable email confirmation in `Authentication -> Providers -> Email` if you want instant local signup without inbox confirmation.

If you keep email confirmation enabled:

- sign-up still works
- users must confirm the email
- the callback route at `/auth/callback` handles the session exchange when the confirmation link returns to the app

## Database Setup

Run the SQL from [supabase/schema.sql](/c:/Users/khani/OneDrive/Documents/genesis/genesis/supabase/schema.sql) in your Supabase SQL Editor.

That SQL does all of the following:

- creates `public.journal_entries`
- adds `created_at` and `updated_at`
- creates indexes for common user queries
- adds an update trigger for `updated_at`
- enables row-level security
- creates `SELECT`, `INSERT`, `UPDATE`, and `DELETE` policies using `auth.uid() = user_id`

## Environment Variables

The project expects:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Files:

- [`.env.local.example`](/c:/Users/khani/OneDrive/Documents/genesis/genesis/.env.local.example): template
- `.env.local`: your actual local secrets file

## Local Development

Install and run:

```bash
npm install
npm run dev
```

Useful scripts:

```bash
npm run lint
npm run build
npm start
```

## Running the Application

After `npm run dev`, visit:

- `/`
- `/signup`
- `/login`
- `/dashboard`
- `/journal/new`
- `/profile`

Unauthenticated users trying to access protected routes are redirected to `/login`.

## Testing Authentication

1. Open `/signup`.
2. Create a user with email and password.
3. If email confirmation is disabled, you should land on `/dashboard`.
4. If email confirmation is enabled, confirm the email and return through `/auth/callback`.
5. Log out from the sidebar or profile page.
6. Log back in through `/login`.

## Testing Journal Entries

1. Log in.
2. Open `/journal/new`.
3. Leave content empty and submit once to confirm validation.
4. Add a title if desired.
5. Add content and save.
6. Confirm the app redirects to `/dashboard`.
7. Open the newly created entry from the list.
8. Confirm `created_at` and `updated_at` render correctly.
9. Delete the entry from the detail page if you want to test delete behavior.

## Testing Dashboard

Verify that the dashboard:

- shows newest entries first
- displays title, snippet, date, and time
- handles the empty state
- supports client-side search
- shows entry counts and total words

## Testing Profile Page

Verify that `/profile` shows:

- authenticated user email
- account created date
- total journal entries
- entries this week
- total words written
- a working logout action

## Deployment Notes

- Vercel is the simplest deployment target for this app.
- Add the same environment variables in your deployment platform.
- In Supabase Auth URL settings, add your production site URL and callback URL.
- If you use email confirmation in production, configure the correct redirect URLs and SMTP setup.
- The app relies on Supabase RLS, so database access stays scoped to the signed-in user.

## Troubleshooting

### The app says Supabase environment variables are missing

- Check `.env.local`
- restart the dev server after updating env vars

### Signup works but users do not land in the app

- verify the callback URL
- verify Supabase Auth redirect settings
- check whether email confirmation is enabled

### Protected routes keep redirecting to login

- confirm the user is actually authenticated
- verify the proxy is running
- verify the anon key and project URL are correct

### Database requests fail

- confirm the SQL schema was applied
- confirm RLS policies were created
- check the browser console and terminal logs for Supabase errors

## Additional Docs

- Manual checklist: [MANUAL_SETUP_CHECKLIST.md](/c:/Users/khani/OneDrive/Documents/genesis/genesis/MANUAL_SETUP_CHECKLIST.md)
- Next steps handoff: [EVERYTHING_STILL_LEFT_FOR_ME_TO_DO.md](/c:/Users/khani/OneDrive/Documents/genesis/genesis/EVERYTHING_STILL_LEFT_FOR_ME_TO_DO.md)
