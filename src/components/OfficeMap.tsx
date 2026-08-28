"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation } from "lucide-react";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const officePosition: [number, number] = [-7.6852, 110.6275];

export default function OfficeMap() {
  return (
    <MapContainer
      center={officePosition}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={officePosition}>
        <Popup>
          <div style={{ padding: 4 }}>
            <h3 style={{ fontWeight: 700, color: "#047857", fontSize: 14, marginBottom: 4 }}>
              CV Prima Mandiri Distribusi
            </h3>
            <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.4 }}>
              Jl. Griya Prima Timur utara No.521, Dedesan, Belang Wetan, Kec. Klaten Utara, Kab. Klaten, Jawa Tengah 57466
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${officePosition[0]},${officePosition[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#047857", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}
            >
              <Navigation style={{ width: 12, height: 12 }} /> Buka di Google Maps
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
