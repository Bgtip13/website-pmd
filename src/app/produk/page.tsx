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
  { src: "/product-hero-10.png", alt: "Produk 10" },
  { src: "/product-hero-11.png", alt: "Produk 11" },
  { src: "/product-hero-12.png", alt: "Produk 12" },
  { src: "/product-hero-13.png", alt: "Produk 13" },
  { src: "/product-hero-14.png", alt: "Produk 14" },
  { src: "/product-hero-15.png", alt: "Produk 15" },
  { src: "/product-hero-16.png", alt: "Produk 16" },
  { src: "/product-hero-17.png", alt: "Produk 17" },
  { src: "/product-hero-18.png", alt: "Produk 18" }, 
  { src: "/product-hero-19.png", alt: "Produk 19" },
];

/* ─── Brand Logo Map ─── */
const brandLogos: Record<string, string> = {
  "Amigo": "/logos/amigo.png",
  "Animal & Co": "/logos/animal-co.png",
  "Beauty": "/logos/beauty.png",
  "Dog Choize": "/logos/dog-choize.png",
  "Bio": "/logos/bio.png",
  "Bisgo": "/logos/bisgo.png",
  "Bolt Cat": "/logos/bolt.png",
  "Bolt Dog": "/logos/boltdog.png",
  "BossCat": "/logos/bosscat.png",
  "Bis Go": "/logos/bisgo.png",
  "Canibite": "/logos/canibite.png",
  "Cat Choize": "/logos/cat-choize.png",
  "Cat Republic": "/logos/cat-republic.png",
  "Cattie Care": "/logos/cattie-care.png",
  "Chester": "/logos/chester.png",
  "Cici": "/logos/cici.png",
  "Cleo": "/logos/cleo.png",
  "Coucou": "/logos/coucou.png",
  "Crystal Kitty": "/logos/crystal-kitty.png",
  "Cubnkit": "/logos/cubnkit.png",
  "Cuties": "/logos/cuties.png",
  "Delicia": "/logos/delicia.png",
  "Ecopet": "/logos/ecopet.png",
  "Ecosand": "/logos/ecosand.png",
  "Equilibrio": "/logos/equilibrio.png",
  "Excel": "/logos/excel.png",
  "Felibite": "/logos/felibite.png",
  "Freelac": "/logos/freelac.png",
  "Furlove": "/logos/furlove.png",
  "Growppy": "/logos/growppy.png",
  "Growssy": "/logos/growssy.png",
  "Healthy Cat": "/logos/healthy.png",
  "Ham Meal": "/logos/ham meal.png",
  "Hamsfood": "/logos/hamsfood.png",
  "PF": "/logos/pf.png",
  "Vitaplus": "/logos/vitaplus.png",
  "Diamond": "/logos/diamond.png",
  "Aromatic": "/logos/aromatic.png",
  "Captain Meow": "/logos/captainmeow.png",
  "Catmate": "/logos/catmate.png",
  "Choco": "/logos/choco.png",
  "Flinnie": "/logos/flinnie.png",
  "Holy Cuan": "/logos/holycuan.png",
  "Michio": "/logos/michio.png",
  "Momo": "/logos/momo.png",
  "Natural World": "/logos/naturalworld.png",
  "Optima Prime": "/logos/optimaprime.png",
  "Ocean": "/logos/ocean.png",
  "Life Dog": "logos/lifedog.png",
  "Marble": "/logos/marble.png",
  "Meong": "/logos/meong.png",
  "Unicat": "/logos/unicat.png",
  "Gege": "/logos/gege.png",
  "Hepito": "/logos/hepito.png",
  "Junior": "/logos/junior.png",
  "Kitchen Flavour": "/logos/kitchen-flavour.png",
  "Lezato": "/logos/lezato.png",
  "Liebao": "/logos/liebao.png",
  "Life Cat": "/logos/lifecat.png",
  "Lightning": "/logos/lightning.png",
  "Malco": "/logos/malco.png",
  "Luna": "/logos/luna.png",
  "Markotop": "/logos/markotop.png",
  "Maxi": "/logos/maxi.png",
  "Me-O": "/logos/meo.png",
  "Maxlife": "/logos/maxlife.png",
  "Misterpuss": "/logos/misterpuss.png",
  "Nice": "/logos/nice.png",
  "Omegga": "/logos/omegga.png",
  "Propet": "/logos/propet.png",
  "Oricat": "/logos/oricat.png",
  "Pakan Koi": "/logos/pakankoi.png",
  "Petopia": "/logos/petopia.png",
  "Profat": "/logos/profat.png",
  "Pussbite": "/logos/pussbite.png",
  "Pro Plan": "/logos/proplan.png",
  "Royal Canin": "/logos/royal-canin.png",
  "Takari": "/logos/Takari.png",
  "Taro": "/logos/taro.png",
  "Toppet": "/logos/toppet.png",
  "Santap": "/logos/santap.png",
  "Whiskas": "/logos/whiskas.png",
  "Topgrowth": "/logos/topgrowth.png",
  "Top": "/logos/TOP.png",
  "Toto": "/logos/TOTO.png",
  "Supercat": "/logos/supercat.png",
  "Universal": "/logos/universal.png",
  "Vital Rabbit": "/logos/vitalrabbit.png",
  "Yummy": "/logos/yummy.png",

    
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

/* ─── PDF Helpers ─── */
const CATEGORY_ORDER = [
  "Dry Food",
  "Wet Food",
  "Snack",
  "Accessories",
  "Litter",
  "Other",
];

function sortCategories(cats: string[]): string[] {
  return [
    ...CATEGORY_ORDER.filter((c) => cats.includes(c)),
    ...cats.filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
  ];
}

/* Rupiah tanpa karakter khusus — aman untuk font helvetica di PDF */
function formatRupiahPlain(price: number): string {
  return "Rp " + price.toLocaleString("id-ID");
}

/* ─── PDF Generator (PDF asli, bukan HTML) ─── */
async function generatePDF(products: Product[]) {
  if (products.length === 0) {
    alert("Tidak ada produk untuk diekspor.");
    return;
  }

  // Library dimuat saat tombol diklik → aman untuk SSR / prerender
  const [{ jsPDF }, { autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 10;
  const bottomSafe = 28;

  /* ── Grouping per kategori ── */
  const grouped: Record<string, Product[]> = {};
  for (const p of products) {
    const cat = (p.cat || "").trim() || "Lainnya";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(p);
  }
  const categories = sortCategories(Object.keys(grouped));

  /* ── Kop surat ── */
  try {
    const logo = new Image();
    logo.src = "/logo.png";
    await logo.decode();
    if (logo.width > 0) {
      doc.addImage(logo, "PNG", marginX, 8, 18, 18);
    }
  } catch {
    /* logo gagal dimuat → PDF tetap dibuat */
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(5, 120, 85);
  doc.text("CV Prima Mandiri Distribusi", marginX + 22, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("Supplier Pakan Hewan Kesayangan Lengkap & Cepat", marginX + 22, 19.5);
  doc.text(
    "Jl. Griya Prima Timur Utara No.521, Klaten, Jawa Tengah 57466",
    marginX + 22,
    24
  );
  doc.text("Email: primamandiridistribusi01@gmail.com", marginX + 22, 28.5);

  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(0.5);
  doc.line(marginX, 33, pageWidth - marginX, 33);

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text(
    "Daftar Harga Normal - Untuk harga grosir silakan hubungi admin kami",
    marginX,
    39
  );

  let cursorY = 46;

  /* ── Tabel per kategori ── */
  categories.forEach((cat) => {
    const items = grouped[cat];

    // Halaman baru kalau sisa ruang tidak cukup untuk judul + beberapa baris
    if (cursorY > pageHeight - bottomSafe - 20) {
      doc.addPage();
      cursorY = 18;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(5, 120, 85);
    doc.text(`${cat} (${items.length} produk)`, marginX, cursorY);

    autoTable(doc, {
      startY: cursorY + 2.5,
      head: [["No", "Brand", "Nama Produk", "Varian", "Harga", "Keterangan"]],
      body: items.map((p, i) => [
        String(i + 1),
        p.brand || "-",
        p.name || "-",
        p.variant || "-",
        p.price > 0 ? formatRupiahPlain(p.price) : "Hubungi Admin",
        p.keterangan || "-",
      ]),
      theme: "grid",
      margin: { top: 18, right: marginX, bottom: bottomSafe, left: marginX },
      styles: {
        font: "helvetica",
        fontSize: 7.5,
        cellPadding: 1.6,
        overflow: "linebreak",
        valign: "middle",
        textColor: [40, 40, 40],
        lineColor: [225, 232, 229],
        lineWidth: 0.15,
      },
      headStyles: {
        fillColor: [5, 150, 105],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 7.5,
        halign: "left",
      },
      alternateRowStyles: { fillColor: [246, 251, 249] },
      columnStyles: {
        0: { cellWidth: 8, halign: "center" },
        1: { cellWidth: 26 },
        2: { cellWidth: 50 },
        3: { cellWidth: 30 },
        4: {
          cellWidth: 26,
          halign: "right",
          fontStyle: "bold",
          textColor: [5, 120, 85],
        },
        5: { cellWidth: 40 },
      },
    });

    const lastTable = (
      doc as unknown as { lastAutoTable?: { finalY?: number } }
    ).lastAutoTable;
    cursorY = (lastTable?.finalY ?? cursorY) + 9;
  });

  /* ── Footer + nomor halaman di semua halaman ── */
  const totalPages = doc.getNumberOfPages();

  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);

    doc.setDrawColor(220, 227, 224);
    doc.setLineWidth(0.2);
    doc.line(marginX, pageHeight - 20, pageWidth - marginX, pageHeight - 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(5, 120, 85);
    doc.text("Untuk harga grosir, silakan hubungi admin kami:", marginX, pageHeight - 15.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(110, 110, 110);
    doc.text(
      "Supervisor Sales 08212256908 | Solo: Adelia 082342931570 | DIY: April 082323352405 | Semarang: Fitri 082323209960",
      marginX,
      pageHeight - 11.5
    );

    doc.text("CV Prima Mandiri Distribusi", marginX, pageHeight - 6.5);
    doc.text(
      `Halaman ${page} dari ${totalPages}`,
      pageWidth - marginX,
      pageHeight - 6.5,
      { align: "right" }
    );
  }

  /* ── Unduh ── */
  const today = new Date().toISOString().slice(0, 10);
  doc.save(`Price-List-PMD-${today}.pdf`);
}

/* ─── Main Page ─── */
export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedBrand, setSelectedBrand] = useState("Semua");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

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
    const allCats = Object.keys(grouped);
    const sorted = sortCategories(allCats);
    return sorted.map((cat) => ({ cat, items: grouped[cat] }));
  }, [filteredProducts]);

  async function handleExport() {
    setIsExporting(true);
    try {
      await generatePDF(filteredProducts);
    } catch (err) {
      console.error("Gagal membuat PDF:", err);
      alert("Gagal membuat PDF. Coba lagi atau hubungi developer.");
    } finally {
      setIsExporting(false);
    }
  }

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
              <div className="relative w-full">
                {slides.map((slide, i) => (
                  <div
                    key={i}
                    className={`transition-opacity duration-1000 ${
                      i === currentSlide
                        ? "opacity-100 relative"
                        : "opacity-0 absolute inset-0"
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
                  setCurrentSlide(
                    (prev) => (prev - 1 + slides.length) % slides.length
                  )
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
                onClick={handleExport}
                disabled={isExporting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition inline-flex items-center gap-2 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                {isExporting ? "Menyiapkan..." : "Unduh PDF"}
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
                            <th className="py-3 px-4 text-left">Nama Produk</th>
                            <th className="py-3 px-4 text-left">Varian</th>
                            <th className="py-3 px-4 text-right">Harga</th>
                            <th className="py-3 px-4 text-left">Keterangan</th>
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
                                  <span className="font-medium">{p.brand}</span>
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
