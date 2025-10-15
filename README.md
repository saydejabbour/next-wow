# 🌟 Next WoW

React-based version of [WOW.js](https://wowjs.uk/) — reveal animations on scroll, rebuilt for React and Next.js.

> 💡 **Next WoW is a React clone of the original [WOW.js](https://wowjs.uk/).**  
> It uses the **same API, same usage, and same configuration options**, but is built with React hooks and modern JavaScript (no jQuery required).

---

## 🚀 Installation

```bash
npm install @moondev/next-wow
npm install animate.css

import "animate.css";

Basic Usage (identical to WOW.js)
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
    <main>
      <h1 className="wow fadeInUp">Hello world!</h1>
      <p className="wow fadeInRight" data-wow-delay="0.4s">
        This uses the same WOW.js API.
      </p>
    </main>
  );
}

Using WOWProvider
"use client";
import { WOWProvider } from "@moondev/next-wow";
import "animate.css";

export default function App() {
  return (
    <WOWProvider>
      <div className="wow fadeInUp">Hello world!</div>
    </WOWProvider>
  );
}

🔧 API Reference (identical to WOW.js)
Option	Type	Default	Description
boxClass	string	"wow"	Class name to target.
animateClass	string	"animated"	Base animation class from Animate.css.
offset	number	0	Distance from bottom of viewport before reveal.
mobile	boolean	true	Trigger animations on mobile devices.
live	boolean	true	Auto-observe new elements added to DOM.
callback	(el) => void	null	Called when an animation starts.

Data attributes (from WOW.js):

data-wow-duration="1.5s"

data-wow-delay="0.3s"

data-wow-iteration="2"

📚 For the original reference, see WOW.js Documentation
.
This library mirrors that API in a React implementation.

🧪 Demo

👉 Live Demo (Next.js + Animate.css) – deploy instructions below.