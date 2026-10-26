#!/usr/bin/env node
/**
 * Membuat src/lib/media.generated.json dari isi folder public/.
 *
 * Jadi cukup upload gambar, tidak perlu mengubah kode:
 *   - public/gallery/           → foto tambahan untuk galeri produk
 *   - public/product-hero-*.png → foto galeri lama (tetap didukung)
 *   - public/logos/             → logo brand (dipakai otomatis di tabel produk
 *                                 berdasarkan nama brand dari spreadsheet)
 *
 * Thumbnail WebP kecil dibuat otomatis di public/gallery-thumbs/.
 *
 * Dijalankan otomatis lewat `predev` / `prebuild`, atau manual:
 *   npm run media:sync
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const galleryDir = path.join(publicDir, "gallery");
const thumbDir = path.join(publicDir, "gallery-thumbs");
const logoDir = path.join(publicDir, "logos");
const outFile = path.join(root, "src", "lib", "media.generated.json");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const EXT_PRIORITY = { png: 0, webp: 1, avif: 2, jpg: 3, jpeg: 4 };

const natural = (a, b) => a.localeCompare(b, "id", { numeric: true, sensitivity: "base" });

function imageFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => !file.startsWith(".") && IMAGE_EXT.has(path.extname(file).toLowerCase()))
    .sort(natural);
}

function slug(value) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

/* Kunci logo: "Me-O" & "meo.png" sama-sama menjadi "meo" */
function logoKey(value) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "")
    .toLowerCase();
}

/* ── Foto galeri ── */
/* Foto lama di root: kalau ada .png dan .jpeg dengan nomor sama, pakai .png */
const legacyByNumber = new Map();
for (const file of fs.readdirSync(publicDir)) {
  const match = file.match(/^product-hero-(\d+)\.([a-z0-9]+)$/i);
  if (!match || !IMAGE_EXT.has(path.extname(file).toLowerCase())) continue;
  const id = Number(match[1]);
  const ext = match[2].toLowerCase();
  const current = legacyByNumber.get(id);
  if (!current || EXT_PRIORITY[ext] < EXT_PRIORITY[current.ext]) {
    legacyByNumber.set(id, { file, ext });
  }
}

const sources = [
  ...[...legacyByNumber.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, item]) => ({ abs: path.join(publicDir, item.file), file: item.file, url: `/${item.file}` })),
  ...imageFiles(galleryDir).map((file) => ({
    abs: path.join(galleryDir, file),
    file,
    url: `/gallery/${encodeURIComponent(file)}`,
  })),
];

/* ── Thumbnail ── */
let sharp = null;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.warn("[media] sharp tidak tersedia — thumbnail memakai gambar asli.");
}

fs.mkdirSync(thumbDir, { recursive: true });

const usedThumbNames = new Set();
const slides = [];

for (const [index, source] of sources.entries()) {
  const base = slug(path.basename(source.file, path.extname(source.file))) || `foto-${index + 1}`;
  let thumbName = `${base}.webp`;
  let counter = 2;
  while (usedThumbNames.has(thumbName)) thumbName = `${base}-${counter++}.webp`;
  usedThumbNames.add(thumbName);

  const thumbAbs = path.join(thumbDir, thumbName);
  const sourceStat = fs.statSync(source.abs);

  if (sharp) {
    const thumbStat = fs.existsSync(thumbAbs) ? fs.statSync(thumbAbs) : null;
    if (!thumbStat || thumbStat.mtimeMs < sourceStat.mtimeMs) {
      await sharp(source.abs)
        .rotate()
        .resize({ width: 320, height: 320, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 72 })
        .toFile(thumbAbs);
    }
  }

  slides.push({
    src: source.url,
    thumb: fs.existsSync(thumbAbs) ? `/gallery-thumbs/${thumbName}` : source.url,
    alt: `Foto produk ${index + 1}`,
  });
}

/* Hapus thumbnail dari foto yang sudah tidak ada */
for (const file of fs.readdirSync(thumbDir)) {
  if (!file.startsWith(".") && !usedThumbNames.has(file)) {
    fs.unlinkSync(path.join(thumbDir, file));
  }
}

/* ── Logo brand ── */
const brandLogos = {};
for (const file of imageFiles(logoDir)) {
  const key = logoKey(path.basename(file, path.extname(file)));
  if (!key || brandLogos[key]) continue;
  brandLogos[key] = `/logos/${encodeURIComponent(file)}`;
}

const manifest = { slides, brandLogos };
const output = `${JSON.stringify(manifest, null, 2)}\n`;
const previous = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : "";

if (previous !== output) {
  fs.writeFileSync(outFile, output);
  console.log(`[media] ${slides.length} foto galeri & ${Object.keys(brandLogos).length} logo brand diperbarui.`);
} else {
  console.log(`[media] Tidak ada perubahan (${slides.length} foto, ${Object.keys(brandLogos).length} logo).`);
}
