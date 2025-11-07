'use client'

import { motion } from 'framer-motion'

export default function Description() {
  return (
    <section
      /* === Статичный фон и выравнивание === */
      className="
        section-svh
        bg-gradient-to-b from-[var(--primary)] to-[var(--background)]
        flex flex-col items-center justify-start
        pt-[15vh] px-6 lg:px-20 text-center
      "
    >
      {/* === Анимируем только контент === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <h2 className="text-4xl lg:text-5xl font-heading text-[var(--text-primary)] mb-10 leading-tight max-w-3xl">
          A Smarter Way to Meet Real Women
        </h2>

        <p
          className="
            font-accent text-[1.25rem] lg:text-[1.4rem]
            text-[var(--text-primary)]
            leading-relaxed tracking-wide
            max-w-3xl
          "
        >
          Camilla knows most dating sites promise the world and deliver nothing but bots.
          <br /><br />
          That’s why she personally reviewed dozens of platforms to find those where women actually respond — and enjoy the conversation.
          <br /><br />
          Some require a membership, but that’s often the difference between fake attention and something truly real.
          <br /><br />
          If what you want is connection — not commitment — you’re in the right place.
        </p>
      </motion.div>
    </section>
  )
}
