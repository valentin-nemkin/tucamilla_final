'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import OfferCard from '@/components/Offers/OfferCard'
import OfferPopup from '@/components/Offers/OfferPopup'
import { offersData } from '@/components/Offers/offersData'
import type { Offer } from '@/components/Offers/OfferCard'

export default function Offers() {
  // === Состояние активного оффера ===
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null)

  // === Функция выбора карточки ===
  const handleSelect = (offer: Offer) => {
    setActiveOffer(offer)
  }

  // === Функция закрытия попапа ===
  const handleClose = () => {
    setActiveOffer(null)
  }

  return (
    <motion.section
      id="offers" // 👈 ВАЖНО: якорь для прокрутки из Hero
      className="relative flex flex-col items-center justify-center 
                 px-4 sm:px-6 py-16 sm:py-20 
                 bg-[var(--background)] text-[var(--text-primary)] 
                 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* === Заголовок === */}
      <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-10 text-center">
        Popular Offers
      </h2>

      {/* === Сетка карточек === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {offersData.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onSelect={() => handleSelect(offer)}
          />
        ))}
      </div>

      {/* === Попап выбранного оффера === */}
      <OfferPopup
        offer={activeOffer}
        isOpen={!!activeOffer}
        onClose={handleClose}
      />
    </motion.section>
  )
}
