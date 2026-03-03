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
const CARD_TITLE = 'Môj prehľad'
const EMPTY_TEXT = 'Žiadne záznamy.'
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

## Pamäť

Udržuj `~/.claude/projects/.../memory/MEMORY.md` aktuálnu po každej väčšej zmene.
