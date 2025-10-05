import { useLocation } from "react-router-dom";
import "./Washroom.css";

function ReviewPage() {
  const location = useLocation();
  const { washroom } = location.state || {};

  if (!washroom) {
    return <div>No washroom data available.</div>;
  }

  return (
    <div>
      <h1>Information for {washroom.park_name || "Unknown"}</h1>
      <p>
        Location: {washroom.location || "Unknown"} {"(Verified)"}
      </p>
      <p>
        Type: {washroom.type || "Unknown"} {"(Verified)"}
      </p>
      <p>
        Wheelchair Access: {washroom.wheelchair_access || "Unknown"}{" "}
        {"(Verified)"}
      </p>
      <p>
        Hours: {washroom.summer_hours || "Unknown"} {"(Verified)"}
      </p>

      <div>
        <h3 className="LeftAlignContainer">
          <h3 className="LeftAlign">Current Rating: ⭐⭐⭐⭐⭐ 5.0</h3>

          <h3 className="LeftAlign">
            <textarea
              placeholder="Write your review here..."
              rows={5}
              cols={50}
              className="ReviewBox"
            ></textarea>
          </h3>
          <button>Submit</button>
        </h3>
      </div>
    </div>
  );
}

export default ReviewPage;
