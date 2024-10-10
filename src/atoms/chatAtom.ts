import { atom } from 'jotai';

// Define un tipo para los mensajes
export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'OrionX';
  replyTo?: string;
  date: Date;
};

export const messagesAtom = atom<Message[]>([]);


