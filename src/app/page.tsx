"use client";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  Phone,
  ArrowRight,
  MapPin,
  Zap,
  Headphones,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const AreaMap = dynamic(() => import("@/components/AreaMap"), { ssr: false });

/* ─── Hero Slideshow ─── */
const heroSlides = [
  { src: "/hero1.jpg", alt: "Pakan Kucing Premium" },
  { src: "/hero2.jpg", alt: "Produk Lengkap" },
  { src: "/hero3.jpg", alt: "Pengiriman Cepat" },
  { src: "/hero4.jpg", alt: "Distributor Terpercaya" },
  { src: "/hero5.jpg", alt: "Stok Selalu Ready" },
  { src: "/hero6.jpg", alt: "Pengiriman ke Solo" },
  { src: "/hero7.jpg", alt: "Pengiriman ke DIY" },
  { src: "/hero8.jpg", alt: "Pengiriman ke Semarang" },
  { src: "/hero9.jpg", alt: "CV Prima Mandiri Distribusi" },
];

/* ─── Features ─── */
const features = [
  { icon: <Truck className="w-7 h-7" />, title: "Gratis Ongkir", desc: "Semua wilayah cakupan GRATIS tanpa minimum order.", color: "emerald" },
  { icon: <ShieldCheck className="w-7 h-7" />, title: "Produk Terjamin", desc: "Pakan berkualitas dengan kemasan rapat & stok selalu tersedia.", color: "blue" },
  { icon: <Zap className="w-7 h-7" />, title: "Proses Instan", desc: "Order sebelum jam 08.00 WIB, dikirim hari yang sama.", color: "amber" },
  { icon: <Headphones className="w-7 h-7" />, title: "Sales Dedicated", desc: "Admin sales khusus per wilayah untuk layanan personal.", color: "violet" },
];

/* ─── Schedule ─── */
const schedule = [
  { area: "Solo Raya", days: "Senin & Kamis", cities: ["Surakarta", "Boyolali", "Klaten", "Sukoharjo", "Sragen", "Karanganyar", "Wonogiri"], sales: "Adelia", phone: "6282342931570", color: "blue" },
  { area: "DIY & Sekitarnya", days: "Selasa & Jumat", cities: ["Yogyakarta", "Bantul", "Sleman", "Kulon Progo", "Gunung Kidul", "Kebumen", "Purworejo", "Magelang"], sales: "April", phone: "628232352405", color: "emerald" },
  { area: "Semarang & Sekitarnya", days: "Rabu & Sabtu", cities: ["Semarang Kota", "Semarang Kabupaten", "Demak", "Kudus", "Pati", "Grobogan", "Salatiga"], sales: "Fitri", phone: "6282323209960", color: "violet" },
];

/* ─── Brands ─── */
const brands = [
  { name: "Royal Canin", file: "royal-canin.png" },
  { name: "Whiskas", file: "whiskas.png" },
  { name: "Pro Plan", file: "proplan.png" },
  { name: "Me-O", file: "meo.png" },
  { name: "Monge", file: "monge.png" },
  { name: "Sanabelle", file: "sanabelle.png" },
  { name: "Leonardo", file: "leonardo.png" },
  { name: "Equilibrio", file: "equilibrio.png" },
  { name: "Cleo", file: "cleo.png" },
  { name: "Bolt", file: "bolt.png" },
  { name: "Excel", file: "excel.png" },
  { name: "Propet", file: "propet.png" },
  { name: "Kitchen Flavour", file: "kitchen-flavour.png" },
  { name: "Cat Choize", file: "cat-choize.png" },
  { name: "Amigo", file: "amigo.png" },
  { name: "Felibite", file: "felibite.png" },
  { name: "Cattie Care", file: "cattie-care.png" },
  { name: "Furlove", file: "furlove.png" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string; accent: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700", accent: "bg-blue-500" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700", accent: "bg-emerald-500" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", badge: "bg-violet-100 text-violet-700", accent: "bg-violet-500" },
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ═══ HERO SLIDESHOW ═══ */}
      <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Teks di atas */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
            CV Prima Mandiri Distribusi
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mb-8 drop-shadow">
            Supplier Pakan Hewan Kesayangan Lengkap & Cepat untuk area Jawa Tengah dan DIY.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/produk" className="bg-emerald-600 text-white px-7 py-3 rounded-xl font-bold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2 shadow-lg">
              Lihat Produk <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/kontak" className="bg-white/90 text-gray-900 px-7 py-3 rounded-xl font-bold hover:bg-white transition inline-flex items-center justify-center gap-2 shadow-lg">
              <Phone className="w-5 h-5" /> Hubungi Admin
            </Link>
          </div>
        </div>
        {/* Dot indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? "bg-white w-6" : "bg-white/50"}`}
            />
          ))}
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Mengapa Pilih Kami?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Kami memberikan layanan terbaik untuk kebutuhan pakan hewan kesayangan Anda.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition group">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition group-hover:scale-110 ${
                  f.color === "emerald" ? "bg-emerald-100 text-emerald-600" :
                  f.color === "blue" ? "bg-blue-100 text-blue-600" :
                  f.color === "amber" ? "bg-amber-100 text-amber-600" :
                  "bg-violet-100 text-violet-600"
                }`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ JADWAL PENGIRIMAN ═══ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Jadwal Pengiriman</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Pengiriman rutin dua kali seminggu ke seluruh wilayah cakupan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schedule.map((s, i) => {
              const c = colorMap[s.color];
              return (
                <div key={i} className={`rounded-2xl border ${c.border} ${c.bg} p-6 hover:shadow-lg transition`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-bold text-lg ${c.text}`}>{s.area}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${c.badge}`}>{s.days}</span>
                  </div>
                  <div className="flex items-start gap-2 mb-3">
                    <Calendar className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.text}`} />
                    <span className="text-sm text-gray-600">{s.days}</span>
                  </div>
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.text}`} />
                    <span className="text-sm text-gray-600 leading-relaxed">{s.cities.join(", ")}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200/60 pt-4 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full ${c.accent} flex items-center justify-center text-white text-xs font-bold`}>
                        {s.sales[0]}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{s.sales}</span>
                    </div>
                    <a href={`https://wa.me/${s.phone}`} target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 text-sm font-semibold ${c.text} hover:underline`}>
                      Chat <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ AREA MAP ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Area Layanan Kami</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Klik salah satu area untuk melihat cakupan wilayah di peta.</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height: "450px" }}>
            <AreaMap />
          </div>
          <div className="mt-6 text-center">
            <Link href="/area" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">
              Lihat Detail Area Layanan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BRAND PARTNER ═══ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Brand Partner Kami</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Menyediakan berbagai brand pakan kucing ternama dan terpercaya.</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {brands.map((b, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-center hover:shadow-md hover:border-emerald-200 transition" style={{ aspectRatio: "1/1" }}>
                <img
                  src={`/logos/${b.file}`}
                  alt={b.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent && !parent.querySelector(".fallback-text")) {
                      const span = document.createElement("span");
                      span.className = "fallback-text text-xs font-medium text-gray-400 text-center leading-tight";
                      span.textContent = b.name;
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-16 overflow-hidden bg-emerald-700">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/cat-pattern.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Siap Memesan?</h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">Hubungi admin kami sekarang dan dapatkan harga terbaik untuk pakan kucing berkualitas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/628212256908" target="_blank" rel="noopener noreferrer"
              className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition inline-flex items-center justify-center gap-2 shadow-lg">
              <Phone className="w-5 h-5" /> Supervisor Sales
            </a>
            <a href="https://wa.me/6282342931570" target="_blank" rel="noopener noreferrer"
              className="border-2 border-emerald-400 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition inline-flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
