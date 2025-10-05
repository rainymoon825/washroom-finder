import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MenuButton from "./component/MenuButton";
import Map from "./Map";
import LoadOrVerify from "./LoadOrVerify"
import Washroom from "./pages/Washroom";

function App() {
  const handleSelect = (item: { label: any; }) => {
    console.log("Selected:", item.label);
  };

  return (
    <Router>
      <div>
        <MenuButton onSelect={handleSelect} />

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
