"use client";

import { useEffect, useState, useRef } from "react";
import { BookOpen, User } from "lucide-react";
import { Message } from "@/lib/types";

function formatTime(d: Date) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(d);
}

/* Typewriter hook — streams characters one by one */
function useTypewriter(text: string, enabled: boolean, speed = 18) {
  const [displayed, setDisplayed] = useState(enabled ? "" : text);
  const [done, setDone] = useState(!enabled);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled) { setDisplayed(text); setDone(true); return; }
    // Reset when text changes (new message)
    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    const tick = () => {
      if (indexRef.current < text.length) {
        // Chunk a few chars per tick so longer texts don't take forever
        const chunk = text.slice(indexRef.current, indexRef.current + 2);
        setDisplayed(prev => prev + chunk);
        indexRef.current += 2;
        rafRef.current = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    rafRef.current = setTimeout(tick, speed);
    return () => { if (rafRef.current) clearTimeout(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return { displayed, done };
}

/* Lightweight markdown formatter */
function formatAIText(text: string): string {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^/, "<p>").replace(/$/, "</p>");
}

interface ChatBubbleProps {
  message: Message;
  index: number;
  /** Pass true only for the very last AI message so it animates; older ones render instantly */
  animate?: boolean;
}

export default function ChatBubble({ message, index, animate = false }: ChatBubbleProps) {
  const isUser = message.role === "user";
  const shouldType = !isUser && animate && !message.isError;

  const { displayed, done } = useTypewriter(message.content, shouldType, 14);

  const body = shouldType ? displayed : message.content;

  return (
    <div
      className="msg-enter flex gap-4 px-4 py-5"
      style={{
        animationDelay: `${Math.min(index * 20, 120)}ms`,
        background: isUser ? "transparent" : "#f4ead6",
        borderBottom: "1px solid #d9c9ad",
      }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 pt-0.5">
        {isUser ? (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ background: "#2a1818" }}
          >
            <User size={14} />
          </div>
        ) : (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "#EEE0CC", border: "1.5px solid #BA6A4C" }}
          >
            <BookOpen size={14} style={{ color: "#7B2525" }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name + time */}
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-[13px] font-semibold" style={{ color: isUser ? "#2a1818" : "#7B2525" }}>
            {isUser ? "You" : "Vethathiri Wisdom"}
          </span>
          <span className="text-[11px]" style={{ color: "#8a7563" }}>
            {formatTime(message.timestamp)}
          </span>
        </div>

        {/* Body */}
        {isUser ? (
          <p className="text-[15px] leading-relaxed" style={{ color: "#2a1818" }}>
            {message.content}
          </p>
        ) : (
          <div
            className="prose-ai text-[15px] leading-relaxed"
            style={{ color: message.isError ? "#ef4444" : "#2a1818" }}
            dangerouslySetInnerHTML={{
              __html: message.isError ? `⚠️ ${body}` : formatAIText(body),
            }}
          />
        )}

        {/* Blinking cursor while typing */}
        {shouldType && !done && (
          <span
            className="inline-block w-[2px] h-[1em] ml-0.5 align-middle rounded-sm"
            style={{ background: "#7B2525", animation: "cursorBlink 0.8s step-start infinite" }}
          />
        )}
      </div>
    </div>
  );
}

/* ── Thinking Indicator ── */
export function TypingIndicator() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 500);
    return () => clearInterval(t);
  }, []);

  const dotStr = ".".repeat(dots);

  return (
    <div
      className="flex gap-4 px-4 py-5"
      style={{ background: "#f4ead6", borderBottom: "1px solid #d9c9ad" }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 pt-0.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "#EEE0CC", border: "1.5px solid #BA6A4C" }}
        >
          <BookOpen size={14} style={{ color: "#7B2525" }} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[13px] font-semibold" style={{ color: "#7B2525" }}>
            Vethathiri Wisdom
          </span>
        </div>

        {/* "The Guru is thinking..." with animated dots */}
        <div className="flex items-center gap-2">
          {/* Bouncing dots */}
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full dot1" style={{ background: "#7B2525" }} />
            <div className="w-1.5 h-1.5 rounded-full dot2" style={{ background: "#7B2525" }} />
            <div className="w-1.5 h-1.5 rounded-full dot3" style={{ background: "#7B2525" }} />
          </div>
          <span
            className="text-[13px] italic"
            style={{ color: "#5a1a1a", minWidth: 170 }}
          >
            The Guru is thinking{dotStr}
          </span>
        </div>
      </div>
    </div>
  );
}
