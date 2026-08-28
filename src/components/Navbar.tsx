"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/produk" },
  { label: "Area Layanan", href: "/area" },
  { label: "Kemitraan", href: "/kemitraan" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 min-w-0 group">
          {!logoError ? (
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="h-10 w-10 bg-emerald-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PM</span>
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-emerald-800 text-sm leading-tight whitespace-nowrap">Prima Mandiri Distribusi</span>
            <span className="text-[10px] text-gray-400 leading-tight whitespace-nowrap uppercase tracking-wider">Supplier Pakan Hewan</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all">
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/628212256908?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20CV%20Prima%20Mandiri%20Distribusi"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all inline-flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.075.055.458.304.948.638.49.334.866.561 1.154.723.293.166.563.196.77.146.207-.05.669-.277 1.245-.819.576-.542 1.061-1.337 1.197-1.68.137-.343.273-.286.37-.173.098.113.381.562.444.762.063.2.042.366-.025.52-.669 1.542-1.82 2.763-3.277 3.475z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L0 24l6.336-1.65A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.97 0-3.82-.506-5.43-1.39l-.39-.23-3.76.98.98-3.65-.25-.4A9.785 9.785 0 012.18 12c0-5.42 4.4-9.82 9.82-9.82 5.42 0 9.82 4.4 9.82 9.82 0 5.42-4.4 9.82-9.82 9.82z"/>
            </svg>
            Hubungi Sales
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/628212256908"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 rounded-lg"
            onClick={() => setOpen(false)}
          >
            Hubungi Sales
          </a>
        </div>
      )}
    </nav>
  );
}
