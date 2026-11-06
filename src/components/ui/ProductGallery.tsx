"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { ease } from "@/lib/motion";
import { Skeleton } from "./Skeleton";

export type Slide = { src: string; thumb: string; alt: string };

const variants = {
  enter: (d: number) => ({ x: 60 * d, opacity: 0, scale: 0.96, filter: "blur(8px)" }),
  center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: (d: number) => ({ x: -60 * d, opacity: 0, scale: 0.96, filter: "blur(8px)" }),
};

/** Galeri produk: slide sadar-arah, thumbnail dengan ring bergeser (layoutId), skeleton saat gambar memuat. */
export default function ProductGallery({ slides }: { slides: Slide[] }) {
  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const thumbsRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  const go = (to: number, dir?: number) => {
    const next = (to + slides.length) % slides.length;
    setPage(([cur]) => [next, dir ?? (next >= cur ? 1 : -1)]);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowLeft") setPage(([c]) => [(c - 1 + slides.length) % slides.length, -1]);
      if (e.key === "ArrowRight") setPage(([c]) => [(c + 1) % slides.length, 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  // preload foto berikutnya
  useEffect(() => {
    const img = new Image();
    img.src = slides[(index + 1) % slides.length].src;
  }, [index, slides]);

  // thumbnail aktif selalu terlihat
  useEffect(() => {
    const c = thumbsRef.current;
    const t = activeThumbRef.current;
    if (!c || !t) return;
    c.scrollTo({ left: t.offsetLeft - c.clientWidth / 2 + t.clientWidth / 2, behavior: "smooth" });
  }, [index]);

  const slide = slides[index];
  const ext = slide.src.split(".").pop() ?? "png";

  return (
    <m.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="relative w-full overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-lg shadow-emerald-900/5 transition-shadow hover:shadow-xl hover:shadow-emerald-900/10"
    >
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-800">Galeri Produk</p>
          <p className="text-xs text-gray-500" aria-live="polite">Foto {index + 1} dari {slides.length}</p>
        </div>
        <m.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={slide.src}
          download={`Produk-PMD-${index + 1}.${ext}`}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700"
        >
          <Download size={15} /> Unduh Foto
        </m.a>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 to-white">
        <div className="relative h-[340px] sm:h-[420px] lg:h-[430px]">
          {!loaded[slide.src] && <Skeleton className="absolute inset-6 rounded-2xl" />}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <m.img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease }}
              onLoad={() => setLoaded((p) => ({ ...p, [slide.src]: true }))}
              draggable={false}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(index + 1, 1);
                else if (info.offset.x > 80) go(index - 1, -1);
              }}
              className="absolute inset-0 h-full w-full cursor-grab object-contain p-4 active:cursor-grabbing"
            />
          </AnimatePresence>
        </div>

        {[-1, 1].map((d) => (
          <m.button
            key={d}
            type="button"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => go(index + d, d)}
            aria-label={d < 0 ? "Foto sebelumnya" : "Foto berikutnya"}
            className={`absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur hover:bg-white ${d < 0 ? "left-2" : "right-2"}`}
          >
            {d < 0 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </m.button>
        ))}
      </div>

      <div className="border-t border-gray-100 p-3">
        <div ref={thumbsRef} className="no-scrollbar relative flex gap-2 overflow-x-auto p-1">
          {slides.map((s, i) => (
            <m.button
              key={s.thumb}
              type="button"
              ref={i === index ? activeThumbRef : undefined}
              onClick={() => go(i)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              aria-label={`Tampilkan ${s.alt}`}
              aria-current={i === index}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 transition-opacity ${i === index ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
            >
              <img src={s.thumb} alt="" width={56} height={56} loading="lazy" className="h-full w-full object-cover" />
              {i === index && (
                <m.span
                  layoutId="gallery-thumb-ring"
                  className="absolute inset-0 rounded-xl ring-2 ring-inset ring-emerald-500"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </m.button>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-gray-400">Geser foto, pilih thumbnail, atau gunakan panah ← → untuk berganti.</p>
      </div>
    </m.div>
  );
}
