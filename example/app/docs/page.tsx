import CodeBlock from "../_components/CodeBlock";

export default function DocsPage() {
  return (
    <main className="section py-12 space-y-10">
      <header className="text-center">
        <h1 className="h2">Docs</h1>
        <p className="mt-2 text-white/70">Parity with WOW.js options + React usage.</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Install</h2>
        <CodeBlock code={`npm i @moondev/next-wow`} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Quick Start</h2>
        <CodeBlock code={`import { WOWProvider, useWOW } from "@moondev/next-wow";

// Option 1 — Classic WOW.js-style animations (no class setup needed)
export default function Page() {
  useWOW(); // auto-init
  return (
    <WOWProvider>
      <h2 className="wow fadeInUp">Hello, WOW!</h2>
    </WOWProvider>
  );
}

// Option 2 — Animate.css v4 style
export function PageAnimate() {
  useWOW({ animateClass: "animate__animated" });
  return (
    <WOWProvider>
      <h2 className="wow animate__fadeInUp">Hello, Animate!</h2>
    </WOWProvider>
  );
}`} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Options (WOW.js parity + React notes)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead className="text-left text-white/80">
              <tr>
                <th className="px-3 py-2">Option</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2 text-right">Default</th>
                <th className="px-3 py-2">React Notes</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              {[
                ["boxClass","string","\"wow\"","Add `wow` to elements you want observed."],
                ["animateClass","string","\"animated\"","We recommend \"animate__animated\" for Animate.css v4."],
                ["offset","number","0","Pixels before entering viewport to trigger."],
                ["mobile","boolean","true","Set false to disable on small screens."],
                ["live","boolean","true","Observe DOM changes (mounts)."],
                ["callback","(el: Element) => void","null","Called when an animation triggers."],
                ["scrollContainer","string | null","null","CSS selector if using a scroll container."],
              ].map(([a,b,c,d])=>(
                <tr key={a} className="align-top">
                  <td className="px-3 py-2 font-medium">{a}</td>
                  <td className="px-3 py-2">{b}</td>
                  <td className="px-3 py-2 text-right">{c}</td>
                  <td className="px-3 py-2">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
