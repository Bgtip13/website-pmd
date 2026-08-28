"use client";
import Link from "next/link";
import { MapPin, Phone, Truck, Calendar, ArrowRight, MessageCircle, CheckCircle } from "lucide-react";
import dynamic from "next/dynamic";

const AreaMap = dynamic(() => import("@/components/AreaMap"), { ssr: false });

const areas = [
  {
    name: "Solo Raya",
    color: "blue",
    colorHex: "#2563eb",
    schedule: "Senin & Kamis",
    cities: ["Surakarta (Solo Kota)", "Boyolali", "Klaten", "Sukoharjo", "Sragen", "Karanganyar", "Wonogiri"],
    sales: "Adelia",
    phone: "0823-4293-1570",
    wa: "6282342931570",
  },
  {
    name: "DIY & Sekitarnya",
    color: "emerald",
    colorHex: "#059669",
    schedule: "Selasa & Jumat",
    cities: ["Yogyakarta Kota", "Bantul", "Sleman", "Kulon Progo", "Gunung Kidul", "Kebumen", "Purworejo", "Magelang"],
    sales: "April",
    phone: "0823-2335-2405",
    wa: "6282323352405",
  },
  {
    name: "Semarang & Sekitarnya",
    color: "violet",
    colorHex: "#7c3aed",
    schedule: "Rabu & Sabtu",
    cities: ["Semarang Kota", "Semarang Kabupaten", "Demak", "Kudus", "Pati", "Grobogan", "Salatiga"],
    sales: "Fitri",
    phone: "0823-2320-9960",
    wa: "6282323209960",
  },
];

export default function AreaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
            <MapPin className="w-4 h-4" />
            Area Layanan
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Area Layanan Kami</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Kami melayani pengiriman pakan hewan ke 3 area utama dengan jadwal tetap &amp; GRATIS ongkir.
          </p>
        </div>
      </section>

      {/* Peta */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Peta Cakupan Wilayah</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <AreaMap />
          </div>
        </div>
      </section>

      {/* Detail Area */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Detail Area &amp; Jadwal Kiriman</h2>
          <div className="grid gap-8">
            {areas.map((area) => (
              <div
                key={area.name}
                className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: area.colorHex }}
                    >
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{area.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {area.schedule}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" /> Gratis Ongkir
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${area.wa}?text=${encodeURIComponent("Halo " + area.sales + ", saya mau order pakan.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-600 transition text-sm shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat {area.sales}
                  </a>
                </div>

                {/* Cities */}
                <div className="p-6">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Cakupan Wilayah</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {area.cities.map((city) => (
                      <div key={city} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 shrink-0" style={{ color: area.colorHex }} />
                        {city}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="w-4 h-4" />
                    Sales: <strong className="text-gray-700">{area.sales}</strong> — {area.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Mau Cek Area Kamu?</h2>
          <p className="text-emerald-100 mb-8 text-lg">Hubungi sales kami sesuai wilayah untuk info lengkap harga, stok, dan jadwal kirim.</p>
          <Link
            href="/kontak"
            className="bg-white text-emerald-800 px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-50 transition inline-flex items-center gap-2 shadow-lg"
          >
            <Phone className="w-4 h-4" /> Lihat Kontak Sales
          </Link>
        </div>
      </section>
    </>
  );
}
