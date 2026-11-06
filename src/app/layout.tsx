import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MotionProvider from "@/components/motion/MotionProvider";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", display: "swap" });

export const metadata: Metadata = {
  title: "CV Prima Mandiri Distribusi",
  description: "Supplier Pakan Hewan Kesayangan Lengkap & Cepat",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${nunito.variable} ${fredoka.variable}`}>
      <body>
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
