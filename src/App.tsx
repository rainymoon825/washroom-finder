import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MenuButton from "./component/MenuButton";
import Map from "./Map";
import LoadOrVerify from "./LoadOrVerify"
import Washroom from "./pages/Washroom";
import LeaderboardButton from "./component/LeaderboardButton";

function App() {
  const handleSelect = () => {};

  return (
    <Router>
      <div>
        <MenuButton onSelect={handleSelect} />
        <LeaderboardButton onSelect={handleSelect}/>

        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/load_or_verify" element={<LoadOrVerify />} />
          <Route path="/washroom" element={<Washroom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
