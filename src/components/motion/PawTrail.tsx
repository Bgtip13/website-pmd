"use client";
import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { PawPrint } from "lucide-react";

function Paw({
  progress, start, top, left, size, rotate,
}: {
  progress: MotionValue<number>; start: number; top: string; left: string; size: number; rotate: number;
}) {
  const opacity = useTransform(progress, [start, start + 0.1], [0, 0.16]);
  const scale = useTransform(progress, [start, start + 0.1], [0.5, 1]);
  return (
    <m.span
      style={{ opacity, scale, rotate, top, left, width: size, height: size }}
      className="absolute text-emerald-700"
    >
      <PawPrint className="h-full w-full" strokeWidth={1.5} />
    </m.span>
  );
}

/**
 * Jejak kaki dekoratif yang muncul perlahan satu per satu saat section di-scroll.
 * Taruh di dalam elemen `relative`. Disembunyikan di mobile agar tetap bersih.
 */
export default function PawTrail({ side = "left", count = 6 }: { side?: "left" | "right"; count?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const base = side === "left" ? 2 : 90;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
      {Array.from({ length: count }).map((_, i) => (
        <Paw
          key={i}
          progress={scrollYProgress}
          start={(i / count) * 0.7}
          top={`${6 + i * (84 / count)}%`}
          left={`${base + (i % 2) * 4}%`}
          size={26 + (i % 3) * 6}
          rotate={(i % 2 ? 24 : -14) + (side === "left" ? 10 : -10)}
        />
      ))}
    </div>
  );
}
