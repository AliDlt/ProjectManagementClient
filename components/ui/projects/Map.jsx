import React, { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

function Map({ centerMap, setPosition }) {
  const icon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776000.png",
    iconSize: [30, 30],
  });

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
        <LoadMap />
        <Marker position={centerMap} icon={icon}></Marker>
      </MapContainer>
    </div>
  );
}

export default Map;

const LoadMap = () => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  return null;
};
