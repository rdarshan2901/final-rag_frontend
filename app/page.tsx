"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, BookOpen } from "lucide-react";
import { nanoid } from "@/lib/nanoid";
import { sendMessage } from "@/lib/api";
import { Message, Chat } from "@/lib/types";
import Sidebar from "@/components/Sidebar";
import ChatBubble, { TypingIndicator } from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import EmptyState from "@/components/EmptyState";

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lastAiMsgId, setLastAiMsgId] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId) ?? null;
  const messages = activeChat?.messages ?? [];

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (window.innerWidth < 1024) setSidebarOpen(false);
  }, []);

  const createNewChat = (): Chat => {
    const chat: Chat = { id: nanoid(), title: "New conversation", messages: [], createdAt: new Date() };
    setChats(prev => [chat, ...prev]);
    setActiveChatId(chat.id);
    return chat;
  };

  const handleNewChat = () => {
    createNewChat();
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setLastAiMsgId(null);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleDeleteChat = (id: string) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) {
      const rest = chats.filter(c => c.id !== id);
      setActiveChatId(rest[0]?.id ?? null);
    }
  };

  const handleSend = async (text: string) => {
    // Guard: book must be selected (ChatInput also validates, this is a safety net)
    if (!selectedBook) return;

    let chatId = activeChatId;
    if (!chatId) { chatId = createNewChat().id; }

    const userMsg: Message = { id: nanoid(), role: "user", content: text, timestamp: new Date() };

    setChats(prev => prev.map(c =>
      c.id === chatId
        ? {
            ...c,
            messages: [...c.messages, userMsg],
            title: c.messages.length === 0 ? text.slice(0, 44) + (text.length > 44 ? "…" : "") : c.title,
          }
        : c
    ));

    setIsLoading(true);

    try {
      const res = await sendMessage(text, selectedBook);
      const aiId = nanoid();
      const aiMsg: Message = {
        id: aiId,
        role: "assistant",
        content: res.answer,
        timestamp: new Date(),
      };
      setLastAiMsgId(aiId);
      setChats(prev => prev.map(c =>
        c.id === chatId ? { ...c, messages: [...c.messages, aiMsg] } : c
      ));
    } catch {
      const errId = nanoid();
      const errMsg: Message = {
        id: errId, role: "assistant",
        content: "Could not reach the backend at http://127.0.0.1:8000. Please start the FastAPI server.",
        timestamp: new Date(), isError: true,
      };
      setLastAiMsgId(errId);
      setChats(prev => prev.map(c =>
        c.id === chatId ? { ...c, messages: [...c.messages, errMsg] } : c
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#fff" }}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(v => !v)}
        selectedBook={selectedBook}
        onSelectBook={setSelectedBook}
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* ── Header ── */}
        <header
          className="flex-shrink-0 flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: "1px solid #f0f0f0", background: "#fff" }}
        >
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#6b6b6b" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f4f4f4")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <BookOpen size={15} style={{ color: "#d97706", flexShrink: 0 }} />
            <span className="text-sm font-medium truncate" style={{ color: "#1a1a1a" }}>
              {activeChat && activeChat.title !== "New conversation"
                ? activeChat.title
                : "Vethathiri Maharishi · Wisdom Chat"}
            </span>
          </div>

          {/* Book pill in header */}
          {selectedBook && (
            <span
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium flex-shrink-0"
              style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" }}
            >
              <BookOpen size={9} />
              {selectedBook}
            </span>
          )}

          <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isLoading ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
            <span className="text-[11px]" style={{ color: "#bbb" }}>
              {isLoading ? "The Guru is thinking…" : "Ready"}
            </span>
          </div>
        </header>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#fff" }}>
          {messages.length === 0 && !isLoading ? (
            <EmptyState onSuggestion={handleSend} selectedBook={selectedBook} />
          ) : (
            <div className="max-w-3xl mx-auto">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <ChatBubble
                    key={msg.id}
                    message={msg}
                    index={i}
                    animate={msg.id === lastAiMsgId}
                  />
                ))}
                {isLoading && (
                  <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} className="h-6" />
            </div>
          )}
        </div>

        {/* ── Input ── */}
        <div
          className="flex-shrink-0 px-4 pb-5 pt-4"
          style={{ borderTop: "1px solid #f0f0f0", background: "#fff" }}
        >
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSend={handleSend}
              isLoading={isLoading}
              selectedBook={selectedBook}
            />
            <p className="text-center text-[11px] mt-2.5" style={{ color: "#ccc" }}>
              Answers are derived from Yogiraj Vethathiri Maharishi's published works via RAG.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
