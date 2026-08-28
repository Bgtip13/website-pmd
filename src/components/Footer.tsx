import Link from "next/link";
import { MapPin, Mail, Clock, Phone } from "lucide-react";

const areas = [
  {
    name: "Solo Raya",
    sales: "Adelia",
    phone: "6282342931570",
    schedule: "Senin & Kamis",
  },
  {
    name: "DIY & Sekitarnya",
    sales: "April",
    phone: "6282323352405",
    schedule: "Selasa & Jumat",
  },
  {
    name: "Semarang & Sekitarnya",
    sales: "Fitri",
    phone: "6282323209960",
    schedule: "Rabu & Sabtu",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-lg object-contain" />
              <div>
                <p className="font-bold text-white text-sm">Prima Mandiri Distribusi</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">CV Prima Mandiri</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Supplier pakan hewan kesayangan lengkap & cepat. Melayani Solo Raya, DIY & Semarang.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>0821-2256-908 (Supervisor)</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>primamandiridistribusi01@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>Klaten, Jawa Tengah</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                <span>Senin — Sabtu 08.00 — 16.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition">Beranda</Link></li>
              <li><Link href="/produk" className="hover:text-emerald-400 transition">Produk & Harga</Link></li>
              <li><Link href="/area" className="hover:text-emerald-400 transition">Area Layanan</Link></li>
              <li><Link href="/kemitraan" className="hover:text-emerald-400 transition">Kemitraan</Link></li>
              <li><Link href="/kontak" className="hover:text-emerald-400 transition">Kontak</Link></li>
            </ul>
          </div>

          {/* Sales WhatsApp */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Sales WhatsApp</h4>
            <div className="grid sm:grid-cols-3 gap-3">
              {areas.map((a) => (
                <a
                  key={a.phone}
                  href={`https://wa.me/${a.phone}?text=Halo%20Kak%20${a.sales}%2C%20saya%20mau%20tanya%20produk%20pakan%20kucing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 border border-gray-700 hover:border-emerald-500/50 transition group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-400">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <p className="font-semibold text-white text-sm group-hover:text-emerald-400 transition">{a.sales}</p>
                  </div>
                  <p className="text-xs text-gray-400">{a.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{a.schedule}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} CV Prima Mandiri Distribusi. All rights reserved.</p>
          <p>Jl. Griya Prima Timur utara No.521, Klaten Utara, Klaten, Jawa Tengah 57466</p>
        </div>
      </div>
    </footer>
  );
}
