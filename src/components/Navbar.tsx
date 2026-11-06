"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { ease } from "@/lib/motion";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/produk" },
  { label: "Area Layanan", href: "/area" },
  { label: "Kemitraan", href: "/kemitraan" },
  { label: "Kontak", href: "/kontak" },
];

const WA_URL =
  "https://wa.me/628212256908?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20CV%20Prima%20Mandiri%20Distribusi";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // tutup menu mobile saat pindah halaman
  useEffect(() => setOpen(false), [pathname]);

  return (
    <m.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "border-emerald-100 bg-white/85 shadow-md shadow-emerald-900/5" : "border-transparent bg-white/70"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${scrolled ? "h-14" : "h-16"}`}>
        {/* Logo */}
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <m.span whileHover={{ rotate: -8, scale: 1.08 }} transition={{ type: "spring", stiffness: 300, damping: 14 }} className="shrink-0">
            {!logoError ? (
              <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" onError={() => setLogoError(true)} />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700 text-lg font-bold text-white">PM</span>
            )}
          </m.span>
          <span className="flex min-w-0 flex-col">
            <span className="whitespace-nowrap font-display text-sm font-semibold leading-tight text-emerald-800">CV Prima Mandiri Distribusi</span>
            <span className="hidden whitespace-nowrap text-[10px] uppercase leading-tight tracking-wider text-gray-400 sm:block">Supplier Pakan Hewan Terlengkap & Tercepat</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${active ? "text-emerald-800" : "text-gray-600 hover:text-emerald-700"}`}
              >
                {active && (
                  <m.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-xl bg-emerald-100/80"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
          <m.a
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-emerald-900/20 hover:bg-emerald-700"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.075.055.458.304.948.638.49.334.866.561 1.154.723.293.166.563.196.77.146.207-.05.669-.277 1.245-.819.576-.542 1.061-1.337 1.197-1.68.137-.343.273-.286.37-.173.098.113.381.562.444.762.063.2.042.366-.025.52-.669 1.542-1.82 2.763-3.277 3.475z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L0 24l6.336-1.65A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.97 0-3.82-.506-5.43-1.39l-.39-.23-3.76.98.98-3.65-.25-.4A9.785 9.785 0 012.18 12c0-5.42 4.4-9.82 9.82-9.82 5.42 0 9.82 4.4 9.82 9.82 0 5.42-4.4 9.82-9.82 9.82z"/>
            </svg>
            Hubungi Sales
          </m.a>
        </div>

        {/* Mobile Menu Button */}
        <m.button
          whileTap={{ scale: 0.88 }}
          className="rounded-xl p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={open ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </m.span>
          </AnimatePresence>
        </m.button>
      </div>

      {/* Mobile Menu — tinggi beranimasi, item muncul berurutan */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden border-t border-emerald-100 bg-white md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((l, i) => (
                <m.div key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.3, ease }}>
                  <Link
                    href={l.href}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold ${pathname === l.href ? "bg-emerald-100 text-emerald-800" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`}
                  >
                    {l.label}
                  </Link>
                </m.div>
              ))}
              <m.a
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * navLinks.length, duration: 0.3, ease }}
                href="https://wa.me/628212256908"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl px-4 py-3 text-sm font-bold text-emerald-600 hover:bg-emerald-50"
              >
                Hubungi Sales
              </m.a>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Progress scroll tipis di bawah navbar */}
      <m.div style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-emerald-400 to-amber-400" />
    </m.nav>
  );
}
