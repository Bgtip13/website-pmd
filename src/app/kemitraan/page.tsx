"use client";
import { Phone, CheckCircle, ArrowRight, ShieldCheck, Truck, Clock, BadgePercent, Handshake, Star, Zap, MessageCircle } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: <BadgePercent className="w-6 h-6" />,
    title: "Harga Khusus Mitra",
    desc: "Dapatkan harga grosir spesial yang tidak tersedia untuk pembeli umum.",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Gratis Ongkir",
    desc: "Pengiriman GRATIS ke seluruh wilayah cakupan tanpa minimum order.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Proses Instan",
    desc: "Daftar & langsung order — tidak perlu tunggu verifikasi lama.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Stok Selalu Ready",
    desc: "Kami jaga stok tetap tersedia agar usaha Anda tidak terganggu.",
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "Dukungan Pemasaran",
    desc: "Materi promosi dan dukungan untuk memajukan petshop Anda.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Prioritas Layanan",
    desc: "Mitra mendapat prioritas layanan dan respons lebih cepat.",
  },
];

const steps = [
  { num: "1", title: "Hubungi Sales", desc: "Chat admin sales WhatsApp sesuai area Anda", icon: <MessageCircle className="w-5 h-5" /> },
  { num: "2", title: "Setuju Harga", desc: "Cek price list & sepakati harga", icon: <CheckCircle className="w-5 h-5" /> },
  { num: "3", title: "Kirim Data", desc: "Kirim nama toko, alamat, dan no. HP", icon: <Phone className="w-5 h-5" /> },
  { num: "4", title: "Langsung Kirim!", desc: "Terdaftar di sistem, langsung ikut rute kiriman", icon: <Truck className="w-5 h-5" /> },
];

const sales = [
  { name: "Adelia", area: "Solo Raya", phone: "6282342931570", schedule: "Senin & Kamis", color: "blue" },
  { name: "April", area: "DIY & Sekitarnya", phone: "6282323352405", schedule: "Selasa & Jumat", color: "emerald" },
  { name: "Fitri", area: "Semarang & Sekitarnya", phone: "6282323209960", schedule: "Rabu & Sabtu", color: "violet" },
];

export default function KemitraanPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
            <Handshake className="w-4 h-4" />
            Program Kemitraan
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Jadi Mitra Kami!</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Bergabung bersama CV Prima Mandiri Distribusi — daftar cepat, langsung order, gratis ongkir ke seluruh area cakupan.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Keuntungan Jadi Mitra</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-2xl bg-gray-50 hover:bg-emerald-50 transition border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Daftar */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Cara Daftar</h2>
          <p className="text-gray-500 text-center mb-12">Proses cepat & instan — tidak perlu tunggu lama!</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {s.num}
                </div>
                <div className="flex items-center justify-center text-emerald-600 mb-2">{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-gray-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syarat & Ketentuan */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Syarat &amp; Ketentuan</h2>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>Gratis ongkir</strong> untuk seluruh wilayah cakupan (Solo Raya, DIY &amp; Sekitarnya, Semarang &amp; Sekitarnya)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Order sebelum <strong>jam 08.00 WIB</strong> akan dikirim hari yang sama</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Proses pendaftaran <strong>instan</strong> — cukup kirim data toko, langsung bisa order</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Jadwal kiriman tetap sesuai area (lihat di bawah)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Harga grosir khusus mitra — berlaku setelah pendaftaran</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hubungi Sales */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Hubungi Sales Kami</h2>
          <p className="text-gray-500 text-center mb-10">Pilih sales sesuai wilayah Anda</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {sales.map((s) => (
              <div key={s.area} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{s.name}</div>
                <div className="text-sm text-gray-500 mb-1">{s.area}</div>
                <div className="text-xs text-gray-400 mb-4">Kirim: {s.schedule}</div>
                <a
                  href={`https://wa.me/${s.phone}?text=${encodeURIComponent("Halo " + s.name + ", saya mau daftar jadi mitra.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition"
                >
                  <Phone className="w-4 h-4" /> Chat {s.name}
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/area" className="text-emerald-700 font-medium hover:underline inline-flex items-center gap-1">
              Lihat Detail Area &amp; Jadwal Kiriman <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
