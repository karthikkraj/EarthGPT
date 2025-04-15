---

# EarthGPT

EarthGPT is an AI assistant specialized in analyzing LISS-4 satellite imagery and answering general questions. It provides an interactive chat interface where users can upload satellite images, including GeoTIFF files with metadata extraction, and receive detailed analysis powered by the OpenRouter API using the Gemini 2.5 Pro model.

---

## Features

- Interactive chat interface supporting multiple chat sessions and message history
- Upload and analyze satellite images, including GeoTIFF files with automatic metadata extraction and coordinate transformation
- Dark mode toggle for comfortable viewing
- Markdown rendering with syntax highlighting for AI responses
- Drag-and-drop and file upload support for images
- Responsive UI built with React 18 and Tailwind CSS
- Persistent chat history and dark mode preferences saved in local storage
- Robust error handling and loading states

---

## Technologies Used

- React 18
- TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Axios (HTTP client)
- lucide-react (icons)
- proj4 (coordinate transformations)
- geotiff (GeoTIFF image parsing)
- OpenRouter API (Gemini 2.5 Pro model)

---

## User Interface

- Dark mode toggle for comfortable viewing
- Responsive design using Tailwind CSS for various devices
- Sidebar navigation for chat sessions and settings
- Drag-and-drop and file upload support for images
- Loading indicators during API requests
- Clear error messages displayed to users

---

## Technical Features

- Full TypeScript integration for type safety
- React 18 functional components with hooks
- Environment variable support for API keys
- Local storage management with quota awareness
- Markdown rendering with GitHub Flavored Markdown (GFM)
- Syntax highlighting for code blocks in AI responses
- GeoTIFF metadata extraction and coordinate transformation using proj4

---

## Limits and Constraints

- Maximum image upload size: 40MB
- Maximum base64 image size after encoding: ~52MB
- Maximum number of chat sessions stored: 10
- Maximum messages per chat: 50

---

## Core Components

### App.tsx
- Manages chat state, image uploads, API communication, dark mode, and local storage
- Handles user input, message formatting, and error handling

### ChatMessage.tsx
- Renders chat messages with markdown support
- Provides syntax highlighting and copy-to-clipboard functionality

---

## Project Structure

```
earth-gpt-interface/
├── src/
│   ├── components/              # React UI components (e.g., ChatMessage.tsx)
│   ├── utils/                   # Utility functions (e.g., message.ts)
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # React entry point
│   ├── types.ts                # TypeScript interfaces and types
│   ├── proj4.d.ts              # Type declarations for proj4
│   └── index.css               # Global styles
├── dist/                       # Production build output
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── tsconfig.app.json           # TypeScript app configuration
├── tsconfig.json               # TypeScript base configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── vite-env.d.ts               # Vite environment typings
└── vite.config.ts              # Vite configuration
```

---

## Setup and Installation

### Prerequisites

- Node.js v16 or higher
- npm v7 or higher

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

3. Create a `.env` file in the project root with your OpenRouter API key:

   ```
   VITE_DEEPSEEK_API_KEY=your_openrouter_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

---

## Usage

- Use the chat interface to ask questions or upload satellite images for analysis.
- Upload GeoTIFF files to extract metadata and coordinate information.
- Toggle dark mode using the button in the sidebar.
- Manage multiple chat sessions with persistent history.
- View AI responses rendered with markdown and syntax highlighting.

---

## API Integration

- **Endpoint:** `https://openrouter.ai/api/v1/chat/completions`
- **Model:** `google/gemini-2.5-pro-exp-03-25:free`
- **Request:** Sends chat messages including text and optional image URLs.
- **Response:** AI-generated text responses with markdown formatting.

---

## Development

- Written in TypeScript with React functional components and hooks.
- Uses Tailwind CSS for styling and responsive design.
- Chat history and dark mode preferences are saved in local storage.
- Handles image uploads with size limits and GeoTIFF metadata extraction.
- Robust error handling for API and network issues.

---

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

For questions or support, contact [Karthik Raj](https://github.com/karthikkraj).

---

