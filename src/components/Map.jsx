import React, { useEffect, useState } from "react";
import MapGL, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    // Watch for dark mode class changes on <html>
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500">
      <MapGL
        initialViewState={{
          longitude: -79.3832, // Toronto
          latitude: 43.6532,
          zoom: 10,
        }}
        // 🗺️ Automatically switches style based on theme
        mapStyle={
          isDarkMode
            ? "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" // white background for dark mode
            : "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" // black background for light mode
        }
      >
        <Marker longitude={-79.3832} latitude={43.6532} color="orange" />
      </MapGL>
    </div>
  );
};

export default MapComponent;
