# InterviewIQ

Interview prep for freshers: flashcard-style practice questions plus a
mock-interview booking flow, with real email/password accounts.

Stack: Next.js 14 (App Router) + Supabase (auth + database), deployed on Vercel.

## Local development

1. Copy `.env.local.example` to `.env.local` and fill in your Supabase
   Project URL and anon key (Project Settings -> API).
2. `npm install`
3. `npm run dev`

## Deployment

Deployed via Vercel. Environment variables required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

Database schema lives in `supabase/schema.sql` — run it once in the
Supabase SQL Editor before first use.
