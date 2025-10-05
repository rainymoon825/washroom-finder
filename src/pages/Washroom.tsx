import { useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./Washroom.css";
import "../App.css";
import "./ReviewPage.css";


function WashroomPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const byId = useMemo(() => {
    if (!idParam) return null as any;
    const list = JSON.parse(localStorage.getItem("washroomlist") || "[]");
    const idNum = Number(idParam);
    if (!Array.isArray(list) || Number.isNaN(idNum)) return null as any;
    return list.find((w: any) => w?.ID === idNum) || null;
  }, [idParam]);
  const { washroom } = location.state || {};
  const activeWashroom = washroom || byId || null;

  const [rating, setRating] = useState<number>(5);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmitReview = () => {
    if (!activeWashroom) return;
    const text = textareaRef.current?.value?.trim() || "";
    if (!text) {
      alert("Please write a review before submitting.");
      return;
    }
    const list = JSON.parse(localStorage.getItem("reviewlist") || "[]");
    const toSave = Array.isArray(list) ? list : [];
    const entry = {
      TolietIDReviewed: activeWashroom.ID ?? null,
      UserID: 1,
      Review: text,
      Rating: rating,
      Timestamp: Math.floor(Date.now() / 1000)
    };
    toSave.push(entry);
    localStorage.setItem("reviewlist", JSON.stringify(toSave));

    // Increment user 1 reviewsGiven
    const usersRaw = JSON.parse(localStorage.getItem("userlist") || "[]");
    const users = Array.isArray(usersRaw) ? usersRaw : [];
    const userIndex = users.findIndex((u: any) => u && Number(u.ID) === 1);
    if (userIndex !== -1) {
      const current = users[userIndex];
      const currentCount = typeof current.reviewsGiven === "number" ? current.reviewsGiven : 0;
      users[userIndex] = { ...current, reviewsGiven: currentCount + 1 };
      localStorage.setItem("userlist", JSON.stringify(users));
    }

    window.dispatchEvent(new Event("data-updated"));
    alert("Review Submitted!");
    if (textareaRef.current) textareaRef.current.value = "";
  };

  const reviews = useMemo(() => {
    const list = JSON.parse(localStorage.getItem("reviewlist") || "[]");
    const id = activeWashroom?.ID ?? null;
    if (!id) return [] as any[];
    const arr = Array.isArray(list) ? list : [];
    // Support both schemas: some entries use UserID as the washroom ID; legacy uses TolietIDReviewed
    return arr.filter((r: any) => r.UserID === id || r.TolietIDReviewed === id);
  }, [location, activeWashroom]);

  const usersById = useMemo(() => {
    const raw = JSON.parse(localStorage.getItem("userlist") || "[]");
    const arr = Array.isArray(raw) ? raw : [];
    const map: Record<number, any> = {};
    for (const u of arr) {
      if (u && typeof u.ID === "number") {
        map[u.ID] = u;
      }
    }
    return map;
  }, [location]);

  if (!activeWashroom) {
    return (
      <div className="washroom-layout">
        <div className="washroom-left">
          <div className="card">
            <div className="washroom-info">
              <h1>Washroom</h1>
              <p>Unable to load washroom details.</p>
            </div>
          </div>
        </div>
        <div className="washroom-right">
          <div className="reviews-panel">
            <div className="reviews-header">
              <h2>Past Reviews</h2>
              <span className="reviews-count">0</span>
            </div>
            <p className="no-reviews">No reviews yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="washroom-page">
      <div className="washroom-layout">
      <div className="washroom-left">
        <div className="pokemon-card">
          <div className="card-header">
            <div className="card-title">
              <h1>🚽 {activeWashroom.park_name || "Mystery Washroom"}</h1>
              <div className="card-subtitle">Public Restroom Card</div>
            </div>
            <div className="card-hp">
              <span className="hp-label">CLEANLINESS</span>
              <span className="hp-value">⭐⭐⭐⭐⭐</span>
            </div>
          </div>

          <div className="card-image-area">
            <div className="washroom-emoji">🚽</div>
            <div className="card-type-badge">{activeWashroom.type || "Public Washroom"}</div>
          </div>

          <div className="card-stats">
            <div className="stat-row">
              <span className="stat-label">📍 Location</span>
              <span className="stat-value">{activeWashroom.location || "Unknown"}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">♿ Accessibility</span>
              <span className="stat-value">{activeWashroom.wheelchair_access || "Unknown"}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">🕒 Hours</span>
              <span className="stat-value">{activeWashroom.summer_hours || "Unknown"}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">🏘️ Area</span>
              <span className="stat-value">{activeWashroom.geo_local_area || "Unknown"}</span>
            </div>
          </div>

          <div className="card-description">
            <p>
              A reliable public restroom facility located in Vancouver.
              {activeWashroom.note && ` ${activeWashroom.note}`}
            </p>
          </div>
        </div>
      </div>
        <div className="washroom-right">
          <div className="pokemon-card">
            <div className="card-header">
              <div className="card-title">
                <h1>📝 Reviews</h1>
                <div className="card-subtitle">Share and read experiences</div>
              </div>
            </div>
            <div className="review-section" style={{ paddingBottom: 0 }}>
              <div className="rating-display" style={{ marginBottom: 8 }}>
                <label style={{ marginRight: 8 }}>Rating:</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  <option value={5}>⭐⭐⭐⭐⭐ 5</option>
                  <option value={4}>⭐⭐⭐⭐ 4</option>
                  <option value={3}>⭐⭐⭐ 3</option>
                  <option value={2}>⭐⭐ 2</option>
                  <option value={1}>⭐ 1</option>
                  <option value={0}>0</option>
                </select>
              </div>
              <textarea
                placeholder="Share your experience with this washroom..."
                className="review-textarea"
                rows={4}
                ref={textareaRef}
              />
              <button className="back-button" onClick={handleSubmitReview}>Submit Review</button>
            </div>
            <div className="card-stats" style={{ borderTop: '1px solid #dee2e6' }}>
              <div className="reviews-header" style={{ marginBottom: 10 }}>
                <h2 style={{ margin: 0 }}>Past Reviews</h2>
                <span className="reviews-count">{reviews.length}</span>
              </div>
              {reviews.length === 0 ? (
                <p className="no-reviews">No reviews yet.</p>
              ) : (
                <ul className="reviews-list">
              {reviews.map((r: any, idx: number) => (
                    <li key={idx} className="review-item">
                  <div className="review-rating">⭐ {r.Rating}</div>
                  <div className="review-text">{r.Review}</div>
                  <div className="review-author">by {usersById[r.UserID]?.Name || usersById[r.UserID]?.username || "Anonymous"}</div>
                      {r.Timestamp && (
                        <div className="review-time">{new Date(r.Timestamp * 1000).toLocaleString()}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WashroomPage;
