import { useEffect } from "react";
import { getEngine, setEngine } from "./babylon/core/engine";
import ChatInput from "./components/ChatInput";
import OrionXChat from "./components/orionX/OrionXChat";
import OrionXTitle from "./components/orionX/OrionXTitle";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const engine = getEngine();
    if (canvas && !engine) {
      setEngine("canvas");
    }
  }, []);

  return (
    <div className="bg-gray-800 w-screen h-screen flex flex-col overflow-hidden">
      <canvas
        id="canvas"
        className="z-0 absolute bg-gray-800 inset-0 w-full h-full pointer-events-none"
      />
      <div className=" relative z-20 w-1/3 h-full bg-gray-800 bg-opacity-40">
        <OrionXTitle />
        <OrionXChat />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800">
        <div className="flex space-x-2 w-1/3 mx-auto">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

export default App;
