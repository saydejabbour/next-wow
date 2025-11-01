"use client";
import { useWOW } from "@moondev/next-wow";
import DemoCard from "../_components/DemoCard";

export default function DemosPage() {
  // Use v4 Animate.css class internally (users see clean names)
  useWOW({ animateClass: "animate__animated" });

  // soft neon gradients we’ll rotate through
  const gradients = [
    "from-sky-400/20 via-fuchsia-400/10 to-amber-300/20",
    "from-fuchsia-400/20 via-sky-300/10 to-pink-300/20",
    "from-amber-300/20 via-fuchsia-400/10 to-sky-400/20",
    "from-pink-300/20 via-violet-400/10 to-sky-400/20",
  ];

  // A broad set of demos (class names WITHOUT animate__)
  const demos = [
    // Fades
    { title: "Fade In (0s)", anim: "fadeIn" },
    { title: "Fade In Up (.1s)", anim: "fadeInUp", delay: "0.1s" },
    { title: "Fade In Up (.2s)", anim: "fadeInUp", delay: "0.2s" },
    { title: "Fade In Down", anim: "fadeInDown" },
    { title: "Fade In Left", anim: "fadeInLeft" },
    { title: "Fade In Right", anim: "fadeInRight" },

    // Zooms
    { title: "Zoom In (1.2s)", anim: "zoomIn", duration: "1.2s" },
    { title: "Zoom In Up", anim: "zoomInUp" },
    { title: "Zoom In Down", anim: "zoomInDown" },
    { title: "Zoom In Left", anim: "zoomInLeft" },
    { title: "Zoom In Right", anim: "zoomInRight" },

    // Bounces
    { title: "Bounce In", anim: "bounceIn" },
    { title: "Bounce In Down", anim: "bounceInDown" },
    { title: "Bounce In Left", anim: "bounceInLeft" },
    { title: "Bounce In Right", anim: "bounceInRight" },
    { title: "Bounce In Up", anim: "bounceInUp" },

    // Slides
    { title: "Slide In Up", anim: "slideInUp" },
    { title: "Slide In Down", anim: "slideInDown" },
    { title: "Slide In Left", anim: "slideInLeft" },
    { title: "Slide In Right", anim: "slideInRight" },

    // Back entrances
    { title: "Back In Up", anim: "backInUp" },
    { title: "Back In Down", anim: "backInDown" },
    { title: "Back In Left", anim: "backInLeft" },
    { title: "Back In Right", anim: "backInRight" },

    // Fun
    { title: "Light Speed In Right", anim: "lightSpeedInRight" },
    { title: "Light Speed In Left", anim: "lightSpeedInLeft" },
    { title: "Jack In The Box", anim: "jackInTheBox" },
    { title: "Roll In", anim: "rollIn" },

    // Flips
    { title: "Flip In X", anim: "flipInX" },
    { title: "Flip In Y", anim: "flipInY" },

    // Rotates
    { title: "Rotate In", anim: "rotateIn" },
    { title: "Rotate In Down Left", anim: "rotateInDownLeft" },
    { title: "Rotate In Down Right", anim: "rotateInDownRight" },
    { title: "Rotate In Up Left", anim: "rotateInUpLeft" },
    { title: "Rotate In Up Right", anim: "rotateInUpRight" },

    // With offset + longer duration example
    { title: "Fade In Up (offset 120)", anim: "fadeInUp", offset: "120" },
    { title: "Zoom In (2s + .3s delay)", anim: "zoomIn", duration: "2s", delay: "0.3s" },
  ];

  return (
    <main className="section py-24 space-y-12">
      <header className="text-center">
        <h1 className="h2 wow animate__fadeInUp">Live Demos</h1>
        <p className="mt-2 text-white/70 wow animate__fadeInUp" data-wow-delay="0.1s">
          Preview the animations you can use with Next WoW.
        </p>
      </header>

      {/* Two columns with big vertical spacing for scroll */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-24">
        {demos.map((d, i) => (
          <DemoCard
            key={d.title}
            {...d}
            panelGradient={gradients[i % gradients.length]}
          />
        ))}
      </section>

      <p className="text-center text-sm text-white/60">
        Tip: repeat an animation using{" "}
        <code className="badge">data-wow-iteration</code>.
      </p>
    </main>
  );
}
