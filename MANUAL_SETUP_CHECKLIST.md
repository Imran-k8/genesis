# Manual Setup Checklist

## Supabase Project

- [ ] Create a new Supabase project.
- [ ] Wait for the database, auth, and API services to finish provisioning.
- [ ] Open `Project Settings -> API`.
- [ ] Copy the `Project URL`.
- [ ] Copy the `anon public` key.

## Environment Configuration

- [ ] Open `.env.local`.
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL`.
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] Save the file.

## Database Schema

- [ ] Open the Supabase SQL Editor.
- [ ] Paste the contents of [supabase/schema.sql](/c:/Users/khani/OneDrive/Documents/genesis/genesis/supabase/schema.sql).
- [ ] Run the SQL.
- [ ] Confirm the `journal_entries` table exists.
- [ ] Confirm row-level security is enabled on `journal_entries`.

## Policies and RLS

- [ ] Confirm the `SELECT` policy exists.
- [ ] Confirm the `INSERT` policy exists.
- [ ] Confirm the `UPDATE` policy exists.
- [ ] Confirm the `DELETE` policy exists.
- [ ] Confirm every policy uses `auth.uid() = user_id`.

## Auth Settings

- [ ] Decide whether to disable email confirmation for easier local testing.
- [ ] If email confirmation stays enabled, configure the site URL and redirect URL for `/auth/callback`.

## Local App Setup

- [ ] Run `npm install`.
- [ ] Run `npm run dev`.
- [ ] Open `http://localhost:3000`.

## Authentication Testing

- [ ] Visit `/signup`.
- [ ] Create a test account.
- [ ] If needed, confirm the email.
- [ ] Verify you can log in at `/login`.
- [ ] Verify unauthenticated access to `/dashboard` redirects to `/login`.

## Journal Entry Testing

- [ ] Open `/journal/new`.
- [ ] Submit an empty form and confirm validation appears.
- [ ] Create a valid journal entry.
- [ ] Confirm the app redirects to `/dashboard`.
- [ ] Open the saved entry.
- [ ] Confirm `created_at` and `updated_at` are displayed.
- [ ] Delete the entry to confirm delete permissions work.

## Dashboard Testing

- [ ] Confirm entries appear newest first.
- [ ] Confirm each entry shows title, snippet, date, and time.
- [ ] Confirm the empty state appears if no entries exist.
- [ ] Confirm search filters the list.
- [ ] Confirm statistics update after adding entries.

## Profile Testing

- [ ] Open `/profile`.
- [ ] Confirm the email is correct.
- [ ] Confirm the account created date is correct.
- [ ] Confirm total entries is correct.
- [ ] Confirm entries this week is correct.
- [ ] Confirm total words is displayed.
- [ ] Confirm logout works.
