import { useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./Washroom.css";
import "../App.css";


function WashroomPage() {
  const location = useLocation();
  const { washroom } = location.state || {};
  const reviews = useMemo(() => {
    const list = JSON.parse(localStorage.getItem("reviewlist") || "[]");
    const id = washroom?.ID ?? null;
    if (!id) return [] as any[];
    return (Array.isArray(list) ? list : []).filter((r: any) => r.TolietIDReviewed === id);
  }, [location, washroom]);

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
          <h2 style={{ marginTop: 20 }}>Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul>
              {reviews.map((r: any, idx: number) => (
                <li key={idx}>
                  <strong>Rating:</strong> {r.Rating} — {r.Review}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WashroomPage;
