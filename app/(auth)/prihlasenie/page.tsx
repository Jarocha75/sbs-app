'use client'

import { signIn } from 'next-auth/react'
import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SITE } from '@/data/site'
import ShieldIcon from '@/app/components/icons/ShieldIcon'
import AktivovanyBanner from '@/app/components/AktivovanyBanner'

const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors'

const PrihlaseniePage = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-page-bg">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">

        {/* Hlavička */}
        <div className="text-center mb-8">
          <ShieldIcon size={48} centered />
          <h1 className="text-2xl font-bold mt-3 text-primary">Prihlásiť sa</h1>
          <p className="text-gray-400 text-sm mt-1">{SITE.name}</p>
        </div>

        {/* Aktivácia úspešná */}
        <Suspense>
          <AktivovanyBanner />
        </Suspense>

        {/* Chyba */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        {/* Formulár */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-primary">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="vas@email.sk"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-primary">
              Heslo
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 mt-2 bg-primary"
          >
            {loading ? 'Prihlasujem...' : 'Prihlásiť sa'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Nemáte účet?{' '}
          <Link href="/registracia" className="font-semibold hover:underline text-primary">
            Zaregistrujte sa
          </Link>
        </p>
      </div>
    </div>
  )
}

export default PrihlaseniePage
