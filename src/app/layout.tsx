import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Prima Mandiri Distribusi",
  description: "Supplier Pakan Hewan Kesayangan Lengkap & Cepat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
