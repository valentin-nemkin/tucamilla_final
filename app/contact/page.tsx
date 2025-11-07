'use client'

import { motion } from 'framer-motion'

export default function ContactPage() {
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
          Contact Camilla Dating Help
        </h1>

        {/* === Основной контент === */}
        <p className="font-accent text-[1.125rem] lg:text-[1.25rem] text-[var(--text-primary)] leading-relaxed tracking-wide mb-6">
          Have a question, suggestion, or feedback about our platform?
          <br />
          We’d love to hear from you.
        </p>

        <p className="font-accent text-[1.125rem] lg:text-[1.25rem] text-[var(--text-primary)] leading-relaxed tracking-wide mb-6">
          Camilla Dating Help is an independent review project created to help people navigate modern dating websites with confidence and safety.
          <br />
          If you have inquiries about our content, site functionality, or want to suggest a new platform to feature — feel free to get in touch.
        </p>

        {/* === Контактная информация === */}
        <div className="space-y-4 mb-8 font-accent text-[1.125rem] lg:text-[1.25rem] text-[var(--text-primary)] leading-relaxed">
          <p>
            <strong>Email:</strong>{' '}
            <a
              href="mailto:support@tucamilla.info"
              className="underline text-[var(--accent)]"
            >
              support@tucamilla.info
            </a>
          </p>
          <p> <strong>Location:</strong> London, Ontario, Canada</p>
        </div>

        <p className="font-accent text-[1.125rem] lg:text-[1.25rem] text-[var(--text-primary)] leading-relaxed tracking-wide">
          Messages are used solely for communication and not shared with third parties.
          <br />
          Please note: we do not provide direct dating or messaging services.
        </p>
      </motion.div>
    </section>
  )
}
