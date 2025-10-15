// src/components/WOWProvider.tsx
"use client";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import WOW, { WOWOptions } from "../wow";

export interface WOWProviderProps extends WOWOptions {}

export const WOWProvider: React.FC<PropsWithChildren<WOWProviderProps>> = ({
  children,
  ...opts
}) => {
  const wowRef = useRef<WOW | null>(null);

  useEffect(() => {
    const wow = new WOW(opts);
    wow.init();
    wowRef.current = wow;
    return () => {
      wow.destroy();
      wowRef.current = null;
    };
  }, [opts]);

  return <>{children}</>;
};
