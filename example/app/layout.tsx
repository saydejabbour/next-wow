// example/app/layout.tsx
import type { Metadata } from "next";
import "animate.css";

export const metadata: Metadata = {
  title: "Next WoW Demo",
  description: "Reveal-on-scroll animations for React/Next.js (WOW.js API).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
