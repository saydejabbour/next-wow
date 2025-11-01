"use client";
export default function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative">
      <pre className="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-6 overflow-x-auto">
        {code}
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="btn-ghost absolute top-3 right-3 text-xs"
      >
        Copy
      </button>
    </div>
  );
}
