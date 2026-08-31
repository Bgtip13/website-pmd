"use client";
import { useState } from "react";
import { Calendar, Store, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const AreaMap = dynamic(() => import("@/components/AreaMap"), { ssr: false });

const schedule = [
  { area: "Solo Raya", days: "Senin & Kamis", cities: ["Surakarta", "Boyolali", "Klaten", "Sukoharjo", "Sragen", "Karanganyar", "Wonogiri"], sales: "Adelia", phone: "6282342931570", color: "blue" },
  { area: "DIY & Sekitarnya", days: "Selasa & Jumat", cities: ["Yogyakarta", "Bantul", "Sleman", "Kulon Progo", "Gunung Kidul", "Kebumen", "Purworejo", "Magelang"], sales: "April", phone: "628232352405", color: "emerald" },
  { area: "Semarang & Sekitarnya", days: "Rabu & Sabtu", cities: ["Semarang Kota", "Semarang Kabupaten", "Demak", "Kudus", "Pati", "Grobogan", "Salatiga"], sales: "Fitri", phone: "6282323209960", color: "violet" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", badge: "bg-violet-100 text-violet-700" },
};

export default function AreaPage() {
  const [expandedArea, setExpandedArea] = useState<number | null>(null);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-emerald-700">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/cat-pattern.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Area Layanan</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">Kami melayani pengiriman pakan kucing ke berbagai wilayah di Jawa Tengah & DIY dengan jadwal rutin.</p>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm" style={{ height: "500px" }}>
            <AreaMap expandedArea={expandedArea} />
          </div>
        </div>
      </section>

      {/* Schedule Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Jadwal Pengiriman</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schedule.map((s, i) => {
              const cm = colorMap[s.color];
              return (
                <div key={i} className={`bg-white rounded-2xl border-2 ${cm.border} overflow-hidden hover:shadow-lg transition-all ${expandedArea === i ? "ring-2 ring-offset-2 " + cm.text.replace("text-", "ring-") : ""}`}>
                  <div className={`${cm.bg} px-6 py-4 border-b ${cm.border}`}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-xl font-bold ${cm.text}`}>{s.area}</h3>
                      <span className={`text-xs font-semibold ${cm.badge} px-3 py-1 rounded-full`}>{s.days}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Sales: {s.sales}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-semibold">Cakupan Kab/Kota:</p>
                    <div className="flex flex-wrap gap-2">
                      {s.cities.map((city, j) => (
                        <span key={j} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-lg">{city}</span>
                      ))}
                    </div>
                    <a href={`https://wa.me/${s.phone}?text=Halo%20Kak%20${s.sales}%2C%20saya%20dari%20${s.area}`} target="_blank" rel="noopener noreferrer" className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm ${cm.bg} ${cm.text} hover:opacity-80 transition`}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                      Hubungi {s.sales}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
