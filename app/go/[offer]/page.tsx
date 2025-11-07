'use client'

// === Экран редиректа с корректным получением slug ===
// Берём slug через useParams(), передаём query-строку в API,
// показываем понятную ошибку при невалидном оффере.

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const REDIRECT_DELAY = Number(process.env.NEXT_PUBLIC_REDIRECT_DELAY_MS || 2000)

export default function OfferRedirectPage() {
  const { offer } = useParams() as { offer?: string } // <-- надёжно получаем slug
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function run() {
      if (!offer) {
        setError('Offer slug is missing')
        setLoading(false)
        return
      }

      try {
        // передаём все query-параметры
        const res = await fetch(`/api/go/${offer}${window.location.search}`)
        const data = await res.json()

        if (data?.redirectUrl) {
          // опциональная задержка перед уходом
          setTimeout(() => (window.location.href = data.redirectUrl), REDIRECT_DELAY)
          return
        }

        setError(data?.error || 'Unknown redirect error')
      } catch (e) {
        console.error('Redirect error:', e)
        setError('Failed to reach redirect endpoint')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [offer])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 text-center px-4">
      {loading ? (
        <div>
          <h1 className="text-3xl font-heading text-brand-dark">PLEASE WAIT…</h1>
          <p className="text-gray-600 mt-4">Redirecting to the offer…</p>
        </div>
      ) : error ? (
        <div>
          <h1 className="text-3xl font-heading text-red-600">❌ Offer not found</h1>
          <p className="text-gray-600 mt-4">{error}</p>
          <a
            href="/"
            className="inline-block mt-6 px-6 py-2 rounded-lg bg-brand-dark text-white hover:bg-brand-yellow transition"
          >
            Back to main page
          </a>
        </div>
      ) : null}
    </main>
  )
}
