import type { Message } from '../types';

export function createMessage(role: 'user' | 'assistant', content: string, image?: string): Message {
  return {
    role,
    content,
    ...(image && { image })
  };
}
