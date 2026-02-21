'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Nesprávny email alebo heslo')
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">

        {/* Hlavička */}
        <div className="text-center mb-8">
          <ShieldIcon />
          <h1 className="text-2xl font-bold mt-3" style={{ color: '#1e3a5f' }}>Prihlásiť sa</h1>
          <p className="text-gray-400 text-sm mt-1">SBS Akademia</p>
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
              Email
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
              Heslo
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
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
            {loading ? 'Prihlasujem...' : 'Prihlásiť sa'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Nemáte účet?{' '}
          <Link href="/registracia" className="font-semibold hover:underline" style={{ color: '#1e3a5f' }}>
            Zaregistrujte sa
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
