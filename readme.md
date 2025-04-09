# EarthGPT Interface

## Overview

EarthGPT Interface is a React-based web application that leverages the OpenRouter API to provide an AI assistant specialized in analyzing LISS-4 satellite imagery and answering general questions. It features a chat interface, image upload capabilities, dark mode, and local storage for chat history.

## Features

-   **Chat Interface**: A user-friendly interface for interacting with the EarthGPT AI assistant.
-   **Satellite Image Analysis**: Ability to upload and analyze LISS-4 satellite imagery.
-   **Dark Mode**: Toggle between light and dark themes for comfortable viewing.
-   **Chat History**: Local storage to persist and display recent chat history.
-   **Lucide React Icons**: Utilizes Lucide React for consistent and visually appealing icons.
-   **Markdown Support**: Renders AI responses in Markdown format with syntax highlighting for code snippets.

## Technologies Used

-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A build tool that provides a fast and optimized development experience.
-   **TypeScript**: A typed superset of JavaScript that enhances code quality and maintainability.
-   **Tailwind CSS**: A utility-first CSS framework for styling the application.
-   **Lucide React**: A library of beautiful and consistent icons.
-   **Axios**: A promise-based HTTP client for making API requests.
-   **React Markdown**: A component for rendering Markdown content.
-   **React Syntax Highlighter**: A component for syntax highlighting in code snippets.
-   **Remark GFM**: A plugin for React Markdown to support GitHub Flavored Markdown.
-   **OpenRouter API**: An API used to access various AI models, including those capable of analyzing satellite imagery.

## Setup Instructions

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd earth-gpt-interface
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Variables**:

    Create a `.env` file in the root directory and add your OpenRouter API key:

    ```
    VITE_DEEPSEEK_API_KEY=your_openrouter_api_key
    ```

4.  **Run the application**:

    ```bash
    npm run dev
    ```

    Open your browser and navigate to `http://localhost:5173` to view the application.

## Project Structure

-   `.env`: Environment variables (API keys, configuration settings).
-   `eslint.config.js`: ESLint configuration for linting JavaScript and TypeScript code.
-   `index.html`: The main HTML file.
-   `package.json`: Node.js package file containing project dependencies and scripts.
-   `postcss.config.js`: PostCSS configuration for Tailwind CSS and Autoprefixer.
-   `src/`: Source code directory.
    -   `App.tsx`: The main application component.
    -   `components/`: Reusable React components.
        -   `ChatMessage.tsx`: Component for displaying individual chat messages.
    -   `types.ts`: TypeScript interfaces for data types used in the application.
    -   `index.css`: Global CSS file for Tailwind CSS directives.
    -   `main.tsx`: Entry point for the React application.
    -   `vite-env.d.ts`: TypeScript declaration file for Vite environment variables.
-   `tailwind.config.js`: Tailwind CSS configuration file.
-   `tsconfig.json`: TypeScript configuration file.
-   `vite.config.ts`: Vite configuration file.

## Code Highlights

### API Request

The `sendMessage` function in `src/App.tsx` sends requests to the OpenRouter API:

```typescript
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
Chat History Management
The application uses local storage to persist chat history. The useEffect hook in src/App.tsx manages saving and limiting the number of chats:


useEffect(() => {
  try {
    const limitedChats = chats.slice(0, MAX_CHATS).map(chat => ({
      ...chat,
      messages: chat.messages.slice(-MAX_MESSAGES_PER_CHAT)
    }));
    localStorage.setItem('chats', JSON.stringify(limitedChats));
    if (limitedChats.length !== chats.length) {
      setChats(limitedChats);
    }
  } catch (error) {
    console.error('Error saving chats to localStorage:', error);
    const limitedChats = chats.slice(0, MAX_CHATS);
    setChats(limitedChats);
  }
}, [chats]);
Markdown Rendering
The ChatMessage component in src/components/ChatMessage.tsx uses react-markdown to render Markdown content:


<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({node, inline, className, children, ...props}) {
      // Code block rendering logic
    }
  }}
>
  {message.content}
</ReactMarkdown>
Error Handling
The application includes error handling for API requests and local storage operations. It displays user-friendly error messages in the chat interface.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

License
MIT
