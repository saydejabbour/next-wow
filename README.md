# 🌟 Next Wow React

[![npm version](https://img.shields.io/npm/v/next-wow-react?color=brightgreen)](https://www.npmjs.com/package/next-wow-react)
[![GitHub Repo](https://img.shields.io/badge/github-next--wow-blue?logo=github)](https://github.com/saydejabbour/next-wow)
[![Live Demo](https://img.shields.io/badge/demo-vercel-success?logo=vercel)](https://next-wow-zeta.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](./LICENSE)

> ⚡ A lightweight React + Next.js adaptation of [WOW.js](https://wowjs.uk) for scroll-based reveal animations — rebuilt for modern frameworks with no jQuery dependencies.

---

## 🚀 Live Demo
👉 [View the Demo on Vercel](https://next-wow-zeta.vercel.app)

---

## 📦 Installation

Install the package and `animate.css` (for animations):

```bash
npm install next-wow-react animate.css
or with yarn:

bash
Copy code
yarn add next-wow-react animate.css
🧠 Usage Example
tsx
Copy code
"use client";
import { useEffect } from "react";
import WOW from "next-wow-react";
import "animate.css";

export default function Home() {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  return (
    <main style={{ padding: 40, textAlign: "center" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700 }}>Next Wow Demo</h1>

      {/* Spacer for scrolling */}
      <div style={{ height: 600 }} />

      <div className="wow fadeInUp" data-wow-delay="0.2s">
        React animation using Animate.css + WOW.js!
      </div>
    </main>
  );
}
✅ Note:
Make sure you import "animate.css" at the top of your main layout or page.

✨ Features
🚫 No jQuery — written in pure TypeScript

🧱 Fully compatible with Next.js 13+ App Router

⚡ Simple setup, single line integration

💨 Works with Animate.css classes

🎯 Lightweight and production-ready

📄 Open Source (MIT License)

🧩 Configuration Options
next-wow-react supports the same configuration parameters as WOW.js.

You can customize behavior via the WOW constructor:

tsx
Copy code
const wow = new WOW({
  boxClass: "wow",
  animateClass: "animated",
  offset: 100,
  mobile: true,
  live: true,
});
wow.init();
Option	Default	Description
boxClass	"wow"	CSS class to reveal when scrolled into view
animateClass	"animated"	Animation class from Animate.css
offset	0	Distance to start the animation (px)
mobile	true	Trigger animations on mobile devices
live	true	Act on asynchronously loaded content

🌐 Links
🧰 NPM: https://www.npmjs.com/package/next-wow-react

💻 GitHub: https://github.com/saydejabbour/next-wow

🎨 Demo: https://next-wow-zeta.vercel.app

🛠️ Development
If you want to modify or contribute:

bash
Copy code
# Clone the repo
git clone https://github.com/saydejabbour/next-wow.git

# Navigate to the directory
cd next-wow

# Install dependencies
npm install

# Run the example locally
cd example
npm run dev
📜 License & Credits
This project is released under the MIT License.

Original Source Code: © MoonDev
Package Adaptation & NPM Publishing: © Sayde Jabbour

Special thanks to MoonDev for the base implementation and inspiration behind this React adaptation.

⭐ Support
If you find this package useful, please give it a ⭐ on GitHub — it helps others discover it!

yaml
Copy code

---

Would you like me to also generate a **short GitHub “About” section + tags** (so you can paste them in your repository sidebar for SEO and discoverability)?




