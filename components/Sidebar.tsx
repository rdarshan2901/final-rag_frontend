"use client";

import { useState } from "react";
import { Plus, MessageSquare, Trash2, BookOpen, X } from "lucide-react";
import { Chat } from "@/lib/types";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  chats, activeChatId, onNewChat, onSelectChat, onDeleteChat,
  isOpen, onToggle,
}: SidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" onClick={onToggle} />
      )}

      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-30 flex flex-col
          lg:relative lg:translate-x-0 lg:z-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ width: 260, background: "var(--sidebar-bg)", borderRight: "1px solid var(--border)" }}
      >
        {/* ── Header / Logo ── */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#7B2525" }}>
              <BookOpen size={15} className="text-white" />
            </div>
            <div>
              <p className="text-[13px] leading-none" style={{ color: "#2a1818", fontWeight: 600 }}>Vethathiri</p>
              <p className="text-[10px] mt-0.5" style={{ color: "#8a7563" }}>Wisdom · RAG</p>
            </div>
          </div>
          <button onClick={onToggle} className="lg:hidden p-1.5 rounded-md transition-colors" style={{ color: "#5a4438" }}>
            <X size={16} />
          </button>
        </div>

        {/* ── New Chat ── */}
        <div className="px-3 pb-3">
          <button className="new-chat-btn" onClick={onNewChat}>
            <Plus size={15} style={{ color: "#7B2525" }} />
            <span>New conversation</span>
          </button>
        </div>

        <div style={{ borderTop: "1px solid var(--border)" }} />

        {/* ── Chat History ── */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {chats.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <MessageSquare size={20} className="mx-auto mb-2" style={{ color: "#BA6A4C" }} />
              <p className="text-xs" style={{ color: "#8a7563" }}>No conversations yet</p>
            </div>
          ) : (
            <>
              <p className="px-2 pb-1.5 text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#7B2525" }}>Recent</p>
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="relative group"
                  onMouseEnter={() => setHovered(chat.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <button
                    className={`chat-item ${activeChatId === chat.id ? "active" : ""}`}
                    onClick={() => onSelectChat(chat.id)}
                  >
                    <MessageSquare size={13} style={{ flexShrink: 0, opacity: 0.6, color: "#7B2525" }} />
                    <span className="truncate">{chat.title}</span>
                  </button>
                  {hovered === chat.id && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id); }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors"
                      style={{ color: "#8a7563" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#7B2525")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#8a7563")}
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "12px 16px" }}>
          <p className="text-[11px]" style={{ color: "#5a4438", lineHeight: 1.5 }}>
            Answers sourced from the books of<br />
            <span style={{ color: "#7B2525", fontWeight: 600 }}>Yogiraj Vethathiri Maharishi</span>
          </p>
        </div>
      </aside>
    </>
  );
}
