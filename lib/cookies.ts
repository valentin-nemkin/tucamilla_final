// /lib/cookies.ts
// ============================================================================
// Утилиты для чтения, записи и генерации трекинг-куки.
// Совместимо с Next.js 15+ и Edge Runtime (асинхронное API cookies()).
// ============================================================================

import { cookies } from 'next/headers'

// --- Лёгкий тип для куки -----------------------------------------------------
type SimpleCookie = { name: string; value: string }

// --- Безопасный доступ к Web Crypto API -------------------------------------
interface CryptoLike {
  randomUUID?: () => string
  getRandomValues?: (array: Uint8Array) => Uint8Array
}
const g = globalThis as unknown as { crypto?: CryptoLike }

// === Генерация UUID без node:crypto =========================================
function generateSessionId(): string {
  if (g.crypto?.randomUUID) return g.crypto.randomUUID()
  const bytes = new Uint8Array(16)
  if (g.crypto?.getRandomValues) g.crypto.getRandomValues(bytes)
  else for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  const hex = Array.from(bytes, toHex).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

// === Получение cookie по имени ==============================================
export async function getCookie(name: string): Promise<string | null> {
  try {
    const store = await cookies() // 👈 теперь асинхронно
    const all = Array.from((store as any).getAll?.() ?? []) as SimpleCookie[]
    const found = all.find((c) => c.name === name)
    return found?.value ?? null
  } catch {
    return null
  }
}

// === Установка cookie (HTTP-ответ) ==========================================
export function setCookie(
  response: Response,
  name: string,
  value: string,
  days = 180
): void {
  const maxAge = days * 24 * 60 * 60
  response.headers.append(
    'Set-Cookie',
    `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure`
  )
}

// === Генерация или возврат session_id =======================================
export async function getOrCreateSessionId(): Promise<string> {
  const existing = await getCookie('session_id')
  if (existing) return existing
  return generateSessionId()
}

// === Извлечение utm-параметров ==============================================
export function readUtmFromQuery(url: URL): Record<string, string> {
  const params = url.searchParams
  const utm: Record<string, string> = {}
  ;['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','_fbp','_fbc'].forEach((key) => {
    const v = params.get(key)
    if (v) utm[key] = v
  })
  return utm
}

// === Главная функция для middleware =========================================
export async function persistTrackingCookies(url: URL): Promise<{
  cookiesToSet: Record<string, string>
}> {
  const utm = readUtmFromQuery(url)
  const sessionId = await getOrCreateSessionId()
  const cookiesToSet: Record<string, string> = { session_id: sessionId, ...utm }
  return { cookiesToSet }
}
