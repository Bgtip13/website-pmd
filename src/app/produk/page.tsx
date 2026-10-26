"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Package, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchProducts, formatRupiah, Product } from "@/lib/fetchProducts";
import media from "@/lib/media.generated.json";

/* ─── Galeri foto ───
 * Daftar foto dan thumbnail dibuat otomatis dari isi folder public/,
 * lihat scripts/generate-media-manifest.mjs.
 * Tambah foto baru: upload ke public/gallery/ — tidak perlu ubah kode.
 */
const slides = media.slides;
const autoBrandLogos: Record<string, string> = media.brandLogos;

/* ─── Brand Logo Map (cadangan untuk nama file yang tidak sama dengan nama brand) ─── */
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

/* "Me-O" & "meo.png" → "meo"; "Kitchen Flavour" & "kitchen-flavour.png" → "kitchenflavour" */
function brandKey(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "")
    .toLowerCase();
}

function getBrandLogo(brand: string): string | null {
  /* Logo otomatis: cukup upload file ke public/logos/ dengan nama sesuai brand */
  const auto = autoBrandLogos[brandKey(brand)];
  if (auto) return auto;

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
        className={`w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${colors[idx]}`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={brand}
      className="w-7 h-7 rounded-md object-contain shrink-0"
      onError={() => setError(true)}
    />
  );
}

/* ─── Urutan kategori sesuai permintaan ─── */
const CATEGORY_ORDER = [
  "DRYFOOD",
  "DRYFOOD FRESHPACK",
  "WETFOOD CAN",
  "WETFOOD POUCH",
  "SNACK",
  "PASIR",
  "TOFU/WOODPELET",
  "ROYAL CANIN",
  "SUSU",
  "OBAT",
  "AKSESORIS",
  "KANDANG",
  "SHAMPO",
];

/* Alias → kategori baku, karena penulisan di spreadsheet bisa bervariasi */
const CATEGORY_ALIASES: Record<string, string> = {
  "dry food": "DRYFOOD",
  dryfood: "DRYFOOD",
  "dry food freshpack": "DRYFOOD FRESHPACK",
  "dry food fresh pack": "DRYFOOD FRESHPACK",
  "dryfood freshpack": "DRYFOOD FRESHPACK",
  "dryfood fresh pack": "DRYFOOD FRESHPACK",
  "wet food can": "WETFOOD CAN",
  "wetfood can": "WETFOOD CAN",
  "wet food pouch": "WETFOOD POUCH",
  "wetfood pouch": "WETFOOD POUCH",
  snack: "SNACK",
  pasir: "PASIR",
  litter: "PASIR",
  "tofu/woodpelet": "TOFU/WOODPELET",
  "tofu/wood pellet": "TOFU/WOODPELET",
  "tofu / woodpelet": "TOFU/WOODPELET",
  "royal canin": "ROYAL CANIN",
  susu: "SUSU",
  obat: "OBAT",
  aksesoris: "AKSESORIS",
  accessories: "AKSESORIS",
  kandang: "KANDANG",
  shampo: "SHAMPO",
};

function categoryRank(cat: string): number {
  const key = cat.toLowerCase().trim();
  const normalized = CATEGORY_ALIASES[key] ?? key.toUpperCase();
  const index = CATEGORY_ORDER.indexOf(normalized);
  return index === -1 ? CATEGORY_ORDER.length : index;
}

/* Kategori yang tidak terdaftar diletakkan di akhir, urut alfabetis */
function sortCategories(cats: string[]): string[] {
  return [...cats].sort((a, b) => {
    const diff = categoryRank(a) - categoryRank(b);
    return diff !== 0 ? diff : a.localeCompare(b, "id");
  });
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
  const thumbsRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  const activeSlide = slides[currentSlide];
  const activeFileType = activeSlide.src.split(".").pop() ?? "png";

  const goToSlide = (index: number) => {
    setCurrentSlide((index + slides.length) % slides.length);
  };

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  /* Navigasi keyboard ← → (tanpa mengganggu input filter) */
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (event.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (event.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* Preload foto berikutnya agar navigasi terasa ringan */
  useEffect(() => {
    const next = slides[(currentSlide + 1) % slides.length];
    const img = new Image();
    img.src = next.src;
  }, [currentSlide]);

  /* Thumbnail aktif selalu terlihat di strip navigasi */
  useEffect(() => {
    const container = thumbsRef.current;
    const thumb = activeThumbRef.current;
    if (!container || !thumb) return;
    container.scrollTo({
      left:
        thumb.offsetLeft -
        container.clientWidth / 2 +
        thumb.clientWidth / 2,
      behavior: "smooth",
    });
  }, [currentSlide]);

  const categories = useMemo(() => {
    const cats = products.map((p) => p.cat).filter((c) => c !== "");
    return ["Semua", ...sortCategories([...new Set(cats)])];
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
          {/* ─── KIRI — Galeri foto produk (manual, bisa diunduh) ─── */}
          <div className="lg:w-[42%] lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100">
              {/* Header galeri + tombol unduh */}
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-100">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-800">Galeri Produk</p>
                  <p className="text-xs text-gray-500" aria-live="polite">
                    Foto {currentSlide + 1} dari {slides.length}
                  </p>
                </div>
                <a
                  href={activeSlide.src}
                  download={`Produk-PMD-${currentSlide + 1}.${activeFileType}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3 py-2 text-xs font-medium text-white transition shrink-0"
                >
                  <Download size={15} />
                  Unduh Foto
                </a>
              </div>

              {/* Foto utama */}
              <div className="relative bg-gray-50">
                <div className="relative h-[340px] sm:h-[420px] lg:h-[430px]">
                  <img
                    key={activeSlide.src}
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    className="absolute inset-0 h-full w-full object-contain p-4"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => goToSlide(currentSlide - 1)}
                  aria-label="Foto sebelumnya"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-gray-700 shadow-md w-10 h-10 rounded-full flex items-center justify-center transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(currentSlide + 1)}
                  aria-label="Foto berikutnya"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-gray-700 shadow-md w-10 h-10 rounded-full flex items-center justify-center transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Navigasi thumbnail */}
              <div className="border-t border-gray-100 p-3">
                <div
                  ref={thumbsRef}
                  className="relative flex gap-2 overflow-x-auto pb-1"
                >
                  {slides.map((slide, i) => (
                    <button
                      key={slide.thumb}
                      type="button"
                      ref={i === currentSlide ? activeThumbRef : undefined}
                      onClick={() => goToSlide(i)}
                      aria-label={`Tampilkan ${slide.alt}`}
                      aria-current={i === currentSlide}
                      className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-100 transition ${
                        i === currentSlide
                          ? "border-emerald-500 opacity-100"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={slide.thumb}
                        alt=""
                        width={56}
                        height={56}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-gray-400">
                  Pilih thumbnail atau gunakan tombol panah ← → untuk melihat foto
                  lain. Foto dapat diunduh dengan tombol Unduh Foto.
                </p>
              </div>
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
          <div className="lg:w-[58%]">
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 items-stretch sm:items-center">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 flex-1 min-w-[180px]">
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

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[660px] table-fixed text-sm">
                        <colgroup>
                          <col className="w-[6%]" />
                          <col className="w-[26%]" />
                          <col className="w-[24%]" />
                          <col className="w-[14%]" />
                          <col className="w-[16%]" />
                          <col className="w-[14%]" />
                        </colgroup>
                        <thead>
                          <tr className="bg-emerald-50 text-emerald-800">
                            <th className="py-3 px-3 sm:px-4 text-center text-[11px] font-semibold uppercase tracking-wide">
                              No
                            </th>
                            <th className="py-3 px-3 sm:px-4 text-left text-[11px] font-semibold uppercase tracking-wide">
                              Brand
                            </th>
                            <th className="py-3 px-3 sm:px-4 text-left text-[11px] font-semibold uppercase tracking-wide">
                              Nama Produk
                            </th>
                            <th className="py-3 px-3 sm:px-4 text-left text-[11px] font-semibold uppercase tracking-wide">
                              Varian
                            </th>
                            <th className="py-3 px-3 sm:px-4 text-right text-[11px] font-semibold uppercase tracking-wide">
                              Harga
                            </th>
                            <th className="py-3 px-3 sm:px-4 text-left text-[11px] font-semibold uppercase tracking-wide">
                              Keterangan
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((p, i) => (
                            <tr
                              key={`${cat}-${i}`}
                              className="border-t border-gray-100 align-middle transition even:bg-gray-50/70 hover:bg-emerald-50/40"
                            >
                              <td className="py-2.5 px-3 sm:px-4 text-center text-xs text-gray-400 tabular-nums">
                                {i + 1}
                              </td>
                              <td className="py-2.5 px-3 sm:px-4">
                                <div className="flex items-center gap-2 min-w-0">
                                  <BrandAvatar brand={p.brand} />
                                  <span className="break-words font-medium text-gray-800">
                                    {p.brand}
                                  </span>
                                </div>
                              </td>
                              <td className="py-2.5 px-3 sm:px-4 break-words font-medium text-gray-800">
                                {p.name}
                              </td>
                              <td className="py-2.5 px-3 sm:px-4 break-words text-gray-500">
                                {p.variant || "-"}
                              </td>
                              <td
                                className={`py-2.5 px-3 sm:px-4 text-right font-semibold text-emerald-700 ${
                                  p.price > 0
                                    ? "whitespace-nowrap tabular-nums text-[13px]"
                                    : ""
                                }`}
                              >
                                {p.price > 0 ? (
                                  formatRupiah(p.price)
                                ) : (
                                  <span className="text-xs font-medium text-amber-600">
                                    Hubungi Admin
                                  </span>
                                )}
                              </td>
                              <td className="py-2.5 px-3 sm:px-4 text-xs text-gray-500 break-words">
                                {p.keterangan || "-"}
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
