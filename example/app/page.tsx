"use client";
import { useWOW } from "@moondev/next-wow";
import Link from "next/link";
import CodeBlock from "./_components/CodeBlock";
import FeatureCard from "./_components/FeatureCard";

export default function Home() {
  // IMPORTANT: v4 Animate.css class
  useWOW({ animateClass: "animate__animated" });

  return (
    <main className="section space-y-28 py-14">
      {/* HERO */}
      <section className="max-w-5xl mx-auto text-center">
        <div className="mb-5 flex flex-wrap justify-center gap-2">
          <span className="badge">TypeScript Ready</span>
          <span className="badge">~32.5 kB</span>
          <span className="badge">Animate.css v4 Included</span>
        </div>

       <h1
  className="wow animate__fadeInUp text-center leading-tight text-cycle"
  data-wow-delay="0.05s"
  style={{
    fontSize: "clamp(2.5rem,6vw,4.5rem)",
    fontWeight: 700,           // medium-bold (not extra bold)
    letterSpacing: "-0.02em",
  }}
>
  Reveal animations for React & Next.js — WOW.js API
</h1>

        <p className="mt-4 text-white/70 wow animate__fadeInUp" data-wow-delay="0.15s">
          <b>@moondev/next-wow</b> is a modern React re-implementation of WOW.js.
          Same options, rebuilt with hooks, ready for Next.js.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3 wow animate__fadeInUp" data-wow-delay="0.25s">
          <a className="btn" href="https://www.npmjs.com/package/@moondev/next-wow" target="_blank">Install from npm</a>
          <a className="btn-ghost" href="https://github.com/saydejabbour/next-wow" target="_blank">View on GitHub</a>
          <Link className="btn-ghost" href="/demos">Live Demos</Link>
        </div>

        <div className="mt-8 wow animate__fadeInUp" data-wow-delay="0.35s">
          <CodeBlock code={`npm i @moondev/next-wow

import { useWOW } from "@moondev/next-wow";

// Default WOW.js-style animations (no custom class needed)
useWOW();

// Optional: use Animate.css v4 syntax
useWOW({ animateClass: "animate__animated" });`} />
        </div>
      </section>

      {/* FEATURES with hover (CSS Code Generators vibe) */}
      <section>
        <h2 className="h2 mb-6 text-center wow animate__fadeInUp">Why Next WoW?</h2>
       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch auto-rows-fr">
          <FeatureCard title="Real-time Preview" icon={"⚡"}
            desc="Watch animations fire as you scroll—no refresh." />
          <FeatureCard title="TypeScript & Tailwind" icon={"📘"}
            desc="Typed API and Tailwind-first examples." />
          <FeatureCard title="One-Click Copy" icon={"📄"}
            desc="Copy install/usage snippets instantly." />
          <FeatureCard title="Ready-made Examples" icon={"🎛️"}
            desc="Stagger, images, lists, offset, more." />
          <FeatureCard title="100% Free Forever" icon={"💯"}
            desc="Open-source, MIT, no limits." />
          <FeatureCard title="No Sign-up Required" icon={"🚀"}
            desc="Start now — just npm i." />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-x-3">
        <Link className="btn" href="/demos">Explore Demos</Link>
        <Link className="btn-ghost" href="/docs">Read Docs</Link>
      </section>
    </main>
  );
}
