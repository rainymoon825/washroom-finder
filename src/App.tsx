import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MenuButton from "./component/MenuButton";
import Map from "./Map";
import LoadOrVerify from "./LoadOrVerify"
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
        <LeaderboardButton onSelect={handleSelect}/>

        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/map" element={<Map />} />
          <Route path="/load_or_verify" element={<LoadOrVerify />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/washroom" element={<Washroom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
