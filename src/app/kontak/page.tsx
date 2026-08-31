"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, User, Send, Navigation, Building2, Truck } from "lucide-react";
import dynamic from "next/dynamic";

const OfficeMap = dynamic(() => import("@/components/OfficeMap"), { ssr: false });

const supervisor = {
  name: "Supervisor Sales",
  phone: "08212256908",
  phoneLink: "628212256908",
  role: "Koordinator Penjualan",
};

const sales = [
  { area: "Solo Raya", name: "Adelia", phone: "082342931570", phoneLink: "6282342931570", schedule: "Senin & Kamis", color: "blue", cities: "Surakarta, Boyolali, Klaten, Sukoharjo, Sragen, Karanganyar, Wonogiri" },
  { area: "DIY & Sekitarnya", name: "April", phone: "082323352405", phoneLink: "628232352405", schedule: "Selasa & Jumat", color: "emerald", cities: "Yogyakarta, Bantul, Sleman, Kulon Progo, Gunung Kidul, Kebumen, Purworejo, Magelang" },
  { area: "Semarang & Sekitarnya", name: "Fitri", phone: "082323209960", phoneLink: "6282323209960", schedule: "Rabu & Sabtu", color: "violet", cities: "Semarang Kota, Semarang Kabupaten, Demak, Kudus, Pati, Grobogan, Salatiga" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", badge: "bg-violet-100 text-violet-700" },
};

export default function KontakPage() {
  const [form, setForm] = useState({ name: "", phone: "", area: "Solo Raya", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSales = sales.find(s => s.area === form.area);
    const text = `Halo Kak ${selectedSales?.name || ""}, saya ${form.name} (${form.phone}). ${form.message}`;
    window.open(`https://wa.me/${selectedSales?.phoneLink || "6282342931570"}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-emerald-700">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/cat-pattern.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Kontak</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">Hubungi kami untuk informasi produk, harga, dan pemesanan.</p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Supervisor */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontak Utama</h2>
              <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xl">
                    {supervisor.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{supervisor.name}</h3>
                    <p className="text-emerald-700 text-sm">{supervisor.role}</p>
                  </div>
                </div>
                <a href={`https://wa.me/${supervisor.phoneLink}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">{supervisor.phone}</span>
                </a>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-semibold text-gray-900">primamandiridistribusi01@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-gray-500">Jam Operasional</p>
                    <p className="text-sm font-semibold text-gray-900">Senin — Sabtu, 08.00 — 16.00 WIB</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 sm:col-span-2">
                  <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Alamat</p>
                    <p className="text-sm font-semibold text-gray-900">Jl. Griya Prima Timur utara No.521, Dedesan, Belang Wetan, Kec. Klaten Utara, Kab. Klaten, Jawa Tengah 57466</p>
                  </div>
                </div>
              </div>

              {/* Sales Cards */}
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Sales per Wilayah</h2>
              <div className="space-y-4">
                {sales.map((s) => {
                  const cm = colorMap[s.color];
                  return (
                    <div key={s.area} className={`rounded-2xl border-2 ${cm.border} ${cm.bg} p-5`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${s.color === "blue" ? "bg-blue-500" : s.color === "emerald" ? "bg-emerald-500" : "bg-violet-500"}`}>
                            {s.name[0]}
                          </div>
                          <div>
                            <h3 className={`font-bold ${cm.text}`}>{s.name}</h3>
                            <p className="text-xs text-gray-500">{s.area}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold ${cm.badge} px-3 py-1 rounded-full`}>{s.schedule}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Cakupan: {s.cities}</p>
                      <a href={`https://wa.me/${s.phoneLink}?text=Halo%20Kak%20${s.name}%2C%20saya%20ingin%20bertanya`} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${cm.text} ${cm.bg} border ${cm.border} hover:opacity-80 transition`}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                        Chat {s.name}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map & Form */}
            <div>
              {/* Map */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lokasi Kami</h2>
                <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm" style={{ height: "350px" }}>
                  <OfficeMap />
                </div>
                <a href="https://maps.app.goo.gl/hrrocaPGXgfpFSDKA" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-semibold">
                  <Navigation className="w-4 h-4" /> Buka di Google Maps
                </a>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Nama Anda" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">No. HP</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="08xxx" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Area</label>
                    <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      {sales.map(s => <option key={s.area} value={s.area}>{s.area} — {s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pesan</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" placeholder="Tulis pesan Anda..." />
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Kirim via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
