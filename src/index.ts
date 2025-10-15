// src/index.ts
import WOW, { WOWOptions } from "./wow";
import useWOW from "./hooks/useWOW";
import { WOWProvider } from "./components/WOWProvider";

export type { WOWOptions };
export { useWOW, WOWProvider };
export default WOW;
