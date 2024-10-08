import { useEffect } from "react";
import { setEngine } from "./babylon/core/engine";
import OrionXTItle from "./components/OrionXTItle";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      setEngine("canvas");
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-900 w-screen h-screen relative overflow-hidden">
      <div className="bg-black bg-opacity-20">
        <OrionXTItle />
      </div>
      <canvas
        id="canvas"
        className="w-full h-full absolute top-0 left-0 pointer-events-none"
      />
    </div>
  );
}

export default App;
