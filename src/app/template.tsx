"use client";
import { m } from "motion/react";
import { ease } from "@/lib/motion";

/** template.tsx di-mount ulang setiap pindah halaman → transisi masuk antar-route. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
    >
      {children}
    </m.div>
  );
}
