# SBS App – Claude inštrukcie

## Stack

- Next.js 15 App Router, TypeScript, Tailwind CSS
- PostgreSQL + Prisma ORM (`import { prisma } from '@/lib/prisma'`)
- NextAuth.js – `auth()` z `@/auth`
- Platby: Stripe Checkout
- Emaily: Resend (`lib/resend.ts`)

## Konvencie komponentov

**Pattern:**

```ts
const MyComponent = ({ prop }: Props) => {
  return (...)
}

export default MyComponent
```

Nikdy nepoužívaj `export default function MyComponent`.

**Hardcoded hodnoty** vyťahuješ na vrch súboru:

```ts
const CARD_TITLE = "Môj prehľad";
const EMPTY_TEXT = "Žiadne záznamy.";
```

**Farby** – nikdy inline hex. Vždy cez `COLORS` z `@/data/colors`:

```ts
import { COLORS } from '@/data/colors'
style={{ color: COLORS.primary }}
```

Dostupné sémantické farby: `success`, `successBg`, `danger`, `dangerBg`, `warning`, `muted`, `mutedText`

## Typy

- **Doménové typy** (`Lesson`, `TestItem`, `ResultItem`, ...): `types/dashboard.ts` → `import type { Lesson } from '@/types/dashboard'`
- **Props typy**: zostávajú lokálne v komponente
- **Interné helper typy** (napr. `StatItemProps`): zostávajú lokálne v komponente

## Štruktúra

```
app/
  (auth)/        – prihlásenie, registrácia
  api/           – REST endpointy
  dashboard/     – hlavný dashboard
  kurzy/s/       – kurz S (lekcie, detail)
  kurzy/p/       – kurz P (zatiaľ bez lekcií)
  testy/         – kvízy
  components/    – zdieľané komponenty
    dashboard/   – UserHeader, CourseProgressCard, StatsCard, TestsCard, ResultsCard
data/
  colors.ts      – COLORS objekt
types/
  dashboard.ts   – doménové typy
  next-auth.d.ts – NextAuth rozšírenia
```

## Client vs Server Components

- Predvolene používaj **Server Components**.
- `'use client'` pridávaj len ak komponent používa state (`useState`), efekty (`useEffect`) alebo interakcie (obsluhu formulárov, kliknutia).
- Client komponenty drž čo najmenšie (zoznam renderuj na serveri, detaily tlačidiel na klientovi).

**Farby:**

- Prednostne používaj Tailwind triedy z konfigurácie: `bg-brand-primary`, `text-brand-accent`.
- Ak farba nie je v Tailwinde a je nevyhnutný inline štýl, použi objekt `COLORS` z `@/data/colors`.

## Data Fetching & Mutations

- Pre mutácie (formy, tlačidlá) preferuj **Server Actions** pred API endpointami.
- Serverové akcie ukladaj do `@/app/actions/`.
- Pre načítanie dát v Server Komponentoch používaj priamo Prisma volania (async components).

## TypeScript & Zod

- Vždy definuj typy pre vstupy a návratové hodnoty (žiadne `any`).
- Pre validáciu formulárov a vstupov z API/Actions používaj **Zod**.
- Error handling: Vždy obaľuj DB volania a fetch do try-catch bloku a vracaj zrozumiteľnú chybu používateľovi.

## UI Konvencie

- Používaj **Lucide React** pre ikony (ak nie je špecifikované inak).
- Responzivita: Vždy navrhuj Mobile-first (najprv mobil, potom `md:`, `lg:`).
- Pri zložitejších Tailwind triedach používaj utilitu `cn()` (ak máš nainštalovaný `clsx` a `tailwind-merge`).

## Business Logika

- **NextAuth:** Používaj `auth()` na serveri a `useSession()` na kliente. Prístup k chráneným trasám rieš primárne cez `middleware.ts`.
- **Stripe:** Logiku platieb drž v `lib/stripe.ts` a webhooky v `app/api/webhook/stripe/route.ts`.

## Pamäť

Udržuj `~/.claude/projects/.../memory/MEMORY.md` aktuálnu po každej väčšej zmene.
