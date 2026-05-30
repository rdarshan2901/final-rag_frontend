"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ArrowUp, BookOpen, AlertCircle } from "lucide-react";

interface ChatInputProps {
  onSend: (msg: string) => void;
  isLoading: boolean;
  selectedBook: string;
}

export default function ChatInput({ onSend, isLoading, selectedBook }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { ref.current?.focus(); }, []);

  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  }, [value]);

  // Hide warning once a book is selected
  useEffect(() => {
    if (selectedBook) setShowWarning(false);
  }, [selectedBook]);

  const send = () => {
    const t = value.trim();
    if (!t || isLoading) return;
    if (!selectedBook) { setShowWarning(true); return; }
    setShowWarning(false);
    onSend(t);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const canSend = value.trim().length > 0 && !isLoading && !!selectedBook;

  return (
    <div className="space-y-2">
      {/* ── Selected book badge ── */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-[11px]" style={{ color: "#9b9b9b" }}>Selected Book:</span>
        {selectedBook ? (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" }}
          >
            <BookOpen size={10} />
            {selectedBook}.pdf
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px]"
            style={{ background: "#f4f4f4", color: "#aaa", border: "1px solid #e5e5e5" }}
          >
            None selected
          </span>
        )}
      </div>

      {/* ── Warning ── */}
      {showWarning && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px]"
          style={{ background: "#fff7ed", border: "1px solid #fed7aa", color: "#c2410c" }}
        >
          <AlertCircle size={13} style={{ flexShrink: 0 }} />
          Please select a book from the sidebar before sending a message.
        </div>
      )}

      {/* ── Input box ── */}
      <div
        className="input-wrap rounded-2xl transition-all duration-200"
        style={{
          border: showWarning ? "1.5px solid #fed7aa" : "1.5px solid var(--border-input)",
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        <textarea
          ref={ref}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          disabled={isLoading}
          placeholder={
            selectedBook
              ? `Ask about "${selectedBook}"…`
              : "Select a book first, then ask your question…"
          }
          rows={1}
          className="w-full bg-transparent resize-none px-4 pt-3.5 pb-2 text-[15px] leading-relaxed focus:outline-none disabled:opacity-50"
          style={{ color: "#1a1a1a", minHeight: 52, maxHeight: 180 }}
        />
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <p className="text-[11px]" style={{ color: "#bbb" }}>
            {isLoading ? "The Guru is thinking…" : "Shift+Enter for new line · Enter to send"}
          </p>
          <button
            className="send-btn"
            onClick={send}
            disabled={!canSend}
            title={!selectedBook ? "Select a book first" : "Send"}
            style={canSend ? { background: "#1a1a1a" } : { background: "#e5e5e5", color: "#aaa" }}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
            ) : (
              <ArrowUp size={15} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
