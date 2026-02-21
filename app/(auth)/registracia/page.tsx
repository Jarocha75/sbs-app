'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirm = formData.get('confirm') as string

    if (password !== confirm) {
      setError('Heslá sa nezhodujú')
      return
    }

    setLoading(true)

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        password,
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Nastala chyba pri registrácii')
    } else {
      router.push('/prihlasenie?registered=1')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">

        {/* Hlavička */}
        <div className="text-center mb-8">
          <ShieldIcon />
          <h1 className="text-2xl font-bold mt-3" style={{ color: '#1e3a5f' }}>Registrácia</h1>
          <p className="text-gray-400 text-sm mt-1">Vytvorte si účet v SBS Akademii</p>
        </div>

        {/* Chyba */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        {/* Formulár */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#1e3a5f' }}>
              Meno a priezvisko
            </label>
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Ján Novák"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#1e3a5f' }}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="vas@email.sk"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#1e3a5f' }}>
              Heslo <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="min. 8 znakov"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: '#1e3a5f' }}>
              Potvrdenie hesla <span className="text-red-500">*</span>
            </label>
            <input
              name="confirm"
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
            style={{ backgroundColor: '#1e3a5f' }}
          >
            {loading ? 'Registrujem...' : 'Zaregistrovať sa'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Máte už účet?{' '}
          <Link href="/prihlasenie" className="font-semibold hover:underline" style={{ color: '#1e3a5f' }}>
            Prihláste sa
          </Link>
        </p>
      </div>
    </div>
  )
}

function ShieldIcon() {
  return (
    <div className="flex justify-center">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="#1e3a5f" />
        <path d="M10 13l-2-2 1.41-1.41L10 10.17l4.59-4.58L16 7l-6 6z" fill="#c9a84c" />
      </svg>
    </div>
  )
}
