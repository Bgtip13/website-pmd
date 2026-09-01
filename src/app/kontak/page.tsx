"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Phone, Mail, Clock, MapPin, User, MessageCircle } from "lucide-react";

const OfficeMap = dynamic(() => import("@/components/OfficeMap"), { ssr: false });

const sales = [
  { area: "Solo", name: "Adelia", phone: "6282342931570", color: "blue", schedule: "Senin & Kamis" },
  { area: "DIY", name: "April", phone: "6282323352405", color: "emerald", schedule: "Selasa & Jumat" },
  { area: "Semarang", name: "Fitri", phone: "6282323209960", color: "violet", schedule: "Rabu & Sabtu" },
];

const colorMap: Record<string, { bg: string; border: string; text: string; hover: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-700", hover: "hover:bg-blue-100" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-500", text: "text-emerald-700", hover: "hover:bg-emerald-100" },
  violet: { bg: "bg-violet-50", border: "border-violet-500", text: "text-violet-700", hover: "hover:bg-violet-100" },
};

export default function KontakPage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-emerald-700">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/cat-pattern.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Kontak & Kemitraan</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">Hubungi kami untuk pemesanan, pertanyaan, atau kerjasama.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* Supervisor Sales */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <User size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Supervisor Sales</h2>
              <p className="text-sm text-gray-500">Kontak utama untuk informasi & kerjasama</p>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
            <div className="flex items-center gap-3 mb-2">
              <User size={18} className="text-emerald-600" />
              <span className="font-semibold text-gray-800">08212256908</span>
            </div>
            <a
              href="https://wa.me/628212256908"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat WhatsApp
            </a>
          </div>
        </div>

        {/* Admin per Area */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin per Area</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sales.map((s, idx) => {
              const c = colorMap[s.color];
              const isExpanded = expandedIdx === idx;
              return (
                <div key={idx} className={`rounded-2xl border-l-4 ${c.border} bg-white shadow-sm overflow-hidden transition-all`}>
                  <button
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                    className={`w-full text-left p-5 ${c.hover} transition`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.text} mb-2`}>{s.area}</span>
                        <p className="font-bold text-gray-800">{s.name}</p>
                        <p className="text-sm text-gray-500 mt-1">Kirim: {s.schedule}</p>
                      </div>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={16} className="text-gray-400" />
                        <span>{s.phone.replace("62", "0")}</span>
                      </div>
                      <a
                        href={`https://wa.me/${s.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Chat WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Kontak + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Informasi Kontak</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Alamat Kantor & Gudang</p>
                    <p className="text-gray-500">Jl. Griya Prima Timur utara No.521, Dedesan, Belang Wetan, Kec. Klaten Utara, Kab. Klaten, Jawa Tengah 57466</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Telepon / WhatsApp</p>
                    <p className="text-gray-500">Supervisor: 08212256908</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-500">primamandiridistribusi01@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">Jam Operasional</p>
                    <p className="text-gray-500">Senin - Sabtu, 08.00 - 16.00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alur Pemesanan */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Alur Pemesanan</h3>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <span>Chat admin via WhatsApp sesuai area</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <span>Kirim data: nama toko, alamat, no. HP</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <span>Verifikasi langsung, tidak sampai 5 menit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">4</span>
                  <span>Selesai! Toko langsung masuk jadwal rute kiriman</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white h-[450px] sticky top-24">
            <OfficeMap />
          </div>
        </div>

      </div>
    </div>
  );
}
