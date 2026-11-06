"use client";
import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";

type Props = {
  /** Kelas background section DI ATAS pemisah, mis. "bg-white" */
  from: string;
  /** Kelas warna teks = warna section DI BAWAH pemisah, mis. "text-cream" */
  to: string;
  variant?: 1 | 2;
};

const PATHS = {
  1: "M0,64 C240,120 480,0 720,48 C960,96 1200,16 1440,64 L1440,120 L0,120 Z",
  2: "M0,40 C180,96 360,96 540,56 C720,16 900,16 1080,56 C1260,96 1380,80 1440,48 L1440,120 L0,120 Z",
} as const;

/** Gelombang organik antar-seksi; bergeser halus mengikuti scroll (parallax). */
export default function WaveDivider({ from, to, variant = 1 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative -mb-px h-10 overflow-hidden leading-none sm:h-14 lg:h-20 ${from} ${to}`}
    >
      <m.svg
        style={{ x }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute -left-[4%] h-full w-[108%]"
        fill="currentColor"
      >
        <path d={PATHS[variant]} />
      </m.svg>
    </div>
  );
}
