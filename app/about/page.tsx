'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <section
      // === Фон и высота экрана ===
      className="
        section-svh
        bg-gradient-to-b from-[var(--primary)] to-[var(--background)]
        flex items-start justify-center
        overflow-y-auto
        pt-24 pb-16 px-6 lg:px-20
      "
    >
      <motion.div
        // === Плавное появление контента при скролле ===
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full text-left"
      >
        {/* === Заголовок страницы === */}
        <h1 className="text-4xl lg:text-5xl font-heading text-[var(--text-primary)] mb-8 leading-tight text-center">
          About Camilla Dating Help
        </h1>

        {/* === Основной контент страницы === */}
        <p className="font-accent text-[1.125rem] lg:text-[1.25rem] text-[var(--text-primary)] leading-relaxed tracking-wide mb-6">
          Finding real connections online shouldn’t be complicated.
          <br /><br />
          Camilla Dating Help was created to make it simple again — one place where people can explore trusted dating platforms, learn how they work, and choose what fits them best.
        </p>

        <p className="font-accent text-[1.125rem] lg:text-[1.25rem] text-[var(--text-primary)] leading-relaxed tracking-wide mb-6">
          We’re not a dating site ourselves. We’re an independent review project that focuses on clarity, honesty, and safety. Each platform featured here has been manually checked for:
        </p>

        <ul className="list-disc ml-6 mb-6 space-y-2 font-accent text-[1.125rem] lg:text-[1.25rem] text-[var(--text-primary)] leading-relaxed">
          <li>verified and active profiles,</li>
          <li>clear membership options,</li>
          <li>transparent billing,</li>
          <li>and active moderation.</li>
        </ul>

        <p className="font-accent text-[1.125rem] lg:text-[1.25rem] text-[var(--text-primary)] leading-relaxed tracking-wide mb-6">
          Camilla — the voice of our brand — represents experience, empathy, and a touch of humor.
          <br />
          She speaks to men who value their time and prefer genuine attention over endless swiping.
        </p>

        <p className="font-accent text-[1.125rem] lg:text-[1.25rem] text-[var(--text-primary)] leading-relaxed tracking-wide">
          Our mission is simple: help you find real people, avoid fake promises, and feel confident in your choices.
          <br /><br />
          Your story might start with one click — and we’re here to make sure it starts in the right place.
        </p>
      </motion.div>
    </section>
  )
}
