import type { Variants } from "motion/react";

/** Easing "expo-out" — terasa mengalir & lembut. */
export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springSoft = { type: "spring", stiffness: 260, damping: 26 } as const;
export const springSnappy = { type: "spring", stiffness: 420, damping: 32 } as const;

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
};
