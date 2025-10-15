import "animate.css/animate.min.css";
import "./globals.css";

export const metadata = { title: "Next WoW Demo" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
