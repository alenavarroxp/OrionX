import { useAtom } from "jotai";
import { Send } from "lucide-react";
import { useState } from "react";
import { Message, messagesAtom } from "../atoms/chatAtom";
import { setAnimation } from "../babylon/entity/assistant";
import { destroyTalkDots, setTalkDots } from "../babylon/interface/elements";
import { orionXTalk } from "./orionX/utils/OrionX";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ChatInput() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useAtom(messagesAtom);

  const handleSend = () => {
    if (value.trim() !== "") {
      console.log("Mensaje enviado:", value);

      setValue(""); // Limpiar el input
      setTalkDots(); // Mostrar los puntos animados de typing
      setTimeout(() => {
        setAnimation("Character|Audio_2"); // Iniciar animación del personaje
        destroyTalkDots(); // Eliminar los puntos animados

        const newMessage: Message = {
          id: messages.length + 1, // Asegurarse que el id sea único
          text: value, // Texto enviado por el usuario
          sender: "user", // El remitente es el usuario
          replyTo: undefined,
          date: new Date(),
          isTyping: true, // Empezar el typing effect
        };

        // Agregar el mensaje vacío (para el efecto typing)
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...newMessage, text: "" } // Texto vacío para comenzar el typing
        ]);

        // Iniciar el efecto de typing usando orionXTalk
        setTimeout(() => {
          orionXTalk(newMessage, setMessages); // Ejecutar el typing effect
        }, 2000); // Simular un pequeño retraso antes de iniciar typing

      }, 2000); // Retraso para sincronizar con la animación del personaje
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
    </>
  );
}
