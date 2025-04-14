import React from 'react';
import { Message } from '../types';
import { Satellite, User, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  message: Message;
  isDarkMode: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isDarkMode }) => {
  const isAssistant = message.role === 'assistant';
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className={`flex space-x-3 ${isAssistant ? (isDarkMode ? 'bg-gray-800' : 'bg-white') : ''} p-4 rounded-lg`}>
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
        isAssistant ? (isDarkMode ? 'bg-blue-900' : 'bg-blue-100') : (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
      }`}>
        {isAssistant ? (
          <Satellite className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        ) : (
          <User className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        )}
      </div>
      <div className="flex-1">
        <div className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {isAssistant ? 'EarthGPT' : 'You'}
        </div>
        <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                const code = String(children).replace(/\n$/, '');
                
                if (match) {
                  return (
                    <div className="relative group">
                      <button
                        onClick={() => handleCopyCode(code)}
                        className={`absolute right-2 top-2 p-1 rounded ${
                          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                      >
                        {copiedCode === code ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        )}
                      </button>
                      <SyntaxHighlighter
                        style={isDarkMode ? oneDark : oneLight}
                        language={match[1]}
                        PreTag="div"
                        {...(props as any)}
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="mb-4" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4" {...props} />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
          {message.image && (
            <div className="mt-4">
              <img 
                src={message.image} 
                alt="Uploaded satellite image" 
                className="max-w-2xl rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;