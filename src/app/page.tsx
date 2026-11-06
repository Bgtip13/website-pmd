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
  PawPrint,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { Reveal, StaggerGroup, StaggerItem, FloatCard } from "@/components/motion/Reveal";
import WaveDivider from "@/components/motion/WaveDivider";
import PawTrail from "@/components/motion/PawTrail";
import PawButton from "@/components/ui/PawButton";
import { Skeleton } from "@/components/ui/Skeleton";
import { ease } from "@/lib/motion";

const AreaMap = dynamic(() => import("@/components/AreaMap"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-none" />,
});

/* ─── Hero ─── */
const HERO_IMAGE = "/cat-pattern.png";

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
  { area: "DIY & Sekitarnya", days: "Selasa & Jumat", cities: ["Yogyakarta", "Bantul", "Sleman", "Kulon Progo", "Gunung Kidul", "Kebumen", "Purworejo", "Magelang"], sales: "April", phone: "6282323352405", color: "emerald" },
  { area: "Semarang & Sekitarnya", days: "Rabu & Sabtu", cities: ["Semarang Kota", "Semarang Kabupaten", "Demak", "Kudus", "Pati", "Grobogan", "Salatiga"], sales: "Fitri", phone: "6282323209960", color: "violet" },
];

/* ─── Brands ─── */
const brands = [
  { name: "Animal & co", file: "animal-co.png" },
  { name: "Whiskas", file: "whiskas.png" },
  { name: "Markotops", file: "markotop.png" },
  { name: "Me-O", file: "meo.png" },
  { name: "Furlove", file: "furlove.png" },
  { name: "Maxi", file: "maxi.png" },
  { name: "Crystal Kitty", file: "crystal-kitty.png" },
  { name: "Supercat", file: "supercat.png" },
  { name: "Luna", file: "luna.png" },
  { name: "Bolt", file: "bolt.png" },
  { name: "Excel", file: "excel.png" },
  { name: "BIO", file: "bio.png" },
  { name: "Kitchen Flavour", file: "kitchen-flavour.png" },
  { name: "Cat Choize", file: "cat-choize.png" },
  { name: "Amigo", file: "amigo.png" },
  { name: "Felibite", file: "felibite.png" },
  { name: "Cattie Care", file: "cattie-care.png" },
  { name: "Taro", file: "taro.png" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string; accent: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700", accent: "bg-blue-500" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700", accent: "bg-emerald-500" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", badge: "bg-violet-100 text-violet-700", accent: "bg-violet-500" },
};

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <Reveal className="mb-12 text-center">
      <h2 className="mb-3 text-3xl font-semibold text-gray-900 sm:text-4xl">{title}</h2>
      <div className="mx-auto mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-emerald-400 to-amber-300" />
      <p className="mx-auto max-w-xl text-gray-500">{desc}</p>
    </Reveal>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]); // gambar bergerak lebih lambat
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ═══ HERO (parallax) ═══ */}
      <section ref={heroRef} className="relative h-[420px] w-full overflow-hidden bg-emerald-900 sm:h-[500px] lg:h-[600px]">
        <m.img
          src={HERO_IMAGE}
          alt="Pola kucing - CV Prima Mandiri Distribusi"
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/40 to-black/20" />

        <m.div style={{ y: textY, opacity: textOpacity }} className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-10 text-center">
          <m.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur"
          >
            <PawPrint className="h-4 w-4" /> Distributor Pakan Kucing & Anjing
          </m.span>
          <m.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="mb-4 text-3xl font-semibold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl"
          >
            CV Prima Mandiri Distribusi
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="mb-8 max-w-2xl text-base text-gray-100 drop-shadow sm:text-lg md:text-xl"
          >
            Supplier Pakan Hewan Kesayangan Lengkap & Cepat untuk area Jawa Tengah dan DIY.
          </m.p>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <PawButton href="/produk" variant="primary" icon={<ArrowRight className="h-5 w-5" />}>Lihat Produk</PawButton>
            <PawButton href="/kontak" variant="light" icon={<Phone className="h-5 w-5" />}>Hubungi Admin</PawButton>
          </m.div>
        </m.div>
      </section>
      <WaveDivider from="bg-emerald-900" to="text-cream" />

      {/* ═══ FEATURES ═══ */}
      <section className="relative bg-cream pb-16 pt-8">
        <PawTrail side="left" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle title="Mengapa Pilih Kami?" desc="Kami memberikan layanan terbaik untuk kebutuhan pakan hewan kesayangan Anda." />
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <FloatCard key={i} className="group rounded-3xl border border-white bg-white p-6 shadow-sm">
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${
                    f.color === "emerald" ? "bg-emerald-100 text-emerald-600" :
                    f.color === "blue" ? "bg-blue-100 text-blue-600" :
                    f.color === "amber" ? "bg-amber-100 text-amber-600" :
                    "bg-violet-100 text-violet-600"
                  }`}
                >
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </FloatCard>
            ))}
          </StaggerGroup>
        </div>
      </section>
      <WaveDivider from="bg-cream" to="text-sand" variant={2} />

      {/* ═══ JADWAL PENGIRIMAN ═══ */}
      <section className="relative bg-sand pb-16 pt-6">
        <PawTrail side="right" count={5} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle title="Jadwal Pengiriman" desc="Pengiriman rutin dua kali seminggu ke seluruh wilayah cakupan." />
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {schedule.map((s, i) => {
              const c = colorMap[s.color];
              return (
                <FloatCard key={i} className={`flex flex-col rounded-3xl border ${c.border} ${c.bg} p-6`}>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <h3 className={`text-lg font-semibold ${c.text}`}>{s.area}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.badge}`}>{s.days}</span>
                  </div>
                  <div className="mb-3 flex items-start gap-2">
                    <Calendar className={`mt-0.5 h-4 w-4 shrink-0 ${c.text}`} />
                    <span className="text-sm text-gray-600">{s.days}</span>
                  </div>
                  <div className="mb-4 flex items-start gap-2">
                    <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${c.text}`} />
                    <span className="text-sm leading-relaxed text-gray-600">{s.cities.join(", ")}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-200/60 pt-4">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${c.accent} text-xs font-bold text-white`}>{s.sales[0]}</div>
                      <span className="text-sm font-medium text-gray-700">{s.sales}</span>
                    </div>
                    <a href={`https://wa.me/${s.phone}`} target="_blank" rel="noopener noreferrer"
                      className={`group/chat inline-flex items-center gap-1 text-sm font-semibold ${c.text}`}>
                      Chat <ChevronRight className="h-4 w-4 transition-transform group-hover/chat:translate-x-1" />
                    </a>
                  </div>
                </FloatCard>
              );
            })}
          </StaggerGroup>
        </div>
      </section>
      <WaveDivider from="bg-sand" to="text-white" />

      {/* ═══ AREA MAP ═══ */}
      <section className="bg-white pb-16 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle title="Area Layanan Kami" desc="Klik salah satu area untuk melihat cakupan wilayah di peta." />
          <Reveal y={40} className="overflow-hidden rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-900/5" style={{ height: "450px" }}>
            <AreaMap />
          </Reveal>
          <Reveal delay={0.15} className="mt-6 text-center">
            <Link href="/area" className="group inline-flex items-center gap-2 font-semibold text-emerald-600">
              Lihat Detail Area Layanan <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>
      </section>
      <WaveDivider from="bg-white" to="text-cream" variant={2} />

      {/* ═══ BRAND PARTNER ═══ */}
      <section className="relative bg-cream pb-16 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle title="Brand Partner Kami" desc="Menyediakan berbagai brand pakan kucing & anjing ternama dan terpercaya." />
          <StaggerGroup className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {brands.map((b, i) => (
              <StaggerItem key={i}>
                <m.div
                  whileHover={{ y: -6, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="flex items-center justify-center rounded-2xl border border-white bg-white p-3 shadow-sm transition-shadow hover:border-emerald-200 hover:shadow-lg"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={`/logos/${b.file}`}
                    alt={b.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
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
                </m.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
      <WaveDivider from="bg-cream" to="text-emerald-700" />

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-emerald-700 pb-20 pt-10">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/cat-pattern.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div aria-hidden className="absolute -right-10 top-6 hidden animate-float text-white/10 sm:block"><PawPrint className="h-40 w-40" strokeWidth={1.2} /></div>
        <Reveal className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">Siap Memesan?</h2>
          <p className="mx-auto mb-8 max-w-xl text-emerald-100">Hubungi admin kami sekarang dan dapatkan harga terbaik untuk pakan kucing & anjing berkualitas.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <PawButton href="https://wa.me/628212256908" external variant="light" icon={<Phone className="h-5 w-5" />}>Supervisor Sales</PawButton>
            <PawButton href="https://wa.me/6282342931570" external variant="outline">Chat WhatsApp</PawButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
