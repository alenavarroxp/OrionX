import { geminiAPI } from "@/api/gemini";
import { Message, messagesAtom } from "@/atoms/messageAtom";
import { setAnimation } from "@/babylon/entity/assistant";
import { destroyTalkDots, setTalkDots } from "@/babylon/interface/elements";
import { useAtom } from "jotai";
import { FileIcon, Send, UploadIcon } from "lucide-react";
import { useState } from "react";
import { orionXTalk } from "../orionX/utils/OrionX";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ChatInput() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useAtom(messagesAtom);
  const [fileContent, setFileContent] = useState<{ name: string; text: string } | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (value.trim() !== "" && !isSending) {
      await sendMessage(value);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      setFileContent({ name: file.name, text: text });
    }
  };

  const sendMessage = async (input: string) => {
    setIsSending(true);
    setValue("");
    setTalkDots();

    const prompt = `\nUser: ${input} ${fileContent ? `\n${fileContent.name}: ${fileContent.text}` : ""}`;

    setFileContent(null);

    try {
      const response = await geminiAPI(prompt);
      setAnimation("Character|Audio_2");
      destroyTalkDots();

      if (!response) return;

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
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-col items-center w-full rounded-xl">
      {fileContent && (
        <div className=" bg-gray-600 p-2 rounded-xl text-white text-sm mb-2 w-fit flex items-center gap-2">
          <FileIcon className="size-4" />
          <p>{fileContent.name}</p>
        </div>
      )}
      <div className="flex items-center space-x-2 w-full p-2 rounded-xl bg-gray-700">
        <Input
          type="text"
          placeholder="Write a message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow text-white border-0 placeholder:text-muted-foreground focus-visible:ring-offset-0 focus-visible:ring-0 overflow-x-auto whitespace-nowrap"
          disabled={isSending}
        />

        <input
          type="file"
          accept=".*"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />

        <label htmlFor="file-upload" className="ml-2 cursor-pointer bg-transparent hover:bg-gray-600 transition text-white py-2 px-2 rounded-xl flex items-center">
          <UploadIcon className="size-4" />
        </label>

        <Button
          onClick={handleSend}
          className="bg-transparent hover:bg-gray-600 transition px-2 py-2 rounded-xl ml-2"
          disabled={value.trim() === "" || isSending} // Deshabilitar botón de enviar durante el envío
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
