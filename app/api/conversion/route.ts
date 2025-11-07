// /app/api/conversion/route.ts
// ============================================================================
// Обработчик постбэков от партнёрской сети (CrakRevenue / др.)
// Принимает параметры sub1..sub5, сумму, валюту и вызывает sendCapiEvent()
// ============================================================================

import { NextResponse } from 'next/server'
import { sendCapiEvent } from '@/lib/fbCapi'

// Edge Runtime — быстрее и безопаснее
export const runtime = 'edge'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const params = url.searchParams

    // Извлекаем параметры партнёрки (согласно структуре sub1..sub5)
    const sub1 = params.get('sub1') ?? undefined // fbclid
    const sub2 = params.get('sub2') ?? undefined // adset_id
    const sub3 = params.get('sub3') ?? undefined // ad_id
    const sub4 = params.get('sub4') ?? undefined // utm_source
    const sub5 = params.get('sub5') ?? undefined // session_id

    // Доп. данные (выплата, валюта, тип события)
    const amount = params.get('amount')
    const currency = params.get('currency') ?? 'USD'
    const eventName = params.get('event_name') ?? 'Lead' // по умолчанию — Lead

    // Отправляем событие в Facebook CAPI
    const response = await sendCapiEvent({
      event_name: eventName as 'Lead' | 'Purchase' | 'ViewContent' | 'PageView',
      event_id: sub5 ?? crypto.randomUUID(), // общий ID с Pixel
      fbc: sub1,
      external_id: sub5, // session_id для атрибуции
      value: amount ? parseFloat(amount) : undefined,
      currency,
    })

    // Ответ партнёрке
    return NextResponse.json({
      success: true,
      status: response.status,
      event_name: eventName,
      fb_response: await response.text(),
    })
  } catch (error: any) {
    console.error('❌ Ошибка в /api/conversion:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
