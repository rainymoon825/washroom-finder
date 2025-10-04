import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = () => {
  useEffect(() => {
    const map = L.map("map").setView([49.2827, -123.1207], 13); // Vancouver coordinates

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.remove(); // Clean up the map instance on component unmount
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};

export default LeafletMap;
