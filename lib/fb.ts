// === /lib/fb.ts ===
// Универсальный модуль для инициализации и отслеживания событий Facebook Pixel
// Полностью типобезопасная версия для TypeScript

// Расширяем интерфейс Window, чтобы TypeScript понимал структуру fbq
declare global {
    interface Window {
      fbq?: FBQFunction;
    }
  
    interface FBQFunction {
      (...args: any[]): void;
      q?: any[];
      l?: number;
    }
  }
  
  export const fb = {
    /**
     * Инициализация пикселя
     * @param id — идентификатор пикселя из .env.local
     */
    init: (id: string) => {
      if (typeof window === "undefined" || !id) return;
  
      // Если fbq уже есть — не инициализируем повторно
      if (window.fbq) return;
  
      // Создаём fbq функцию
      window.fbq = function (...args: any[]) {
        window.fbq!.q = window.fbq!.q || [];
        window.fbq!.q!.push(args);
      };
      window.fbq.l = +new Date();
  
      // Подключаем скрипт Facebook Pixel
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
  
      // Инициализируем пиксель
      window.fbq("init", id);
      // Отправляем первое событие
      window.fbq("track", "PageView");
    },
  
    /**
     * Отправка произвольного события в пиксель
     * @param event — тип события (Lead, Purchase, ViewContent и т.д.)
     * @param data — дополнительные параметры (опционально)
     */
    track: (event: string, data?: Record<string, any>) => {
      if (typeof window === "undefined" || !window.fbq) return;
      window.fbq("track", event, data || {});
    },
  };
  