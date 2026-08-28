const https = require("https");
const fs = require("fs");
const path = require("path");

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJSON(res.headers.location).then(resolve).catch(reject);
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error("JSON parse failed: " + e.message)); }
      });
      res.on("error", reject);
    }).on("error", reject);
  });
}

function simplifyRing(coords, keepEvery) {
  if (coords.length <= 10) return coords;
  const result = [];
  for (let i = 0; i < coords.length; i += keepEvery) {
    result.push(coords[i]);
  }
  if (result[result.length - 1] !== coords[coords.length - 1]) {
    result.push(coords[coords.length - 1]);
  }
  return result;
}

function simplifyGeometry(geo, keepEvery) {
  if (geo.type === "Polygon") {
    return { ...geo, coordinates: geo.coordinates.map((r) => simplifyRing(r, keepEvery)) };
  }
  if (geo.type === "MultiPolygon") {
    return { ...geo, coordinates: geo.coordinates.map((poly) => poly.map((r) => simplifyRing(r, keepEvery))) };
  }
  return geo;
}

// Use NAME_2 which is the kabupaten/kota name in this dataset
const SOLO = [
  "surakarta", "boyolali", "klaten", "sukoharjo",
  "sragen", "karanganyar", "wonogiri",
];

const DIY = [
  "yogyakarta", "bantul", "sleman", "kulon progo", "gunung kidul",
  "kebumen", "purworejo", "magelang",
];

const SEMARANG = [
  "semarang", "demak", "kudus", "pati", "grobogan", "salatiga",
];

function matchName(featureName, list) {
  const lower = featureName.toLowerCase().trim();
  return list.some(item => lower === item || lower.includes(item) || item.includes(lower));
}

function saveGeoJSON(features, filename) {
  const geojson = {
    type: "FeatureCollection",
    features: features,
  };
  const outPath = path.join(__dirname, "..", "public", "data", filename);
  fs.writeFileSync(outPath, JSON.stringify(geojson));
  console.log(`  Saved: ${filename} (${(JSON.stringify(geojson).length / 1024).toFixed(1)} KB)`);
}

async function main() {
  console.log("=== Download Map Data ===\n");

  const url = "https://raw.githubusercontent.com/TheMaggieSimpson/IndonesiaGeoJSON/master/kota-kabupaten.json";
  
  let data = null;
  try {
    console.log("Fetching:", url.substring(0, 80) + "...");
    data = await fetchJSON(url);
    console.log("OK! Features:", data.features?.length || 0);
  } catch (e) {
    console.error("Failed:", e.message);
    return;
  }

  // Debug: print first few NAME_2 values
  console.log("\nSample kabupaten names:");
  data.features.slice(0, 10).forEach(f => {
    console.log("  -", f.properties.NAME_2, "(", f.properties.TYPE_2, ")");
  });
  console.log("  ...");

  // Print all names from Central Java & DIY
  console.log("\nAll features in Jateng & DIY:");
  data.features.forEach(f => {
    const prov = (f.properties.NAME_1 || "").toLowerCase();
    if (prov.includes("jawa tengah") || prov.includes("yogyakarta") || prov.includes("di yogyakarta")) {
      console.log("  -", f.properties.NAME_2, "| Province:", f.properties.NAME_1);
    }
  });

  const soloFeatures = [];
  const diyFeatures = [];
  const semarangFeatures = [];

  data.features.forEach(feature => {
    const name = feature.properties.NAME_2 || "";
    const simplified = simplifyGeometry(feature.geometry, 5);

    if (matchName(name, SOLO)) {
      soloFeatures.push({ ...feature, geometry: simplified });
    } else if (matchName(name, DIY)) {
      diyFeatures.push({ ...feature, geometry: simplified });
    } else if (matchName(name, SEMARANG)) {
      semarangFeatures.push({ ...feature, geometry: simplified });
    }
  });

  console.log("\nSolo Raya:", soloFeatures.length, "matched");
  soloFeatures.forEach(f => console.log("  -", f.properties.NAME_2));

  console.log("DIY & Sekitarnya:", diyFeatures.length, "matched");
  diyFeatures.forEach(f => console.log("  -", f.properties.NAME_2));

  console.log("Semarang & Sekitarnya:", semarangFeatures.length, "matched");
  semarangFeatures.forEach(f => console.log("  -", f.properties.NAME_2));

  // Create output dir
  const dataDir = path.join(__dirname, "..", "public", "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  saveGeoJSON(soloFeatures, "solo.geo.json");
  saveGeoJSON(diyFeatures, "diy.geo.json");
  saveGeoJSON(semarangFeatures, "semarang.geo.json");

  console.log("\n=== DONE! ===");
}

main().catch(console.error);
