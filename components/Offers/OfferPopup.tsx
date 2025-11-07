'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { Offer } from './OfferCard'

export default function OfferPopup({
  offer,
  isOpen,
  onClose,
}: {
  offer: Offer | null
  isOpen: boolean
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose()
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && offer && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            ref={ref}
            className="relative max-w-lg w-[90%] p-8 md:p-10 rounded-3xl
                       shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                       bg-[linear-gradient(180deg,var(--primary)_0%,#ffffff_100%)]
                       border border-[var(--secondary)]/30
                       flex flex-col items-start"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-black/60 hover:text-[var(--accent)] transition-colors"
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            {/* Иконка оффера */}
            {offer.icon && (
              <div className="w-full flex justify-center mb-6">
                <Image
                  src={offer.icon}
                  alt={offer.title}
                  width={90}
                  height={90}
                  className="rounded-full object-cover shadow-md ring-4 ring-white/70"
                />
              </div>
            )}

            {/* Заголовок */}
            <h3 className="font-heading text-2xl mb-4 text-center w-full text-black">
              {offer.title}
            </h3>

            {/* Основной текстовый блок */}
            <div
              className="w-full text-left space-y-4
                         text-base leading-relaxed font-normal text-black
                         [&_p]:text-base [&_p]:leading-relaxed [&_p]:font-normal [&_p]:text-black
                         [&_li]:text-[1rem] [&_li]:leading-relaxed [&_li]:font-normal [&_li]:text-black
                         [&_li::marker]:text-black [&_li::marker]:text-[1rem]
                         [&_span]:text-black"
            >
              {offer.lead && <p>{offer.lead}</p>}

              {offer.expect && offer.expect.length > 0 && (
                <ul className="list-disc list-inside space-y-1">
                  {offer.expect.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {offer.who && <p>Who it’s for: {offer.who}</p>}
              {offer.safety && <p>Safety & privacy: {offer.safety}</p>}
            </div>

            {/* Дисклеймер */}
            {offer.disclaimer && (
              <p className="text-xs text-[var(--text-secondary)] opacity-80 mt-8 w-full text-left leading-snug">
                {offer.disclaimer}
              </p>
            )}

            {/* Кнопка перехода */}
            <div className="w-full flex justify-center mt-6">
              <motion.a
                href={`/go/${offer.id}`}
                className="inline-block px-8 py-3 rounded-full 
                           bg-[var(--accent)] text-white font-accent shadow-md
                           hover:shadow-[0_0_25px_rgba(244,91,105,0.5)]
                           hover:opacity-95 transition-all duration-300"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
              >
                {offer.cta || 'Visit Offer'}
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
