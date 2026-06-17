"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { ArrowUp, BookOpen, AlertCircle } from "lucide-react";

interface ChatInputProps {
  onSend: (msg: string) => void;
  isLoading: boolean;
  selectedBooks: string[];
}

export default function ChatInput({ onSend, isLoading, selectedBooks }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const hasBooks = selectedBooks.length > 0;

  useEffect(() => { ref.current?.focus(); }, []);

  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  }, [value]);

  // Hide warning once a book is selected
  useEffect(() => {
    if (hasBooks) setShowWarning(false);
  }, [hasBooks]);

  const send = () => {
    const t = value.trim();
    if (!t || isLoading) return;
    if (!hasBooks) { setShowWarning(true); return; }
    setShowWarning(false);
    onSend(t);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const canSend = value.trim().length > 0 && !isLoading && hasBooks;

  const placeholder = hasBooks
    ? selectedBooks.length === 1
      ? `Ask about "${selectedBooks[0]}"…`
      : `Ask across ${selectedBooks.length} selected books…`
    : "Select a book first, then ask your question…";

  return (
    <div className="space-y-2">
      {/* ── Selected book badges ── */}
      <div className="flex flex-wrap items-center gap-2 px-1">
        <span className="text-[11px]" style={{ color: "#8a7563" }}>
          Selected {selectedBooks.length === 1 ? "Book" : "Books"}:
        </span>
        {hasBooks ? (
          selectedBooks.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
              style={{
                background: "#EEE0CC",
                color: "#7B2525",
                border: "1px solid #BA6A4C",
              }}
            >
              <BookOpen size={10} />
              {b}.pdf
            </span>
          ))
        ) : (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px]"
            style={{
              background: "#f4ead6",
              color: "#8a7563",
              border: "1px solid #d9c9ad",
            }}
          >
            None selected
          </span>
        )}
      </div>

      {/* ── Warning ── */}
      {showWarning && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px]"
          style={{ background: "#f4ead6", border: "1px solid #BA6A4C", color: "#7B2525" }}
        >
          <AlertCircle size={13} style={{ flexShrink: 0 }} />
          Please tick at least one book on the right before sending a message.
        </div>
      )}

      {/* ── Input box ── */}
      <div
        className="input-wrap rounded-2xl transition-all duration-200"
        style={{
          border: showWarning ? "1.5px solid #BA6A4C" : "1.5px solid var(--border-input)",
          background: "#FBF7EE",
          boxShadow: "0 2px 12px rgba(91,38,38,0.07)",
        }}
      >
        <textarea
          ref={ref}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          disabled={isLoading}
          placeholder={placeholder}
          rows={1}
          className="w-full bg-transparent resize-none px-4 pt-3.5 pb-2 text-[15px] leading-relaxed focus:outline-none disabled:opacity-50"
          style={{ color: "#2a1818", minHeight: 52, maxHeight: 180 }}
        />
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <p className="text-[11px]" style={{ color: "#8a7563" }}>
            {isLoading ? "The Guru is thinking…" : "Shift+Enter for new line · Enter to send"}
          </p>
          <button
            className="send-btn"
            onClick={send}
            disabled={!canSend}
            title={!hasBooks ? "Select a book first" : "Send"}
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
