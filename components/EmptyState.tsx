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
  selectedBooks: string[];
}

export default function EmptyState({ onSuggestion, selectedBooks }: EmptyStateProps) {
  const hasBooks = selectedBooks.length > 0;

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10">
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md"
        style={{ background: "#EEE0CC", border: "1.5px solid #BA6A4C" }}
      >
        <BookOpen size={26} style={{ color: "#7B2525" }} />
      </div>

      <h1 className="text-2xl font-semibold text-center mb-1" style={{ color: "#2a1818", letterSpacing: "-0.02em" }}>
        Vethathiri Maharishi Wisdom
      </h1>
      <p className="text-sm text-center max-w-sm mb-1" style={{ color: "#5a4438" }}>
        Ask questions rooted in the teachings, books, and philosophy of
      </p>
      <p className="text-sm font-semibold text-center mb-5" style={{ color: "#7B2525" }}>
        Yogiraj Vethathiri Maharishi
      </p>

      {/* Book selected / not selected notice */}
      {hasBooks ? (
        <div
          className="flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 rounded-xl mb-7 text-sm font-medium max-w-2xl"
          style={{ background: "#EEE0CC", border: "1px solid #BA6A4C", color: "#7B2525" }}
        >
          <BookOpen size={14} />
          <span>Reading from:</span>
          {selectedBooks.map((b) => (
            <span
              key={b}
              className="font-semibold px-2 py-0.5 rounded-md"
              style={{ background: "#FBF7EE", color: "#7B2525", border: "1px solid #BA6A4C" }}
            >
              {b}.pdf
            </span>
          ))}
        </div>
      ) : (
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-7 text-sm"
          style={{ background: "#f4ead6", border: "1px solid #BA6A4C", color: "#7B2525" }}
        >
          <BookOpen size={14} style={{ flexShrink: 0 }} />
          Tick one or more books on the right to begin
        </div>
      )}

      {/* Suggestions — only show if at least one book is selected */}
      {hasBooks && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl">
          {SUGGESTIONS.map(({ icon: Icon, text }) => (
            <button
              key={text}
              className="suggestion-chip flex items-start gap-3 text-left"
              onClick={() => onSuggestion(text)}
            >
              <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#7B2525" }} />
              <span>{text}</span>
            </button>
          ))}
        </div>
      )}

      <p className="mt-8 text-[11px] text-center" style={{ color: "#8a7563" }}>
        Powered by RAG · Answers drawn from Maharishi&apos;s published books
      </p>
    </div>
  );
}
