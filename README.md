# 🌟 Next WoW

React-based version of [WOW.js](https://wowjs.uk/) — reveal animations on scroll, rebuilt for React and Next.js.

> 💡 **Next WoW is a React clone of the original [WOW.js](https://wowjs.uk/).**  
> It uses the **same API, same usage, and same configuration options**, implemented with React hooks and modern TypeScript (no jQuery).

---

## 🚀 Installation

```bash
npm install @moondev/next-wow
npm install animate.css
Import Animate.css once in your app:

ts
Copy code
import "animate.css";
⚡ Basic Usage (identical to WOW.js)
tsx
Copy code
"use client";
import { useEffect } from "react";
import WOW from "@moondev/next-wow";
import "animate.css";

export default function Page() {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  return (
    <main className="p-10 space-y-10 text-center">
      <h1 className="text-4xl font-bold">Next WoW Demo</h1>
      <div style={{ height: 600 }} />
      <div className="wow animate__fadeInUp" data-wow-delay="0.2s" style={{ fontSize: 22 }}>
        Scroll to see animations
      </div>
    </main>
  );
}
Using Animate.css v4? Use the animate__ classes.
Using v3? Use animated + fadeInUp and omit the provider option below.

🧰 Using the Provider
If you’re on Animate.css v4, set the animation class prefix:

tsx
Copy code
// app/layout.tsx
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
🔧 API (identical to WOW.js)
Option	Type	Default	Description
boxClass	string	"wow"	Class name to target
animateClass	string	"animated"	Animation class name (Animate.css)
offset	number	0	Distance from bottom of viewport
mobile	boolean	true	Trigger on mobile devices
live	boolean	true	Auto-observe new elements
callback	function	null	Called when animation starts

📚 Original docs: WOW.js documentation — this package mirrors the same options.

🧪 Demo
Example app lives in /example (Next.js).

On Vercel set Root Directory to example.

🛠 Development
bash
Copy code
git clone https://github.com/saydejabbour/next-wow.git
cd next-wow
npm i
npm run build
cd example && npm i && npm run dev
📜 License & Credits
MIT © MoonDev
Inspired by and API-compatible with WOW.js.

yaml
Copy code

---

## 3) Build & test one last time

```powershell
# root
Remove-Item -Recurse -Force dist
npm run build
npm pack

# example
cd example
npm uninstall next-wow-react  # if still present
npm i ..\moondev-next-wow-2.0.0.tgz
npm run dev