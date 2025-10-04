import * as React from "react";
import MapGL, { Marker } from "react-map-gl/maplibre"; // ✅ Correct import for latest versions

const MapComponent = () => {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
      <MapGL
        initialViewState={{
          longitude: -79.3832, // Toronto
          latitude: 43.6532,
          zoom: 10,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" // ✅ Free, no Mapbox key required
      >
        <Marker longitude={-79.3832} latitude={43.6532} color="orange" />
      </MapGL>
    </div>
  );
};

export default MapComponent;
