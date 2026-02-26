# SBS App Memory

## Project Overview
Next.js 16 app for SBS (private security) exam preparation. Uses Prisma + PostgreSQL.

## Key Commands
- `npm run db:seed` — re-seeds the entire database (deletes all and recreates)
- `npm run dev` — development server

## Data Pattern for New Tests
1. Create `data/test-[name].ts` — questions array + content object
2. Create `app/testy/s/[name]/page.tsx` — server page using `getTestQuestions('[Title]')`
3. Add card to `data/testy-s.ts` — `kategorie` array
4. Add import + test block to `prisma/seed.ts`
5. Run `npm run db:seed`

## Tests in DB (Typ S course)
- Súkromná bezpečnosť - Okruh 1–4 (25 questions each)
- Priestupkové právo (10)
- Trestné právo (27)
- Ústava SR a ZĽPS (12)
- Kriminalistika (13)
- Policajný zbor (15)
- Obecná polícia (9)
- Vojenská polícia (5)
- Ochrana osobných údajov (7)
- Slovenská informačná služba (2)
- Praktické otázky SBS (10)

## Cvičný Test (40 questions, 40 min)
- Route: `/testy/s/cvicny-test`
- 20 from SBS okruhy 1–4 (random)
- 1 from each service area (Policajný zbor: 2)
- 10 practical questions (all)
- All shuffled on every load
- Pass: 32/40 (64/80 points, 80%)
- Timer turns red under 5 min remaining
- Card on `/testy/s` opens modal before starting

## Key Files
- `lib/getTest.ts` — fetch test questions by title
- `lib/getCvicnyTest.ts` — assemble 40 cvičný test questions
- `app/components/QuizClient.tsx` — standard quiz component
- `app/components/CvicnyTestClient.tsx` — quiz with countdown timer
- `app/components/CvicnyTestCard.tsx` — card with info modal
- `data/colors.ts` — COLORS constant (primary, accent, pageBg, etc.)
- `prisma/seed.ts` — full DB seed

## User Preferences
- Slovak language throughout
- Questions sent as text with (A/B/C) marking the correct answer
- Always run db:seed after seed changes
