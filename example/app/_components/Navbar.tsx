import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <nav className="section h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-extrabold gradient-brand">Next WoW</Link>
        <div className="flex gap-2">
          <Link className="btn-ghost" href="/demos">Demos</Link>
          <Link className="btn-ghost" href="/docs">Docs</Link>
          <a className="btn-ghost" href="https://github.com/saydejabbour/next-wow" target="_blank">GitHub</a>
          <a className="btn" href="https://www.npmjs.com/package/@moondev/next-wow" target="_blank">npm</a>
        </div>
      </nav>
    </header>
  );
}
