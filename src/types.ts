export interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}