import { useState } from "react";
import "./Washroom.css";

function Washroom() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
      </div>

      <main>
        <h1>Washroom Page</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/pages/Washroom.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </main>
    </>
  );
}

export default Washroom;
