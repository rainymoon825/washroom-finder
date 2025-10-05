import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { getWashrooms } from '../firebase-project/src/server';

async function Map() {
  const washrooms = await getWashrooms();

  if (!washrooms) {
    return <div>Loading washrooms...</div>;
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!document.getElementById('map')) return;
    const map = L.map('map').setView([49.2827, -123.1207], 13); // Vancouver coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const redIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    });

    // Add red markers for each washroom

    Object.keys(washrooms).forEach((washroomKey: string) => {
      const washroom = washrooms[washroomKey];
      const { lat, lon } = washroom.coordinates;
      const marker = L.marker([lat, lon], { icon: redIcon }).addTo(map);

      marker.on('click', () => {
        navigate('/washroom', { state: { washroom } });
      });

      marker.bindPopup(`<b>${washroom.neighborhood || 'Unknown Location'}</b><br>${washroom.coordinates}`);
    });

    return () => {
      map.remove(); // Clean up the map instance on component unmount
    };
  }, [navigate]);

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
}

export default Map;