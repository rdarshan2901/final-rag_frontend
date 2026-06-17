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
  selected: string[];
  onToggle: (book: string) => void;
  onClear?: () => void;
  onSelectAll?: () => void;
}

export default function BookSelector({
  selected,
  onToggle,
  onClear,
  onSelectAll,
}: BookSelectorProps) {
  return (
    <div className="px-3 pb-3">
      {/* Section label */}
      <div className="flex items-center justify-between px-1 pb-2">
        <p
          className="text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: "#7B2525" }}
        >
          Select a Book
        </p>
        <div className="flex items-center gap-2">
          {onSelectAll && (
            <button
              type="button"
              onClick={onSelectAll}
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "#607456" }}
            >
              All
            </button>
          )}
          {onClear && selected.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "#BA6A4C" }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Scrollable book list */}
      <div
        className="space-y-1 overflow-y-auto pr-0.5"
        style={{ maxHeight: 340 }}
      >
        {BOOKS.map((book) => {
          const isActive = selected.includes(book);
          return (
            <label
              key={book}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[13px] transition-all duration-150 cursor-pointer"
              style={{
                background: isActive ? "#EEE0CC" : "transparent",
                color: isActive ? "#7B2525" : "#5a4438",
                border: isActive
                  ? "1px solid #BA6A4C"
                  : "1px solid transparent",
                fontWeight: isActive ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#f4ead6";
                  e.currentTarget.style.color = "#2a1818";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#5a4438";
                }
              }}
            >
              {/* Checkbox */}
              <span
                className="w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0"
                style={{
                  background: isActive ? "#7B2525" : "#FBF7EE",
                  border: isActive
                    ? "1.5px solid #7B2525"
                    : "1.5px solid #BA6A4C",
                  transition: "background 0.15s, border-color 0.15s",
                }}
              >
                {isActive && <Check size={12} className="text-white" strokeWidth={3} />}
              </span>

              {/* Hidden native checkbox (a11y) */}
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => onToggle(book)}
                className="sr-only"
                aria-label={book}
              />

              <BookOpen
                size={12}
                style={{
                  color: isActive ? "#7B2525" : "#BA6A4C",
                  flexShrink: 0,
                  opacity: 0.85,
                }}
              />
              <span className="truncate leading-snug">{book}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
