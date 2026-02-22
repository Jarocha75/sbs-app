export type TestKategoria = {
  id: string
  nazov: string
  pocetOtazok: number
  href: string
}

export const testyPContent = {
  hero: {
    badge: 'P',
    title: 'On-line testy — Preukaz typu P',
    subtitle: 'pre osoby poverené výkonom fyzickej ochrany, pátrania, odbornej prípravy a poradenstva a pre prevádzkovateľov',
    description: 'Precvičte si znalosti z jednotlivých oblastí pred skúškou odbornej spôsobilosti.',
  },
  section: {
    title: 'Oblasti testovania',
    otazok: 'otázok',
    spustit: 'Spustiť test',
  },
} as const

export const kategorie: TestKategoria[] = []
