import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
//import washrooms from './data/public-washrooms.json';
import './App.css';
import './MapPage.css';

function MapPage() {
  const washrooms = JSON.parse(localStorage.getItem("washroomlist") || "[]");
  const navigate = useNavigate();

  useEffect(() => {

    if (!document.getElementById('map')) return;
    const map = L.map('map').setView([49.2827, -123.1207], 13); // Vancouver coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create custom toilet emoji icon with shadow
    const toiletIcon = L.divIcon({
      html: '<div style="font-size: 24px; text-align: center; line-height: 1; filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));">🚽</div>',
      className: 'toilet-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    // Track marker positions to detect right-clicks near an existing marker
    const markerPositions: { lat: number; lon: number }[] = [];

    // Add toilet emoji markers for each washroom
    washrooms.forEach((washroom: { geo_point_2d: { lat: any; lon: any; }; park_name: any; type: string; location: any; wheelchair_access: any; summer_hours: any; geo_local_area: any; ID?: number; }) => {
      const { lat, lon } = washroom.geo_point_2d;
      const marker = L.marker([lat, lon], { icon: toiletIcon }).addTo(map);
      markerPositions.push({ lat, lon });

      marker.on('click', () => {
        navigate(`/washroom?id=${washroom.ID}`);
      });

      // Stop context menu on markers from bubbling up to map-level context menu
      marker.on('contextmenu', (e) => {
        if (e.originalEvent) {
          e.originalEvent.stopPropagation();
        }
      });
    });

    // Helper to compute distance between two lat/lon points in meters (Haversine)
    const distanceInMeters = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
      const toRad = (x: number) => (x * Math.PI) / 180;
      const R = 6371000;
      const dLat = toRad(b.lat - a.lat);
      const dLon = toRad(b.lon - a.lon);
      const lat1 = toRad(a.lat);
      const lat2 = toRad(b.lat);
      const sinDLat = Math.sin(dLat / 2);
      const sinDLon = Math.sin(dLon / 2);
      const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
      return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
    };

    // Right-click (contextmenu) handler to add a new bathroom when not near an existing marker
    map.on('contextmenu', (e: any) => {
      const clicked = { lat: e.latlng.lat as number, lon: e.latlng.lng as number };
      // If within 15m of an existing marker, treat as "on a marker" and do nothing
      const nearExisting = markerPositions.some((pos) => distanceInMeters(pos, clicked) < 15);
      if (nearExisting) {
        return;
      }

      const ok = window.confirm('Create a new bathroom here and write a review?');
      if (!ok) return;

      // Navigate with a draft so user can input attributes before saving
      navigate('/review', { state: { draft: { lat: clicked.lat, lon: clicked.lon } } });
    });

    return () => {
      map.remove();
    };
  }, [navigate]);

  return (
    <div className="map-page">
      <div className="map-header">
        <h1>🚽 Vancouver Washroom Finder</h1>
        <p>Find public washrooms near you • Click on any marker to view details</p>
      </div>
      <div id="map" className="map-container"></div>
    </div>
  );
}

export default MapPage;