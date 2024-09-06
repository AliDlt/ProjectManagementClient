import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import CustomButton from "../../modules/CustomButton";
import useUserGeolocation from "../../../hooks/useUserGeolocation";

const icon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/7987/7987463.png",
  iconSize: [25, 25],
});

function Map({ position, onSetPosition, showPosition, markerPosition }) {
  const { location, getLocation, loading } = useUserGeolocation();
  const [mapCenter, setMapCenter] = useState(position);

  useEffect(() => {
    if (location) setMapCenter([location.lat, location.lng]);
  }, [location]);

  return (
    <div className="h-96 overflow-hidden relative">
      <MapContainer center={mapCenter} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LoadMap position={mapCenter} />
        <MapZoom />
        {onSetPosition && <AddMapPosition onSetPosition={onSetPosition} />}
        {onSetPosition && (
          <CustomButton
            className="mt-5 z-[999] absolute bottom-2 left-2"
            onClick={getLocation}
            loading={loading}
          >
            مکان من
          </CustomButton>
        )}
        {onSetPosition && (
          <div className="size-10 absolute top-[51.5%] left-[49%] -translate-x-1/2 -translate-y-1/2 z-[999]">
            <img
              className="size-[30px]"
              src="https://cdn-icons-png.flaticon.com/512/2776/2776000.png"
              alt="map-icon"
            />
          </div>
        )}
        {showPosition && (
          <Marker position={markerPosition || position} icon={icon}></Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;

// Load Map
const LoadMap = ({ position }) => {
  const map = useMap();

  map.setView(position);

  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  return null;
};

// Add Map Po
const AddMapPosition = ({ onSetPosition }) => {
  const map = useMap();

  return (
    <CustomButton
      className="mt-5  z-[999] absolute bottom-2 right-2"
      onClick={() => onSetPosition(map.getCenter())}
    >
      ثبت مکان پروژه
    </CustomButton>
  );
};

// Map Zoom
const MapZoom = () => {
  const map = useMap();

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const zoomLevel = map.getZoom();
      const zoomDelta = e.deltaY > 0 ? -1 : 1; // Scroll direction

      // Set the new zoom level centered on the map's center
      map.setZoomAround(map.getCenter(), zoomLevel + zoomDelta);
    };

    const container = map.getContainer();
    container.addEventListener("wheel", handleScroll);

    // Cleanup event listener
    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, [map]);

  return null;
};
