import { Message, messagesAtom } from "@/atoms/messageAtom";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { orionXTalk } from "./utils/OrionX";
import MarkdownViewer from "../MarkdownViewer";

export default function OrionXChat() {
  const [messages, setMessages] = useAtom(messagesAtom);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true); // Estado para rastrear si estamos al fondo

  useEffect(() => {
    if (chatContainerRef.current) {
      // Si estamos al fondo, desplazamos hacia abajo
      if (isAtBottom) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }
  }, [messages, isAtBottom]); // Agregar isAtBottom para controlar el desplazamiento

  // Función para verificar si el usuario está al fondo
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current || {};
    if (scrollTop + clientHeight >= scrollHeight - 5) { // Un margen de 5px
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  useEffect(() => {
    const initialMessage: Message = {
      id: 1,
      text: "Welcome to OrionX Virtual Assistant. How can I help you?",
      sender: "OrionX",
      replyTo: undefined,
      date: new Date(),
      isTyping: true,
    };

    setTimeout(() => {
      setMessages([{
        ...initialMessage,
        text: "",
      }]);

      orionXTalk(initialMessage, setMessages);
    }, 3000);
  }, [setMessages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      ref={chatContainerRef}
      onScroll={handleScroll} // Agregar el evento de desplazamiento
      className="text-white px-4 rounded-lg w-full h-full text-lg font-semibold overflow-y-auto"
      style={{ maxHeight: "80vh" }}
    >
      {messages.map((msg) => (
        <div key={msg.id} className="mb-2">
          {msg.replyTo && <div className="text-xs text-gray-400">Replying to: {msg.replyTo}</div>}
          <div className="text-xs text-gray-400 flex justify-between items-center">
            <p className="text-sm font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">{msg.sender}</p>
            <p>{formatTime(msg.date)}</p>
          </div>
          <MarkdownViewer text={msg.text} />
        </div>
      ))}
    </div>
  );
}
