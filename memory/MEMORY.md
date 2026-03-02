# SBS App – Memory

## Projekt
Slovak SBS (Súkromná bezpečnostná služba) exam prep app. Next.js 15 App Router, TypeScript, Tailwind, PostgreSQL + Prisma ORM, NextAuth.js (Credentials provider).

## Stack
- Runtime: bun alebo npm (bežné Next.js skripty)
- DB: PostgreSQL, Prisma client output: `app/generated/prisma`
- Auth: NextAuth, `auth()` z `@/auth`, chránené routes: `/dashboard`, `/kurzy/s/lekcie`, `/kurzy/p/lekcie`, `/profil`
- Colors: `COLORS` objekt z `@/data/colors` – vždy inline `style={{}}`
- Prisma singleton: `import { prisma } from '@/lib/prisma'`
- Platby: Stripe Checkout + Resend aktivačný email
- Emaily: `lib/resend.ts`, šablóna `lib/emails/activation.ts`

## Štruktúra app/
- `(auth)/` – prihlasenie, registracia
- `api/register/` – POST registrácia
- `api/progress/` – POST označiť lekciu ako hotovú
- `api/test-results/` – POST uložiť výsledok testu `{ testId, score, passed }`
- `dashboard/` – personalizovaný dashboard (UserHeader + CourseProgressCard + StatsCard + TestsCard + ResultsCard)
- `kurzy/s/` – osnova kurzu S
- `kurzy/s/lekcie/` – zoznam lekcií s progress barom
- `kurzy/s/lekcie/[id]/` – detail lekcie
- `testy/[testId]/` – DB-backed test stránka (QuizClient + ukladanie výsledkov)
- `testy/s/` – statický prehľad testov kurzu S
- `testy/p/` – statický prehľad testov kurzu P
- `components/dashboard/` – UserHeader, CourseProgressCard, StatsCard, TestsCard, ResultsCard

## Dashboard (personalizovaný)
- Async server komponent, načítava: user, enrollments, progress, testResults
- Layout B (dvojstĺpcový): ľavý 2/3 = CourseProgressCard, pravý 1/3 = StatsCard + TestsCard + ResultsCard
- TestsCard linkuje na `/testy/[testId]` (DB route)
- ResultsCard zobrazuje posledných 8 výsledkov z DB

## Testy – architektúra
- Statické pages `/testy/s/[kategoria]` načítavajú otázky z DB cez `getTestQuestions(title)`
- DB-backed route `/testy/[testId]` načítava test podľa ID, po dokončení uloží `TestResult`
- `QuizClient` má voliteľný prop `testId?: string` – keď je nastavený, uloží výsledok via `POST /api/test-results`
- `getTestWithId(title)` vráti `{ testId, questions }` (pre stránky kde chceme ukladať)
- Cvičný test (`/testy/s/cvicny-test`) – bez ukladania (composite 40 otázok)

## Dátový vzor
- Statický obsah (osnovy kurzov): `/data/*.ts` súbory
- Test data: `/data/testy/s/*.ts` a `/data/testy/p/*.ts`
- Seed importuje z `../data/testy/s/` a `../data/testy/p/` (nie `../data/test-*`)
- Dynamický obsah (lekcie, postup, výsledky): Prisma priamo v server komponentoch

## Prisma schema – kľúčové modely
- `User`: status PENDING/ACTIVE, enrollments, progresses, results
- `Lesson`: id, title, content, outline (Json?), duration (Int? min), videoUrl?, order, courseId
- `Progress`: id, completed, userId, lessonId — `@@unique([userId, lessonId])`
- `Course`: type enum S/P, lessons, tests, enrollments
- `Enrollment`: userId, courseId, paidAt — `@@unique([userId, courseId])`
- `Test`: id, title, passScore (%), courseId, questions, results
- `TestResult`: id, score (0–100 %), passed, userId, testId, createdAt

## Lekcie kurzu S (seeded)
- 3 lekcie (45 min, videoUrl: null): Zákon o SBS, Trestné právo, GDPR/OOU
- Seed: `npx prisma db seed`

## Testy v DB (kurz S)
- Súkromná bezpečnosť Okruh 1–4 (25 ot. každý), Priestupkové právo (10), Trestné právo (27)
- Ústava SR (12), Kriminalistika (13), Policajný zbor (15), Obecná polícia (9)
- Vojenská polícia (5), Ochrana osobných údajov (7), SIS (2), Praktické otázky (10)

## Test user
- `jarocha75@gmail.com` – ACTIVE, enrollment na kurz S (pridané v seede)

## Schema zmeny
- Po `db push` treba vždy `npx prisma generate` + reštart dev servera
- `prisma migrate dev` nefunguje v non-interactive prostredí → použiť `prisma db push`

## Pay-to-access flow
- `/kurzy/s` a `/kurzy/p` sú verejné – zobrazujú osnovu
- `User.status`: PENDING (zaplatil, bez hesla) | ACTIVE (plne aktivovaný)

## Ďalší plán
- Keď budú videá: nahradiť video placeholder skutočným prehrávačom (updatovať `videoUrl` v DB)
- Kurz P zatiaľ nemá lekcie
- CvičnýTest by mohol tiež ukladať výsledky (zatiaľ bez toho)
