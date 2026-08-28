import Papa from "papaparse";

export interface Product {
  cat: string;
  brand: string;
  name: string;
  variant: string;
  price: number;
  keterangan: string;
}

const SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSCbisEyweutBA9wwg0rCzoBN6eGiNMHmgjaMg29uFjt_P6WDOhUv6ljIug1eYdPMWH-lxEbngFx5RR/pub?gid=0&single=true&output=csv";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(SHEETS_CSV_URL, { cache: "no-store" });
    const csv = await res.text();
    const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
    
    // Debug: cek header yang terbaca
    console.log("CSV Headers:", parsed.meta.fields);
    console.log("Sample row:", parsed.data[0]);
    
    return parsed.data.map((row: any) => {
      // Ambil key pertama yang ada (case-insensitive)
      const get = (keys: string[]) => {
        for (const k of keys) {
          if (row[k] !== undefined && row[k] !== "") return row[k];
        }
        return "";
      };
      return {
        cat: (get(["cat", "CAT", "Cat", "kategori", "KATEGORI"]) || "").trim(),
        brand: (get(["brand", "BRAND", "Brand", "merek", "MEREK"]) || "").trim(),
        name: (get(["name", "NAME", "Name", "nama", "NAMA", "produk", "PRODUK"]) || "").trim(),
        variant: (get(["variant", "VARIANT", "Variant", "varian", "VARIAN", "ukuran", "UKURAN"]) || "").trim(),
        price: parseInt(String(get(["price", "PRICE", "Price", "harga", "HARGA"])).replace(/[^0-9]/g, "")) || 0,
        keterangan: (get(["keterangan", "KETERANGAN", "Keterangan", "info", "INFO", "catatan", "CATATAN"]) || "").trim(),
      };
    });
  } catch (err) {
    console.error("Gagal load produk dari Google Sheets:", err);
    return [];
  }
}

export function formatRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}
