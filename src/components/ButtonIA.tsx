import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { geminiAPI } from "../api/gemini";
import { Message, messagesAtom } from "../atoms/messageAtom";
import { setAnimation } from "../babylon/entity/assistant";
import { destroyTalkDots, setTalkDots } from "../babylon/interface/elements";
import { orionXTalk } from "./orionX/utils/OrionX";

interface ButtonIAProps {
    prompt: string;
}

export default function ButtonIA({ prompt }: ButtonIAProps) {
    const [messages, setMessages] = useAtom(messagesAtom);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        const fetchResponse = async () => {
            let response;
            let attempts = 0;

            while (attempts < 5) {
                try {
                    response = await geminiAPI(prompt);
                    if (response && response !== "The AI model is not available to respond to that prompt. Please try again with a different prompt.") {
                        setText(response);
                        return;
                    }
                } catch (error) {
                    console.error("Error fetching response:", error);
                }

                attempts++;
                await new Promise(resolve => setTimeout(resolve, 2000)); 
            }

           
            setText("");
        };

        fetchResponse();
    }, [prompt]);

    const sendMessage = async () => {
        let response;
        let attempts = 0;

        while (attempts < 5) {
            try {
                response = await geminiAPI(prompt);
                if (response && response !== "The AI model is not available to respond to that prompt. Please try again with a different prompt.") {
                    setText(response);
                    return;
                }
            } catch (error) {
                console.error("Error fetching response:", error);
            }

            attempts++;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        setText("");
    }

    const handleClick = async () => {
        try {
            setTalkDots();
            sendMessage();
            const response = await geminiAPI(text);
            setAnimation("Character|Audio_2");
            destroyTalkDots();

            if (!response) return;

            const newMessage: Message = {
                id: messages.length + 1,
                text: response,
                sender: "OrionX",
                replyTo: text,
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

    return (<>
        {text && <div className="bg-gradient-to-r from-sky-600 to-blue-700 w-[400px] h-fit p-2 rounded-xl text-white hover:scale-105 transition cursor-pointer" onClick={handleClick}>{text}</div>}
    </>

    )
}
