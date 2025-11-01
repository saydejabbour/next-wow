import React from "react";

export default function GlowCard({
  children,
  gradient = "from-fuchsia-500 via-sky-500 to-amber-400",
  className = "",
}: React.PropsWithChildren<{ gradient?: string; className?: string }>) {
  return (
    <div className={`relative transition-transform duration-300 hover:-translate-y-0.5 ${className}`}>
      <div
        className={`pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-tr ${gradient} opacity-60 blur-2xl transition-opacity duration-200 group-hover:opacity-90`}
      />
      {/* make the card itself fill available height */}
      <div className="relative h-full rounded-3xl bg-black/75 ring-1 ring-white/10 p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
