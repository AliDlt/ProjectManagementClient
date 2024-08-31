import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map({ centerMap, setPosition }) {
  return (
    <div className="h-96 overflow-hidden">
      <MapContainer
        center={centerMap}
        zoom={10}
        scrollWheelZoom
        whenReady={(map) =>
          setPosition && map.target.on("click", (e) => setPosition(e.latlng))
        }
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={centerMap}></Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
