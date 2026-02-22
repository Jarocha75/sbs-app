export type TestKategoria = {
  id: string
  nazov: string
  pocetOtazok: number
  href: string
}

export const testySContent = {
  hero: {
    badge: 'S',
    title: 'On-line testy — Preukaz typu S',
    subtitle: 'pre osoby poverené výkonom fyzickej ochrany a pátrania',
    description: 'Precvičte si znalosti z jednotlivých oblastí pred skúškou odbornej spôsobilosti.',
  },
  section: {
    title: 'Oblasti testovania',
    otazok: 'otázok',
    spustit: 'Spustiť test',
  },
} as const

export const kategorie: TestKategoria[] = [
  {
    id: 'sukromna-bezpecnost',
    nazov: 'Súkromná bezpečnosť',
    pocetOtazok: 100,
    href: '/testy/s/sukromna-bezpecnost',
  },
  {
    id: 'priestupkove-pravo',
    nazov: 'Priestupkové právo',
    pocetOtazok: 10,
    href: '/testy/s/priestupkove-pravo',
  },
  {
    id: 'trestne-pravo',
    nazov: 'Trestné právo',
    pocetOtazok: 27,
    href: '/testy/s/trestne-pravo',
  },
]
