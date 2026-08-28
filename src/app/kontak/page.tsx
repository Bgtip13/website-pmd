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
  { area: "DIY & Sekitarnya", name: "April", phone: "082323352405", phoneLink: "6282323352405", schedule: "Selasa & Jumat", color: "emerald", cities: "Yogyakarta, Bantul, Sleman, Kulon Progo, Gunung Kidul, Kebumen, Purworejo, Magelang" },
  { area: "Semarang & Sekitarnya", name: "Fitri", phone: "082323209960", phoneLink: "6282323209960", schedule: "Rabu & Sabtu", color: "violet", cities: "Semarang Kota, Semarang Kabupaten, Demak, Kudus, Pati, Grobogan, Salatiga" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", badge: "bg-violet-100 text-violet-700" },
};

export default function KontakPage() {
  const [formData, setFormData] = useState({ name: "", store: "", area: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo, saya ${formData.name}%0AToko: ${formData.store}%0AArea: ${formData.area}%0ATelp: ${formData.phone}%0APesan: ${formData.message}`;
    window.open(`https://wa.me/628212256908?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
            <Phone className="w-4 h-4" /> Hubungi Kami
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontak & Kantor</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">Hubungi kami untuk pemesanan, kemitraan, atau informasi lainnya.</p>
        </div>
      </section>

      {/* Supervisor Utama */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6 shadow-lg">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-emerald-100 text-sm uppercase tracking-wider mb-1">Kontak Utama</p>
              <h2 className="text-2xl font-bold mb-1">{supervisor.name}</h2>
              <p className="text-emerald-100 text-sm mb-3">{supervisor.role}</p>
              <a href={`https://wa.me/${supervisor.phoneLink}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-50 transition">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                Chat Supervisor
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-emerald-100 text-sm">Telepon Langsung</p>
              <a href={`tel:${supervisor.phone}`} className="text-xl font-bold hover:underline">{supervisor.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Sales per Area */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Sales Per Wilayah</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sales.map((s) => {
              const c = colorMap[s.color];
              return (
                <div key={s.area} className={`bg-white rounded-2xl border ${c.border} p-6 hover:shadow-lg transition`}>
                  <div className={`inline-flex items-center gap-1.5 ${c.badge} px-3 py-1 rounded-full text-xs font-semibold mb-4`}>
                    <MapPin className="w-3 h-3" /> {s.area}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${c.bg} rounded-full flex items-center justify-center`}>
                      <User className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{s.name}</h3>
                      <p className="text-xs text-gray-500">{s.schedule}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{s.cities}</p>
                  <a href={`https://wa.me/${s.phoneLink}`} target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                    Chat {s.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info & Map */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Info Kantor */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Kantor</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0"><Building2 className="w-5 h-5 text-emerald-700" /></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Alamat</h3>
                  <p className="text-sm text-gray-600 mt-1">Jl. Griya Prima Timur utara No.521, Dedesan, Belang Wetan, Kec. Klaten Utara, Kab. Klaten, Jawa Tengah 57466</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-blue-700" /></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Telepon</h3>
                  <p className="text-sm text-gray-600 mt-1">{supervisor.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-violet-700" /></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-sm text-gray-600 mt-1">primamandiridistribusi01@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5 text-amber-700" /></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Jam Operasional</h3>
                  <p className="text-sm text-gray-600 mt-1">Senin — Sabtu, 08.00 — 16.00 WIB</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0"><Truck className="w-5 h-5 text-emerald-700" /></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Syarat & Ketentuan Kiriman</h3>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Gratis ongkir untuk semua wilayah cakupan</li>
                    <li>• Pesanan sebelum jam 08.00 WIB dikirim hari yang sama</li>
                    <li>• Verifikasi data langsung proses (maks. 5 menit)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Peta */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Lokasi Kami</h2>
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-[400px]">
              <OfficeMap />
            </div>
            <a href="https://maps.app.goo.gl/hrrocaPGXgfpFSDKA" target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm hover:underline">
              <Navigation className="w-4 h-4" /> Buka di Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Form Kontak */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Kirim Pesan</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Isi form di bawah, pesan akan dikirim langsung via WhatsApp</p>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Nama Lengkap</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Nama Anda" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Nama Toko</label>
              <input type="text" required value={formData.store} onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Nama Toko" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Area</label>
              <select required value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                <option value="">Pilih area</option>
                <option>Solo Raya</option>
                <option>DIY & Sekitarnya</option>
                <option>Semarang & Sekitarnya</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">No. HP / WhatsApp</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="08xxx" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Pesan</label>
              <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" placeholder="Tulis pesan Anda..." />
            </div>
            <button type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Kirim via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
