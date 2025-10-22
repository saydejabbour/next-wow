// src/hooks/useWOW.ts
import { useEffect, useRef } from "react";
import { WOW, type WOWOptions } from "../wow";

export function useWOW(options?: WOWOptions) {
  const wowRef = useRef<WOW | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    wowRef.current = new WOW(options);
    wowRef.current.init();

    return () => {
      wowRef.current?.stop();
      wowRef.current = null;
    };
  }, []);

  return wowRef.current;
}
