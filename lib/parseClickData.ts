// /lib/parseClickData.ts
// ============================================================================
// Хелпер для извлечения данных клика (ClickData) из URL запроса.
// Совместим с Edge Runtime (использует только Web API).
// Используется в /api/go/[offer]/route.ts
// ============================================================================

import type { ClickData } from '@/lib/offers'

// === Расширяем ClickData (если в партнёрке нужны sub1–sub5) =================
declare module '@/lib/offers' {
  interface ClickData {
    sub1?: string
    sub2?: string
    sub3?: string
    sub4?: string
    sub5?: string
  }
}

// === Основная функция ========================================================
export function parseClickData(req: Request): ClickData {
  const url = new URL(req.url)
  const p = url.searchParams

  // === Универсальная функция чтения параметров ===
  const get = (...keys: string[]): string | undefined => {
    for (const k of keys) {
      const val = p.get(k)
      if (val && val.trim() !== '') return val.trim()
    }
    return undefined
  }

  // === Собираем ClickData ===================================================
  const data: ClickData = {
    // Facebook
    fbclid: get('fbclid'),
    fbp: get('fbp'),
    fbc: get('fbc'),

    // Кампания
    campaign_id: get('campaign_id', 'campaignId', 'cid'),
    adset_id: get('adset_id', 'adSetId', 'adset'),
    ad_id: get('ad_id', 'adId', 'ad'),

    // UTM
    utm_source: get('utm_source'),
    utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    utm_content: get('utm_content'),
    utm_term: get('utm_term'),

    // Сессия
    session_id: get('session_id') ?? crypto.randomUUID(),

    // Технические
    user_agent: req.headers.get('user-agent') ?? undefined,
    ip: req.headers.get('x-forwarded-for') ?? undefined,

    // sub-поля, если партнёрка возвращает их обратно
    sub1: get('sub1'),
    sub2: get('sub2'),
    sub3: get('sub3'),
    sub4: get('sub4'),
    sub5: get('sub5'),
  }

  return data
}
