import type { Metadata } from "next";
import {
  Anton_SC,
  Barlow_Semi_Condensed,
  Manrope,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelInit from "@/components/PixelInit"; // 👈 новый клиентский компонент

const anton = Anton_SC({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

const barlow = Barlow_Semi_Condensed({
  variable: "--font-sans",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-accent",
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Camilla Dating Help",
  description:
    "Discover real connections with Camilla — natural, confident, and authentic dating help.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${anton.variable} ${barlow.variable} ${manrope.variable} antialiased bg-[var(--background)] text-[var(--text-primary)]`}
      >
        {/* === Инициализация пикселя === */}
        <PixelInit />

        {/* === Хедер и основной контент === */}
        <Header />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
