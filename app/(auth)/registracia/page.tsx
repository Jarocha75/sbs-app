'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SITE } from '@/data/site'
import ShieldIcon from '@/app/components/icons/ShieldIcon'

const INPUT_CLASS = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors'
const TITLE = 'Registrácia'
const SUBTITLE = `Vytvorte si účet v ${SITE.name}`
const LABEL_NAME = 'Meno a priezvisko'
const LABEL_EMAIL = 'Email'
const LABEL_PASSWORD = 'Heslo'
const LABEL_CONFIRM = 'Potvrdenie hesla'
const PLACEHOLDER_NAME = 'Ján Novák'
const PLACEHOLDER_EMAIL = 'vas@email.sk'
const PLACEHOLDER_PASSWORD = 'min. 8 znakov'
const PLACEHOLDER_CONFIRM = '••••••••'
const BTN_LOADING = 'Registrujem...'
const BTN_SUBMIT = 'Zaregistrovať sa'
const ERROR_PASSWORDS_MISMATCH = 'Heslá sa nezhodujú'
const ERROR_DEFAULT = 'Nastala chyba pri registrácii'
const FOOTER_TEXT = 'Máte už účet?'
const FOOTER_LINK = 'Prihláste sa'
const REDIRECT_SUCCESS = '/prihlasenie?registered=1'
const REDIRECT_LOGIN = '/prihlasenie'

const RegistraciaPage = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirm = formData.get('confirm') as string

    if (password !== confirm) {
      setError(ERROR_PASSWORDS_MISMATCH)
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
      setError(data.error || ERROR_DEFAULT)
    } else {
      router.push(REDIRECT_SUCCESS)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-page-bg">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-8">

        {/* Hlavička */}
        <div className="text-center mb-8">
          <ShieldIcon size={48} centered />
          <h1 className="text-2xl font-bold mt-3 text-primary">{TITLE}</h1>
          <p className="text-gray-400 text-sm mt-1">{SUBTITLE}</p>
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
            <label className="block text-sm font-medium mb-1.5 text-primary">
              {LABEL_NAME}
            </label>
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder={PLACEHOLDER_NAME}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-primary">
              {LABEL_EMAIL} <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={PLACEHOLDER_EMAIL}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-primary">
              {LABEL_PASSWORD} <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder={PLACEHOLDER_PASSWORD}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-primary">
              {LABEL_CONFIRM} <span className="text-red-500">*</span>
            </label>
            <input
              name="confirm"
              type="password"
              required
              autoComplete="new-password"
              placeholder={PLACEHOLDER_CONFIRM}
              className={INPUT_CLASS}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 mt-2 bg-primary"
          >
            {loading ? BTN_LOADING : BTN_SUBMIT}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {FOOTER_TEXT}{' '}
          <Link href={REDIRECT_LOGIN} className="font-semibold hover:underline text-primary">
            {FOOTER_LINK}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegistraciaPage
