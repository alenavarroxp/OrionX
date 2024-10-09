import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ChatInput() {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim() !== "") {
      console.log("Mensaje enviado:", value);
      setValue("");
    }
  };

  return (<>
      <Input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-grow bg-gray-700 text-white border-gray-600 py-6"
      />
      <Button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 py-6 px-4"
      >
        <Send className="h-4 w-4" />
      </Button>
      </>
  );
}
