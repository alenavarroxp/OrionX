import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useEffect } from "react";
import { getEngine, setEngine } from "./babylon/core/engine";
import OrionXTitle from "./components/OrionXTitle";

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
      <div className="z-10 p-4 w-full">
        <OrionXTitle />
      </div>

      <div className="flex-grow relative">
        <canvas
          id="canvas"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>

      <div className="w-full p-4 bg-gray-800">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={2}
            onChange={() => {}}
            className="flex-grow bg-gray-700 text-white border-gray-600"
          />
          <Button onClick={() => {}} className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
