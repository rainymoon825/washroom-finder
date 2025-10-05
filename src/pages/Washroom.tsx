import { useState } from "react";
import "./Washroom.css";
import "../App.css";

type WashroomProps = {
  type: string;
  rating: number;
  image: string;
  openTimes: string;
  coordinates: { lat: number; lng: number };
  neighborhood: string;
};

const Washroom: React.FC<WashroomProps> = ({
  type,
  rating,
  image,
  openTimes,
  coordinates,
  neighborhood,
}) => {
  return (
    <div className="container">
      <div className="card">
        <img src={image} alt={type} className="washroom-image" />
        <div className="washroom-info">
          <h2>{type}</h2>
          <p>⭐ {rating}/5</p>
          <p>🕒 {openTimes}</p>
          <p>📍 {coordinates.lat}, {coordinates.lng}</p>
          <p> {neighborhood}</p>
        </div>
      </div>
    </div>
  );
};

const WashroomPage: React.FC = () => {
  const sample = {
    type: "Male Washroom",
    rating: 4.5,
    image: "https://www.123rf.com/photo_51715357_bathroom-interior-and-toilet-in-modern-washroom.html",
    openTimes: "6 AM – 10 PM",
    coordinates: { lat: 49.2827, lng: -123.1207 },
    neighborhood: "Downtown Vancouver",
  };

  return <Washroom {...sample} />;
};

export default WashroomPage;