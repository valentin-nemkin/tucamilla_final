// /lib/offers.ts
// ============================================================================
// Модуль для работы с офферами и финальными URL редиректа.
// Поддерживает передачу аналитических параметров aff_sub..aff_sub5.
// Используется в /api/go/[offer].
// ============================================================================

import 'server-only'

// === 2.2: Типизация слагов офферов =========================================
export type OfferSlug =
  | 'adult-friend-finder'
  | 'benaughty'
  | 'cougar-life'
  | 'fling'
  | 'flirtico'
  | 'instabang'
  | 'naughty-talk'

// === 2.3: Интерфейс конфигурации оффера =====================================
export interface OfferConfig {
  baseUrl: string
}

// === 2.4: Хелпер безопасного чтения ENV ====================================
export function readEnv(name: string): string {
  const value = process.env[name]
  if (!value || value.trim() === '') {
    throw new Error(`❌ ENV переменная "${name}" не найдена или пуста`)
  }
  return value.trim()
}

// === 2.5: Карта офферов ====================================================
export const offersMap: Record<OfferSlug, OfferConfig> = {
  'adult-friend-finder': { baseUrl: readEnv('OFFER_ADULT_FRIEND_FINDER_URL') },
  benaughty: { baseUrl: readEnv('OFFER_BENAUGHTY_URL') },
  'cougar-life': { baseUrl: readEnv('OFFER_COUGAR_LIFE_URL') },
  fling: { baseUrl: readEnv('OFFER_FLING_URL') },
  flirtico: { baseUrl: readEnv('OFFER_FLIRTICO_URL') },
  instabang: { baseUrl: readEnv('OFFER_INSTABANG_URL') },
  'naughty-talk': { baseUrl: readEnv('OFFER_NAUGHTY_TALK_URL') },
}

// === 2.6: Безопасное добавление query-параметров ============================
export function safeAppendParams(baseUrl: string, params: Record<string, string | undefined>): string {
  try {
    const url = new URL(baseUrl)
    for (const [key, value] of Object.entries(params)) {
      if (value && value.trim() !== '' && !url.searchParams.has(key)) {
        url.searchParams.set(key, value.trim())
      }
    }
    return url.toString()
  } catch (error) {
    console.error('❌ Ошибка при обработке URL в safeAppendParams:', error)
    return baseUrl
  }
}

// === 2.7: Тип данных клика (ClickData) =====================================
export interface ClickData {
  fbclid?: string
  fbp?: string
  fbc?: string
  campaign_id?: string
  adset_id?: string
  ad_id?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  session_id: string
  user_agent?: string
  ip?: string
  [key: string]: any
}

// === 2.8: Формирование aff_sub-параметров ==================================
// ✅ ИСПРАВЛЕНО: теперь соответствует логике из README
export function buildSubParams(click: ClickData): Record<string, string> {
  return {
    aff_sub: click.utm_source ?? 'direct',
    aff_sub2: click.utm_medium ?? 'none',
    aff_sub3: click.utm_campaign ?? 'none',
    aff_sub4: click.utm_content ?? 'none',
    aff_sub5: click.fbclid ?? click.session_id,
  }
}

// === 2.9: Финальный URL редиректа ==========================================
export function resolveOffer(slug: OfferSlug, click: ClickData): string {
  const offer = offersMap[slug]
  if (!offer) throw new Error(`❌ Оффер "${slug}" не найден в карте offersMap`)

  // 1️⃣ Собираем базовые aff_sub-параметры
  const subParams = buildSubParams(click)

  // 2️⃣ Перезаписываем, если переданы sub1..sub5
  for (let i = 1; i <= 5; i++) {
    const subKey = `sub${i}`
    const affKey = i === 1 ? 'aff_sub' : `aff_sub${i}`
    if (click[subKey]) subParams[affKey] = click[subKey]
  }

  // 3️⃣ Подставляем {sub1}..{sub5} в baseUrl
  let baseUrl = offer.baseUrl
  for (let i = 1; i <= 5; i++) {
    const placeholder = `{sub${i}}`
    const affKey = i === 1 ? 'aff_sub' : `aff_sub${i}`
    const value = encodeURIComponent(subParams[affKey] || '')
    baseUrl = baseUrl.replaceAll(placeholder, value)
  }

  // 4️⃣ Добавляем только source=Facebook, без дублей aff_sub
  const finalUrl = safeAppendParams(baseUrl, { source: 'Facebook' })
  
  // 🔍 Логирование для отладки (можно удалить после проверки)
  console.log('🔍 Offer slug:', slug)
  console.log('📊 Sub params:', subParams)
  console.log('🔗 Final URL:', finalUrl)
  console.log('---')
  
  return finalUrl
}

// === 2.10: Список всех офферов =============================================
export function listOffers(): OfferSlug[] {
  return Object.keys(offersMap) as OfferSlug[]
}

// === 2.11: Валидация конфигурации ==========================================
export function validateOffers(): void {
  for (const [slug, offer] of Object.entries(offersMap)) {
    try {
      new URL(offer.baseUrl)
    } catch {
      console.warn(`⚠️ Некорректный URL для "${slug}": ${offer.baseUrl}`)
    }
  }
}

if (process.env.NODE_ENV === 'development') validateOffers()

// ============================================================================
export const __OFFERS_MODULE_READY__ = true