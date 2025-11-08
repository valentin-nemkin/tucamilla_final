# TECH_OVERVIEW.md (русская версия)

## Camilla Dating Help — Технический обзор

### 1. Краткое описание проекта

**Camilla Dating Help** — современный преленд и система трекинга, построенная на **Next.js 15 (App Router)**, **TypeScript** и **TailwindCSS**. Она реализует полный цикл отслеживания кликов и конверсий между **Facebook Ads → tucamila.info → партнёрская сеть → Facebook Pixel / CAPI**.

Архитектура модульная, работает в Edge Runtime, надёжна и легко масштабируется.

---

### 2. Архитектура трекинга

#### 2.1 Поток данных

```
Facebook Ads → tucamila.info/go/[offer]?utm...&fbclid...
 ↓
middleware.ts → сохраняет UTM, fbclid, session_id в cookie
 ↓
/app/api/go/[offer] → проверяет оффер и собирает redirect URL
 ↓
/lib/offers.ts → подставляет sub1..sub5 и делает редирект на партнёрку
 ↓
Партнёрская сеть (например, CrakRevenue)
 ↓
Партнёрка отправляет постбэк → /api/conversion?sub1..sub5&event_name=Lead
 ↓
/lib/fbCapi.ts → отправляет событие в Facebook Conversions API (CAPI)
 ↓
Facebook Pixel (клиент) + CAPI (сервер) связываются через event_id=session_id
```

#### 2.2 Основные модули

| Модуль                      | Назначение                                                  |
| --------------------------- | ----------------------------------------------------------- |
| `/middleware.ts`            | Захватывает utm, fbclid и session_id, сохраняет их в cookie |
| `/lib/cookies.ts`           | Чтение, запись и генерация tracking-cookie                  |
| `/lib/parseClickData.ts`    | Извлекает параметры из URL запроса                          |
| `/lib/offers.ts`            | Формирует финальные партнёрские ссылки с сабами             |
| `/app/api/go/[offer]`       | Проверяет slug, объединяет query и cookie, делает редирект  |
| `/lib/fb.ts`                | Клиентский SDK для Facebook Pixel (fbq init + события)      |
| `/components/PixelInit.tsx` | Инициализирует Pixel на всех страницах                      |
| `/lib/fbCapi.ts`            | Серверный SDK для Facebook Conversions API                  |
| `/app/api/conversion`       | Принимает постбэки и вызывает CAPI-события                  |

---

### 3. Переменные окружения (`.env.local`)

#### Публичные (доступны на клиенте)

```
NEXT_PUBLIC_FB_PIXEL_ID=1302329218315498
NEXT_PUBLIC_REDIRECT_DELAY_MS=2000
NEXT_PUBLIC_SITE_ORIGIN=https://tucamila.info
```

#### Секретные (только для сервера)

```
FB_ACCESS_TOKEN=<токен Facebook Conversions API>
N8N_CLICK_WEBHOOK_URL=https://hookhub.pro/webhook/click-logger-SECURE
N8N_CONVERSION_WEBHOOK_URL=https://hookhub.pro/webhook/conversion-in-SECURE

OFFER_ADULT_FRIEND_FINDER_URL=https://t.crjmpy.com/...{sub1}...{sub5}
OFFER_BENAUGHTY_URL=...
OFFER_COUGAR_LIFE_URL=...
OFFER_FLING_URL=...
OFFER_FLIRTICO_URL=...
OFFER_INSTABANG_URL=...
OFFER_NAUGHTY_TALK_URL=...
```

*Каждый оффер содержит плейсхолдеры `{sub1..sub5}`, которые динамически заменяются в `resolveOffer()`.*

---

### 4. Логика основных модулей

#### `/app/api/go/[offer]/route.ts`

* Проверяет валидность slug оффера.
* Читает cookie (`fbclid`, `session_id`).
* Объединяет данные query и cookie в `ClickData`.
* Вызывает `resolveOffer()` → получает финальный URL.
* Возвращает 307 Redirect.

#### `/lib/offers.ts`

* Берёт базовый URL из ENV.
* Формирует параметры `aff_sub..aff_sub5`.
* Подставляет `{sub1..sub5}` в ссылку.
* Добавляет `source=Facebook`.

#### `/app/api/conversion/route.ts`

* Принимает параметры партнёрки (`sub1..sub5`, `amount`, `event_name`).
* Вызывает `sendCapiEvent()`.
* Возвращает JSON с результатом.

---

### 5. Интеграция Facebook Pixel

#### Клиентская часть (fbq)

* Инициализируется в `PixelInit.tsx`.
* Автоматически отправляет событие `PageView`.
* Поддерживает вызовы `fb.track('Lead')`, `fb.track('ViewContent')` и др.

#### Серверная часть (CAPI)

* `sendCapiEvent()` делает POST-запрос в Graph API `v18.0`.
* Использует `event_id = session_id` для связывания с fbq.
* Отправляет `fbc`, `fbp`, `external_id`, `client_ip_address`, `user_agent`.

---

### 6. Middleware и cookie

* Работает на всех маршрутах, кроме `/api` и статических.
* Сохраняет utm, fbclid, fbp, fbc и session_id.
* Куки живут 180 дней.
* Безопасные атрибуты: `Secure; SameSite=Lax; Path=/`.

---

### 7. Интерфейс и стили

* Шрифты: Anton SC (заголовки), Barlow Semi Condensed (акцент), Manrope (основной текст).
* Цвета заданы через CSS-переменные и расширение Tailwind-темы.
* Верстка адаптивная, с полным охватом экрана (`100svh`).

---

### 8. Разработка и деплой

#### Локально

```
npm install
npm run dev
```

Сайт доступен по адресу `http://localhost:3000`

#### Продакшн

```
npm run build
npm start
```

#### Деплой

* Рекомендуется Vercel (поддержка Edge Runtime).
* Добавить все переменные из `.env.local` в настройки окружения.
* Удалить дубликат `tailwind.config.js` (оставить `.ts`).

---

### 9. Зависимости

| Категория | Пакет               | Версия   |
| --------- | ------------------- | -------- |
| Основное  | next                | 15.1.6   |
|           | react / react-dom   | 19.2.0   |
| UI        | framer-motion       | 12.23.24 |
|           | lucide-react        | 0.548.0  |
|           | radix-ui            | ^1.2     |
| Стили     | tailwindcss         | ^3.4.13  |
|           | tailwindcss-animate | ^1.0.7   |
| Dev       | typescript          | ^5       |
|           | eslint-config-next  | 15.1.6   |

---

### 10. Замечания по обслуживанию

* Проверять `/api/conversion` тестовыми постбэками (Lead, Purchase).
* Для отладки логировать `console.log('✅ Final redirect URL', redirectUrl)`.
* В Facebook Events Manager проверять раздел **Test Events** — события Pixel и CAPI должны объединяться по `event_id`.

---

## Итог

**Camilla Dating Help** — это полностью готовая система трекинга трафика и конверсий.

* Сохраняет и использует все ключевые метки.
* Корректно атрибутирует события Facebook.
* Совместима с любыми партнёрскими сетями.
* Готова к масштабированию и использованию в арбитраже трафика.
