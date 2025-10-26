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

Use the useWOW() hook anywhere in your React or Next.js App Router components.
It automatically initializes scroll-based animations using the classic WOW.js syntax by default (no custom class needed).

"use client";

import { useWOW } from "@moondev/next-wow";

export default function Page() {
  // Default usage — same behavior as WOW.js
  useWOW();

  return (
    <main>
      <h1 className="wow fadeInUp">Next WoW Demo</h1>
      <p className="wow fadeIn" data-wow-delay="0.2s">
        Reveal on scroll with the same API as WOW.js.
      </p>
    </main>
  );
}


💡 Optional: If you’re using Animate.css v4, you can enable prefixed classes like this:

useWOW({ animateClass: "animate__animated" });


Then use:

<div class="wow animate__fadeInUp"></div>

⚙️ Configuration (same as WOW.js)

Next WoW mirrors WOW.js options and data attributes.
👉 View Full Configuration on WOW.js Docs
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

