// /app/api/go/[offer]/route.ts
import { NextResponse } from 'next/server'
import { resolveOffer, listOffers, type OfferSlug } from '@/lib/offers'
import { parseClickData } from '@/lib/parseClickData'

// === Вспомогательная функция для парсинга cookies (безопасная) ===============
function getCookieValue(cookieHeader: string | null, name: string): string {
  if (!cookieHeader) return ''
  // cookieHeader: "a=1; fbclid=abc=123; session_id=xyz"
  const parts = cookieHeader.split(';')
  for (const raw of parts) {
    const c = raw.trim()
    const eq = c.indexOf('=')
    if (eq <= 0) continue
    const key = c.slice(0, eq)
    const val = c.slice(eq + 1)
    if (key === name) return decodeURIComponent(val)
  }
  return ''
}

// === API /api/go/[offer] =====================================================
export async function GET(
  req: Request,
  context: { params: Promise<{ offer: string }> }
) {
  const { offer } = await context.params
  const slug = offer as OfferSlug

  try {
    // === Проверяем валидность slug ===
    const availableOffers = listOffers()
    if (!availableOffers.includes(slug)) {
      return NextResponse.json(
        { error: `❌ Invalid offer slug: "${offer}"` },
        { status: 400 }
      )
    }

    // === Парсим данные клика (utm, query и т.д.) ===
    const clickData = parseClickData(req)

    // === Читаем cookie из заголовка ===
    const cookieHeader = req.headers.get('cookie')
    const fbclidFromCookie = getCookieValue(cookieHeader, 'fbclid')
    const sessionId = getCookieValue(cookieHeader, 'session_id')

    // ✅ ИСПРАВЛЕНО: Добавляем fbclid и session_id ТОЛЬКО если их нет в clickData
    // Не перезаписываем через sub1/sub5, чтобы не ломать логику buildSubParams
    if (fbclidFromCookie && !clickData.fbclid) {
      clickData.fbclid = fbclidFromCookie
    }
    if (sessionId && !clickData.session_id) {
      clickData.session_id = sessionId
    }

    // === Генерируем финальный URL оффера (вся логика только в resolveOffer) ===
    const redirectUrl = resolveOffer(slug, clickData)

    console.log('✅ Final redirect URL:', redirectUrl)
    console.log('➡️ Redirecting to:', redirectUrl)

    // === Возвращаем реальный redirect (307) без каких-либо правок URL ===
    return NextResponse.redirect(redirectUrl, 307)
  } catch (error: any) {
    console.error('❌ Redirect error:', error)
    return NextResponse.json(
      { error: `Redirect failed: ${error.message || 'unknown error'}` },
      { status: 500 }
    )
  }
}