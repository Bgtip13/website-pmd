export interface Product {
  cat: string;
  brand: string;
  name: string;
  variant: string;
  price: number;
  keterangan: string;
}

const GOOGLE_SHEETS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSCbisEyweutBA9wwg0rCzoBN6eGiNMHmgjaMg29uFjt_P6WDOhUv6ljIug1eYdPMWH-lxEbngFx5RR/pub?gid=0&single=true&output=csv";

/* ─── Proper CSV parser (handles quoted fields with commas) ─── */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
  }
  result.push(current.trim());
  return result;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(GOOGLE_SHEETS_CSV_URL, { cache: "no-store" });
    const text = await res.text();
    const lines = text.split("\n").filter((l) => l.trim() !== "");
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]).map((h) =>
      h.replace(/"/g, "").trim().toLowerCase()
    );

    const catIdx = headers.findIndex((h) => h === "cat");
    const brandIdx = headers.findIndex((h) => h === "brand");
    const nameIdx = headers.findIndex((h) => h === "name");
    const variantIdx = headers.findIndex((h) => h === "variant");
    const priceIdx = headers.findIndex((h) => h === "price");
    const ketIdx = headers.findIndex((h) => h === "keterangan");

    const products: Product[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i]).map((c) => c.replace(/"/g, "").trim());

      // Parse price — extract only numbers, handle "Hubungi Admin" etc.
      let priceRaw = cols[priceIdx] || "0";
      let priceNum = parseInt(priceRaw.replace(/[^0-9]/g, ""), 10);

      // If price is NaN or 0 but there IS a price string, check if it's a real number
      if (isNaN(priceNum)) priceNum = 0;

      const keterangan = (cols[ketIdx] || "").trim();

      // Only include if has a name (skip empty rows)
      const name = (cols[nameIdx] || "").trim();
      if (!name) continue;

      products.push({
        cat: (cols[catIdx] || "").trim(),
        brand: (cols[brandIdx] || "").trim(),
        name: name,
        variant: (cols[variantIdx] || "").trim(),
        price: priceNum,
        keterangan: keterangan,
      });
    }

    return products;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

export function formatRupiah(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}
