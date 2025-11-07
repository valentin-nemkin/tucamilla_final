import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-40
                 bg-[var(--secondary)]/70 backdrop-blur-md shadow-sm
                 text-[var(--text-primary)]/90"
    >
      {/* Черта сверху */}
      <div className="h-px w-full bg-[var(--text-secondary)]/50" />

      <div className="max-w-6xl mx-auto px-4 py-2 md:py-3
                      flex flex-col md:flex-row items-center justify-between
                      gap-2 md:gap-3">
        {/* Навигация */}
        <nav className="flex items-center gap-5 text-sm font-accent">
          <Link
            href="/privacy"
            className="hover:text-[var(--accent)] transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-[var(--accent)] transition-colors"
          >
            Terms
          </Link>
        </nav>

        {/* Копирайт */}
        <p className="text-xs md:text-sm font-accent text-center md:text-right">
          © {year} Camilla Dating Help. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
