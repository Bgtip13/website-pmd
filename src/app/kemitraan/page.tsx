"use client";
import { Phone, CheckCircle, Users, Star, ArrowRight, Shield, Truck, Clock } from "lucide-react";
import Link from "next/link";

const benefits = [
  { icon: <Truck className="w-6 h-6" />, title: "Gratis Ongkir", desc: "Pengiriman gratis ke seluruh wilayah cakupan tanpa minimum order." },
  { icon: <Shield className="w-6 h-6" />, title: "Harga Bersaing", desc: "Harga grosir khusus mitra dengan margin keuntungan menarik." },
  { icon: <Clock className="w-6 h-6" />, title: "Pengiriman Rutin", desc: "Jadwal pengiriman tetap sesuai area layanan." },
  { icon: <Users className="w-6 h-6" />, title: "Dedicated Sales", desc: "Admin sales khusus untuk setiap wilayah." },
];

const steps = [
  { step: 1, title: "Hubungi Admin", desc: "Chat sales kami sesuai wilayah untuk info harga dan katalog." },
  { step: 2, title: "Daftar & Verifikasi", desc: "Kirim data toko: nama, alamat, dan nomor HP. Proses kurang dari 5 menit." },
  { step: 3, title: "Pesan & Terima", desc: "Pesan sesuai kebutuhan, kami kirim sesuai jadwal rute." },
];

export default function KemitraanPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-emerald-700">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/cat-pattern.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Kemitraan</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">Bergabung menjadi mitra kami dan nikmati keuntungan sebagai reseller pakan kucing terpercaya.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Keuntungan Mitra</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50 hover:shadow-lg transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Cara Bergabung</h2>
          <div className="space-y-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/cat-pattern.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Tertarik Menjadi Mitra?</h2>
          <p className="text-emerald-100 text-lg mb-8">Hubungi sales kami sesuai wilayah untuk memulai kerjasama.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/6282342931570?text=Halo%20Kak%2C%20saya%20mau%20daftar%20jadi%20mitra" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              Solo — Adelia
            </a>
            <a href="https://wa.me/628232352405?text=Halo%20Kak%2C%20saya%20mau%20daftar%20jadi%20mitra" target="_blank" rel="noopener noreferrer" className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              DIY — April
            </a>
            <a href="https://wa.me/6282323209960?text=Halo%20Kak%2C%20saya%20mau%20daftar%20jadi%20mitra" target="_blank" rel="noopener noreferrer" className="bg-white text-violet-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition inline-flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.162 2.099.163.185.368.417.552.594.185.177.408.311.668.395.26.084.487.06.67-.142.183-.202.764-.867.916-1.02.152-.152.27-.127.41.052.14.18.596 1.024.7 1.213.103.189.173.384.07.582-.103.198-.375.424-.53.554zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.855L.057 24l6.305-1.654A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              Semarang — Fitri
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
