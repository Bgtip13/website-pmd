"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, User, Send, Navigation, Building2, Truck } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const officePosition: [number, number] = [-7.6852, 110.6275];

const supervisor = {
  name: "Supervisor Sales",
  phone: "08212256908",
  phoneLink: "628212256908",
  role: "Koordinator Penjualan",
};

const sales = [
  {
    area: "Solo Raya",
    name: "Adelia",
    phone: "082342931570",
    phoneLink: "6282342931570",
    schedule: "Senin & Kamis",
    color: "blue",
    cities: "Surakarta, Boyolali, Klaten, Sukoharjo, Sragen, Karanganyar, Wonogiri",
  },
  {
    area: "DIY & Sekitarnya",
    name: "April",
    phone: "082323352405",
    phoneLink: "6282323352405",
    schedule: "Selasa & Jumat",
    color: "emerald",
    cities: "Yogyakarta, Bantul, Sleman, Kulon Progo, Gunung Kidul, Kebumen, Purworejo, Magelang",
  },
  {
    area: "Semarang & Sekitarnya",
    name: "Fitri",
    phone: "082323209960",
    phoneLink: "6282323209960",
    schedule: "Rabu & Sabtu",
    color: "violet",
    cities: "Semarang Kota, Semarang Kabupaten, Demak, Kudus, Pati, Grobogan, Salatiga",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", badge: "bg-violet-100 text-violet-700" },
};

// Komponen peta — TIDAK terima props, pakai officePosition langsung
function OfficeMap() {
  return (
    <MapContainer
      center={officePosition}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={officePosition}>
        <Popup>
          <div style={{ padding: 4 }}>
            <h3 style={{ fontWeight: 700, color: "#047857", fontSize: 14, marginBottom: 4 }}>
              CV Prima Mandiri Distribusi
            </h3>
            <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.4 }}>
              Jl. Griya Prima Timur utara No.521, Dedesan, Belang Wetan, Kec. Klaten Utara, Kab. Klaten, Jawa Tengah 57466
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${officePosition[0]},${officePosition[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#047857", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}
            >
              <Navigation style={{ width: 12, height: 12 }} /> Buka di Google Maps
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default function KontakPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo, saya ${formData.name} (${formData.phone}). ${formData.message}`;
    window.open(`https://wa.me/${supervisor.phoneLink}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
            <Building2 className="w-4 h-4" />
            Hubungi Kami
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontak & Lokasi</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Kami siap membantu Anda. Hubungi sales sesuai area atau kunjungi kantor kami.
          </p>
        </div>
      </section>

      {/* Supervisor */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-xl font-bold">{supervisor.name}</h2>
              <p className="text-emerald-100 text-sm">{supervisor.role}</p>
              <p className="mt-2 text-lg font-semibold">{supervisor.phone}</p>
            </div>
            <a
              href={`https://wa.me/${supervisor.phoneLink}?text=Halo%20Pak%2C%20saya%20ingin%20bertanya`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition inline-flex items-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4" /> Hubungi
            </a>
          </div>
        </div>
      </section>

      {/* Sales Per Area */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Sales Per Area</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sales.map((s) => {
              const c = colorMap[s.color];
              return (
                <div key={s.area} className={`${c.bg} border ${c.border} rounded-2xl p-6 hover:shadow-lg transition`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${c.badge} rounded-xl flex items-center justify-center`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{s.area}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{s.schedule}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{s.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{s.cities}</span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${s.phoneLink}?text=Halo%20Kak%20${s.name}%2C%20saya%20ingin%20order`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 w-full bg-${s.color}-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2`}
                  >
                    <Phone className="w-4 h-4" /> Chat {s.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Kantor + Peta */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Lokasi Kantor</h2>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Alamat</h3>
                  <p className="text-sm text-gray-600 mt-1">Jl. Griya Prima Timur utara No.521, Dedesan, Belang Wetan, Kec. Klaten Utara, Kab. Klaten, Jawa Tengah 57466</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Telepon</h3>
                  <p className="text-sm text-gray-600 mt-1">{supervisor.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Email</h3>
                  <p className="text-sm text-gray-600 mt-1">primamandiridistribusi01@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Jam Operasional</h3>
                  <p className="text-sm text-gray-600 mt-1">Senin — Sabtu, 07.00 — 16.00 WIB</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-[350px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <OfficeMap />
            </div>
          </div>
        </div>
      </section>

      {/* Form Hubungi */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Kirim Pesan</h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm"
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm resize-none"
                placeholder="Tulis pesan Anda..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Kirim via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
