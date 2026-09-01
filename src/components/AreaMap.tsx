"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  expandedArea: number | null;
}

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];
const AREA_KEYS = ["solo", "diy", "semarang"];
const AREA_NAMES = ["Solo Raya", "DIY & Sekitarnya", "Semarang & Sekitarnya"];

export default function AreaMap({ expandedArea }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layersRef = useRef<L.GeoJSON[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [-7.55, 110.45],
      zoom: 8,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    mapInstance.current = map;
    setReady(true);

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!ready || !mapInstance.current) return;

    layersRef.current.forEach((l) => l.remove());
    layersRef.current = [];

    if (expandedArea === null) return;

    const map = mapInstance.current;
    const color = COLORS[expandedArea];

    fetch(`/data/${AREA_KEYS[expandedArea]}.geo.json`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((geo) => {
        if (!geo) return;
        const geoLayer = L.geoJSON(geo, {
          style: {
            color: color,
            weight: 2,
            opacity: 0.8,
            fillColor: color,
            fillOpacity: 0.2,
          },
          onEachFeature: (feature, layer) => {
            const name = feature.properties?.NAME_2 || feature.properties?.name || "";
            layer.bindPopup("<strong>" + name + "</strong><br/>" + AREA_NAMES[expandedArea]);
          },
        }).addTo(map);

        layersRef.current.push(geoLayer);

        const bounds = geoLayer.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [30, 30] });
        }
      })
      .catch(() => {});
  }, [expandedArea, ready]);

  return <div ref={mapRef} className="w-full h-full min-h-[400px]" />;
}
