// example/app/page.tsx
"use client";
import { useEffect } from "react";
import WOW from "@moondev/next-wow";

export default function Home() {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  return (
    <main style={{ padding: 40, textAlign: "center" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700 }}>Next WoW Demo</h1>
      <div style={{ height: 600 }} />
      <div className="wow animate__fadeInUp" data-wow-delay="0.2s" style={{ fontSize: 22 }}>
        Scroll to see animations
      </div>
      <div style={{ height: 400 }} />
      <div className="wow animate__fadeInRight" style={{ fontSize: 22 }}>
        React version of WOW.js (same API)
      </div>
      <div style={{ height: 400 }} />
      <div className="wow animate__fadeInLeft" data-wow-duration="1.2s" style={{ fontSize: 22 }}>
        Works with Animate.css classes
      </div>
    </main>
  );
}
