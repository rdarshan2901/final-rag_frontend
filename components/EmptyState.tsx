"use client";

import { BookOpen, Heart, Brain, Leaf, Star } from "lucide-react";

const SUGGESTIONS = [
  { icon: Heart, text: "What does Maharishi teach about the nature of the soul?" },
  { icon: Brain, text: "Explain the concept of simplified Kundalini Yoga" },
  { icon: Leaf, text: "What is the path to inner peace according to Vethathiri?" },
  { icon: Star, text: "How does one attain self-realization through his teachings?" },
];

interface EmptyStateProps {
  onSuggestion: (t: string) => void;
  selectedBook: string;
}

export default function EmptyState({ onSuggestion, selectedBook }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10">
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md"
        style={{ background: "#fef3c7", border: "1.5px solid #fde68a" }}
      >
        <BookOpen size={26} style={{ color: "#d97706" }} />
      </div>

      <h1 className="text-2xl font-semibold text-center mb-1" style={{ color: "#1a1a1a", letterSpacing: "-0.02em" }}>
        Vethathiri Maharishi Wisdom
      </h1>
      <p className="text-sm text-center max-w-sm mb-1" style={{ color: "#6b6b6b" }}>
        Ask questions rooted in the teachings, books, and philosophy of
      </p>
      <p className="text-sm font-semibold text-center mb-5" style={{ color: "#d97706" }}>
        Yogiraj Vethathiri Maharishi
      </p>

      {/* Book selected / not selected notice */}
      {selectedBook ? (
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-7 text-sm font-medium"
          style={{ background: "#fef3c7", border: "1px solid #fde68a", color: "#92400e" }}
        >
          <BookOpen size={14} />
          Reading from: <span className="font-semibold">{selectedBook}.pdf</span>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-7 text-sm"
          style={{ background: "#fff7ed", border: "1px solid #fed7aa", color: "#c2410c" }}
        >
          <BookOpen size={14} style={{ flexShrink: 0 }} />
          Select a book from the sidebar to begin
        </div>
      )}

      {/* Suggestions — only show if book is selected */}
      {selectedBook && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl">
          {SUGGESTIONS.map(({ icon: Icon, text }) => (
            <button
              key={text}
              className="suggestion-chip flex items-start gap-3 text-left"
              onClick={() => onSuggestion(text)}
            >
              <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#d97706" }} />
              <span>{text}</span>
            </button>
          ))}
        </div>
      )}

      <p className="mt-8 text-[11px] text-center" style={{ color: "#ccc" }}>
        Powered by RAG · Answers drawn from Maharishi's published books
      </p>
    </div>
  );
}
