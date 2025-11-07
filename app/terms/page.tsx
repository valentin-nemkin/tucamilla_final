'use client'

import { motion } from 'framer-motion'

export default function TermsPage() {
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
          Terms of Use 
        </h1>

        {/* === Основной контент страницы === */}
        <p className="font-accent text-[1rem] lg:text-[1.1rem] text-[var(--text-primary)] leading-relaxed tracking-wide mb-4">
          <strong>Effective date:</strong> October 2025
        </p>

        <p className="font-accent text-[1rem] lg:text-[1.1rem] text-[var(--text-primary)] leading-relaxed tracking-wide mb-6">
          Welcome to Camilla Dating Help (“the Site”). By accessing or using this Site, you agree to the following terms.
        </p>

        <ol className="list-decimal ml-6 space-y-4 font-accent text-[1rem] lg:text-[1.1rem] text-[var(--text-primary)] leading-relaxed tracking-wide">
          <li>
            <strong>Purpose of the Site</strong><br />
            This Site provides general information and links to external partner platforms.<br />
            We do not operate or control the partner websites linked from this Site.
          </li>

          <li>
            <strong>Eligibility</strong><br />
            By using the Site, you confirm that you are at least 18 years old and legally allowed to access online content in your region.
          </li>

          <li>
            <strong>No guarantees</strong><br />
            We do not guarantee registration, communication, or results on any partner website. All interactions on external sites are at your own discretion.
          </li>

          <li>
            <strong>Affiliate relationships</strong><br />
            Some links on this Site may be affiliate links. This means we may receive a commission when a user registers or subscribes through our referral link.<br />
            Such compensation does not affect the displayed content or recommendations.
          </li>

          <li>
            <strong>User conduct</strong><br />
            You agree not to use the Site for illegal, harmful, or abusive activity. Any misuse will result in restricted access.
          </li>

          <li>
            <strong>Limitation of liability</strong><br />
            We provide this Site “as is.” We are not responsible for:<br />
            – actions of third-party platforms,<br />
            – technical issues beyond our control,<br />
            – or outcomes of interactions on partner websites.
          </li>

          <li>
            <strong>Intellectual property</strong><br />
            All content (text, layout, design) belongs to Camilla Dating Help and may not be copied without permission.
          </li>

          <li>
            <strong>Changes to the Terms</strong><br />
            We may modify these Terms of Use at any time. Updates take effect immediately upon posting.
          </li>

          <li>
            <strong>Contact</strong><br />
            For questions regarding these Terms, contact{' '}
            <a href="mailto:support@tucamilla.info" className="underline text-[var(--accent)]">
              support@tucamilla.info
            </a>.
          </li>
        </ol>
      </motion.div>
    </section>
  )
}
