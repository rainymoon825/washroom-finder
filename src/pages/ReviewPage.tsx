import { useLocation, useNavigate } from "react-router-dom";
import "./ReviewPage.css";
import SubmitButton from "../component/SubmitButton";
import { useRef, useState } from "react";

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { washroom, draft } = location.state || {};
  const [rating, setRating] = useState<number>(5);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [form, setForm] = useState<{ park_name: string; type: string; location: string; wheelchair_access: boolean; summer_hours: string; geo_local_area: string; note: string; }>(() => ({
    park_name: washroom?.park_name || 'User Added Washroom',
    type: washroom?.type || 'Public Washroom',
    location: washroom?.location || (draft ? `Lat ${draft.lat.toFixed(5)}, Lon ${draft.lon.toFixed(5)}` : ''),
    wheelchair_access: (washroom?.wheelchair_access || 'No') === 'Yes',
    summer_hours: washroom?.summer_hours || 'Unknown',
    geo_local_area: washroom?.geo_local_area || 'Unknown',
    note: washroom?.note || ''
  }));
  const [activeWashroom, setActiveWashroom] = useState<any>(washroom || null);
  
  const handleSelect = () => {
    const target = activeWashroom;
    if (!target) {
      alert('Please create and save the new bathroom first.');
      return;
    }
    const text = textareaRef.current?.value?.trim() || "";
    if (!text) {
      alert("Please write a review before submitting.");
      return;
    }
    const list = JSON.parse(localStorage.getItem("reviewlist") || "[]");
    const toSave = Array.isArray(list) ? list : [];

    // Increment reviewsGiven for user with ID 1
    const usersRaw = JSON.parse(localStorage.getItem("userlist") || "[]");
    const users = Array.isArray(usersRaw) ? usersRaw : [];
    const userIndex = users.findIndex((u: any) => u && Number(u.ID) === 1);

    const entry = {
      TolietIDReviewed: target.ID ?? null,
      UserID: 1,
      Review: text,
      Rating: rating,
      Timestamp: Math.floor(Date.now() / 1000)
    };

    if (userIndex !== -1) {
      const current = users[userIndex];
      const currentCount = typeof current.reviewsGiven === "number" ? current.reviewsGiven : 0;
      users[userIndex] = { ...current, reviewsGiven: currentCount + 1 };
      localStorage.setItem("userlist", JSON.stringify(users));
    }

    toSave.push(entry);
    localStorage.setItem("reviewlist", JSON.stringify(toSave));
    // Notify listeners (Leaderboard, Profile, Washroom) to refresh
    window.dispatchEvent(new Event("data-updated"));
    alert("Review Submitted!");
  };

  const handleCreateBathroom = () => {
    if (!draft) return;
    const currentList = JSON.parse(localStorage.getItem('washroomlist') || '[]');
    const maxId = currentList.reduce((max: number, w: any) => (typeof w.ID === 'number' && w.ID > max ? w.ID : max), 0);
    const newWashroomId = maxId + 1;
    const newWashroom = {
      geo_point_2d: { lat: draft.lat, lon: draft.lon },
      ID: newWashroomId,
      Rating: 0,
      Image: null,
      park_name: form.park_name || 'User Added Washroom',
      type: form.type || 'Public Washroom',
      location: form.location || `Lat ${draft.lat.toFixed(5)}, Lon ${draft.lon.toFixed(5)}`,
      wheelchair_access: form.wheelchair_access ? 'Yes' : 'No',
      summer_hours: form.summer_hours || 'Unknown',
      geo_local_area: form.geo_local_area || 'Unknown',
      note: form.note || ''
    };
    const updatedList = [...currentList, newWashroom];
    localStorage.setItem('washroomlist', JSON.stringify(updatedList));
    setActiveWashroom(newWashroom);
    alert('Bathroom created and saved! You can now submit a review.');
  };

  const handleBackToMap = () => {
    navigate('/map');
  };

  if (!washroom && !draft) {
    return (
      <div className="review-page">
        <div className="pokemon-card error-card">
          <h2>🚽 No Washroom Data Available</h2>
          <button onClick={handleBackToMap} className="back-button">
            ← Back to Map
          </button>
        </div>
      </div>
    );
  }

  const getWashroomType = (type: string) => {
    if (type?.includes('Field House')) return '🏠 Field House';
    if (type?.includes('Public Washroom')) return '🚽 Public Washroom';
    if (type?.includes('Portland Loo')) return '🚾 Portland Loo';
    if (type?.includes('Community Center')) return '🏢 Community Center';
    return '🚽 ' + (type || 'Unknown');
  };

  const getAccessibilityIcon = (access: string) => {
    if (access === 'Yes') return '♿';
    if (access === 'No') return '❌';
    return '❓';
  };

  return (
    <div className="review-page">
      <div className="pokemon-card">
        {/* Card Header */}
        <div className="card-header">
          <div className="card-title">
            <h1>🚽 {(activeWashroom?.park_name) || form.park_name || "Mystery Washroom"}</h1>
            <div className="card-subtitle">Public Restroom Card</div>
          </div>
          <div className="card-hp">
            <span className="hp-label">CLEANLINESS</span>
            <span className="hp-value">⭐⭐⭐⭐⭐</span>
          </div>
        </div>

        {/* Card Image Area */}
        <div className="card-image-area">
          <div className="washroom-emoji">🚽</div>
          <div className="card-type-badge">
            {getWashroomType((activeWashroom?.type) || form.type)}
          </div>
        </div>

        {/* Card Stats */}
        <div className="card-stats">
          <div className="stat-row">
            <span className="stat-label">📍 Location</span>
            <span className="stat-value">{(activeWashroom?.location) || form.location || "Unknown"}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">♿ Accessibility</span>
            <span className="stat-value">
              {getAccessibilityIcon(activeWashroom?.wheelchair_access || (form.wheelchair_access ? 'Yes' : 'No'))} {(activeWashroom?.wheelchair_access) || (form.wheelchair_access ? 'Yes' : 'No')}
            </span>
          </div>
          <div className="stat-row">
            <span className="stat-label">🕒 Hours</span>
            <span className="stat-value">{(activeWashroom?.summer_hours) || form.summer_hours || "Unknown"}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">🏘️ Area</span>
            <span className="stat-value">{(activeWashroom?.geo_local_area) || form.geo_local_area || "Unknown"}</span>
          </div>
        </div>

        {/* Card Description */}
        <div className="card-description">
          <p>A reliable public restroom facility located in Vancouver. 
            {(activeWashroom?.note || form.note) && ` ${(activeWashroom?.note || form.note)}`}
          </p>
        </div>

        {/* If we arrived with a draft (from right-click), show creation form */}
        {draft && !activeWashroom && (
          <div className="review-section" style={{ textAlign: 'left' }}>
            <h3>Create New Bathroom</h3>
            <div style={{ display: 'grid', gap: 10 }}>
              <label>
                Name
                <input type="text" value={form.park_name} onChange={(e) => setForm({ ...form, park_name: e.target.value })} style={{ width: '100%', padding: 8 }} />
              </label>
              <label>
                Type
                <input type="text" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={{ width: '100%', padding: 8 }} />
              </label>
              <label>
                Location
                <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={{ width: '100%', padding: 8 }} />
              </label>
              <label>
                Accessibility
                <input type="checkbox" checked={form.wheelchair_access} onChange={(e) => setForm({ ...form, wheelchair_access: e.target.checked })} style={{ marginLeft: 8 }} />
              </label>
              <label>
                Hours
                <input type="text" value={form.summer_hours} onChange={(e) => setForm({ ...form, summer_hours: e.target.value })} style={{ width: '100%', padding: 8 }} />
              </label>
              <label>
                Area
                <input type="text" value={form.geo_local_area} onChange={(e) => setForm({ ...form, geo_local_area: e.target.value })} style={{ width: '100%', padding: 8 }} />
              </label>
              <label>
                Notes
                <input type="text" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} style={{ width: '100%', padding: 8 }} />
              </label>
              <button onClick={handleCreateBathroom} className="back-button">Save Bathroom</button>
            </div>
          </div>
        )}

        {/* Review Section */}
        <div className="review-section">
          <h3>📝 Leave a Review</h3>
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
          <SubmitButton onSelect={handleSelect} />
        </div>

        {/* Card Footer */}
        <div className="card-footer">
          <button onClick={handleBackToMap} className="back-button">
            ← Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
