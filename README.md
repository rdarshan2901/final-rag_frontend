# Aura AI — Premium Chat Frontend

A production-ready, premium AI chat UI built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. Connects to your FastAPI backend at `http://127.0.0.1:8000/chat`.

---

## ✨ Features

- 🌑 Stunning dark glassmorphism design
- 💬 Smooth animated chat bubbles (user right, AI left)
- ⌨️ Typing indicator with pulsing dots
- 📱 Fully responsive — mobile & desktop
- 🗂️ Sidebar with chat history & new chat
- ⚡ Enter to send, Shift+Enter for newline
- 🎯 Auto-scroll to latest message
- 🚨 Graceful error handling
- 🕐 Message timestamps
- 💡 Quick-start suggestion prompts

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start your FastAPI backend
Make sure it's running at `http://127.0.0.1:8000` with this endpoint:

```
POST /chat
Body: { "message": "Hello" }
Response: { "question": "Hello", "answer": "AI response" }
```

### 3. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
ai-chat/
├── app/
│   ├── globals.css        # Custom design tokens, animations
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main chat page (state management)
├── components/
│   ├── Sidebar.tsx        # Chat history sidebar
│   ├── ChatBubble.tsx     # Message bubble + typing indicator
│   ├── ChatInput.tsx      # Textarea + send button
│   └── EmptyState.tsx     # Welcome screen with suggestions
├── lib/
│   ├── api.ts             # FastAPI integration
│   ├── types.ts           # TypeScript types
│   └── nanoid.ts          # ID generator
├── tailwind.config.ts     # Custom theme tokens
└── package.json
```

---

## ⚙️ API Configuration

Edit `lib/api.ts` to change the backend URL:

```ts
const API_BASE = "http://127.0.0.1:8000";
```

---

## 🧱 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| React 18 | UI |
| Tailwind CSS 3 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |

---

## 📦 Build for Production

```bash
npm run build
npm start
```
