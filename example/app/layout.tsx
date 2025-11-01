import type { Metadata } from "next";
import "./globals.css";
import { WOWProvider } from "@moondev/next-wow";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "Next WoW — React/Next.js WOW.js reimplementation",
  description: "Reveal animations on scroll with the classic WOW.js API, rebuilt for React & Next.js.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WOWProvider>
          <Navbar />
          {children}
          <Footer />
        </WOWProvider>
      </body>
    </html>
  );
}
