"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Phone, Calendar, ChevronRight, MapPin, Truck, MessageCircle } from "lucide-react";
import Link from "next/link";

const center: [number, number] = [-7.35, 110.45];

const areas = [
  {
    name: "Solo Raya",
    file: "/data/solo.geo.json",
    color: "#2563eb",
    schedule: "Senin & Kamis",
    cities: "Surakarta, Boyolali, Klaten, Sukoharjo, Sragen, Karanganyar, Wonogiri",
    sales: "Adelia",
    phone: "0823-4293-1570",
    wa: "6282342931570",
  },
  {
    name: "DIY & Sekitarnya",
    file: "/data/diy.geo.json",
    color: "#059669",
    schedule: "Selasa & Jumat",
    cities: "Yogyakarta, Bantul, Sleman, Kulon Progo, Gunung Kidul, Kebumen, Purworejo, Magelang",
    sales: "April",
    phone: "0823-2335-2405",
    wa: "6282323352405",
  },
  {
    name: "Semarang & Sekitarnya",
    file: "/data/semarang.geo.json",
    color: "#7c3aed",
    schedule: "Rabu & Sabtu",
    cities: "Semarang Kota/Kab, Demak, Kudus, Pati, Grobogan, Salatiga",
    sales: "Fitri",
    phone: "0823-2320-9960",
    wa: "6282323209960",
  },
];

function FlyToArea({ geoData, activeArea }: { geoData: Record<number, any>; activeArea: number | null }) {
  const map = useMap();
  useEffect(() => {
    if (activeArea !== null && geoData[activeArea]) {
      import("leaflet").then((L) => {
        const layer = L.default.geoJSON(geoData[activeArea]);
        const bounds = layer.getBounds();
        if (bounds.isValid()) {
          map.flyToBounds(bounds, { padding: [40, 40], duration: 1 });
        }
      });
    }
  }, [activeArea, geoData, map]);
  return null;
}

export default function AreaMap() {
  const [mounted, setMounted] = useState(false);
  const [geoData, setGeoData] = useState<Record<number, any>>({});
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const geoJsonKey = useRef(0);

  useEffect(() => {
    setMounted(true);
    areas.forEach((area, i) => {
      fetch(area.file)
        .then((res) => res.json())
        .then((data) => setGeoData((prev) => ({ ...prev, [i]: data })))
        .catch((err) => console.error(`Failed to load ${area.file}:`, err));
    });
  }, []);

  const handleSelectArea = useCallback((index: number) => {
    setActiveArea((prev) => (prev === index ? null : index));
    geoJsonKey.current += 1;
  }, []);

  if (!mounted) {
    return (
      <div className="h-[450px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Peta */}
      <div className="flex-1 h-[450px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative">
        <MapContainer center={center} zoom={8} className="h-full w-full" zoomControl={true} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyToArea geoData={geoData} activeArea={activeArea} />
          {areas.map((area, i) =>
            geoData[i] && activeArea === i ? (
              <GeoJSON
                key={geoJsonKey.current}
                data={geoData[i]}
                style={{
                  fillColor: area.color,
                  fillOpacity: 0.3,
                  color: area.color,
                  weight: 3,
                }}
                onEachFeature={(feature, layer) => {
                  layer.bindTooltip(feature.properties?.NAME_2 || area.name, {
                    sticky: true,
                    className: "bg-white px-3 py-1 rounded-lg shadow-lg text-sm font-medium border border-gray-200",
                  });
                }}
              />
            ) : null
          )}
        </MapContainer>
        {activeArea === null && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-xl shadow-lg border border-gray-200">
              <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Klik salah satu area di sebelah kanan
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Panel */}
      <div className="lg:w-80 flex flex-col gap-3">
        {areas.map((area, i) => (
          <div
            key={area.name}
            onClick={() => handleSelectArea(i)}
            className={`rounded-2xl border-2 p-4 cursor-pointer transition ${
              activeArea === i
                ? "border-current shadow-lg bg-white"
                : "border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md"
            }`}
            style={activeArea === i ? { borderColor: area.color } : {}}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: area.color }}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900">{area.name}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {area.schedule}
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeArea === i ? "rotate-90" : ""
                }`}
              />
            </div>

            {activeArea === i && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                <div className="text-sm text-gray-500">{area.cities}</div>
                <div className="text-sm flex items-center gap-2 text-gray-700">
                  <Truck className="w-4 h-4 shrink-0" style={{ color: area.color }} />
                  Gratis Ongkir — {area.schedule}
                </div>
                <div className="text-sm text-gray-700">
                  Sales: <strong>{area.sales}</strong>
                </div>
                <a
                  href={`https://wa.me/${area.wa}?text=${encodeURIComponent("Halo " + area.sales + ", saya mau order pakan.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-green-600 transition text-sm w-full"
                >
                  <MessageCircle className="w-4 h-4" /> Chat {area.sales}
                </a>
              </div>
            )}
          </div>
        ))}
        <Link
          href="/area"
          className="text-center text-sm text-emerald-700 font-medium hover:underline flex items-center justify-center gap-1 mt-1"
        >
          Lihat Detail Lengkap <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
