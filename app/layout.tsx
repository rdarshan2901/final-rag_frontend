import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vethathiri Maharishi — Wisdom Chat",
  description: "Explore the teachings of Yogiraj Vethathiri Maharishi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden bg-white text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}
