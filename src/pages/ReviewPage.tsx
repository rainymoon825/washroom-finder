import { useLocation, useNavigate } from "react-router-dom";
import "./ReviewPage.css";
import SubmitButton from "../component/SubmitButton";

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { washroom } = location.state || {};
  
  const handleSelect = () => {
    let reviews = JSON.parse(localStorage.getItem("reviewlist") || "[]");
    reviews.push({
      UserID: 1, 
      Review: "This is a review of the washroom", 
      Rating: 5, 
      Timestamp: 1717507200
    });
    alert("Review Submitted!");
  };

  const handleBackToMap = () => {
    navigate('/map');
  };

  if (!washroom) {
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
            <h1>🚽 {washroom.park_name || "Mystery Washroom"}</h1>
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
            {getWashroomType(washroom.type)}
          </div>
        </div>

        {/* Card Stats */}
        <div className="card-stats">
          <div className="stat-row">
            <span className="stat-label">📍 Location</span>
            <span className="stat-value">{washroom.location || "Unknown"}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">♿ Accessibility</span>
            <span className="stat-value">
              {getAccessibilityIcon(washroom.wheelchair_access)} {washroom.wheelchair_access || "Unknown"}
            </span>
          </div>
          <div className="stat-row">
            <span className="stat-label">🕒 Hours</span>
            <span className="stat-value">{washroom.summer_hours || "Unknown"}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">🏘️ Area</span>
            <span className="stat-value">{washroom.geo_local_area || "Unknown"}</span>
          </div>
        </div>

        {/* Card Description */}
        <div className="card-description">
          <p>A reliable public restroom facility located in Vancouver. 
            {washroom.note && ` ${washroom.note}`}
          </p>
        </div>

        {/* Review Section */}
        <div className="review-section">
          <h3>📝 Leave a Review</h3>
          <div className="rating-display">
            <span>Current Rating: ⭐⭐⭐⭐⭐ 5.0</span>
          </div>
          <textarea
            placeholder="Share your experience with this washroom..."
            className="review-textarea"
            rows={4}
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
