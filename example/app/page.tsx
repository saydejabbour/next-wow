// example/app/page.tsx
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useWOW } from "@moondev/next-wow";
import styles from "./page.module.css";

export default function Home() {
  // Initialize WOW — default uses "animated" class internally (WOW.js style)
  useWOW();

  return (
    <main className={styles.container}>
      {/* HERO */}
      <section className={`${styles.heroWrap} wow fadeIn`} data-wow-duration="0.7s">
        <div className={styles.hero}>
          <h1
            className="wow fadeInUp"
            data-wow-delay="0.05s"
            style={{ fontSize: 44, fontWeight: 900 }}
          >
            <span className={styles.gradientText}>Next WoW</span>
          </h1>

          <p className="wow fadeInUp" data-wow-delay="0.15s">
            Reveal-on-scroll animations with the <b>same API</b> as WOW.js — rebuilt for React/Next.js.
          </p>

          <div className={`${styles.actions} wow fadeInUp`} data-wow-delay="0.25s">
            <a
              className={styles.btn}
              href="https://www.npmjs.com/package/@moondev/next-wow"
              target="_blank"
              rel="noreferrer"
            >
              npm
            </a>
            <a
              className={styles.btn}
              href="https://github.com/saydejabbour/next-wow"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className={styles.btn}
              href="https://wowjs.uk/docs"
              target="_blank"
              rel="noreferrer"
            >
              WOW.js Config
            </a>
          </div>

          <div className={`${styles.badges} wow fadeIn`} data-wow-delay="0.35s">
            <span className={styles.badge}>Hooks + TypeScript</span>
            <span className={styles.badge}>No jQuery</span>
            <span className={styles.badge}>Animate.css v4 (optional)</span>
            <span className={styles.badge}>Same options as WOW.js</span>
          </div>

          <div className="wow fadeInUp" data-wow-delay="0.45s" style={{ marginTop: 18 }}>
            <pre className={styles.code}>
{`npm i @moondev/next-wow

import { useWOW } from "@moondev/next-wow";

// Default WOW.js-style animations (no custom class needed)
useWOW();

// Optional: use Animate.css v4 syntax
useWOW({ animateClass: "animate__animated" });`}
            </pre>
          </div>
        </div>
      </section>

      <div className={styles.spacer} />

      {/* BASIC EXAMPLES */}
      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} wow fadeInUp`}>Basic Reveals</h2>
        <div className={`${styles.grid} wow fadeIn`} data-wow-delay="0.1s">
          <Card title="Fade In Up" anim="fadeInUp" delay="0.05s" />
          <Card title="Fade In Right" anim="fadeInRight" delay="0.15s" />
          <Card title="Fade In Left" anim="fadeInLeft" delay="0.25s" />
        </div>
      </section>

      <div className={styles.spacer} />

      {/* ATTENTION SEEKERS */}
      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} wow fadeInUp`}>Attention Seekers</h2>
        <p className="wow fadeInUp" data-wow-delay="0.1s">
          Staggered via <code>data-wow-delay</code>.
        </p>
        <div className={styles.badges}>
          {[
            "bounce",
            "flash",
            "pulse",
            "rubberBand",
            "shakeX",
            "tada",
            "wobble",
            "jello",
            "heartBeat",
          ].map((anim, i) => (
            <span
              key={anim}
              className={`wow ${anim} ${styles.badge}`}
              data-wow-delay={`${0.05 * i}s`}
              data-wow-iteration="2"
            >
              {anim}
            </span>
          ))}
        </div>
        <span className={`wow fadeIn ${styles.small}`} data-wow-delay="0.25s">
          Repeats twice using <code>data-wow-iteration="2"</code>
        </span>
      </section>

      <div className={styles.spacer} />

      {/* LAYOUT / IMAGE STYLE */}
      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} wow fadeInUp`}>Layout Examples</h2>
        <div className={styles.imgGrid}>
          <ImgCard title="Zoom In" anim="zoomIn" delay="0.05s" />
          <ImgCard title="Back In Up" anim="backInUp" delay="0.15s" />
          <ImgCard title="Light Speed Right" anim="lightSpeedInRight" delay="0.25s" />
        </div>
        <span className={`wow fadeIn ${styles.small}`} data-wow-delay="0.35s">
          Try <code>data-wow-duration</code> / <code>data-wow-offset</code>
        </span>
      </section>

      <div className={styles.spacer} />

      {/* DURATION + DELAY */}
      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} wow fadeInUp`}>Duration & Delay</h2>
        <div className={styles.grid}>
          <Card title="Zoom 0.6s" anim="zoomIn" duration="0.6s" />
          <Card title="Zoom 1.2s / .2s delay" anim="zoomIn" duration="1.2s" delay="0.2s" />
          <Card title="Zoom 2s / offset 80" anim="zoomIn" duration="2s" offset="80" />
        </div>
      </section>
    </main>
  );
}

function Card({
  title,
  anim,
  delay,
  duration,
  offset,
}: {
  title: string;
  anim: string;
  delay?: string;
  duration?: string;
  offset?: string;
}) {
  return (
    <div
      className={`wow ${anim} ${styles.card}`}
      {...(delay ? { "data-wow-delay": delay } : {})}
      {...(duration ? { "data-wow-duration": duration } : {})}
      {...(offset ? { "data-wow-offset": offset } : {})}
    >
      {title}
      <div className={styles.meta}>
        class: <code>{anim}</code>
        {duration ? <> · duration <code>{duration}</code></> : null}
        {delay ? <> · delay <code>{delay}</code></> : null}
        {offset ? <> · offset <code>{offset}</code></> : null}
      </div>
    </div>
  );
}

function ImgCard({
  title,
  anim,
  delay,
}: {
  title: string;
  anim: string;
  delay?: string;
}) {
  return (
    <div className={`wow ${anim} ${styles.imgCard}`} {...(delay ? { "data-wow-delay": delay } : {})}>
      {title}
    </div>
  );
}
