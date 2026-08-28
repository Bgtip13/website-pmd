"use client";
import Link from "next/link";
import { Truck, ShieldCheck, Zap, Headphones, MapPin, ArrowRight, Phone, Package, Star, Clock, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const AreaMap = dynamic(() => import("@/components/AreaMap"), { ssr: false });

const features = [
  {
    icon: <Truck className="w-7 h-7" />,
    title: "Gratis Ongkir",
    desc: "Semua wilayah cakupan tanpa minimum order.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Kirim Hari Sama",
    desc: "Order sebelum jam 08.00 WIB, dikirim hari yang sama.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Produk Terjamin",
    desc: "Kemasan rapat, stok selalu tersedia.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    title: "Sales Dedicated",
    desc: "Admin khusus per wilayah, fast response.",
    color: "bg-violet-50 text-violet-600",
  },
];

const brands = [
  "Royal Canin", "Cleo", "Bolt", "Me-O", "Cat Choize",
  "Kitchen Flavour", "Felibite", "Equilibrio", "Excel", "Cat Choize",
  "Cattie Care", "Furlove", "Propet", "Bioline", "Bio Hunt",
];

const stats = [
  { num: "300+", label: "Produk Tersedia" },
  { num: "50+", label: "Brand Partner" },
  { num: "3", label: "Area Layanan" },
  { num: "30+", label: "Kota/Kabupaten" },
];

export default function Home() {
  return (
    <>
      {/* Hero — Cinematic */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-8 border border-white/20">
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-100">Melayani Solo Raya, DIY & Semarang</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
              Supplier Pakan Hewan<br />
              <span className="text-emerald-300">Lengkap & Terpercaya</span>
            </h1>
            <p className="text-emerald-200/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              CV Prima Mandiri Distribusi — mitra terpercaya petshop & pemilik hewan peliharaan di Jawa Tengah & DIY.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/produk"
                className="bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all hover:shadow-xl hover:shadow-emerald-900/20 inline-flex items-center justify-center gap-2 text-base"
              >
                <Package className="w-5 h-5" />
                Lihat Price List
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kemitraan"
                className="border-2 border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 text-base"
              >
                Jadi Mitra Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s, i) => (
              <div key={i} className="py-6 md:py-8 text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-700">{s.num}</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Mengapa Memilih Kami?</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Layanan lengkap untuk petshop dan pemilik hewan peliharaan</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partners Ticker */}
      <section className="py-12 px-4 bg-white border-y overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Brand Partner</p>
        </div>
        <div className="flex gap-8 animate-scroll">
          {[...brands, ...brands].map((b, i) => (
            <div key={i} className="flex-shrink-0 px-6 py-3 bg-gray-50 rounded-xl text-sm font-semibold text-gray-600 border border-gray-100">
              {b}
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </section>

      {/* Jadwal Kiriman */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Jadwal Kiriman</h2>
            <p className="text-gray-500">Pengiriman rutin dua kali seminggu per wilayah</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-2xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Solo Raya</h3>
              <p className="text-2xl font-bold text-blue-600 mb-2">Senin & Kamis</p>
              <p className="text-sm text-gray-500">Surakarta, Boyolali, Klaten, Sukoharjo, Sragen, Karanganyar, Wonogiri</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 rounded-2xl border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">DIY & Sekitarnya</h3>
              <p className="text-2xl font-bold text-emerald-600 mb-2">Selasa & Jumat</p>
              <p className="text-sm text-gray-500">Yogyakarta, Bantul, Sleman, Kulon Progo, Gunung Kidul, Kebumen, Purworejo, Magelang</p>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 p-6 rounded-2xl border border-violet-100">
              <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Semarang & Sekitarnya</h3>
              <p className="text-2xl font-bold text-violet-600 mb-2">Rabu & Sabtu</p>
              <p className="text-sm text-gray-500">Semarang, Demak, Kudus, Pati, Grobogan, Salatiga</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Area Layanan</h2>
            <p className="text-gray-500">Klik wilayah untuk melihat cakupan kiriman</p>
          </div>
          <AreaMap />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-800 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Memulai Kemitraan?</h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
            Hubungi sales kami untuk informasi harga grosir dan pendaftaran mitra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6282342931570?text=Halo%20Kak%20Adelia%2C%20saya%20mau%20tanya%20produk%20pakan%20kucing"
              target="_blank" rel="noopener noreferrer"
              className="bg-white text-emerald-800 px-6 py-3.5 rounded-xl font-bold hover:bg-emerald-50 transition inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Sales Solo — Adelia
            </a>
            <a
              href="https://wa.me/6282323352405?text=Halo%20Kak%20April%2C%20saya%20mau%20tanya%20produk%20pakan%20kucing"
              target="_blank" rel="noopener noreferrer"
              className="bg-white text-emerald-800 px-6 py-3.5 rounded-xl font-bold hover:bg-emerald-50 transition inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Sales DIY — April
            </a>
            <a
              href="https://wa.me/6282323209960?text=Halo%20Kak%20Fitri%2C%20saya%20mau%20tanya%20produk%20pakan%20kucing"
              target="_blank" rel="noopener noreferrer"
              className="bg-white text-emerald-800 px-6 py-3.5 rounded-xl font-bold hover:bg-emerald-50 transition inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Sales Semarang — Fitri
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
