"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, User, Send, MessageCircle, Navigation, Building2, Truck } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon
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
  { area: "Solo Raya", name: "Adelia", phone: "082342931570", phoneLink: "6282342931570", schedule: "Senin & Kamis", color: "blue", cities: "Surakarta, Boyolali, Klaten, Sukoharjo, Sragen, Karanganyar, Wonogiri" },
  { area: "DIY & Sekitarnya", name: "April", phone: "082323352405", phoneLink: "6282323352405", schedule: "Selasa & Jumat", color: "emerald", cities: "Yogyakarta, Bantul, Sleman, Kulon Progo, Gunung Kidul, Kebumen, Purworejo, Magelang" },
  { area: "Semarang & Sekitarnya", name: "Fitri", phone: "082323209960", phoneLink: "6282323209960", schedule: "Rabu & Sabtu", color: "violet", cities: "Semarang Kota, Semarang Kabupaten, Demak, Kudus, Pati, Grobogan, Salatiga" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", badge: "bg-violet-100 text-violet-700" },
};

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
              style={{ color: "#047857", fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8 }}
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
  const [formData, setFormData] = useState({ name: "", area: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const salesPerson = sales.find((s) => s.area.toLowerCase().includes(formData.area.toLowerCase()));
    const phone = salesPerson ? salesPerson.phoneLink : supervisor.phoneLink;
    const text = encodeURIComponent(
      `Halo, saya ${formData.name}.\nArea: ${formData.area}\nNo HP: ${formData.phone}\nPesan: ${formData.message}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
            <Phone className="w-4 h-4" />
            Hubungi Kami
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontak & Lokasi</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Hubungi sales kami sesuai wilayah atau kunjungi langsung kantor kami di Klaten.
          </p>
        </div>
      </section>

      {/* Supervisor Card */}
      <section className="py-10 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <User className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <p className="text-emerald-100 text-sm">Koordinator Penjualan</p>
                <h2 className="text-xl font-bold">{supervisor.name}</h2>
              </div>
              <a
                href={`https://wa.me/62${supervisor.phone}?text=Halo%20Pak%2C%20saya%20ingin%20bertanya%20tentang%20produk%20CV%20Prima%20Mandiri%20Distribusi`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-emerald-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-50 transition inline-flex items-center gap-2 shadow-lg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.97 0-3.856-.53-5.49-1.455l-.394-.233-3.746.984.999-3.652-.257-.41A9.78 9.78 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82S21.82 6.578 21.82 12s-4.398 9.82-9.82 9.82z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Cards */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Sales Per Wilayah</h2>
          <p className="text-gray-500 text-center mb-8">Hubungi sales yang melayani area Anda</p>
          <div className="grid md:grid-cols-3 gap-5">
            {sales.map((s) => {
              const c = colorMap[s.color];
              return (
                <div key={s.area} className={`rounded-2xl border-2 ${c.border} ${c.bg} p-6 hover:shadow-lg transition-all`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${c.badge} flex items-center justify-center`}>
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold ${c.text}`}>{s.area}</h3>
                      <p className="text-xs text-gray-500">{s.cities}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{s.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{s.schedule}</span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${s.phoneLink}?text=Halo%20Kak%20${s.name}%2C%20saya%20dari%20area%20${s.area}.%20Mau%20tanya%20produk%20dan%20harga.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full bg-white border-2 ${c.border} ${c.text} py-2.5 rounded-xl font-semibold hover:shadow-md transition inline-flex items-center justify-center gap-2 text-sm`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                    Chat {s.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Kantor */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Informasi Kantor</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Alamat */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Alamat Kantor & Gudang</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Jl. Griya Prima Timur utara No.521, Dedesan, Belang Wetan, Kec. Klaten Utara, Kab. Klaten, Jawa Tengah 57466
                  </p>
                </div>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Jam Operasional</h3>
                  <p className="text-gray-600 text-sm">Senin — Sabtu</p>
                  <p className="text-gray-900 font-semibold">07.00 — 16.00 WIB</p>
                  <p className="text-gray-400 text-xs mt-1">Minggu & Hari Libur Nasional Tutup</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:primamandiridistribusi01@gmail.com" className="text-emerald-600 text-sm hover:underline">
                    primamandiridistribusi01@gmail.com
                  </a>
                </div>
              </div>
            </div Gratis Ongkir */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Gratis Ongkir</h3>
                  <p className="text-gray-600 text-sm">Untuk semua wilayah cakupan</p>
                  <p className="text-gray-900 font-semibold text-sm">Order sebelum jam 08.00 WIB → kirim hari yang sama</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 relative">
        <OfficeMap />
      </section>

      {/* Form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Kirim Pesan</h2>
          <p className="text-gray-500 text-center mb-8">Isi form di bawah, pesan akan dikirim via WhatsApp</p>

          {submitted ? (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">Pesan Terkirim!</h3>
              <p className="text-gray-600">WhatsApp akan terbuka secara otomatis. Silakan kirim pesan Anda.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-emerald-600 font-medium hover:underline"
              >
                Kirim pesan lagi
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  >
                    <option value="">Pilih area</option>
                    <option value="Solo">Solo Raya</option>
                    <option value="DIY">DIY & Sekitarnya</option>
                    <option value="Semarang">Semarang & Sekitarnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                  <input
                    type="tel"
                    required
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tulis pesan Anda..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none bg-white"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
                Kirim via WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
