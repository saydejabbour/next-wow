"use client";

import GlowCard from "./GlowCard";

type DemoProps = {
  title: string;
  anim: string;           // "fadeInUp" (no animate__ prefix)
  delay?: string;         // "0.2s"
  duration?: string;      // "1.2s"
  offset?: string;        // "120"
  panelGradient?: string; // Tailwind gradient classes for the animated panel
};

/**
 * DemoCard
 * - Displays class name WITHOUT "animate__" in the chip and inside the panel.
 * - Internally applies Animate.css v4 by prefixing with animate__.
 * - Light neon gradient panel that matches the Next WoW vibe.
 */
export default function DemoCard({
  title,
  anim,
  delay,
  duration,
  offset,
  panelGradient = "from-sky-400/20 via-fuchsia-400/10 to-amber-300/20",
}: DemoProps) {
  // User-visible name (no animate__ prefix)
  const animName = anim.startsWith("animate__")
    ? anim.replace(/^animate__/, "")
    : anim;

  // Class actually used for Animate.css v4
  const animClass = anim.startsWith("animate__") ? anim : `animate__${anim}`;

  return (
    <GlowCard>
      <div className="mb-5">
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-2 text-xs text-white/70 flex flex-wrap gap-2">
          <span className="badge">class: {animName}</span>
          {delay && <span className="badge">delay: {delay}</span>}
          {duration && <span className="badge">duration: {duration}</span>}
          {offset && <span className="badge">offset: {offset}px</span>}
        </div>
      </div>

      {/* Animated panel — shows only the animation name */}
      <div
        className={`wow ${animClass} rounded-2xl ring-1 ring-white/10 h-44
                    flex items-center justify-center text-white/85 text-lg font-semibold
                    bg-gradient-to-b ${panelGradient}`}
        {...(delay ? { "data-wow-delay": delay } : {})}
        {...(duration ? { "data-wow-duration": duration } : {})}
        {...(offset ? { "data-wow-offset": offset } : {})}
      >
        {animName}
      </div>
    </GlowCard>
  );
}
