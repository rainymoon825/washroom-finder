import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuButton from "./component/MenuButton";
import Map from "./MapPage";
import Washroom from "./pages/Washroom";
import LeaderboardButton from "./component/LeaderboardButton";
import Leaderboard from "./Leaderboard";
import ReviewPage from "./pages/ReviewPage";

function App() {
  const handleSelect = () => {};

  return (
    <Router>
      <div>
        <MenuButton onSelect={handleSelect} />
        <LeaderboardButton onSelect={handleSelect} />

        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/map" element={<Map />} />
<<<<<<< HEAD
          <Route path="/load_or_verify" element={<LoadOrVerify />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/review" element={<ReviewPage />} />
=======
          <Route path="/leaderboard" element={<Leaderboard />} />
>>>>>>> 93e63b69ba3d8d626aef245cd058471bbdf53a11
          <Route path="/washroom" element={<Washroom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
