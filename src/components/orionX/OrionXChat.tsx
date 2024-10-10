import { Message, messagesAtom } from "@/atoms/chatAtom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { orionXTalk } from "./utils/OrionX";

export default function OrionXChat() {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [text, setText] = useState("");

  useEffect(() => {
    const initialMessage: Message = {
      id: 1, // Primer mensaje
      text: "Welcome to OrionX Virtual Assistant. How can I help you?",
      sender: "OrionX", // El mensaje es del asistente
      replyTo: undefined, // No hay un mensaje al que se responde
      date: new Date(),
    };
    // Usar orionXTalk para manejar el efecto de escritura
    setTimeout(() => {
      orionXTalk(initialMessage.text, setText);
      setMessages([initialMessage]);
    }, 3000);

  }, [setMessages]);

  return (
    <div className="text-white p-4 rounded-lg w-full h-full text-lg font-semibold">
     {text}
    </div>
  );
}
