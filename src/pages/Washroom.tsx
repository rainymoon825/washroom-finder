import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Washroom.css";
import "../App.css";


function WashroomPage() {
  const location = useLocation();
  const { washroom } = location.state || {};

  if (!washroom) {
    return <div>No washroom data available.</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="washroom-info">
          <h1>Review for {washroom.park_name || "Unknown Location"}</h1>
          <p>Location: {washroom.location}</p>
          <p>Type: {washroom.type}</p>
          <p>Wheelchair Access: {washroom.wheelchair_access || "Unknown"}</p>
          <p>Hours: {washroom.summer_hours || "Unknown"}</p>
          <p>Notes: {washroom.note || "None"}</p>
          <h2>Leave a Review</h2>
          <textarea placeholder="Write your review here..." rows={5} cols={50}></textarea>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default WashroomPage;