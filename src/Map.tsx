import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import washrooms from './data/public-washrooms.json';
import './App.css';


function Map() {
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
    washrooms.forEach((washroom) => {
      const { lat, lon } = washroom.geo_point_2d;
      const marker = L.marker([lat, lon], { icon: redIcon }).addTo(map);

      marker.on('click', () => {
        navigate('/review', { state: { washroom } });
      });

      marker.bindPopup(`<b>${washroom.park_name || 'Unknown Location'}</b><br>${washroom.location}`);
    });

    return () => {
      map.remove();
    };
  }, [navigate]);

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
}

export default Map;