import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuButton from "./component/MenuButton";
import Map from "./Map";
import LoadOrVerify from "./LoadOrVerify";
import ReviewPage from "./pages/ReviewPage";

function App() {
  const handleSelect = (item: { label: any }) => {};

  return (
    <Router>
      <div>
        <MenuButton onSelect={handleSelect} />

        <Routes>
          <Route path="/map" element={<Map />} />
          <Route path="/load_or_verify" element={<LoadOrVerify />} />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
