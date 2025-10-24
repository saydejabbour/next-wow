// src/hooks/useWOW.ts
import { useEffect, useRef } from "react";
import { WOW, type WOWOptions } from "../wow";

export function useWOW(options?: WOWOptions): WOW | null {
  const wowRef = useRef<WOW | null>(null);
  const initOnceRef = useRef(false); // guard against React Strict Mode double-mount

  useEffect(() => {
    if (typeof window === "undefined") return;         // SSR guard
    if (initOnceRef.current) return;                   // already initialized
    initOnceRef.current = true;

    const instance = new WOW(options);
    instance.init();
    wowRef.current = instance;

    return () => {
      // If your WOW class has destroy/reset/stop, call it here.
      // 'stop' was in your snippet, keep it if implemented:
      try { (instance as any).stop?.(); } catch {}
      wowRef.current = null;
      initOnceRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initialize once

  // NOTE: This will be null on the very first render, then become the instance after mount.
  return wowRef.current;
}
