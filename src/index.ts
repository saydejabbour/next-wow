// src/index.ts
"use client";
export { WOW } from "./wow";
export { WOWProvider } from "./components/WOWProvider";
export { useWOW } from "./hooks/useWOW";

// Default export to match classic WOW.js usage
import { WOW as WOWClass } from "./wow";
export default WOWClass;
