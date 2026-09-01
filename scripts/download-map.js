const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const DATA_URL =
  "https://raw.githubusercontent.com/TheMaggieSimpson/IndonesiaGeoJSON/master/kota-kabupaten.geojson";

const OUT_DIR = path.join(__dirname, "..", "public", "data");

const areas = {
  solo: [
    "Surakarta",
    "Boyolali",
    "Klaten",
    "Sukoharjo",
    "Sragen",
    "Karanganyar",
    "Wonogiri",
  ],
  diy: [
    "Yogyakarta",
    "Bantul",
    "Sleman",
    "Kulon Progo",
    "Gunung Kidul",
    "Kebumen",
    "Purworejo",
    "Magelang",
  ],
  semarang: [
    "Semarang",
    "Demak",
    "Kudus",
    "Pati",
    "Grobogan",
    "Salatiga",
  ],
};

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    mod
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetch(res.headers.location).then(resolve).catch(reject);
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

async function main() {
  console.log("=== Download Map Data ===\n");
  console.log("Fetching:", DATA_URL);

  const raw = await fetch(DATA_URL);
  const geo = JSON.parse(raw);
  console.log("Total features:", geo.features.length);

  // Print a few sample names for debugging
  const sampleNames = geo.features
    .slice(0, 10)
    .map((f) => f.properties.NAME_2 || f.properties.name);
  console.log("Sample NAME_2 values:", sampleNames.join(", "));

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  for (const [key, names] of Object.entries(areas)) {
    const normalizedTargets = names.map(normalize);

    const matched = geo.features.filter((f) => {
      const name2 = normalize(f.properties.NAME_2);
      const name = normalize(f.properties.name);
      return (
        normalizedTargets.includes(name2) ||
        normalizedTargets.includes(name)
      );
    });

    console.log(`\n${key}: ${matched.length} matched`);
    matched.forEach((f) => {
      console.log("  -", f.properties.NAME_2 || f.properties.name);
    });

    const out = { type: "FeatureCollection", features: matched };
    const outPath = path.join(OUT_DIR, `${key}.geo.json`);
    fs.writeFileSync(outPath, JSON.stringify(out));
    console.log("  Saved:", outPath);
  }

  console.log("\n=== DONE! ===");
}

main().catch(console.error);
