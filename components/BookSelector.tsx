"use client";

import { BookOpen, Check } from "lucide-react";

export const BOOKS = [
  "Bio Magnetism",
  "Bliss Beyond Words",
  "Gravity of Gravity",
  "Highlights of Unified Force",
  "History of the Universe",
  "Mind",
  "Principles of Life",
  "Prosperity of India",
  "Simplified Physical Exercises",
  "The Story of My Life",
  "The World Order of Holistic Unity",
  "Universal Magnetism",
];

interface BookSelectorProps {
  selected: string;
  onSelect: (book: string) => void;
}

export default function BookSelector({ selected, onSelect }: BookSelectorProps) {
  return (
    <div className="px-3 pb-3">
      {/* Section label */}
      <p
        className="px-1 pb-2 text-[10px] font-semibold tracking-widest uppercase"
        style={{ color: "#bbb" }}
      >
        Select a Book
      </p>

      {/* Scrollable book list */}
      <div
        className="space-y-1 overflow-y-auto pr-0.5"
        style={{ maxHeight: 260 }}
      >
        {BOOKS.map((book) => {
          const isActive = selected === book;
          return (
            <button
              key={book}
              onClick={() => onSelect(isActive ? "" : book)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[13px] transition-all duration-150"
              style={{
                background: isActive ? "#fef3c7" : "transparent",
                color: isActive ? "#92400e" : "#6b6b6b",
                border: isActive ? "1px solid #fde68a" : "1px solid transparent",
                fontWeight: isActive ? 600 : 400,
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = "#f9f9f9";
                  e.currentTarget.style.color = "#1a1a1a";
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#6b6b6b";
                }
              }}
            >
              {/* Icon */}
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                style={{
                  background: isActive ? "#d97706" : "#f0f0f0",
                  transition: "background 0.15s",
                }}
              >
                {isActive
                  ? <Check size={10} className="text-white" />
                  : <BookOpen size={10} style={{ color: "#aaa" }} />
                }
              </div>
              <span className="truncate leading-snug">{book}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
