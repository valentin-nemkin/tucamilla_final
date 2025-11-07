'use client'

import { motion } from 'framer-motion'

export default function PrivacyPage() {
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
          Privacy Policy 
        </h1>

        {/* === Основной контент страницы === */}
        <p className="font-accent text-[1rem] lg:text-[1.1rem] text-[var(--text-primary)] leading-relaxed tracking-wide mb-4">
          <strong>Last updated:</strong> October 2025
        </p>

        <p className="font-accent text-[1rem] lg:text-[1.1rem] text-[var(--text-primary)] leading-relaxed tracking-wide mb-6">
          This Privacy Policy explains how Camilla Dating Help (“we”, “our”, “us”) collects, uses, and protects information when you visit our website.
        </p>

        <ol className="list-decimal ml-6 space-y-4 font-accent text-[1rem] lg:text-[1.1rem] text-[var(--text-primary)] leading-relaxed tracking-wide">
          <li>
            <strong>Information we collect</strong><br />
            We do not collect personally identifiable information unless you voluntarily provide it (for example, when submitting a contact form).<br />
            We may collect basic technical data such as browser type, device, and approximate location for analytics and site performance.
          </li>

          <li>
            <strong>Use of cookies</strong><br />
            Our website uses minimal cookies only to improve functionality, measure traffic, and remember basic preferences.<br />
            Cookies may also store tracking parameters (such as UTM tags or click IDs) for performance measurement of our partner campaigns.
          </li>

          <li>
            <strong>External links and partner websites</strong><br />
            Our site contains links to external partner websites offering various services.<br />
            Once you click such a link, you are subject to the partner’s own privacy and billing policies. We are not responsible for data handling practices on external domains.
          </li>

          <li>
            <strong>How we use data</strong><br />
            Collected technical data is used solely to monitor site performance, detect errors, and measure general engagement.<br />
            We do not sell, rent, or trade user data to third parties.
          </li>

          <li>
            <strong>Data security</strong><br />
            We implement standard technical measures such as SSL encryption to protect communication and minimize risks of unauthorized access.
          </li>

          <li>
            <strong>Your rights</strong><br />
            You may request deletion of any information you have provided to us through our contact form.<br />
            If you believe your data has been used incorrectly, contact us at <a href="mailto:support@tucamilla.info" className="underline text-[var(--accent)]">support@tucamilla.info</a>.
          </li>

          <li>
            <strong>Policy updates</strong><br />
            We may update this Privacy Policy periodically. Continued use of the site after updates constitutes acceptance of the revised terms.
          </li>
        </ol>
      </motion.div>
    </section>
  )
}
