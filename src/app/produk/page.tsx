"use client";
import { useEffect, useMemo, useState } from "react";
import { m } from "motion/react";
import type { RowInput } from "jspdf-autotable";
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

/* Kelompokkan produk per brand (urutan sesuai kemunculan di spreadsheet).
 * Nomor urut berlanjut sepanjang kategori, bukan diulang di tiap brand. */
function groupByBrand(items: Product[]) {
  const order: string[] = [];
  const map = new Map<string, Product[]>();
  for (const p of items) {
    const brand = (p.brand || "").trim() || "Lainnya";
    if (!map.has(brand)) {
      map.set(brand, []);
      order.push(brand);
    }
    map.get(brand)!.push(p);
  }
  let no = 0;
  return order.map((brand) => ({
    brand,
    items: map.get(brand)!.map((p) => ({ p, no: ++no })),
  }));
}

/* ─── Chip rasa: tampil 4 pertama, sisanya dilipat jadi "+N rasa" ─── */
const MAX_FLAVOR_CHIPS = 4;

function FlavorChips({ flavors }: { flavors: string[] }) {
  const [open, setOpen] = useState(false);
  if (flavors.length === 0) return null;

  const visible = open ? flavors : flavors.slice(0, MAX_FLAVOR_CHIPS);
  const hidden = flavors.length - MAX_FLAVOR_CHIPS;

  return (
    <ul className="mt-1.5 flex flex-wrap gap-1" aria-label="Pilihan rasa">
      {visible.map((flavor) => (
        <li
          key={flavor}
          className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] leading-4 text-gray-600"
        >
          {flavor}
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="rounded-full border border-emerald-200 px-2 py-0.5 text-[11px] font-medium leading-4 text-emerald-700 transition-colors hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-emerald-500"
          >
            {open ? "Ringkas" : `+${hidden} rasa`}
          </button>
        </li>
      )}
    </ul>
  );
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

  /* ── Tabel per kategori ──
   * Brand jadi baris judul (logo + nama) sekali saja, lalu produk di bawahnya.
   * Rasa ditulis kecil di bawah nama produk, jadi kolom Varian yang dulu
   * sempit tidak diperlukan lagi dan tidak ada teks yang bertumpuk. */
  const COL = { no: 8, name: 98, size: 22, note: 34, price: 28 };
  const PAD = 1.6; // padding sel (mm)
  const ROW_MIN = 7.5;
  const BRAND_ROW_H = 8.5;
  const HEAD_H = 7.5;
  const NAME_PT = 7.8;
  const FLAVOR_PT = 6.6;
  const LINE = 0.3528 * 1.15; // mm per pt, termasuk jarak antarbaris
  const tableTop = 18;
  const pageLimit = pageHeight - bottomSafe;

  type PdfRow =
    | { kind: "brand"; brand: string }
    | {
        kind: "item";
        product: Product;
        no: number;
        nameLines: string[];
        flavorLines: string[];
        height: number;
      };

  const textWidth = COL.name - PAD * 2;

  type PdfItemRow = Extract<PdfRow, { kind: "item" }>;

  const measureItem = (p: Product, no: number): PdfItemRow => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(NAME_PT);
    const nameLines: string[] = doc
      .splitTextToSize(p.name || "-", textWidth)
      .slice(0, 2);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(FLAVOR_PT);
    const flavorLines: string[] = p.flavors.length
      ? doc.splitTextToSize(p.flavors.join(", "), textWidth)
      : [];

    const content =
      nameLines.length * NAME_PT * LINE +
      (flavorLines.length ? 0.5 + flavorLines.length * FLAVOR_PT * LINE : 0);
    return {
      kind: "item",
      product: p,
      no,
      nameLines,
      flavorLines,
      height: Math.max(ROW_MIN, content + PAD * 2),
    };
  };

  categories.forEach((cat) => {
    const items = grouped[cat];

    /* Ukur semua baris dulu. Judul kategori hanya digambar kalau di halaman
     * itu masih muat: judul + judul kolom + brand pertama + produk pertamanya.
     * SAFETY menutup selisih kecil antara perkiraan dan hasil autoTable. */
    const SAFETY = 6;
    const groups = groupByBrand(items).map((g) => ({
      brand: g.brand,
      rows: g.items.map(({ p, no }) => measureItem(p, no)),
    }));

    const firstNeed = 6 + 2.5 + HEAD_H + BRAND_ROW_H + groups[0].rows[0].height;
    if (cursorY + firstNeed + SAFETY > pageLimit) {
      doc.addPage();
      cursorY = tableTop;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(5, 120, 85);
    doc.text(`${cat} (${items.length} produk)`, marginX, cursorY);

    /* Susun baris + perkirakan posisi vertikal supaya judul brand tidak
     * tertinggal sendirian di dasar halaman: kalau brand beserta satu
     * produk pertamanya tidak muat, tabel dilanjutkan di halaman baru. */
    const segments: PdfRow[][] = [[]];
    let simY = cursorY + 2.5 + HEAD_H;

    for (const group of groups) {
      const firstHeight = group.rows[0].height;

      if (simY + BRAND_ROW_H + firstHeight + SAFETY > pageLimit) {
        if (segments[segments.length - 1].length > 0) segments.push([]);
        simY = tableTop + HEAD_H;
      }

      const current = segments[segments.length - 1];
      current.push({ kind: "brand", brand: group.brand });
      simY += BRAND_ROW_H;

      for (const row of group.rows) {
        if (simY + row.height > pageLimit) simY = tableTop + HEAD_H; // autoTable pindah halaman
        current.push(row);
        simY += row.height;
      }
    }

    segments.forEach((rows, segIndex) => {
      if (rows.length === 0) return;

      let startY = cursorY + 2.5;
      if (segIndex > 0) {
        doc.addPage();
        startY = tableTop;
      }

      const body: RowInput[] = rows.map((row) => {
        if (row.kind === "brand") {
          return [
            {
              content: row.brand,
              colSpan: 5,
              styles: {
                fillColor: [232, 245, 240],
                textColor: [4, 95, 70],
                fontStyle: "bold",
                fontSize: 8.5,
                halign: "left",
                minCellHeight: BRAND_ROW_H,
                /* ruang di kiri hanya disisakan kalau brand punya logo */
                cellPadding: {
                  top: PAD,
                  bottom: PAD,
                  left: brandLogoMap.has(row.brand) ? 12 : 3,
                  right: 2,
                },
              },
            },
          ];
        }
        const p = row.product;
        const tall = { minCellHeight: row.height };
        return [
          { content: String(row.no), styles: tall },
          { content: "", styles: tall }, // nama + rasa digambar manual di bawah
          { content: p.size || "-", styles: tall },
          { content: p.pack, styles: tall },
          {
            content: p.price > 0 ? formatRupiahPlain(p.price) : "Hubungi Admin",
            styles: tall,
          },
        ];
      });

      autoTable(doc, {
        startY,
        head: [["No", "Produk", "Ukuran", "Keterangan", "Harga"]],
        body,
        theme: "grid",
        rowPageBreak: "avoid",
        margin: { top: tableTop, right: marginX, bottom: bottomSafe, left: marginX },
        styles: {
          font: "helvetica",
          fontSize: 7.5,
          cellPadding: PAD,
          minCellHeight: ROW_MIN,
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
          minCellHeight: HEAD_H,
        },
        columnStyles: {
          0: { cellWidth: COL.no, halign: "center", textColor: [150, 150, 150] },
          1: { cellWidth: COL.name },
          2: { cellWidth: COL.size, fontStyle: "bold" },
          3: { cellWidth: COL.note, fontSize: 7, textColor: [90, 90, 90] },
          4: {
            cellWidth: COL.price,
            halign: "right",
            fontStyle: "bold",
            textColor: [5, 120, 85],
          },
        },
        didParseCell: (data) => {
          if (data.section === "head" && data.column.index === 4) {
            data.cell.styles.halign = "right";
          }
        },
        didDrawCell: (data) => {
          if (data.section !== "body") return;
          const row = rows[data.row.index];
          if (!row) return;

          /* Baris judul brand → logo kecil di kiri */
          if (row.kind === "brand") {
            const image = brandLogoMap.get(row.brand);
            if (!image) return;

            const boxW = 8;
            const boxH = BRAND_ROW_H - 2;
            const ratio = Math.min(boxW / image.width, boxH / image.height);
            if (!Number.isFinite(ratio) || ratio <= 0) return;

            const w = image.width * ratio;
            const h = image.height * ratio;
            try {
              doc.addImage(
                image.dataUrl,
                image.format,
                data.cell.x + 2 + (boxW - w) / 2,
                data.cell.y + (data.cell.height - h) / 2,
                w,
                h,
                `brand-${row.brand}`,
                "FAST"
              );
            } catch {
              /* satu logo gagal → judul brand tetap tampil tanpa logo */
            }
            return;
          }

          /* Kolom Produk → nama tebal + rasa abu-abu kecil di bawahnya */
          if (data.column.index !== 1) return;

          const content =
            row.nameLines.length * NAME_PT * LINE +
            (row.flavorLines.length
              ? 0.5 + row.flavorLines.length * FLAVOR_PT * LINE
              : 0);
          const x = data.cell.x + PAD;
          let y = data.cell.y + (data.cell.height - content) / 2;

          doc.setFont("helvetica", "bold");
          doc.setFontSize(NAME_PT);
          doc.setTextColor(30, 30, 30);
          for (const line of row.nameLines) {
            doc.text(line, x, y, { baseline: "top" });
            y += NAME_PT * LINE;
          }

          if (row.flavorLines.length) {
            y += 0.5;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(FLAVOR_PT);
            doc.setTextColor(115, 115, 115);
            for (const line of row.flavorLines) {
              doc.text(line, x, y, { baseline: "top" });
              y += FLAVOR_PT * LINE;
            }
          }
        },
      });

      const lastTable = (
        doc as unknown as { lastAutoTable?: { finalY?: number } }
      ).lastAutoTable;
      cursorY = (lastTable?.finalY ?? startY) + 9;
    });
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

                  <div
                    role="table"
                    aria-label={cat}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    {/* Judul kolom — disembunyikan di HP, tiap baris jadi kartu */}
                    <div
                      role="row"
                      className="hidden sm:grid grid-cols-[2.5rem_minmax(0,1fr)_7.5rem_8.5rem] items-center gap-x-3 bg-emerald-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-emerald-800"
                    >
                      <div role="columnheader" className="text-center">No</div>
                      <div role="columnheader">Produk</div>
                      <div role="columnheader">Ukuran</div>
                      <div role="columnheader" className="text-right">Harga</div>
                    </div>

                    {groupByBrand(items).map(({ brand, items: brandItems }) => (
                      <div role="rowgroup" key={`${cat}-${brand}`}>
                        {/* Brand tampil sekali sebagai judul grup */}
                        <div
                          role="row"
                          className="flex items-center gap-2.5 border-t border-gray-100 bg-emerald-50/60 px-3 sm:px-4 py-2"
                        >
                          <BrandAvatar brand={brand} />
                          <span role="rowheader" className="font-semibold text-gray-800">
                            {brand}
                          </span>
                          <span className="text-xs text-gray-400">
                            {brandItems.length} produk
                          </span>
                        </div>

                        {brandItems.map(({ p, no }, i) => (
                          <m.div
                            role="row"
                            key={`${cat}-${brand}-${no}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease, delay: Math.min(i, 12) * 0.025 }}
                            className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[2.5rem_minmax(0,1fr)_7.5rem_8.5rem] items-center gap-x-3 border-t border-gray-100 px-3 sm:px-4 py-2.5 transition-colors hover:bg-emerald-50/60"
                          >
                            <div
                              role="cell"
                              className="hidden sm:block text-center text-xs text-gray-400 tabular-nums"
                            >
                              {no}
                            </div>

                            <div role="cell" className="min-w-0">
                              <p className="break-words font-medium text-gray-800">
                                {p.name}
                              </p>
                              <FlavorChips flavors={p.flavors} />
                            </div>

                            {/* Ukuran + isi per dus. Di HP pindah ke baris kedua. */}
                            <div
                              role="cell"
                              className="col-start-1 row-start-2 mt-1.5 flex flex-wrap items-center gap-1.5 sm:col-auto sm:row-auto sm:mt-0 sm:flex-col sm:items-start sm:gap-1"
                            >
                              <span className="inline-flex rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                                {p.size || "-"}
                              </span>
                              {p.pack && (
                                <span className="inline-flex rounded-md border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[11px] font-medium text-amber-700">
                                  {p.pack}
                                </span>
                              )}
                            </div>

                            <div
                              role="cell"
                              className={`col-start-2 row-start-1 text-right font-semibold text-emerald-700 sm:col-auto sm:row-auto ${
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
                            </div>
                          </m.div>
                        ))}
                      </div>
                    ))}
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
