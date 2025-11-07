'use client'

import Image from 'next/image'

// === Интерфейс оффера ===
export interface Offer {
  id: string
  title: string
  shortDescription: string
  chips?: string[]
  note?: string
  icon?: string
  lead?: string
  expect?: string[]
  who?: string
  safety?: string
  disclaimer?: string
  cta?: string
}

export default function OfferCard({
  offer,
  onSelect,
}: {
  offer: Offer
  onSelect?: () => void
}) {
  return (
    <div
      onClick={onSelect}
      className="flex flex-col justify-between text-center
                 cursor-pointer bg-white/95 hover:bg-[var(--secondary)]/5
                 border border-[var(--secondary)]/20 rounded-xl
                 p-6 shadow-[0_0_10px_rgba(244,91,105,0.15)]
                 hover:shadow-[0_0_25px_rgba(244,91,105,0.35)]
                 transition-all duration-300 w-full h-full min-h-[360px]"
    >
      {/* === Верхняя часть: иконка + контент === */}
      <div className="flex flex-col items-center flex-grow">
        {/* Иконка */}
        {offer.icon && (
          <Image
            src={offer.icon}
            alt={offer.title}
            width={70}
            height={70}
            className="rounded-full object-cover mb-4"
          />
        )}

        {/* Название */}
        <h3 className="font-heading text-lg md:text-xl text-[var(--text-primary)] mb-2">
          {offer.title}
        </h3>

        {/* Короткое описание */}
        <p className="text-sm text-[var(--text-secondary)] mb-3 leading-snug max-w-[90%] mx-auto">
          {offer.shortDescription}
        </p>

        {/* Чипы */}
        {offer.chips && (
          <div className="flex flex-wrap justify-center gap-1 mb-4">
            {offer.chips.map((chip, index) => (
              <span
                key={index}
                className="text-[13px] italic font-medium text-black"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* === Нижняя часть: кнопка === */}
      <div className="flex justify-center mt-auto">
        <button
          className="px-5 py-1.5 rounded-full bg-[var(--accent)] text-white text-sm 
                     font-accent font-medium shadow-sm hover:shadow-[0_0_15px_rgba(244,91,105,0.4)]
                     transition-all duration-300 hover:opacity-90"
        >
          Learn more
        </button>
      </div>
    </div>
  )
}
