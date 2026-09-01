"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function OfficeMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [-7.7309, 110.6068],
      zoom: 15,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.marker([-7.7309, 110.6068])
      .addTo(map)
      .bindPopup("<strong>CV Prima Mandiri Distribusi</strong><br/>Jl. Griya Prima Timur utara No.521<br/>Klaten, Jawa Tengah 57466")
      .openPopup();

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full min-h-[400px]" />;
}
