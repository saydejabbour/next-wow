// src/hooks/useWOW.ts
import { useEffect, useRef } from "react";
import WOW, { WOWOptions } from "../wow";

export default function useWOW(options?: WOWOptions) {
  const wowRef = useRef<WOW | null>(null);

  useEffect(() => {
    const wow = new WOW(options);
    wow.init();
    wowRef.current = wow;
    return () => {
      wow.destroy();
      wowRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return wowRef;
}
