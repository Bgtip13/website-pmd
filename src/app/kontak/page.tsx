"use client";
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation, ExternalLink } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import("@/components/ContactMap"), { ssr: false });

const officePosition: [number, number] = [-7.6852, 110.6275];

const sales = [
  { name: "Adelia", area: "Solo Raya", phone: "0823-4293-1570", wa: "6282342931570", schedule: "Senin & Kamis", color: "blue" },
  { name: "April", area: "DIY & Sekitarnya", phone: "0823-2335-2405", wa: "6282323352405", schedule: "Selasa & Jumat", color: "emerald" },
  { name: "Fitri", area: "Semarang & Sekitarnya", phone: "0823-2320-9960", wa: "6282323209960", schedule: "Rabu & Sabtu", color: "violet" },
];

export default function KontakPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
            <Phone className="w-4 h-4" />
            Hubungi Kami
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontak &amp; Lokasi</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Kami siap membantu Anda — pilih sales sesuai wilayah atau hubungi langsung supervisor kami.
          </p>
        </div>
      </section>

      {/* Supervisor + Info */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Supervisor */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center text-3xl font-bold shrink-0">
                SM
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="text-sm text-emerald-600 font-medium mb-1">Supervisor Sales</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">0821-2256-908</h2>
                <a
                  href="https://wa.me/628212256908"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition"
                >
                  <Phone className="w-4 h-4" /> Chat Supervisor
                </a>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Telepon</h3>
              <p className="text-gray-600 text-sm">0821-2256-908</p>
              <p className="text-gray-400 text-xs mt-1">Supervisor Sales</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600 text-sm">primamandiridistribusi01@gmail.com</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Jam Operasional</h3>
              <p className="text-gray-600 text-sm">Senin — Sabtu</p>
              <p className="text-gray-600 text-sm">07.00 — 16.00 WIB</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 sm:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Alamat</h3>
              <p className="text-gray-600 text-sm">
                Jl. Griya Prima Timur Utara No.521, Dedesan, Belang Wetan,<br />
                Kec. Klaten Utara, Kab. Klaten, Jawa Tengah 57466
              </p>
              <a
                href="https://maps.app.goo.gl/hrrocaPGXgfpFSDKA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium hover:underline mt-2"
              >
                <Navigation className="w-3 h-3" /> Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Peta Lokasi */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Lokasi Kantor &amp; Gudang</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-[400px]">
            <ContactMap position={officePosition} />
          </div>
        </div>
      </section>

      {/* Sales per Area */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Admin Sales per Wilayah</h2>
          <p className="text-gray-500 text-center mb-10">Hubungi admin sesuai area Anda</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {sales.map((s) => (
              <div key={s.area} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  {s.name[0]}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{s.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{s.area}</p>
                <p className="text-xs text-gray-400 mb-4">Kirim: {s.schedule}</p>
                <a
                  href={`https://wa.me/${s.wa}?text=${encodeURIComponent("Halo " + s.name + ", saya mau order pakan.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-600 transition text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Chat WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
