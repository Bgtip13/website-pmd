"use client";
import { useEffect, useState, useMemo } from "react";
import { Search, Package, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchProducts, formatRupiah, Product } from "@/lib/fetchProducts";

/* ─── Slideshow Data ─── */
const slides = [
  { src: "/product-hero-1.png", alt: "Produk 1" },
  { src: "/product-hero-2.png", alt: "Produk 2" },
  { src: "/product-hero-3.png", alt: "Produk 3" },
  { src: "/product-hero-4.png", alt: "Produk 4" },
  { src: "/product-hero-5.png", alt: "Produk 5" },
  { src: "/product-hero-6.png", alt: "Produk 6" },
  { src: "/product-hero-7.png", alt: "Produk 7" },
  { src: "/product-hero-8.png", alt: "Produk 8" },
  { src: "/product-hero-9.png", alt: "Produk 9" },
];

/* ─── Brand Logo Map ─── */
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

/* ─── Brand Avatar Component ─── */
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
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${colors[idx]}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={brand}
      className="w-8 h-8 rounded-lg object-contain shrink-0"
      onError={() => setError(true)}
    />
  );
}

/* ─── PDF Generator ─── */
function generatePDF(products: Product[]) {
  const grouped: Record<string, Product[]> = {};
  products.forEach((p) => {
    if (!grouped[p.cat]) grouped[p.cat] = [];
    grouped[p.cat].push(p);
  });

  let html = `
    <html><head><meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; color: #111; }
      h1 { color: #059669; text-align: center; margin-bottom: 5px; }
      h2 { color: #059669; border-bottom: 2px solid #059669; padding-bottom: 4px; margin-top: 30px; }
      .info { text-align: center; color: #666; margin-bottom: 20px; font-size: 12px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 11px; }
      th { background: #059669; color: white; padding: 8px 6px; text-align: left; }
      td { padding: 7px 6px; border-bottom: 1px solid #e5e7eb; }
      tr:nth-child(even) { background: #f9fafb; }
      .price { font-weight: bold; color: #059669; }
      .contact { text-align: center; margin-top: 30px; padding: 15px; background: #f0fdf4; border-radius: 8px; font-size: 11px; }
    </style></head><body>
    <h1>CV Prima Mandiri Distribusi</h1>
    <div class="info">Supplier Pakan Hewan Kesayangan Lengkap & Cepat<br>Jl. Griya Prima Timur utara No.521, Klaten, Jawa Tengah<br>Email: primamandiridistribusi01@gmail.com</div>
  `;

  const catOrder = ["Dry Food", "Wet Food", "Snack", "Accessories", "Litter", "Other"];
  const allCats = Object.keys(grouped);
  const sortedCats = [
    ...catOrder.filter((c) => allCats.includes(c)),
    ...allCats.filter((c) => !catOrder.includes(c)).sort(),
  ];

  sortedCats.forEach((cat) => {
    const items = grouped[cat];
    html += `<h2>${cat} (${items.length} produk)</h2>`;
    html += `<table><tr><th>No</th><th>Brand</th><th>Nama Produk</th><th>Varian</th><th>Harga</th><th>Keterangan</th></tr>`;
    items.forEach((p, i) => {
      const priceStr = p.price > 0 ? formatRupiah(p.price) : "Hubungi Admin";
      html += `<tr><td>${i + 1}</td><td>${p.brand}</td><td>${p.name}</td><td>${p.variant}</td><td class="price">${priceStr}</td><td>${p.keterangan}</td></tr>`;
    });
    html += `</table>`;
  });

  html += `
    <div class="contact">
      <strong>Untuk harga grosir, silakan hubungi admin:</strong><br>
      Supervisor Sales: 08212256908<br>
      Solo: Adelia (082342931570) | DIY: April (082323352405) | Semarang: Fitri (082323209960)
    </div>
    </body></html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Price-List-Prima-Mandiri-Distribusi.html";
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── Main Page ─── */
export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedBrand, setSelectedBrand] = useState("Semua");
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const categories = useMemo(() => {
    const cats = products.map((p) => p.cat).filter((c) => c !== "");
    return ["Semua", ...[...new Set(cats)].sort()];
  }, [products]);

  const brands = useMemo(() => {
    const brs = products.map((p) => p.brand).filter((b) => b !== "");
    return ["Semua", ...[...new Set(brs)].sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "Semua") {
      result = result.filter(
        (p) => p.cat.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
      );
    }

    if (selectedBrand !== "Semua") {
      result = result.filter(
        (p) => p.brand.toLowerCase().trim() === selectedBrand.toLowerCase().trim()
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

  const groupedProducts = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    filteredProducts.forEach((p) => {
      if (!grouped[p.cat]) grouped[p.cat] = [];
      grouped[p.cat].push(p);
    });
    const catOrder = ["Dry Food", "Wet Food", "Snack", "Accessories", "Litter", "Other"];
    const allCats = Object.keys(grouped);
    const sorted = [
      ...catOrder.filter((c) => allCats.includes(c)),
      ...allCats.filter((c) => !catOrder.includes(c)).sort(),
    ];
    return sorted.map((cat) => ({ cat, items: grouped[cat] }));
  }, [filteredProducts]);

  /* ─── Loading State ─── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Memuat produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Header Section ─── */}
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
            Daftar lengkap produk pakan kucing yang tersedia. Harga normal
            tercantum — untuk harga grosir, hubungi admin kami.
          </p>
        </div>
      </section>

      {/* ─── Main Content — Side by Side ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
         {/* ─── KIRI — Slideshow (Sticky) ─── */}
<div className="lg:w-[40%] lg:sticky lg:top-24 lg:self-start">
  <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100">
    {/* Container dengan tinggi fleksibel */}
    <div className="relative w-full">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`transition-opacity duration-1000 ${
            i === currentSlide ? "opacity-100 relative" : "opacity-0 absolute inset-0"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-auto object-contain"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>

    {/* Dot indicator */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 rounded-full px-3 py-1.5">
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

    {/* Prev / Next */}
    <button
      onClick={() =>
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      }
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
    >
      <ChevronLeft size={20} />
    </button>
    <button
      onClick={() =>
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
    >
      <ChevronRight size={20} />
    </button>
  </div>

  {/* Info Card */}
  <div className="mt-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
      <Package size={18} className="text-emerald-600" />
      Informasi Produk
    </h3>
    <ul className="space-y-2 text-sm text-gray-600">
      <li className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
        Harga yang tercantum adalah harga normal
      </li>
      <li className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
        Untuk harga grosir, silakan chat admin langsung
      </li>
      <li className="flex items-start gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
        Stok dan harga dapat berubah sewaktu-waktu
      </li>
    </ul>
  </div>
</div>


          {/* ─── KANAN — Filter + Product List ─── */}
          <div className="lg:w-[60%]">
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 flex-1">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari produk, brand, varian..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer"
              >
                {[...new Set(categories)].map((c, i) => (
                  <option key={`cat-${i}`} value={c}>
                    {c === "Semua" ? "Semua Kategori" : c}
                  </option>
                ))}
              </select>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer"
              >
                {[...new Set(brands)].map((b, i) => (
                  <option key={`brand-${i}`} value={b}>
                    {b === "Semua" ? "Semua Brand" : b}
                  </option>
                ))}
              </select>

              <button
                onClick={() => generatePDF(filteredProducts)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition inline-flex items-center gap-2 whitespace-nowrap"
              >
                <Download size={16} /> Unduh PDF
              </button>
            </div>

            {/* Count */}
            <p className="text-sm text-gray-500 mb-4">
              Menampilkan {filteredProducts.length} dari {products.length}{" "}
              produk
            </p>

            {/* Product List by Category */}
            {groupedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <Package size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Tidak ada produk ditemukan
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Coba ubah filter atau kata kunci pencarian
                </p>
              </div>
            ) : (
              groupedProducts.map(({ cat, items }) => (
                <div key={cat} className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full" />
                    {cat}
                    <span className="text-sm font-normal text-gray-400">
                      ({items.length} produk)
                    </span>
                  </h3>

                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-emerald-50 text-emerald-800">
                            <th className="py-3 px-4 text-left w-10">No</th>
                            <th className="py-3 px-4 text-left">Brand</th>
                            <th className="py-3 px-4 text-left">
                              Nama Produk
                            </th>
                            <th className="py-3 px-4 text-left">Varian</th>
                            <th className="py-3 px-4 text-right">Harga</th>
                            <th className="py-3 px-4 text-left">
                              Keterangan
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((p, i) => (
                            <tr
                              key={`${cat}-${i}`}
                              className="border-t border-gray-100 hover:bg-gray-50 transition"
                            >
                              <td className="py-3 px-4 text-gray-400">
                                {i + 1}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <BrandAvatar brand={p.brand} />
                                  <span className="font-medium">
                                    {p.brand}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{p.name}</td>
                              <td className="py-3 px-4 text-gray-500">
                                {p.variant}
                              </td>
                              <td className="py-3 px-4 text-right font-semibold text-emerald-700">
                                {p.price > 0 ? (
                                  formatRupiah(p.price)
                                ) : (
                                  <span className="text-amber-600 font-normal text-xs">
                                    Hubungi Admin
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-gray-500 text-xs">
                                {p.keterangan}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
