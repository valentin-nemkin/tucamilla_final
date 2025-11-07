'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    // ✅ Используем hero-svh вместо hero-dvh
    <section id="hero" className="hero-svh relative w-full overflow-hidden text-white">
      {/* === Фон === */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-desktop.webp"
          alt="Camilla background desktop"
          fill
          priority
          sizes="(max-width: 768px) 0, 100vw"
          className="hidden object-cover md:block"
        />
        <Image
          src="/images/hero/hero-mobile.webp"
          alt="Camilla background mobile"
          fill
          priority
          sizes="(max-width: 768px) 100vw"
          className="object-cover md:hidden"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* === Контент === */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-center px-6 pt-24 md:pt-28 text-center md:text-left md:pl-[10%] max-w-[600px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font-heading text-4xl md:text-6xl mb-4 tracking-tight drop-shadow-lg">
          Camilla knows what you like — let’s test that theory
        </h1>

        <p className="font-accent text-base md:text-xl mb-8 text-white/90 drop-shadow-md leading-relaxed">
          She handpicked profiles you might actually enjoy. No bots. No fake smiles.
        </p>

        {/* === Кнопка с якорем на блок Offers === */}
        <a href="#offers">
          <Button
            className="
              rounded-full bg-[var(--primary)] px-10 py-5 text-lg font-semibold text-white
              transition-all hover:bg-[var(--accent)] hover:scale-105 shadow-lg
            "
          >
            Take me to the matches
          </Button>
        </a>
      </motion.div>
    </section>
  )
}
