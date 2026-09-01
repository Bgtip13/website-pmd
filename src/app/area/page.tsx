"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, ChevronDown, ChevronUp, Truck } from "lucide-react";

const AreaMap = dynamic(() => import("@/components/AreaMap"), { ssr: false });

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

export default function AreaPage() {
  const [expandedArea, setExpandedArea] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-emerald-700">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/cat-pattern.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Area Layanan</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">Kami melayani pengiriman pakan kucing ke seluruh area Jawa Tengah dan DIY dengan jadwal rutin dua kali seminggu.</p>
        </div>
      </section>

      {/* Area Cards + Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kiri — Cards */}
          <div className="space-y-4">
            {areas.map((area, idx) => {
              const c = colorClasses[area.color];
              const isExpanded = expandedArea === idx;
              return (
                <div key={idx} className={`rounded-2xl border-l-4 ${c.border} bg-white shadow-sm overflow-hidden transition-all`}>
                  <button
                    onClick={() => setExpandedArea(isExpanded ? null : idx)}
                    className={`w-full flex items-center justify-between p-5 text-left ${isExpanded ? c.bg : "bg-white"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${c.badge} flex items-center justify-center`}>
                        <MapPin size={22} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${c.text}`}>{area.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Truck size={14} /> {area.days}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100">
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Wilayah Cakupan</p>
                        <div className="flex flex-wrap gap-2">
                          {area.cities.map((city, ci) => (
                            <span key={ci} className={`text-xs px-3 py-1 rounded-full ${c.badge}`}>{city}</span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Sales: <strong>{area.sales}</strong>
                        </div>
                        <a
                          href={`https://wa.me/${area.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-green-600 transition"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Chat WhatsApp
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Kanan — Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white h-[500px] sticky top-24">
            <AreaMap expandedArea={expandedArea} />
          </div>
        </div>
      </section>
    </div>
  );
}
