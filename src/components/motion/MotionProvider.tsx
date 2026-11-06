"use client";
import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * - LazyMotion: fitur animasi dimuat async → bundle awal kecil.
 * - MotionConfig reducedMotion="user": hormati preferensi "kurangi gerakan" di OS.
 * Gunakan komponen `m.*` (bukan `motion.*`) di seluruh proyek.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
