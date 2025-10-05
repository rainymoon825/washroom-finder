import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuButton from "./component/MenuButton";
import MapPage from "./MapPage";
import Washroom from "./pages/Washroom";
import LeaderboardButton from "./component/LeaderboardButton";
import Leaderboard from "./Leaderboard";
import ReviewPage from "./pages/ReviewPage";
import Profile from "./Profile";
import ProfileButton from "./component/ProfileButton";
import "./component/Button.css";

function App() {
    const handleSelect = () => {};
  
    return (
      <Router>
        <div className="TopRow">
            <MenuButton onSelect={handleSelect} />
            <ProfileButton />
          </div>
          <LeaderboardButton onSelect={handleSelect} />
  
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
      </Router>
    );
  }
  

export default App;
