import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo Prototype",
  description: "Swipe-only todo prototype with local persistence"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
