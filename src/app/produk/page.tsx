"use client";
import { useEffect, useState, useMemo } from "react";
import { Phone, Search, Package, Filter, ArrowRight, Info, MessageCircle } from "lucide-react";
import Link from "next/link";
import { fetchProducts, formatRupiah, Product } from "@/lib/fetchProducts";

const sales = [
  { area: "Solo", name: "Adelia", phone: "6282342931570", color: "blue" },
  { area: "DIY", name: "April", phone: "6282323352405", color: "emerald" },
  { area: "Semarang", name: "Fitri", phone: "6282323209960", color: "violet" },
];

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.cat)));
    return ["Semua", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCat === "Semua" || p.cat === activeCat;
      const q = search.toLowerCase();
      const matchSearch =
        search === "" ||
        p.brand.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.variant.toLowerCase().includes(q) ||
        p.keterangan.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, search, activeCat]);

  const grouped = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    filtered.forEach((p) => {
      if (!groups[p.brand]) groups[p.brand] = [];
      groups[p.brand].push(p);
    });
    return groups;
  }, [filtered]);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
            <Package className="w-4 h-4" />
            Price List
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Produk & Harga</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Daftar harga jual. Untuk harga grosir, hubungi sales kami sesuai wilayah.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 px-4 bg-gray-50 border-b sticky top-16 z-30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari brand, nama produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  activeCat === cat
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-emerald-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Table */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center py-20 text-gray-400">
              <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Memuat data produk...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>Produk tidak ditemukan.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(grouped).map(([brand, items]) => (
                <div key={brand}>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
                    {brand}
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-emerald-50 text-emerald-800">
                          <th className="text-left px-4 py-3 font-semibold">Nama Produk</th>
                          <th className="text-left px-4 py-3 font-semibold">Varian</th>
                          <th className="text-right px-4 py-3 font-semibold">Harga</th>
                          <th className="text-left px-4 py-3 font-semibold">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((p, i) => (
                          <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition">
                            <td className="px-4 py-3 text-gray-800 font-medium">{p.name}</td>
                            <td className="px-4 py-3 text-gray-600">{p.variant}</td>
                            <td className="px-4 py-3 text-right font-bold text-emerald-700">{formatRupiah(p.price)}</td>
                            <td className="px-4 py-3 text-gray-500 text-xs">
                              {p.keterangan || <span className="text-gray-300">-</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Grosir */}
      <section className="py-12 px-4 bg-gradient-to-br from-emerald-50 to-white border-t">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8">
            <MessageCircle className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Harga Grosir?</h2>
            <p className="text-gray-500 mb-6">
              Hubungi sales kami untuk mendapatkan harga khusus mitra dan grosir.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {sales.map((s) => (
                <a
                  key={s.phone}
                  href={`https://wa.me/${s.phone}?text=Halo%20Kak%20${s.name}%2C%20saya%20mau%20tanya%20harga%20grosir%20produk%20pakan%20kucing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition hover:scale-105 ${
                    s.color === "blue" ? "bg-blue-600 hover:bg-blue-700" :
                    s.color === "emerald" ? "bg-emerald-600 hover:bg-emerald-700" :
                    "bg-violet-600 hover:bg-violet-700"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {s.name} — {s.area}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
