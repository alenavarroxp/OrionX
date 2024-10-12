import { atom } from 'jotai';

// Define un tipo para los mensajes
export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'OrionX';
  replyTo?: string;
  date: Date;
  isTyping: boolean;
};


export const messagesAtom = atom<Message[]>([]);


