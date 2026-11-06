"use client";
import { useEffect, useMemo, useState } from "react";
import { m } from "motion/react";
import { Search, Package, Download } from "lucide-react";
import ProductGallery from "@/components/ui/ProductGallery";
import { TabSwitcher, TabPanel, useTabs } from "@/components/ui/TabSwitcher";
import { TableSkeleton } from "@/components/ui/Skeleton";
import WaveDivider from "@/components/motion/WaveDivider";
import { Reveal } from "@/components/motion/Reveal";
import { ease } from "@/lib/motion";
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

/* ─── Gambar untuk PDF ───
 * jsPDF tidak bisa memakai elemen <img> langsung (ia mencoba XHR sinkron dan
 * gagal), jadi gambar diambil sebagai data URL lalu ditempel ke PDF.
 */
type PdfImage = {
  dataUrl: string;
  format: "PNG" | "JPEG" | "WEBP";
  width: number;
  height: number;
};

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gambar gagal dimuat: ${src}`));
    img.src = src;
  });
}

/** Ambil gambar dari /public apa adanya — dipakai untuk logo kop surat. */
async function fetchPdfImage(src: string): Promise<PdfImage | null> {
  try {
    const res = await fetch(src, { cache: "force-cache" });
    if (!res.ok) return null;

    const blob = await res.blob();
    const format: PdfImage["format"] = blob.type.includes("jpeg")
      ? "JPEG"
      : blob.type.includes("webp")
        ? "WEBP"
        : "PNG";

    const dataUrl = await blobToDataUrl(blob);
    const img = await loadImageElement(dataUrl);
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;
    if (!width || !height) return null;

    return { dataUrl, format, width, height };
  } catch {
    return null;
  }
}

/** Logo brand diperkecil dulu (tinggi maks 48 px) supaya PDF tidak membengkak. */
async function fetchSmallLogo(
  src: string,
  targetHeight = 48
): Promise<PdfImage | null> {
  try {
    const res = await fetch(src, { cache: "force-cache" });
    if (!res.ok) return null;

    const blob = await res.blob();
    const original = await loadImageElement(await blobToDataUrl(blob));
    const srcWidth = original.naturalWidth || original.width;
    const srcHeight = original.naturalHeight || original.height;
    if (!srcWidth || !srcHeight) return null;

    const scale = Math.min(1, targetHeight / srcHeight);
    const width = Math.max(1, Math.round(srcWidth * scale));
    const height = Math.max(1, Math.round(srcHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return fetchPdfImage(src);

    ctx.drawImage(original, 0, 0, width, height);
    return {
      dataUrl: canvas.toDataURL("image/png"),
      format: "PNG",
      width,
      height,
    };
  } catch {
    return null;
  }
}

const loadPdfLogo = () => fetchPdfImage("/logo.png");

/** Kumpulkan logo semua brand yang muncul di PDF — sekali per brand. */
async function loadBrandLogoMap(
  brands: string[]
): Promise<Map<string, PdfImage>> {
  const unique = Array.from(
    new Set(brands.map((b) => (b || "").trim()).filter(Boolean))
  );

  const entries = await Promise.all(
    unique.map(async (brand) => {
      const src = getBrandLogo(brand);
      if (!src) return null;
      const image = await fetchSmallLogo(src);
      return image ? ([brand, image] as const) : null;
    })
  );

  const map = new Map<string, PdfImage>();
  for (const entry of entries) if (entry) map.set(entry[0], entry[1]);
  return map;
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
  const logo = await loadPdfLogo();
  if (logo) {
    try {
      /* Logo diskalakan proporsional di dalam kotak 18 × 18 mm */
      const boxSize = 18;
      const ratio = logo.width / logo.height;
      const drawWidth = ratio >= 1 ? boxSize : boxSize * ratio;
      const drawHeight = ratio >= 1 ? boxSize / ratio : boxSize;

      doc.addImage(
        logo.dataUrl,
        logo.format,
        marginX + (boxSize - drawWidth) / 2,
        8 + (boxSize - drawHeight) / 2,
        drawWidth,
        drawHeight,
        "pmd-logo",
        "FAST"
      );
    } catch {
      /* logo gagal ditempel → PDF tetap dibuat */
    }
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

  /* ── Logo brand untuk baris tabel (diambil sekali per brand) ── */
  const brandLogoMap = await loadBrandLogoMap(products.map((p) => p.brand));

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
      head: [
        ["No", "Logo", "Brand", "Nama Produk", "Varian", "Harga", "Keterangan"],
      ],
      body: items.map((p, i) => [
        String(i + 1),
        "",
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
        minCellHeight: 7.5,
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
        1: { cellWidth: 14, halign: "center" },
        2: { cellWidth: 30 },
        3: { cellWidth: 44 },
        4: { cellWidth: 28 },
        5: {
          cellWidth: 26,
          halign: "right",
          fontStyle: "bold",
          textColor: [5, 120, 85],
        },
        6: { cellWidth: 40 },
      },
      /* Logo brand digambar di dalam sel kolom "Logo" */
      didDrawCell: (data) => {
        if (data.section !== "body" || data.column.index !== 1) return;

        const item = items[data.row.index];
        const image = item ? brandLogoMap.get((item.brand || "").trim()) : null;
        if (!image) return;

        const padX = 1.2;
        const padY = 0.8;
        const ratio = Math.min(
          (data.cell.width - padX * 2) / image.width,
          (data.cell.height - padY * 2) / image.height
        );
        if (!Number.isFinite(ratio) || ratio <= 0) return;

        const drawWidth = image.width * ratio;
        const drawHeight = image.height * ratio;

        try {
          doc.addImage(
            image.dataUrl,
            image.format,
            data.cell.x + (data.cell.width - drawWidth) / 2,
            data.cell.y + (data.cell.height - drawHeight) / 2,
            drawWidth,
            drawHeight,
            `brand-${item.brand}`,
            "FAST"
          );
        } catch {
          /* satu logo gagal → baris tetap tampil tanpa logo */
        }
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
  const [selectedBrand, setSelectedBrand] = useState("Semua");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    const cats = products.map((p) => p.cat).filter((c) => c !== "");
    return ["Semua", ...sortCategories([...new Set(cats)])];
  }, [products]);

  const categoryTabs = useMemo(
    () => categories.map((c) => ({ id: c, label: c === "Semua" ? "Semua" : c })),
    [categories]
  );
  const { value: selectedCategory, direction, setValue: setSelectedCategory } = useTabs(categories, "Semua");

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

  return (
    <div className="min-h-screen bg-cream">
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
          <m.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
            className="text-3xl md:text-4xl font-semibold text-white mb-3"
          >
            Produk & Price List
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="text-emerald-100 text-lg max-w-2xl"
          >
            Daftar lengkap produk pakan kucing &amp; anjing yang tersedia. Harga normal
            tercantum — untuk harga grosir, hubungi admin kami.
          </m.p>
        </div>
      </section>
      <WaveDivider from="bg-emerald-700" to="text-cream" />

      {/* ─── Main Content — Side by Side ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ─── KIRI — Galeri foto produk (manual, bisa diunduh) ─── */}
          <div className="lg:w-[42%] lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
            <ProductGallery slides={slides} />

            {/* Info Card */}
            <Reveal className="mt-4 bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
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
            </Reveal>
          </div>

          {/* ─── KANAN — Filter + Product List ─── */}
          <div className="lg:w-[58%]">
            {/* Tab kategori */}
            {!loading && (
              <TabSwitcher
                tabs={categoryTabs}
                value={selectedCategory}
                onChange={setSelectedCategory}
                layoutId="product-category-pill"
                className="mb-4"
              />
            )}

            {/* Filter Bar */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 items-stretch sm:items-center">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 flex-1 min-w-[180px] transition-shadow focus-within:ring-2 focus-within:ring-emerald-400 focus-within:bg-white">
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

              <m.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExport}
                disabled={isExporting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition inline-flex items-center gap-2 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                {isExporting ? "Menyiapkan..." : "Unduh PDF"}
              </m.button>
            </div>

            {/* Count */}
            {loading ? (
              <TableSkeleton rows={8} />
            ) : (
            <>
            <p className="text-sm text-gray-500 mb-4">
              Menampilkan {filteredProducts.length} dari {products.length}{" "}
              produk
            </p>
            <TabPanel id={`${selectedCategory}|${selectedBrand}`} direction={direction}>

            {/* Product List by Category */}
            {groupedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
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
                            <m.tr
                              key={`${cat}-${i}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, ease, delay: Math.min(i, 12) * 0.025 }}
                              className="border-t border-gray-100 align-middle transition-colors even:bg-gray-50/70 hover:bg-emerald-50/60"
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
                            </m.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            )}
            </TabPanel>
            </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
