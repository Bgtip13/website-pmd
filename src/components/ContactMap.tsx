"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Koordinat kantor CV Prima Mandiri Distribusi (Klaten Utara)
const officePosition: [number, number] = [-7.717, 110.606];

// Fix default marker icon
const defaultIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background:#059669;width:36px;height:36px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

export default function ContactMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full bg-gray-100 flex items-center justify-center text-gray-400">Memuat peta...</div>;
  }

  return (
    <MapContainer center={officePosition} zoom={13} className="h-full w-full" zoomControl={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={officePosition} icon={defaultIcon}>
        <Popup>
          <div className="text-center p-1">
            <strong className="text-emerald-700">CV Prima Mandiri Distribusi</strong>
            <br />
            <span className="text-sm text-gray-600">
              Jl. Griya Prima Timur utara No.521
              <br />
              Klaten Utara, Jawa Tengah
            </span>
            <br />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${officePosition[0]},${officePosition[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 text-sm font-medium hover:underline inline-flex items-center gap-1 mt-1"
            >
              Buka di Google Maps
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
