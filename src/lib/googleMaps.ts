const SCRIPT_ID = "kramer-google-maps";

declare global {
  interface Window {
    google?: typeof google;
    __kramerGoogleMapsReady?: () => void;
  }
}

export function googleMapsApiKey(): string {
  return (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() ?? "";
}

export function loadGoogleMaps(apiKey: string): Promise<typeof google.maps> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps needs a browser."));
  }
  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      const previous = window.__kramerGoogleMapsReady;
      window.__kramerGoogleMapsReady = () => {
        previous?.();
        if (window.google?.maps) resolve(window.google.maps);
        else reject(new Error("Google Maps failed to load."));
      };
      existing.addEventListener("error", () => reject(new Error("Google Maps failed to load.")));
    });
  }

  return new Promise((resolve, reject) => {
    window.__kramerGoogleMapsReady = () => {
      if (window.google?.maps) resolve(window.google.maps);
      else reject(new Error("Google Maps failed to load."));
    };
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=__kramerGoogleMapsReady`;
    script.onerror = () => reject(new Error("Google Maps failed to load."));
    document.head.appendChild(script);
  });
}

/** Muted navy-leaning styles so the site frame stays in charge. */
export const kramerMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#e8eef4" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#3d4a5c" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f4f6f8" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#142033" }, { weight: 0.6 }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#c5d0db" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dfe7ef" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#b7c9d8" }] },
];
