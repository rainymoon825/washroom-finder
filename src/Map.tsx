import { useState } from "react";
import "./App.css";
import LeafletMap from "./component/LeafletMap";

function Map() {
  return (
    <>
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

export default Map;
