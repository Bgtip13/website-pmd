"use client";
import { useCallback, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { ease } from "@/lib/motion";

export type TabItem = { id: string; label: string; icon?: ReactNode; count?: number };

/** State tab + arah transisi (1 = ke kanan, -1 = ke kiri) supaya panel meluncur sesuai arah. */
export function useTabs(ids: string[], initial: string) {
  const [state, setState] = useState({ value: initial, direction: 1 });
  const setValue = useCallback(
    (next: string) =>
      setState((prev) => ({
        value: next,
        direction: ids.indexOf(next) >= ids.indexOf(prev.value) ? 1 : -1,
      })),
    [ids]
  );
  return { value: state.value, direction: state.direction, setValue };
}

type SwitcherProps = {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** layoutId harus unik per instance di satu halaman */
  layoutId: string;
  className?: string;
};

/** Tab dengan "pill" yang meluncur antar tombol (shared layout animation). */
export function TabSwitcher({ tabs, value, onChange, layoutId, className = "" }: SwitcherProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((t) => t.id === value);
    if (e.key === "ArrowRight") onChange(tabs[(i + 1) % tabs.length].id);
    if (e.key === "ArrowLeft") onChange(tabs[(i - 1 + tabs.length) % tabs.length].id);
  };

  return (
    <div
      role="tablist"
      onKeyDown={onKeyDown}
      className={`no-scrollbar flex gap-1 overflow-x-auto rounded-2xl bg-emerald-50/80 p-1.5 ${className}`}
    >
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            className={`relative shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              active ? "text-white" : "text-emerald-800/70 hover:text-emerald-800"
            }`}
          >
            {active && (
              <m.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-xl bg-emerald-600 shadow-md shadow-emerald-900/20"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <m.span whileTap={{ scale: 0.93 }} className="relative z-10 inline-flex items-center gap-1.5">
              {t.icon}
              {t.label}
              {typeof t.count === "number" && (
                <span className={`rounded-full px-1.5 text-[10px] ${active ? "bg-white/25" : "bg-emerald-100"}`}>
                  {t.count}
                </span>
              )}
            </m.span>
          </button>
        );
      })}
    </div>
  );
}

/** Panel konten: fade + slide + blur, sadar arah. Ganti `id` untuk memicu transisi. */
export function TabPanel({ id, direction = 1, children }: { id: string; direction?: number; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={id}
        role="tabpanel"
        initial={{ opacity: 0, x: 28 * direction, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -28 * direction, filter: "blur(6px)" }}
        transition={{ duration: 0.28, ease }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
