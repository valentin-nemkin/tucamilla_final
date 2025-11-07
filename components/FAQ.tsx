'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const faqs = [
    {
      q: 'Are these profiles real? How do you handle fakes and scammers?',
      a: 'We only recommend platforms with active moderation, ID or photo checks, and quick reporting tools. No system is perfect, but these sites remove flagged accounts fast. Tip: keep chats inside the platform, avoid sending money or gift cards, and ignore anyone pushing you off-site.',
    },
    {
      q: 'Is this free? Why do some sites charge?',
      a: 'Many quality platforms are paid because fees discourage bots and time-wasters and fund real moderation. You’re paying for better visibility, faster replies, and higher odds of meeting real women. It usually costs less than the hours lost on “free” apps. Start small, upgrade only if you see traction.',
    },
    {
      q: 'Will I actually see local matches and my age range?',
      a: 'Yes—these platforms support geo-matching and filters by age, intent, and interests. Set your city or ZIP, pick 30–65 (or your preference), add two or three recent photos, and write a short, specific bio. Most guys who do this see first responses within a couple of days.',
    },
    {
      q: 'I’m not looking to get married. Is casual attention okay here?',
      a: 'Absolutely. The list includes sites where men look for light, respectful connections—anything from friendly chat to casual dates. Use the platform’s “intent” filters and be upfront in your profile so you match with women who want the same thing.',
    },
    {
      q: 'How is my privacy handled? What about billing and cancellations?',
      a: 'We don’t store your personal data; basic cookies are used only for site performance and click routing (see Privacy). Each platform manages its own billing—descriptors are typically neutral, and you can cancel in your account settings at any time. If you need help, use the site’s support or billing portal.',
    },
  ]

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section
      className="
        section-svh
        bg-gradient-to-b from-[#FAFAFA] to-[#FDE1E7]
        flex flex-col items-center justify-center
        px-6 py-20
        text-[var(--text-primary)]
      "
    >
      {/* === Заголовок === */}
      <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-12 text-center">
        Frequently Asked Questions
      </h2>

      {/* === Список вопросов === */}
      <div className="w-full max-w-3xl space-y-4">
        {faqs.map(({ q, a }, i) => (
          <div
            key={i}
            className="
              bg-white/70 backdrop-blur-sm border border-white/40
              rounded-2xl shadow-sm
              hover:shadow-md transition-all duration-300
            "
          >
            <button
              className="w-full flex justify-between items-center text-left px-6 py-5"
              onClick={() =>
                setActiveIndex(activeIndex === i ? null : i)
              }
            >
              <span className="font-accent text-lg md:text-xl font-semibold">
                {q}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[var(--primary)] transform transition-transform duration-300 ${
                  activeIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* === Раскрытие текста === */}
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="px-6 pb-6 text-[var(--text-secondary)] leading-relaxed"
                >
                  {a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
