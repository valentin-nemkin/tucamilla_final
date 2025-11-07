// /lib/offers.ts
// ============================================================================
// Модуль для работы с офферами и финальными URL редиректа.
// Поддерживает передачу аналитических параметров sub1..sub5 в партнёрские ссылки.
// Используется в /api/go/[offer]
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
      if (value && value.trim() !== '') url.searchParams.set(key, value.trim())
    }
    return url.toString()
  } catch (error) {
    console.error('❌ Ошибка при обработке URL в safeAppendParams:', error)
    return baseUrl
  }
}

// === 2.7: Тип данных клика (ClickData) =====================================
export interface ClickData {
  // Идентификаторы Meta / Facebook
  fbclid?: string
  fbp?: string
  fbc?: string

  // Рекламные ID
  campaign_id?: string
  adset_id?: string
  ad_id?: string

  // UTM
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string

  // Сессия
  session_id: string

  // Технические данные
  user_agent?: string
  ip?: string
}

// === 2.8: Формирование sub-параметров ======================================
export function buildSubParams(click: ClickData): Record<string, string> {
  return {
    sub1: click.fbclid ?? '',        // Уникальный FB Click ID
    sub2: click.adset_id ?? '',      // Adset ID
    sub3: click.ad_id ?? '',         // Ad ID
    sub4: click.utm_source ?? '',    // Источник трафика
    sub5: click.session_id,          // Уникальная сессия
  }
}

// === 2.9: Финальный URL редиректа ==========================================
export function resolveOffer(slug: OfferSlug, click: ClickData): string {
  const offer = offersMap[slug]
  if (!offer) throw new Error(`❌ Оффер "${slug}" не найден в карте offersMap`)

  const subParams = buildSubParams(click)
  const finalUrl = safeAppendParams(offer.baseUrl, subParams)
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
