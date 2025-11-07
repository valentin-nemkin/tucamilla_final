// /middleware.ts
// ============================================================================
// Глобальное middleware для захвата UTM-меток, fbclid, ad_id, adset_id и session_id.
// Работает для всех маршрутов сайта.
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { persistTrackingCookies, setCookie } from '@/lib/cookies'

// 👇 Теперь middleware асинхронное, т.к. cookies() стал async
export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const res = NextResponse.next()

  // === Собираем все utm-метки и session_id через helper ===
  const { cookiesToSet } = await persistTrackingCookies(url)

  // === Проставляем куки в ответ ===
  for (const [name, value] of Object.entries(cookiesToSet)) {
    if (typeof value === 'string' && value.trim() !== '') {
      setCookie(res, name, value)
    }
  }

  return res
}

// === Настройки областей применения middleware ================================
export const config = {
  // Middleware применяется ко всем путям, кроме статических и API-роутов
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
}
