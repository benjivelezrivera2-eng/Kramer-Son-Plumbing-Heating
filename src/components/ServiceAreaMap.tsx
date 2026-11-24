import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { business } from "../config/business";
import {
  googleMapsApiKey,
  kramerMapStyles,
  loadGoogleMaps,
} from "../lib/googleMaps";

function leafletMarkerIcon(homeBase: boolean): L.DivIcon {
  const fill = homeBase ? "#c9a04a" : "#142033";
  const ring = homeBase ? "#142033" : "#c9a04a";
  return L.divIcon({
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:${fill};border:3px solid ${ring};box-shadow:0 1px 4px rgba(20,32,51,0.35)"></span>`,
  });
}

function pinSvg(homeBase: boolean): string {
  const fill = homeBase ? "#c9a04a" : "#142033";
  const stroke = homeBase ? "#142033" : "#c9a04a";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36"><path fill="${fill}" stroke="${stroke}" stroke-width="2" d="M14 1c-6.6 0-12 5.2-12 11.6 0 8.7 12 21.4 12 21.4s12-12.7 12-21.4C26 6.2 20.6 1 14 1z"/><circle cx="14" cy="12.5" r="4.2" fill="#fff"/></svg>`;
}

function MapShell({
  children,
  sourceLabel,
}: {
  children: React.ReactNode;
  sourceLabel: string;
}): JSX.Element {
  return (
    <div className="overflow-hidden border border-[#142033]/15 bg-[#f4f6f8] shadow-[0_1px_0_rgba(20,32,51,0.04)]">
      <div className="flex items-center justify-between border-b border-[#142033]/10 bg-white px-4 py-3">
        <p className="[font-family:'Gabarito',Helvetica] text-sm font-bold text-[#142033]">
          Service area map
        </p>
        <p className="[font-family:'Geist',Helvetica] text-xs font-medium text-[#3d4a5c]">
          {sourceLabel}
        </p>
      </div>
      {children}
      <div className="flex flex-wrap gap-4 border-t border-[#142033]/10 bg-white px-4 py-3">
        <p className="inline-flex items-center gap-2 [font-family:'Geist',Helvetica] text-xs font-medium text-[#3d4a5c]">
          <span className="inline-block h-3 w-3 rounded-full border-2 border-[#142033] bg-[#c9a04a]" />
          Home base
        </p>
        <p className="inline-flex items-center gap-2 [font-family:'Geist',Helvetica] text-xs font-medium text-[#3d4a5c]">
          <span className="inline-block h-3 w-3 rounded-full border-2 border-[#c9a04a] bg-[#142033]" />
          Regular route
        </p>
      </div>
    </div>
  );
}

function LeafletFallbackMap(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const map = L.map(el, {
      scrollWheelZoom: true,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 18,
    }).addTo(map);

    const bounds = L.latLngBounds([]);
    for (const area of business.areas) {
      const point = L.latLng(area.lat, area.lng);
      bounds.extend(point);
      L.marker(point, { icon: leafletMarkerIcon(area.homeBase) })
        .addTo(map)
        .bindPopup(
          `<strong style="font-family:Gabarito,Helvetica,sans-serif;color:#142033">${area.name}</strong><br/><span style="font-family:Geist,Helvetica,sans-serif;color:#3d4a5c;font-size:13px">${area.note}</span>`,
        );
    }

    map.fitBounds(bounds.pad(0.28));
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => map.invalidateSize());

    return () => {
      window.removeEventListener("resize", onResize);
      map.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[20rem] w-full sm:h-[24rem] lg:h-[28rem]"
      role="application"
      aria-label="Interactive map of Kramer and Son service towns"
    />
  );
}

function GoogleServiceAreaMap({ apiKey }: { apiKey: string }): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;
    const listeners: google.maps.MapsEventListener[] = [];

    void loadGoogleMaps(apiKey)
      .then((maps) => {
        if (cancelled || !containerRef.current) return;

        const bounds = new maps.LatLngBounds();
        const map = new maps.Map(containerRef.current, {
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: kramerMapStyles,
          backgroundColor: "#f4f6f8",
        });

        for (const area of business.areas) {
          const position = { lat: area.lat, lng: area.lng };
          bounds.extend(position);
          const marker = new maps.Marker({
            map,
            position,
            title: area.name,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(pinSvg(area.homeBase))}`,
              scaledSize: new maps.Size(28, 36),
              anchor: new maps.Point(14, 36),
            },
          });
          const info = new maps.InfoWindow({
            content: `<div style="max-width:14rem"><strong style="font-family:Gabarito,Helvetica,sans-serif;color:#142033">${area.name}</strong><p style="margin:0.35rem 0 0;font-family:Geist,Helvetica,sans-serif;color:#3d4a5c;font-size:13px;line-height:1.4">${area.note}</p></div>`,
          });
          listeners.push(
            marker.addListener("click", () => info.open({ map, anchor: marker })),
          );
        }

        map.fitBounds(bounds, 48);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Google Maps could not load. Check the API key and Maps JavaScript API.");
        }
      });

    return () => {
      cancelled = true;
      for (const listener of listeners) listener.remove();
    };
  }, [apiKey]);

  if (error) {
    return (
      <div className="flex h-[20rem] items-center justify-center bg-[#f4f6f8] px-6 text-center sm:h-[24rem] lg:h-[28rem]">
        <p className="max-w-sm [font-family:'Geist',Helvetica] text-sm leading-6 text-[#3d4a5c]">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-[20rem] w-full sm:h-[24rem] lg:h-[28rem]"
      role="application"
      aria-label="Interactive Google map of Kramer and Son service towns"
    />
  );
}

export function ServiceAreaMap(): JSX.Element {
  const apiKey = googleMapsApiKey();

  if (apiKey) {
    return (
      <MapShell sourceLabel="Google Maps · pan and zoom">
        <GoogleServiceAreaMap apiKey={apiKey} />
      </MapShell>
    );
  }

  return (
    <MapShell sourceLabel="Pan and zoom">
      <LeafletFallbackMap />
    </MapShell>
  );
}
