---

# EarthGPT Interface

## Overview

EarthGPT Interface is a cutting-edge React-based web application for analyzing LISS-4 satellite imagery and handling general queries through an AI interface. It combines modern web technologies to deliver a ChatGPT-like experience with advanced image analysis features.

---

## Features

### Core Functionality
- **AI-Powered Chat Interface**: Interact with AI models via OpenRouter API.
- **Satellite Image Analysis**: Upload and analyze LISS-4 satellite imagery.
- **Persistent Chat History**: Save and revisit chats through local storage integration.
- **Multiple Chat Sessions**: Manage multiple conversation threads effortlessly.
- **Image Upload Support**: Supports satellite image uploads up to 10MB.
- **Markdown Response Rendering**: Offers rich response formatting with syntax highlighting.

### User Interface
- **Dark/Light Mode**: Switch between dark and light themes.
- **Responsive Design**: Optimized layout using Tailwind CSS for any device.
- **Code Highlighting**: Syntax highlighting with copy functionality for code blocks.
- **Loading States**: Clear visual feedback during API interactions.
- **Error Handling**: Robust error management with user-friendly messages.
- **Sidebar Navigation**: Convenient access to chat history and settings.

### Technical Features
- **TypeScript Integration**: Full type safety throughout the application.
- **Modern React Patterns**: Utilizes React 18 and functional components.
- **Environment Variable Support**: Securely manages API keys.
- **Local Storage Management**: Efficiently handles chat history with quota awareness.
- **Markdown Processing**: Supports GitHub Flavored Markdown (GFM).

---

## Technical Stack

### Core Technologies
- **React**: ^18.3.1
- **TypeScript**: ^5.5.3
- **Vite**: ^5.4.2
- **Tailwind CSS**: ^3.4.1

### Key Dependencies
- **axios**: ^1.6.7 – HTTP client for API requests.
- **lucide-react**: ^0.344.0 – Icon components for enhanced UI.
- **react-markdown**: ^9.0.1 – Renders Markdown responses.
- **react-syntax-highlighter**: ^15.5.0 – Highlights syntax in code blocks.
- **remark-gfm**: ^4.0.0 – Adds GitHub Flavored Markdown support.

### Development Tools
- **@vitejs/plugin-react**: ^4.3.1
- **@tailwindcss/typography**: ^0.5.10
- **eslint**: ^9.9.1
- **autoprefixer**: ^10.4.18
- **postcss**: ^8.4.35

---

## Project Structure

```plaintext
earth-gpt-interface/
├── src/
│   ├── components/
│   │   └── ChatMessage.tsx  # Chat message component
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/
├── .env                     # Environment variables
├── index.html               # HTML entry point
├── package.json             # Project configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── vite.config.ts           # Vite configuration
```

---

## Setup and Installation

### Prerequisites
- **Node.js**: v16 or higher.
- **npm**: v7 or higher.

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

3. Configure environment variables:
   Create a `.env` file with the following content:
   ```env
   VITE_DEEPSEEK_API_KEY=your_openrouter_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Configuration

### Environment Variables
- `VITE_DEEPSEEK_API_KEY`: API key for OpenRouter.

### Constants
- **Image Upload**: Maximum file size of 10MB.
- **Base64 Encoding**: Maximum size of 13MB.
- **Chat Sessions**: Limit of 10 chats.
- **Messages per Chat**: Maximum of 50 messages.

---

## Core Components

### App.tsx
Handles:
- Chat state and image upload management.
- Communication with the API.
- Dark mode toggling.
- Interaction with local storage.
- Error handling and feedback.

### ChatMessage.tsx
Features:
- Renders messages with Markdown support.
- Highlights syntax in code blocks.
- Provides a copy-to-clipboard function.

---

## API Integration

### OpenRouter API
- **Endpoint**: `https://openrouter.ai/api/v1/chat/completions`
- **Model**: `meta-llama/llama-4-maverick:free`.

#### Request Format
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

### Error Codes
- **401**: Invalid API key.
- **403**: Access forbidden.
- **429**: Rate limit exceeded.
- **402**: Payment required.

---

## Development

### Code Style
- Functional components and React hooks.
- TypeScript strict mode.
- ESLint and Prettier for consistent formatting.

### Best Practices
- Modular component design.
- Efficient state and local storage management.
- Comprehensive error handling.

---

## Build and Deployment

### Commands
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

---

## License

Licensed under the [MIT License](LICENSE).

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your branch.
5. Create a pull request.

---

## Support

For questions or support, contact [Karthik Raj](https://github.com/karthikkraj).

---
