"use client";
import Link from "next/link";
import { m } from "motion/react";
import { PawPrint } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "light" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-900/20",
  light: "bg-white text-emerald-800 hover:bg-amber-50 shadow-lg shadow-black/10",
  outline: "border-2 border-white/60 text-white hover:bg-white/10",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: ReactNode;
  className?: string;
};

/** Tombol aksi: saat hover, ikon jejak kaki "mengetuk" (wiggle) + tombol sedikit terangkat. */
export default function PawButton({ href, children, variant = "primary", external, icon, className = "" }: Props) {
  const cls = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-3 text-sm font-bold transition-colors sm:text-base ${styles[variant]} ${className}`;
  const content = (
    <>
      <span className="transition-transform duration-300 group-hover:animate-paw">
        {icon ?? <PawPrint className="h-5 w-5" />}
      </span>
      <span>{children}</span>
      {/* kilau halus saat hover */}
      <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[130%]" />
    </>
  );

  return (
    <m.span whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="inline-flex">
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
      ) : (
        <Link href={href} className={cls}>{content}</Link>
      )}
    </m.span>
  );
}
