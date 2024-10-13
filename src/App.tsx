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
    <div className=" w-screen h-screen flex flex-col overflow-hidden font-onest">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="scrollbar relative w-full h-full bg-opacity-40 flex">
        <div className="flex flex-col justify-between h-full w-2/3 ">
          <OrionXTitle />
          <OrionXChat />
        </div>
        <canvas id="canvas" className="w-1/3 h-full  pointer-events-none">
        </canvas>
        <div className="absolute top-0 right-0 bg-transparent bg-opacity-40 w-1/3 h-full">
          <div className=" flex h-full items-end justify-center">
            <div className="gap-2 flex flex-col mb-8 items-center">
              <ButtonIA prompt="Suggest a creative question about the future of technology in daily life. In less 15 words" />
              <ButtonIA prompt="Propose a fun question about the mysteries of the ocean and its creatures. In 15 words" />
              <ButtonIA prompt="Generate an intriguing question about how art influences culture and society today. In 15 words" />
            </div>
          </div>
        </div>
      </div>

      <div className="z-10 w- p-4">
        <div className="flex space-x-2 w-2/3">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

export default App;
