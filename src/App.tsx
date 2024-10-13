import { useEffect } from "react";
import { setGeminiAPI } from "./api/gemini";
import { getEngine, setEngine } from "./babylon/core/engine";
import ButtonIA from "./components/ButtonIA";
import ChatInput from "./components/input/ChatInput";
import OrionXChat from "./components/orionX/OrionXChat";
import OrionXTitle from "./components/orionX/OrionXTitle";

function App() {
  useEffect(() => {
    setGeminiAPI()
    const canvas = document.getElementById("canvas");
    const engine = getEngine();
    if (canvas && !engine) {
      setEngine("canvas");
    }
  }, []);

  return (
    <div className="bg-gray-800 w-screen h-screen flex flex-col overflow-hidden font-onest">

      <div className="scrollbar relative w-full h-full bg-gray-800 bg-opacity-40 flex">
        <div className="flex flex-col justify-between h-full w-2/3 ">
          <OrionXTitle />
          <OrionXChat />
        </div>
        <canvas id="canvas" className="w-1/3 h-full bg-gray-800 pointer-events-none">
        </canvas>
        <div className="absolute top-0 right-0 bg-transparent bg-opacity-40 w-1/3 h-full">
          <div className=" flex h-full items-end justify-center">
            <div className="gap-2 flex flex-col mb-8 items-center">
              <ButtonIA />
              <ButtonIA />
              <ButtonIA />
            </div>
          </div>
        </div>
      </div>

      <div className="z-10 w- p-4 bg-gray-800">
        <div className="flex space-x-2 w-2/3">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

export default App;
