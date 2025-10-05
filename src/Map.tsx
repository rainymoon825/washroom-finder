import "./App.css";
import LeafletMap from "./component/LeafletMap";

function Map() {
  return (
    <>
      <header>
        <h1 className = "Header">Vancouver Washroom Finder</h1>
      </header>
      <main>
        <div id="map" style={{ height: "100vh", width: "100%" }}>
          <LeafletMap />
        </div>
      </main>
    </>
  );
}

export default Map;
