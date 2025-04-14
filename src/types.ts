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

export interface OpenRouterResponse {
  /** Standard OpenAI format response */
  choices?: Array<{
    message: {
      content: string;
    };
  }>;
  
  /** OpenRouter wrapped format */
  result?: {
    message: {
      content: string;
    };
  };
  
  /** Direct message format */
  message?: {
    content: string;
  };
  
  /** Error response format */
  error?: {
    message: string;
    code?: string;
  };
}

export type APIResponse = 
  | OpenRouterResponse 
  | string 
  | Array<{content: string}>;
