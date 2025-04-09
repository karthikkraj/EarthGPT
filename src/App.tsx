import React, { useState, useEffect } from 'react';
import { Satellite, Send, Upload, Moon, Sun, Plus, MessageSquare, Trash2 } from 'lucide-react';
import { Message, Chat } from './types';
import ChatMessage from './components/ChatMessage';
import axios from 'axios';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [chats, setChats] = useState<Chat[]>(() => {
    const savedChats = localStorage.getItem('chats');
    return savedChats ? JSON.parse(savedChats) : [];
  });
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `# Welcome to EarthGPT! 👋

I'm an AI assistant specialized in analyzing LISS-4 satellite imagery and answering general questions.`,
    }
  ]);
  const [input, setInput] = useState('');
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Maximum allowed image size in bytes (10MB)
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
  // Maximum allowed base64 string length (approximately 13MB)
  const MAX_BASE64_LENGTH = 13 * 1024 * 1024;
  // Maximum number of chats to store
  const MAX_CHATS = 10;
  // Maximum number of messages per chat
  const MAX_MESSAGES_PER_CHAT = 50;

  // OpenRouter API URL
  const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  // The OpenRouter model ID
  const MODEL_ID = 'meta-llama/llama-4-maverick:free';

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    try {
      // Keep only the most recent chats up to MAX_CHATS
      const limitedChats = chats.slice(0, MAX_CHATS).map(chat => ({
        ...chat,
        // Limit messages in each chat
        messages: chat.messages.slice(-MAX_MESSAGES_PER_CHAT)
      }));
      
      localStorage.setItem('chats', JSON.stringify(limitedChats));
      // Update state with limited chats if necessary
      if (limitedChats.length !== chats.length) {
        setChats(limitedChats);
      }
    } catch (error) {
      console.error('Error saving chats to localStorage:', error);
      // If storage fails, keep only recent chats in memory
      const limitedChats = chats.slice(0, MAX_CHATS);
      setChats(limitedChats);
    }
  }, [chats]);

  const startNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [messages[0]],
      createdAt: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages([messages[0]]);
    setCurrentImage(null);
  };

  const deleteChat = (chatId: string, e: React.MouseEvent) => {
    // Stop the click from bubbling up to parent elements
    e.stopPropagation();
    
    // Remove the chat from the list
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // If the deleted chat was the current one, reset to welcome message
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([messages[0]]);
      setCurrentImage(null);
    }
  };

  // Generate a descriptive title from user's message content
  const generateChatTitle = (content: string) => {
    // If it's an image upload message, create a title about image analysis
    if (content.startsWith('Uploaded image:')) {
      const fileName = content.replace('Uploaded image: ', '');
      return `Image Analysis: ${fileName.slice(0, 20)}`;
    }
    
    // For text messages, use the first sentence or first 40 chars
    let title = content;
    
    // Find first sentence (ending with .!? and space or end of string)
    const sentenceMatch = content.match(/^[^.!?]*[.!?](?:\s|$)/);
    if (sentenceMatch) {
      title = sentenceMatch[0].trim();
    }
    
    // Limit length, but try to break at word boundaries
    if (title.length > 40) {
      const truncated = title.substring(0, 40);
      const lastSpaceIndex = truncated.lastIndexOf(' ');
      
      // If there's a space in the truncated part, break there
      if (lastSpaceIndex > 20) { // Ensure we don't cut too short
        title = truncated.substring(0, lastSpaceIndex);
      } else {
        title = truncated;
      }
      
      title += '...';
    }
    
    return title;
  };

  const formatResponse = (text: string) => {
    // Add markdown formatting if not present
    if (!text.includes('#') && !text.includes('*') && !text.includes('```')) {
      const paragraphs = text.split('\n\n');
      return paragraphs.map(p => {
        if (p.includes(':')) {
          return `**${p.split(':')[0]}:** ${p.split(':').slice(1).join(':')}`;
        }
        return p;
      }).join('\n\n');
    }
    return text;
  };

  const sendMessage = async (question: string) => {
    if (!import.meta.env.VITE_DEEPSEEK_API_KEY) {
      console.error('API key missing');
      throw new Error('API key is not configured. Please check your environment variables.');
    }

    try {
      console.log('Initiating API request to OpenRouter...');
      
      // Format the request for OpenRouter API
      const messages = [
        {
          role: "user",
          content: currentImage ? [
            {
              type: "text",
              text: question
            },
            {
              type: "image_url",
              image_url: {
                url: currentImage
              }
            }
          ] : question
        }
      ];

      const requestData = {
        model: MODEL_ID,
        messages,
        max_tokens: 1000
      };

      console.log('Request configuration:', {
        url: API_URL,
        model: MODEL_ID,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer [KEY_PRESENT]'
        }
      });

      const response = await axios({
        method: 'post',
        url: API_URL,
        data: requestData,
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'EarthGPT'
        },
        timeout: 60000
      });

      console.log('API Response status:', response.status);
      
      if (response.status === 200) {
        console.log('Response data structure:', response.data);
        
        if (response.data.choices && response.data.choices.length > 0) {
          const messageContent = formatResponse(response.data.choices[0].message.content);
          console.log('Successfully received API response');
          return messageContent;
        } else {
          console.error('Invalid response structure:', response.data);
          throw new Error('Unexpected response format from OpenRouter API');
        }
      } else {
        throw new Error(`API Error: ${response.data?.error || 'Unknown error'} (Status: ${response.status})`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          statusText: error.response?.statusText
        });

        if (error.response) {
          console.error('API Error Response:', {
            status: error.response.status,
            data: error.response.data
          });
          
          switch (error.response.status) {
            case 401:
              throw new Error('Invalid API key. Please check your OpenRouter API key.');
            case 403:
              throw new Error('Access forbidden. Please check your API permissions or subscription plan.');
            case 429:
              throw new Error('Too many requests. You may have exceeded your OpenRouter rate limits.');
            case 402:
              throw new Error('Payment required. You may need to add credits to your OpenRouter account.');
            default:
              throw new Error(`API Error: ${error.response.data?.error?.message || error.response.data?.error || 'Unknown error'} (Status: ${error.response.status})`);
          }
        } else if (error.request) {
          console.error('No response received:', {
            request: error.request
          });
          
          if (!navigator.onLine) {
            throw new Error('You appear to be offline. Please check your internet connection and try again.');
          }
          
          throw new Error(
            '### Connection Error\n\n' +
            'Unable to reach the OpenRouter API server. This could be due to:\n\n' +
            '1. Network connectivity issues\n' +
            '2. API server unavailability\n' +
            '3. Request timeout\n\n' +
            'Please check your connection and try again.'
          );
        } else {
          throw new Error(`### Error\n\nError preparing the API request: ${error.message}`);
        }
      } else {
        console.error('Non-Axios error:', error);
        throw error;
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        console.error('File too large:', file.size);
        alert('Image size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        if (imageUrl.length > MAX_BASE64_LENGTH) {
          console.error('Base64 image too large:', imageUrl.length);
          alert('Image size too large after encoding. Please use a smaller image.');
          return;
        }

        setCurrentImage(imageUrl);
        const userMessage = `Uploaded image: ${file.name}`;
        const newMessages = [...messages, 
          { 
            role: 'user', 
            content: userMessage,
            image: imageUrl
          },
          {
            role: 'assistant',
            content: "## Image Received\n\nI've received the satellite image. What would you like to know about it? You can:\n\n- Ask about specific objects or features\n- Request a general analysis\n- Inquire about particular regions\n- Get measurements or estimates"
          }
        ];
        
        // Create or update chat with generated title
        if (currentChatId) {
          setChats(prev => prev.map(chat => 
            chat.id === currentChatId 
              ? { ...chat, messages: newMessages, title: generateChatTitle(userMessage) }
              : chat
          ));
        } else {
          // If no current chat, create one
          startNewChatWithMessages(newMessages, generateChatTitle(userMessage));
        }
        
        setMessages(newMessages);
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        alert('Error reading the image file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const startNewChatWithMessages = (initialMessages: Message[], title: string) => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: title,
      messages: initialMessages,
      createdAt: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuestion = input;
    setInput('');
    setIsLoading(true);

    try {
      console.log('Processing user question:', userQuestion);
      
      // Add user message
      const newMessages = [...messages, { role: 'user', content: userQuestion }];
      
      // If this is the first user message in a new chat, generate a title
      const isFirstUserMessage = messages.length === 1 && messages[0].role === 'assistant';
      
      if (isFirstUserMessage) {
        const chatTitle = generateChatTitle(userQuestion);
        
        if (currentChatId) {
          // Update existing chat with the new title
          setChats(prev => prev.map(chat => 
            chat.id === currentChatId 
              ? { ...chat, messages: newMessages, title: chatTitle }
              : chat
          ));
        } else {
          // Create a new chat with title
          startNewChatWithMessages(newMessages, chatTitle);
        }
      } else {
        // Not the first message, just update messages
        updateCurrentChat(newMessages);
      }
      
      setMessages(newMessages);

      // Get AI response
      const answer = await sendMessage(userQuestion);

      // Add AI response
      const messagesWithResponse = [...newMessages, {
        role: 'assistant',
        content: answer
      }];
      
      updateCurrentChat(messagesWithResponse);
      setMessages(messagesWithResponse);
      
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      
      // Add error message to chat
      const messagesWithError = [...messages, {
        role: 'assistant',
        content: error instanceof Error ? 
          `### Error\n\n${error.message}` : 
          '### Error\n\nAn unexpected error occurred. Please try again.'
      }];
      
      updateCurrentChat(messagesWithError);
      setMessages(messagesWithError);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCurrentChat = (newMessages: Message[]) => {
    // Limit the number of messages
    const limitedMessages = newMessages.slice(-MAX_MESSAGES_PER_CHAT);
    
    if (currentChatId) {
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: limitedMessages }
          : chat
      ));
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex`}>
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-all duration-300 overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Satellite className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>EarthGPT</h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
          
          <button
            onClick={startNewChat}
            className={`w-full flex items-center justify-center px-3 py-2 ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
            } text-white rounded-lg transition-colors mb-4`}
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>New Chat</span>
          </button>

          <div className="space-y-2 mb-4">
            {chats.map(chat => (
              <div
                key={chat.id}
                className={`w-full rounded-lg group ${
                  currentChatId === chat.id
                    ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
                    : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
                }`}
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setCurrentChatId(chat.id);
                      setMessages(chat.messages);
                      if (chat.messages.some(m => m.image)) {
                        setCurrentImage(chat.messages.find(m => m.image)?.image || null);
                      } else {
                        setCurrentImage(null);
                      }
                    }}
                    className="flex-1 text-left px-3 py-2 flex items-center space-x-2"
                  >
                    <MessageSquare className={`h-4 w-4 flex-shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <span className={`truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {chat.title}
                    </span>
                  </button>
                  <button
                    onClick={(e) => deleteChat(chat.id, e)}
                    className={`p-2 ${
                      isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                    } transition-colors opacity-0 group-hover:opacity-100`}
                    title="Delete chat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <label className={`w-full flex items-center justify-center px-3 py-2 ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
          } text-white rounded-lg cursor-pointer transition-colors`}>
            <Upload className="h-5 w-5 mr-2" />
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} isDarkMode={isDarkMode} />
          ))}
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
                isDarkMode ? 'border-blue-400' : 'border-blue-600'
              }`}></div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className={`flex-1 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
              } px-4 py-2 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
              } text-white rounded-lg px-4 py-2 flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors`}
            >
              <Send className="h-5 w-5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;