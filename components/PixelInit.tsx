'use client'

// === Инициализация Facebook Pixel ===
// Компонент вызывается в layout.tsx, чтобы не мешать metadata

import { useEffect } from "react";
import { fb } from "@/lib/fb";

export default function PixelInit() {
  useEffect(() => {
    fb.init(process.env.NEXT_PUBLIC_FB_PIXEL_ID || "");
  }, []);

  return null;
}
