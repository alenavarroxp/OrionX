import { useAtom } from "jotai";
import { Send, UploadIcon } from "lucide-react";
import { useState } from "react";
import { geminiAPI } from "../api/gemini";
import { Message, messagesAtom } from "../atoms/messageAtom";
import { setAnimation } from "../babylon/entity/assistant";
import { destroyTalkDots, setTalkDots } from "../babylon/interface/elements";
import { orionXTalk } from "./orionX/utils/OrionX";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ChatInput() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useAtom(messagesAtom);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleSend = async () => {
    if (value.trim() !== "") {
      console.log("Mensaje enviado:", value);
      await sendMessage(value);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      console.log("Contenido del archivo:", text);
      setFileContent(text);
    }
  };

  const sendMessage = async (input: string) => {
    setValue("");
    setTalkDots();

    const prompt = fileContent ? `${input}\n\nAquí está el contenido del archivo:\n${fileContent}` : input;

    try {
      const response = await geminiAPI(prompt);
      setAnimation("Character|Audio_2");
      destroyTalkDots();

      const newMessage: Message = {
        id: messages.length + 1,
        text: response,
        sender: "OrionX",
        replyTo: input,
        date: new Date(),
        isTyping: true,
      };

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...newMessage, text: "" }
        ]);
        orionXTalk(newMessage, setMessages);
      }, 500);
    } catch (error) {
      console.error("Error al obtener la respuesta de Gemini:", error);
      destroyTalkDots();
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-grow bg-gray-700 text-white border-gray-600 py-6 rounded-xl"
      />
      <Button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 py-6 px-4 rounded-xl"
        disabled={value.trim() === ""}
      >
        <Send className="h-4 w-4" />
      </Button>

      {/* Input de archivo oculto */}
      <input
        type="file"
        accept=".txt,.md" // Tipos de archivo permitidos
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />

      {/* Botón personalizado para cargar archivos */}
      <label htmlFor="file-upload" className="ml-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl flex items-center">
        <UploadIcon className="h-4 w-4" />
      </label>
    </>
  );
}
