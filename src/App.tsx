import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./component/Navigation";
import MapPage from "./MapPage";
import Washroom from "./pages/Washroom";
import Leaderboard from "./Leaderboard";
import ReviewPage from "./pages/ReviewPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/washroom" element={<Washroom />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/review" element={<ReviewPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
