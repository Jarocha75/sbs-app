'use client'

import { useSearchParams } from 'next/navigation'

export default function AktivovanyBanner() {
  const searchParams = useSearchParams()

  if (searchParams.get('aktivovany') !== '1') return null

  return (
    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-5 text-sm">
      Váš účet bol úspešne aktivovaný. Môžete sa prihlásiť.
    </div>
  )
}
