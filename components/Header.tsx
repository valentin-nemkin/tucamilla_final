"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-[var(--secondary)]/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        {/* === Логотип / название === */}
        <Link
          href="/"
          className="font-heading text-2xl text-white tracking-wide"
        >
          Camilla
        </Link>

        {/* === Десктопное меню === */}
        <nav className="hidden md:flex items-center gap-6 font-accent font-semibold">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-white hover:text-[var(--accent)] transition-colors"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* === Кнопка бургер-меню для мобильной версии === */}
        <button
          className="md:hidden p-2 rounded-lg border border-white/30 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* === Нижняя разделительная линия (оставляем для структуры) === */}
      <div className="h-px w-full bg-white/30" />

      {/* === Мобильное меню === */}
      {open && (
        <div className="md:hidden bg-[var(--secondary)]/95 border-t border-white/20">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 font-accent font-semibold">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="py-1 text-white hover:text-[var(--accent)] transition-colors"
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
