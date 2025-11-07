// /lib/fbCapi.ts
// ============================================================================
// Серверный модуль для отправки событий в Facebook Conversions API (CAPI)
// Используется в /api/conversion (и при ручных событиях Lead / Purchase)
// Совместим с Edge Runtime — только Web API, без Node зависимостей
// ============================================================================

import 'server-only'

// === 1. Хелпер безопасного чтения ENV =======================================
function readEnv(name: string): string {
  const value = process.env[name]
  if (!value || value.trim() === '') {
    throw new Error(`❌ ENV переменная "${name}" не найдена или пуста`)
  }
  return value.trim()
}

// === 2. Базовые конфиги =====================================================
const FB_PIXEL_ID = readEnv('NEXT_PUBLIC_FB_PIXEL_ID')
const FB_ACCESS_TOKEN = readEnv('FB_ACCESS_TOKEN')

// === 3. Типы событий ========================================================
export interface FbCapiEvent {
  event_name: 'Lead' | 'Purchase' | 'ViewContent' | 'PageView'
  event_id?: string // для связывания CAPI + Pixel
  event_time?: number // Unix timestamp (по умолчанию = now)
  fbc?: string
  fbp?: string
  fbclid?: string
  client_user_agent?: string
  client_ip_address?: string
  external_id?: string // можно использовать session_id
  value?: number
  currency?: string
}

// === 4. Основная функция ====================================================
export async function sendCapiEvent(event: FbCapiEvent): Promise<Response> {
  try {
    // Подготовка тела запроса
    const payload = {
      data: [
        {
          event_name: event.event_name,
          event_time: event.event_time || Math.floor(Date.now() / 1000),
          event_id: event.event_id,
          action_source: 'website',
          event_source_url: process.env.NEXT_PUBLIC_SITE_ORIGIN,
          user_data: {
            fbc: event.fbc,
            fbp: event.fbp,
            client_user_agent: event.client_user_agent,
            client_ip_address: event.client_ip_address,
            external_id: event.external_id,
          },
          custom_data: {
            value: event.value,
            currency: event.currency || 'USD',
          },
        },
      ],
    }

    // Запрос к Graph API
    const res = await fetch(`https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    // Проверяем статус
    if (!res.ok) {
      console.error(`❌ FB CAPI error [${res.status}]:`, await res.text())
    } else {
      console.log('✅ FB CAPI event sent:', event.event_name)
    }

    return res
  } catch (error: any) {
    console.error('❌ Ошибка при отправке события в FB CAPI:', error)
    throw error
  }
}
