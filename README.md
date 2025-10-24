# 🌟 Next WoW

React-based version of [WOW.js](https://wowjs.uk/) — reveal animations on scroll, rebuilt for React and Next.js.

> 💡 **Next WoW is a React clone of the original [WOW.js](https://wowjs.uk/).**  
> It uses the **same API, same usage, and same configuration options**, implemented with React hooks and modern TypeScript (no jQuery).

---

## 🚀 Installation

```bash
npm install @moondev/next-wow
🪄 animate.css is already included automatically — no need to import it manually.



🔧 Basic Usage
Use the useWOW hook anywhere in your React or Next.js App Router components.
It automatically initializes scroll-based animations and works with Animate.css v4 classes.

tsx
Copy code
"use client";

import { useWOW } from "@moondev/next-wow";

export default function Page() {
  useWOW({ animateClass: "animate__animated" });

  return (
    <main>
      <h1 className="wow animate__fadeInUp">Next WoW Demo</h1>
      <p className="wow animate__fadeIn" data-wow-delay="0.2s">
        Reveal on scroll with the same API as WOW.js.
      </p>
    </main>
  );
}

⚙️ Configuration (same as WOW.js)

Next WoW mirrors WOW.js options and data attributes.
👉 View Full Configuration on WOW.js Docs (https://wowjs.uk/docs)

🧪 Demo

Live Demo: next-wow-zeta.vercel.app

Source: /example (Next.js App Router)

Styling: Animate.css v4 + custom gradient UI

🛠 Development
# Clone
git clone https://github.com/saydejabbour/next-wow.git
cd next-wow

# Install & build library
npm install
npm run build

# Run demo locally
cd example
npm install
npm run dev

🧩 Features

⚡ React + Next.js compatible

🧱 Identical API to WOW.js

🎨 Auto-imported Animate.css v4

🧩 Built with React Hooks and TypeScript

💻 SSR-safe / No jQuery

🧠 Fully typed for TS projects


📝 License

MIT © MoonDev
Inspired by and API-compatible with WOW.js.
---

