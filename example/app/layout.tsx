// example/app/layout.tsx
import "animate.css";
import { WOWProvider } from "@moondev/next-wow";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WOWProvider options={{ animateClass: "animate__animated" }}>
          {children}
        </WOWProvider>
      </body>
    </html>
  );
}

