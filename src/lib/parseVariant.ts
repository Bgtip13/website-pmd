/*
 * Memecah kolom VARIANT dari spreadsheet menjadi dua bagian:
 *   "20kg (Tuna, Salmon)"  →  ukuran: "20kg", rasa: ["Tuna", "Salmon"]
 *
 * Spreadsheet tidak perlu diubah. Kalau polanya tidak cocok (tanpa tanda
 * kurung), seluruh teks dianggap sebagai ukuran dan daftar rasa kosong.
 */

export interface ParsedVariant {
  size: string;
  flavors: string[];
}

/* Perbaikan salah ketik yang umum di spreadsheet (kunci: huruf kecil) */
const FLAVOR_FIXES: Record<string, string> = {
  mackarel: "Mackerel",
  chiken: "Chicken",
};

function fixFlavor(raw: string): string {
  const cleaned = raw.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned
    .split(" ")
    .map((word) => FLAVOR_FIXES[word.toLowerCase()] ?? word)
    .join(" ");
}

export function parseVariant(variant: string): ParsedVariant {
  const text = (variant || "").replace(/\s+/g, " ").trim();
  if (!text) return { size: "", flavors: [] };

  /* "ukuran (rasa, rasa)" — kurung penutup dibuat opsional agar tahan typo */
  const match = text.match(/^(.*?)\s*\(([^)]*)\)?\s*$/);
  if (!match) return { size: text, flavors: [] };

  const size = match[1].trim();
  const seen = new Set<string>();
  const flavors: string[] = [];

  for (const part of match[2].split(",")) {
    const flavor = fixFlavor(part);
    const key = flavor.toLowerCase();
    if (!flavor || seen.has(key)) continue;
    seen.add(key);
    flavors.push(flavor);
  }

  return { size, flavors };
}

/*
 * Keterangan di spreadsheet berisi info isi per dus dengan penulisan
 * yang berbeda-beda: "(1 Dus Isi 18)", "1 Dus Isi 6 Pcs", "Isi 6pcs".
 * Semuanya diseragamkan jadi "Isi 18 pcs". Teks lain (misalnya "25 x 800gr")
 * dipertahankan apa adanya, hanya tanda kurung luarnya dibuang.
 */
export function normalizePack(keterangan: string): string {
  const text = (keterangan || "").replace(/\s+/g, " ").trim();
  if (!text || text === "-") return "";

  const isi = text.match(/isi\s*(\d+)/i);
  if (isi) return `Isi ${isi[1]} pcs`;

  return text.replace(/^\((.*)\)$/, "$1").trim();
}
