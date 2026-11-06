"use client";
import { m, type HTMLMotionProps } from "motion/react";
import { ease, fadeSlideUp, staggerContainer } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  blur?: boolean;
};

/** Fade + slide-up + blur saat elemen masuk viewport (sekali saja). */
export function Reveal({ delay = 0, y = 24, blur = true, children, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

/** Container: anak-anaknya (StaggerItem) muncul berurutan. */
export function StaggerGroup({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <m.div variants={fadeSlideUp} {...rest}>
      {children}
    </m.div>
  );
}

/** Kartu dengan efek floating/elevation saat hover (dipakai untuk fitur, jadwal, produk). */
export function FloatCard({ children, className = "", ...rest }: HTMLMotionProps<"div">) {
  return (
    <m.div
      variants={fadeSlideUp}
      whileHover={{ y: -8, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-900/10 ${className}`}
      {...rest}
    >
      {children}
    </m.div>
  );
}
