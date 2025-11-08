import { NextResponse } from 'next/server'
import { resolveOffer, listOffers } from '@/lib/offers'
import { parseClickData } from '@/lib/parseClickData'
import fs from 'fs'
import path from 'path'

// === Вспомогательная функция для парсинга cookies ===
function getCookieValue(cookieHeader: string | null, name: string): string {
  if (!cookieHeader) return ''
  const cookies = cookieHeader.split(';').map(c => c.trim())
  const target = cookies.find(c => c.startsWith(name + '='))
  return target ? decodeURIComponent(target.split('=')[1]) : ''
}

// === API /api/go/[offer] =====================================================
export async function GET(req: Request, context: { params: Promise<{ offer: string }> }) {
  const { offer } = await context.params

  try {
    // === Проверяем валидность slug ===
    const availableOffers = listOffers()
    if (!availableOffers.includes(offer as any)) {
      return NextResponse.json({ error: `❌ Invalid offer slug: "${offer}"` }, { status: 400 })
    }

    // === Парсим данные клика (utm, query и т.д.) ===
    const clickData = parseClickData(req)

    // === Читаем cookie из заголовка ===
    const cookieHeader = req.headers.get('cookie')
    const fbclid = getCookieValue(cookieHeader, 'fbclid')
    const sessionId = getCookieValue(cookieHeader, 'session_id')

    // === Добавляем fbclid → sub1 и session_id → sub5 ===
    if (fbclid) clickData.sub1 = fbclid
    if (sessionId) clickData.sub5 = sessionId

    // === Генерируем финальный URL оффера ===
    const redirectUrl = resolveOffer(offer as any, clickData)

        // === Возвращаем redirect URL как JSON ===
    return NextResponse.json({ redirectUrl }, { status: 200 })
  } catch (error: any) {
    console.error('❌ Redirect error:', error)
    return NextResponse.json(
      { error: `Redirect failed: ${error.message || 'unknown error'}` },
      { status: 500 }
    )
  }
}
