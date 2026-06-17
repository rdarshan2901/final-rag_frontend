"use client";

import { BookOpen } from "lucide-react";
import BookSelector, { BOOKS } from "@/components/BookSelector";

interface BookPanelProps {
  selectedBooks: string[];
  onToggleBook: (book: string) => void;
  onClearBooks: () => void;
  onSelectAllBooks: () => void;
}

export default function BookPanel({
  selectedBooks,
  onToggleBook,
  onClearBooks,
  onSelectAllBooks,
}: BookPanelProps) {
  return (
    <aside
      className="hidden lg:flex flex-col"
      style={{
        width: 280,
        background: "var(--sidebar-bg)",
        borderLeft: "1px solid var(--border)",
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "#607456" }}
        >
          <BookOpen size={15} className="text-white" />
        </div>
        <div>
          <p
            className="text-[13px] leading-none"
            style={{ color: "#2a1818", fontWeight: 600 }}
          >
            Library
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: "#8a7563" }}>
            {selectedBooks.length === 0
              ? "None selected"
              : `${selectedBooks.length} selected`}
            {" · "}
            {BOOKS.length} books
          </p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)" }} />

      {/* ── Selector ── */}
      <div className="flex-1 overflow-y-auto pt-3">
        <BookSelector
          selected={selectedBooks}
          onToggle={onToggleBook}
          onClear={onClearBooks}
          onSelectAll={onSelectAllBooks}
        />
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "12px 16px",
        }}
      >
        <p
          className="text-[11px]"
          style={{ color: "#5a4438", lineHeight: 1.5 }}
        >
          Tick one or more books to ground the answers in those texts.
        </p>
      </div>
    </aside>
  );
}
