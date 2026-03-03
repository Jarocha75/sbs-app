'use client'

import { useState } from 'react'

const PLACEHOLDER_EMAIL = "vas@email.sk";
const BTN_LOADING = "Presmerovávam...";
const BTN_SUBMIT = "Kúpiť kurz →";
const ERR_GENERIC = "Nastala chyba. Skúste to znova.";
const ERR_NETWORK = "Nastala chyba pri pripojení. Skúste to znova.";

interface Props {
  courseType: 'S' | 'P'
}

const KurzObjednavkaForm = ({ courseType }: Props) => {
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
        setError(data.error ?? ERR_GENERIC)
        setLoading(false)
        return
      }

      window.location.href = data.url
    } catch {
      setError(ERR_NETWORK)
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
          placeholder={PLACEHOLDER_EMAIL}
          className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="shrink-0 px-6 py-3 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-60 bg-primary"
      >
        {loading ? BTN_LOADING : BTN_SUBMIT}
      </button>
    </form>
  )
}

export default KurzObjednavkaForm
