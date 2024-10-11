import { Message } from "../../../atoms/chatAtom";

export function orionXTalk(
  message: Message,
  setMessages: (updater: (prev: Message[]) => Message[]) => void
) {
  let i = 0;
  const speed = 7.5;

  const typingEffect = setInterval(() => {
    const newText = message.text.slice(0, i + 1);

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === message.id ? { ...msg, text: newText } : msg
      )
    );

    i++;

    if (i >= message.text.length) {
      clearInterval(typingEffect);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, isTyping: false } : msg
        )
      );
    }
  }, speed);
}
