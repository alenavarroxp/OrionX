import { Message, messagesAtom } from "@/atoms/chatAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { orionXTalk } from "./utils/OrionX";

export default function OrionXChat() {
  const [messages, setMessages] = useAtom(messagesAtom);

  useEffect(() => {
    const initialMessage: Message = {
      id: 1,
      text: "Welcome to OrionX Virtual Assistant. How can I help you?",
      sender: "OrionX",
      replyTo: undefined,
      date: new Date(),
      isTyping: true, // Comienza el typing
    };

    // Primero agrega el mensaje con texto vacío
    setMessages([{
      ...initialMessage,
      text: "", // Texto vacío inicialmente para hacer el efecto typing
    }]);

    // Luego, inicia el efecto typing después de 3 segundos
    setTimeout(() => {
      orionXTalk(initialMessage, setMessages);
    }, 3000);
  }, [setMessages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="text-white  px-4 rounded-lg w-full h-full text-lg font-semibold">

      {messages.map((msg) => (

        <div key={msg.id} className="mb-2">
          <div className="text-xs text-gray-400 flex justify-between items-center">
            <p className="text-sm font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">{msg.sender}</p>
            <p>{formatTime(msg.date)}</p>
          </div>

          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  );
}
