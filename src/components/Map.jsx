import React, { useEffect, useState, useRef } from "react";
import MapGL, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
  const mapRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    // Watch for dark mode toggle
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Ensure map resizes properly when viewport changes (especially on mobile)
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500">
      <MapGL
        ref={mapRef}
        initialViewState={{
          longitude: -79.3832, // Toronto
          latitude: 43.6532,
          zoom: 10,
        }}
        mapStyle={
          isDarkMode
            ? "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" // white (for dark mode)
            : "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" // dark (for light mode)
        }
        style={{ width: "100%", height: "100%" }}
      >
        <Marker longitude={-79.3832} latitude={43.6532} color="orange" />
      </MapGL>
    </div>
  );
};

export default MapComponent;
