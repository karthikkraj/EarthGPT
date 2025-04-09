# EarthGPT Interface

## Overview

EarthGPT Interface is a sophisticated React-based web application designed for analyzing LISS-4 satellite imagery and handling general queries through an AI interface. Built with modern web technologies, it provides a ChatGPT-like experience with additional capabilities for image analysis.

## Features

### Core Functionality
- **AI-Powered Chat Interface**: Seamless communication with AI models through OpenRouter API
- **Satellite Image Analysis**: Upload and analyze LISS-4 satellite imagery
- **Persistent Chat History**: Local storage integration for chat preservation
- **Multiple Chat Sessions**: Create and manage multiple conversation threads
- **Image Upload Support**: Handles satellite image uploads up to 10MB
- **Markdown Response Rendering**: Beautiful rendering of AI responses with syntax highlighting

### User Interface
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Fully responsive layout using Tailwind CSS
- **Code Highlighting**: Syntax highlighting for code blocks with copy functionality
- **Loading States**: Visual feedback during API operations
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Sidebar Navigation**: Easy access to chat history and controls

### Technical Features
- **TypeScript Integration**: Full type safety throughout the application
- **Modern React Patterns**: Built with React 18 and functional components
- **Environment Variable Support**: Secure API key management
- **Local Storage Management**: Efficient chat history persistence with quota handling
- **Markdown Processing**: Support for GitHub Flavored Markdown

## Technical Stack

### Core Technologies
- **React**: ^18.3.1
- **TypeScript**: ^5.5.3
- **Vite**: ^5.4.2
- **Tailwind CSS**: ^3.4.1

### Key Dependencies
- **axios**: ^1.6.7 - HTTP client for API requests
- **lucide-react**: ^0.344.0 - Icon components
- **react-markdown**: ^9.0.1 - Markdown rendering
- **react-syntax-highlighter**: ^15.5.0 - Code syntax highlighting
- **remark-gfm**: ^4.0.0 - GitHub Flavored Markdown support

### Development Tools
- **@vitejs/plugin-react**: ^4.3.1
- **@tailwindcss/typography**: ^0.5.10
- **eslint**: ^9.9.1
- **autoprefixer**: ^10.4.18
- **postcss**: ^8.4.35

## Project Structure

```
earth-gpt-interface/
├── src/
│   ├── components/
│   │   └── ChatMessage.tsx    # Chat message component
│   ├── types.ts              # TypeScript interfaces
│   ├── App.tsx               # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/
├── .env                     # Environment variables
├── index.html              # HTML entry point
├── package.json            # Project configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── vite.config.ts         # Vite configuration
```

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/karthikkraj/EarthGPT
   cd earth-gpt-interface
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   VITE_DEEPSEEK_API_KEY=your_openrouter_api_key
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Configuration

### Environment Variables
- `VITE_DEEPSEEK_API_KEY`: OpenRouter API key for AI model access

### Constants
- `MAX_IMAGE_SIZE`: 10MB (image upload limit)
- `MAX_BASE64_LENGTH`: 13MB (encoded image size limit)
- `MAX_CHATS`: 10 (maximum stored chats)
- `MAX_MESSAGES_PER_CHAT`: 50 (messages per chat limit)

## Core Components

### App.tsx
The main application component handles:
- Chat state management
- Image upload processing
- API communication
- Dark mode toggling
- Local storage interaction
- Error handling

### ChatMessage.tsx
Responsible for:
- Message rendering
- Markdown processing
- Code block handling
- Syntax highlighting
- Copy functionality

## API Integration

### OpenRouter API
- **Base URL**: `https://openrouter.ai/api/v1/chat/completions`
- **Model**: `meta-llama/llama-4-maverick:free`
- **Features**:
  - Text completion
  - Image analysis
  - Context awareness

### Request Format
```typescript
{
  model: MODEL_ID,
  messages: [
    {
      role: "user",
      content: string | [
        { type: "text", text: string },
        { type: "image_url", image_url: { url: string } }
      ]
    }
  ],
  max_tokens: 1000
}
```

## Error Handling

### API Errors
- 401: Invalid API key
- 403: Access forbidden
- 429: Rate limit exceeded
- 402: Payment required

### Local Storage
- Quota exceeded handling
- Data persistence fallbacks
- Chat history management

## Performance Considerations

### Image Processing
- Size limits enforcement
- Base64 encoding optimization
- Efficient storage management

### State Management
- Chat history pagination
- Message limiting
- Local storage optimization

## Browser Support

### Minimum Requirements
- Modern Chromium-based browsers
- Firefox 60+
- Safari 12+
- Edge 79+

### Features Requiring Support
- Local Storage API
- Fetch API
- ES6+ JavaScript
- CSS Grid/Flexbox

## Development Guidelines

### Code Style
- Functional components
- TypeScript strict mode
- ESLint configuration
- Prettier formatting

### Best Practices
- Component composition
- React hooks usage
- Error boundary implementation
- Performance optimization

## Build and Deployment

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## Support

For support, please open an issue in the repository or contact the maintainers.
