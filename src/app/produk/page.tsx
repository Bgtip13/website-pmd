"use client";
import { useEffect, useState, useMemo } from "react";
import { Search, Package, Download } from "lucide-react";
import { fetchProducts, formatRupiah, Product } from "@/lib/fetchProducts";

/* ─── Sales ─── */
const sales = [
  { area: "Solo", name: "Adelia", phone: "6282342931570", color: "blue" },
  { area: "DIY", name: "April", phone: "628232352405", color: "emerald" },
  { area: "Semarang", name: "Fitri", phone: "6282323209960", color: "violet" },
];

/* ─── Brand logo mapping ─── */
const brandLogos: Record<string, string> = {
  "Amigo": "/logos/amigo.png",
  "Animal & Co": "/logos/animal-co.png",
  "Beauty": "/logos/beauty.png",
  "Beauty Gold": "/logos/beauty.png",
  "Bio Creamy": "/logos/bio-creamy.png",
  "Bolt": "/logos/bolt.png",
  "Bruinger": "/logos/bruinger.png",
  "Canibite": "/logos/canibite.png",
  "Cat Choize": "/logos/cat-choize.png",
  "Cat Republic": "/logos/cat-republic.png",
  "Cattie Care": "/logos/cattie-care.png",
  "Chester": "/logos/chester.png",
  "Cleo": "/logos/cleo.png",
  "Cubnkit": "/logos/cubnkit.png",
  "Cuties": "/logos/cuties.png",
  "Dog Choize": "/logos/dog-choize.png",
  "Equilibrio": "/logos/equilibrio.png",
  "Excel": "/logos/excel.png",
  "Felibite": "/logos/felibite.png",
  "Furlove": "/logos/furlove.png",
  "Healthy Cat": "/logos/healthy-cat.png",
  "Healty Cat": "/logos/healthy-cat.png",
  "Hepito": "/logos/hepito.png",
  "Kitty Food": "/logos/kitty-food.png",
  "Kitchen Flavour": "/logos/kitchen-flavour.png",
  "Lincat": "/logos/lincat.png",
  "Me-O": "/logos/meo.png",
  "Mixshow": "/logos/mixshow.png",
  "Monge": "/logos/monge.png",
  "NutriSource": "/logos/nutrisource.png",
  "ProGold": "/logos/progold.png",
  "Propet": "/logos/propet.png",
  "Pro Plan": "/logos/proplan.png",
  "Royal Canin": "/logos/royal-canin.png",
  "Sanabelle": "/logos/sanabelle.png",
  "Leonardo": "/logos/leonardo.png",
  "Whiskas": "/logos/whiskas.png",
  "Aromatic": "/logos/aromatic.png",
  "Sarjana": "/logos/sarjana.png",
  "Kitty Day": "/logos/kitty-day.png",
};

function getBrandLogo(brand: string): string | null {
  if (brandLogos[brand]) return brandLogos[brand];
  const lower = brand.toLowerCase();
  for (const [key, val] of Object.entries(brandLogos)) {
    if (key.toLowerCase() === lower) return val;
  }
  return null;
}

function BrandAvatar({ brand }: { brand: string }) {
  const [error, setError] = useState(false);
  const logo = getBrandLogo(brand);
  if (!logo || error) {
    const initials = brand
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    const colors = [
      "bg-emerald-100 text-emerald-700",
      "bg-blue-100 text-blue-700",
      "bg-violet-100 text-violet-700",
      "bg-amber-100 text-amber-700",
      "bg-rose-100 text-rose-700",
    ];
    const idx = brand.charCodeAt(0) % colors.length;
    return (
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${colors[idx]}`}
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      src={logo}
      alt={brand}
      className="w-10 h-10 rounded-lg object-contain bg-white border"
      onError={() => setError(true)}
    />
  );
}

/* ─── Product Hero Slides ─── */
const slides = [
  { src: "/product-hero1.jpg" },
  { src: "/product-hero2.jpg" },
  { src: "/product-hero3.jpg" },
  { src: "/product-hero4.jpg" },
  { src: "/product-hero5.jpg" },
  { src: "/product-hero6.jpg" },
];

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedBrand, setSelectedBrand] = useState("Semua");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /* ─── Extract unique categories & brands ─── */
  const categories = useMemo(() => {
    const cats = products.map((p) => p.cat).filter((c) => c !== "");
    return ["Semua", ...Array.from(new Set(cats)).sort()];
  }, [products]);

  const brands = useMemo(() => {
    const brs = products.map((p) => p.brand).filter((b) => b !== "");
    return ["Semua", ...Array.from(new Set(brs)).sort()];
  }, [products]);

  /* ─── Filter logic ─── */
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "Semua") {
      result = result.filter(
        (p) => p.cat.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedBrand !== "Semua") {
      result = result.filter(
        (p) => p.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.variant.toLowerCase().includes(q) ||
          p.cat.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, selectedCategory, selectedBrand, search]);

  /* ─── Group by category ─── */
  const groupedProducts = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    filteredProducts.forEach((p) => {
      const cat = p.cat || "Lainnya";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [filteredProducts]);

  /* ─── PDF Download ─── */
  async function handleDownloadPDF() {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF({ orientation: "landscape" });

    doc.setFontSize(16);
    doc.text("CV Prima Mandiri Distribusi - Daftar Produk & Harga", 14, 20);

    doc.setFontSize(10);
    doc.text(`Filter: Kategori=${selectedCategory}, Brand=${selectedBrand}`, 14, 28);
    doc.text(`Total: ${filteredProducts.length} produk`, 14, 34);

    const tableData = filteredProducts.map((p, i) => [
      String(i + 1),
      p.cat,
      p.brand,
      p.name,
      p.variant,
      p.price > 0 ? formatRupiah(p.price) : "Hubungi Admin",
      p.keterangan,
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["No", "Kategori", "Brand", "Nama Produk", "Varian", "Harga", "Keterangan"]],
      body: tableData,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [5, 150, 105] },
    });

    doc.save("Harga-Produk-PMD.pdf");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-emerald-700">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url('/cat-pattern.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Produk & Price List
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Daftar lengkap produk pakan kucing yang tersedia. Harga normal tercantum
            — untuk harga grosir, hubungi admin kami.
          </p>
        </div>
      </section>

      {/* Slideshow */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative w-full aspect-[16/6] rounded-2xl overflow-hidden shadow-lg">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  i === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.src}
                  alt="Produk Pakan Kucing"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 rounded-full px-3 py-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide ? "bg-white w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none w-full md:w-auto"
          >
            {categories.map((c, i) => (
              <option key={`cat-${i}`} value={c}>
                {c === "Semua" ? "Semua Kategori" : c}
              </option>
            ))}
          </select>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2.5 border rounded-xl text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none w-full md:w-auto"
          >
            {brands.map((b, i) => (
              <option key={`brand-${i}`} value={b}>
                {b === "Semua" ? "Semua Brand" : b}
              </option>
            ))}
          </select>

          {/* Download PDF */}
          <button
            onClick={handleDownloadPDF}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2 transition whitespace-nowrap"
          >
            <Download size={16} /> Unduh PDF
          </button>
        </div>

        {/* Result count */}
        <p className="text-sm text-gray-500 mt-3">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </p>
      </section>

      {/* Product Table grouped by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <Package size={40} className="mx-auto mb-3 animate-pulse text-emerald-500" />
            Memuat data produk...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Package size={40} className="mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium">Produk tidak ditemukan</p>
            <p className="text-sm">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        ) : (
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-10">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-8 bg-emerald-600 rounded-full" />
                <h2 className="text-xl font-bold text-gray-800">{category}</h2>
                <span className="text-sm text-gray-400">({items.length} produk)</span>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-emerald-50 text-emerald-800">
                        <th className="text-left px-4 py-3 font-semibold">No</th>
                        <th className="text-left px-4 py-3 font-semibold">Brand</th>
                        <th className="text-left px-4 py-3 font-semibold">Nama Produk</th>
                        <th className="text-left px-4 py-3 font-semibold">Varian</th>
                        <th className="text-right px-4 py-3 font-semibold">Harga</th>
                        <th className="text-left px-4 py-3 font-semibold">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((p, i) => (
                        <tr
                          key={`${category}-${i}`}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <BrandAvatar brand={p.brand} />
                              <span className="font-medium text-gray-700">{p.brand}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                          <td className="px-4 py-3 text-gray-600">{p.variant}</td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-700">
                            {p.price > 0 ? formatRupiah(p.price) : "Hubungi Admin"}
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{p.keterangan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* CTA Section */}
      <section className="relative bg-emerald-700 py-12">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "url('/cat-pattern.png')",
            backgroundSize: "cover",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Tertarik dengan Harga Grosir?
          </h2>
          <p className="text-emerald-100 mb-6">
            Hubungi admin sales kami untuk mendapatkan harga khusus dan informasi stok terbaru.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {sales.map((s) => (
              <a
                key={s.area}
                href={`https://wa.me/${s.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-3 rounded-xl font-medium inline-flex items-center justify-center gap-2 text-white transition hover:opacity-90 ${
                  s.color === "blue"
                    ? "bg-blue-600"
                    : s.color === "emerald"
                    ? "bg-emerald-600"
                    : "bg-violet-600"
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {s.area} — {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
