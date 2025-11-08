// components/Offers/offersData.ts
// === Структура данных для карточек офферов Camilla Dating Help ===
// Комментарии на русском языке

import type { Offer } from '@/components/Offers/OfferCard'

// === Массив офферов ===
export const offersData: Offer[] = [
  {
    id: 'adult-friend-finder',
    title: 'Adult FriendFinder',
    shortDescription:
      'Explore one of the world’s largest casual networks — over 80 million members ready for connection.',
    chips: ['Verified profiles', 'Global network', 'Private chats'],
    note: 'Membership may apply.',
    lead:
      'Adult FriendFinder gives you access to a huge community, secure chats and filters built for real connections.',
    expect: [
      'Quick registration and access to millions of profiles worldwide.',
      'Verified accounts and moderation for safer use.',
      'Private chats, live streams, and filters by location and intent.',
    ],
    who: 'Men 30-65 who value their time and want real responses.',
    safety:
      'SSL encryption, active moderation, cancel subscription any time.',
    disclaimer:
      'You will be redirected to an external site with its own terms and billing.',
    cta: 'Visit Offer',
    icon: '/offers/adult_friendfinder.png',
  },
  {
    id: 'benaughty',
    title: 'BeNaughty',
    shortDescription:
      'Join an international dating community built for playful connections and real chats.',
    chips: ['Global network', 'Verified profiles', 'Private messages'],
    note: 'Membership may apply.',
    lead:
      'BeNaughty helps adults meet new people worldwide — quickly, safely, and with a sense of fun.',
    expect: [
      'Simple signup and access to local and international profiles.',
      'Photo checks and moderation to limit fakes.',
      'Private chat and match features for casual conversations.',
    ],
    who: 'Men 30 + looking for friendly talks and light connections.',
    safety: 'Together Networks platform with active support.',
    disclaimer:
      'Redirect to external site with its own terms and billing details.',
    cta: 'Visit Offer',
    icon: '/offers/be_naughty.png',
  },
  /*
  {
    id: 'cougar-life',
    title: 'Cougar Life',
    shortDescription:
      'Meet confident women who know what they want — real profiles, real chemistry.',
    chips: ['Verified profiles', 'Mature community', 'Private chat'],
    note: 'Membership may apply.',
    lead:
      'Cougar Life connects mature women and younger men in a trusted, well-moderated space.',
    expect: [
      'Verified profiles and photo moderation for real matches.',
      'Local search and filters by interests and age.',
      'Private chats and video features.',
    ],
    who: 'Men 25 + interested in meeting confident mature women.',
    safety: 'Strong brand reputation and neutral billing names.',
    disclaimer:
      'External site with its own terms and billing policies.',
    cta: 'Visit Offer',
    icon: '/offers/cougar_life.png',
  },
  */

  {
    id: 'fling',
    title: 'Fling',
    shortDescription:
      'Casual chat and connections with real people — no long forms, no pressure.',
    chips: ['Quick signup', 'Real users', 'Private chat'],
    note: 'Membership may apply.',
    lead:
      'Fling is a relaxed space for chatting and meeting people who want the same thing you do — just chemistry.',
    expect: [
      '1-minute signup and instant chat access.',
      'Verified profiles and moderation to reduce fakes.',
      'Local filtering for US, Canada, Ireland, Australia and more.',
    ],
    who: 'Men seeking friendly flirt and casual conversations.',
    safety: 'Secure messaging and simple account controls.',
    disclaimer: 'Redirect to Fling.com with its own terms and billing.',
    cta: 'Visit Offer',
    icon: '/offers/fling_com.png',
  },
  {
    id: 'flirtico',
    title: 'Flirtico',
    shortDescription:
      'New local dating community where real people connect for fun and conversation.',
    chips: ['Local matching', 'Freemium model', 'Verified users'],
    note: 'Membership may apply.',
    lead:
      'Flirtico brings a fresh approach to casual dating — authentic people and coin-based access.',
    expect: [
      'Freemium “coin” system reducing entry barrier.',
      'Verified profiles and photo checks.',
      'Local search for US, Australia, New Zealand.',
    ],
    who: 'Adults preferring authentic chats and nearby matches.',
    safety: 'Moderation and optional ID verification for trust.',
    disclaimer:
      'External site with its own terms and pricing shown before checkout.',
    cta: 'Visit Offer',
    icon: '/offers/flirtico.png',
  },
  {
    id: 'instabang',
    title: 'Instabang',
    shortDescription:
      'Private dating and flirt made simple — real people, real discretion.',
    chips: ['Verified profiles', 'Video chat', 'Privacy focus'],
    note: 'Membership may apply.',
    lead:
      'Instabang focuses on real people and discreet connections through modern, secure features.',
    expect: [
      'Fast registration and private video chats.',
      'Desktop and mobile support for flexibility.',
      'Verified profiles and photo checks for authentic matches.',
    ],
    who: 'Men valuing privacy and genuine attention in a low-pressure environment.',
    safety: 'Encrypted messages and anti-spam controls.',
    disclaimer:
      'Redirect to external site with its own terms and billing.',
    cta: 'Visit Offer',
    icon: '/offers/instabang.png',
  },
  {
    id: 'naughty-talk',
    title: 'Naughty Talk',
    shortDescription:
      'Private dating app for men 30 + — real people, real privacy.',
    chips: ['Anonymous chat', 'Verified profiles', 'Fast match'],
    note: 'Membership may apply.',
    lead:
      'Naughty Talk is built for men seeking authentic private connections in a secure space.',
    expect: [
      'Quick signup and real-time anonymous chat.',
      'Verified female profiles and ID checks.',
      'Secure messaging with auto-delete option.',
    ],
    who: 'US men 30 + who prefer discreet chat and real responses.',
    safety: 'Private mode, end-to-end encryption, cancel any time.',
    disclaimer:
      'Redirect to external site with its own terms and billing.',
    cta: 'Visit Offer',
    icon: '/offers/naughty_talk.png',
  },
]
