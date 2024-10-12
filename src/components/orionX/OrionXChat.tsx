import { Message, messagesAtom } from "@/atoms/messageAtom";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { orionXTalk } from "./utils/OrionX";

export default function OrionXChat() {
  const [messages, setMessages] = useAtom(messagesAtom);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
          <span className="text-base text-justify">{msg.text}</span>
        </div>
      ))}
    </div>
  );
}
