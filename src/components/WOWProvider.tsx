// src/components/WOWProvider.tsx
"use client";
import React from "react";
import { useWOW } from "../hooks/useWOW";
import type { WOWOptions } from "../wow";

export interface WOWProviderProps { children: React.ReactNode; options?: WOWOptions; }
export function WOWProvider({ children, options }: WOWProviderProps) {
  useWOW(options);
  return <>{children}</>;
}
