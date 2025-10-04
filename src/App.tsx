import { useState } from "react";
import "./App.css";
import LeafletMap from "./component/LeafLetMap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <button type="button" className="MenuButton">
          Find Washroom
        </button>
      </div>
      <div>
        <button type="button" className="MenuButton">
          Load / Verify
        </button>
      </div>

      <header>
        <h1>Vancouver Washroom Finder</h1>
      </header>
      <main>
        <div id="map" style={{ height: "100vh", width: "100%" }}>
          <LeafletMap />
        </div>
      </main>
    </>
  );
}

export default App;
