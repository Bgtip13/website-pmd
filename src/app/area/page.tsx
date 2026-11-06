"use client";
import dynamic from "next/dynamic";
import { m } from "motion/react";
import { MapPin, Truck, PawPrint } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import WaveDivider from "@/components/motion/WaveDivider";
import { TabSwitcher, TabPanel, useTabs } from "@/components/ui/TabSwitcher";
import { Skeleton } from "@/components/ui/Skeleton";
import { ease } from "@/lib/motion";

const AreaMap = dynamic(() => import("@/components/AreaMap"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-none" />,
});

const areas = [
  {
    name: "Solo Raya",
    days: "Senin & Kamis",
    cities: ["Surakarta (Solo Kota)", "Boyolali", "Klaten", "Sukoharjo", "Sragen", "Karanganyar", "Wonogiri"],
    sales: "Adelia",
    phone: "6282342931570",
    color: "blue",
  },
  {
    name: "DIY & Sekitarnya",
    days: "Selasa & Jumat",
    cities: ["Yogyakarta Kota", "Bantul", "Sleman", "Kulon Progo", "Gunung Kidul", "Kebumen", "Purworejo", "Magelang"],
    sales: "April",
    phone: "6282323352405",
    color: "emerald",
  },
  {
    name: "Semarang & Sekitarnya",
    days: "Rabu & Sabtu",
    cities: ["Semarang Kota", "Semarang Kabupaten", "Demak", "Kudus", "Pati", "Grobogan", "Salatiga"],
    sales: "Fitri",
    phone: "6282323209960",
    color: "violet",
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-500", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
  violet: { bg: "bg-violet-50", border: "border-violet-500", text: "text-violet-700", badge: "bg-violet-100 text-violet-700" },
};

const tabItems = areas.map((a, i) => ({ id: String(i), label: a.name.split(" ")[0], icon: <MapPin size={14} /> }));
const tabIds = tabItems.map((t) => t.id);

export default function AreaPage() {
  const { value, direction, setValue } = useTabs(tabIds, "0");
  const idx = Number(value);
  const area = areas[idx];
  const c = colorClasses[area.color];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="relative overflow-hidden bg-emerald-700">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/cat-pattern.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <m.h1 initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, ease }} className="mb-3 text-3xl font-semibold text-white md:text-4xl">
            Area Layanan
          </m.h1>
          <m.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.15 }} className="max-w-2xl text-lg text-emerald-100">
            Kami melayani pengiriman pakan hewan ke seluruh area Jawa Tengah dan DIY dengan jadwal rutin dua kali seminggu.
          </m.p>
        </div>
      </section>
      <WaveDivider from="bg-emerald-700" to="text-cream" />

      {/* Tabs + Detail + Map */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Kiri — Tab wilayah */}
          <Reveal>
            <TabSwitcher tabs={tabItems} value={value} onChange={setValue} layoutId="area-tab-pill" className="mb-5" />

            <TabPanel id={value} direction={direction}>
              <div className={`overflow-hidden rounded-3xl border-l-4 ${c.border} bg-white shadow-sm`}>
                <div className={`flex items-center gap-4 p-5 ${c.bg}`}>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.badge}`}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${c.text}`}>{area.name}</h3>
                    <p className="flex items-center gap-1 text-sm text-gray-500"><Truck size={14} /> {area.days}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Wilayah Cakupan</p>
                  <m.div
                    key={value}
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}
                    className="flex flex-wrap gap-2"
                  >
                    {area.cities.map((city) => (
                      <m.span
                        key={city}
                        variants={{ hidden: { opacity: 0, scale: 0.8, y: 8 }, show: { opacity: 1, scale: 1, y: 0 } }}
                        whileHover={{ y: -2, scale: 1.05 }}
                        className={`rounded-full px-3 py-1 text-xs ${c.badge}`}
                      >
                        {city}
                      </m.span>
                    ))}
                  </m.div>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="text-sm text-gray-600">Sales: <strong>{area.sales}</strong></div>
                    <m.a
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={`https://wa.me/${area.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-600"
                    >
                      <PawPrint className="h-4 w-4 group-hover:animate-paw" />
                      Chat WhatsApp
                    </m.a>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Reveal>

          {/* Kanan — Peta */}
          <Reveal delay={0.1} y={32} className="sticky top-24 h-[500px] overflow-hidden rounded-3xl bg-white shadow-xl shadow-emerald-900/5">
            <AreaMap expandedArea={idx} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
