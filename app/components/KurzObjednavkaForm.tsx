'use client'

import { useState } from 'react'

interface Props {
  courseType: 'S' | 'P'
}

export default function KurzObjednavkaForm({ courseType }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const email = (new FormData(e.currentTarget).get('email') as string).trim()
    if (!email) return

    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, courseType }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Nastala chyba. Skúste to znova.')
        setLoading(false)
        return
      }

      window.location.href = data.url
    } catch {
      setError('Nastala chyba pri pripojení. Skúste to znova.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-2 w-full sm:max-w-md">
      <div className="flex-1">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vas@email.sk"
          className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors"
        />
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="shrink-0 px-6 py-3 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-60"
        style={{ backgroundColor: '#1e3a5f' }}
      >
        {loading ? 'Presmerovávam...' : 'Kúpiť kurz →'}
      </button>
    </form>
  )
}
