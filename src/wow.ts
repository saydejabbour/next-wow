// src/wow.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface WOWOptions {
  boxClass?: string;
  animateClass?: string;
  offset?: number;
  mobile?: boolean;
  live?: boolean;
  callback?: (box: Element) => void;
  scrollContainer?: string | null;
}

export interface WOWDefaults {
  boxClass: string;
  animateClass: string;
  offset: number;
  mobile: boolean;
  live: boolean;
  callback: null;
  scrollContainer: null;
}

class Util {
  extend<T extends Record<string, any>>(custom: Partial<T>, defaults: T): T {
    const result = { ...defaults };
    for (const [key, value] of Object.entries(custom)) {
      if (value !== undefined) (result as any)[key] = value;
    }
    return result;
  }

  isMobile(agent: string): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
  }

  createEvent(event: string, bubble = false, cancel = false, detail: any = null): CustomEvent {
    if (typeof window !== "undefined") {
      if (document.createEvent) {
        const customEvent = document.createEvent("CustomEvent");
        customEvent.initCustomEvent(event, bubble, cancel, detail);
        return customEvent;
      } else if ((document as any).createEventObject) {
        const customEvent = (document as any).createEventObject();
        (customEvent as any).eventType = event;
        return customEvent as CustomEvent;
      }
    }
    return new CustomEvent(event, { bubbles: bubble, cancelable: cancel, detail });
  }

  emitEvent(elem: Element, event: CustomEvent): void {
    if ("dispatchEvent" in elem) {
      elem.dispatchEvent(event);
    } else if ((event as any).type in elem) {
      (elem as any)[(event as any).type]();
    } else if (`on${(event as any).type}` in elem) {
      (elem as any)[`on${(event as any).type}`]();
    }
  }

  addEvent(elem: Element | Window | Document, event: string, fn: EventListener): void {
    if ("addEventListener" in elem) (elem as any).addEventListener(event, fn, false);
    else if ("attachEvent" in elem) (elem as any).attachEvent(`on${event}`, fn);
    else (elem as any)[event] = fn;
  }

  removeEvent(elem: Element | Window | Document, event: string, fn: EventListener): void {
    if ("removeEventListener" in elem) (elem as any).removeEventListener(event, fn, false);
    else if ("detachEvent" in elem) (elem as any).detachEvent(`on${event}`, fn);
    else delete (elem as any)[event];
  }

  innerHeight(): number {
    if (typeof window !== "undefined") {
      return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight;
    }
    return 0;
  }
}

// Minimalistic WeakMap shim
const WOWWeakMap =
  typeof WeakMap !== "undefined"
    ? WeakMap
    : (class {
        private keys: any[] = [];
        private values: any[] = [];
        get(key: any): any {
          const i = this.keys.indexOf(key);
          return i !== -1 ? this.values[i] : undefined;
        }
        set(key: any, value: any): void {
          const i = this.keys.indexOf(key);
          if (i !== -1) this.values[i] = value;
          else {
            this.keys.push(key);
            this.values.push(value);
          }
        }
      } as unknown as WeakMapConstructor);

// MutationObserver shim
const WOWMutationObserver: typeof MutationObserver & { notSupported?: boolean } =
  typeof MutationObserver !== "undefined"
    ? MutationObserver
    : (class {
        static notSupported = true;
        constructor() {
          if (typeof console !== "undefined") {
            console.warn("MutationObserver is not supported by your browser.");
            console.warn(
              "WOW.js cannot detect DOM mutations, please call .sync() after loading new content."
            );
          }
        }
        observe() {
          /* noop */
        }
      } as any);

// Computed style helper
const getWOWComputedStyle =
  typeof getComputedStyle !== "undefined"
    ? getComputedStyle
    : (el: Element) => {
        const computedStyle = {
          getPropertyValue: (prop: string) => {
            if (prop === "float") prop = "styleFloat";
            prop = prop.replace(/\-([a-z])/g, (_, char) => char.toUpperCase());
            return (el as any).currentStyle?.[prop] || null;
          }
        };
        return computedStyle as any;
      };

export class WOW {
  private defaults: WOWDefaults = {
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: true,
    live: true,
    callback: null,
    scrollContainer: null
  };

  private scrolled = true;
  private config: Required<WOWOptions>;
  private animationNameCache: WeakMap<Element, string>;
  private wowEvent: CustomEvent;
  private element: HTMLElement | null = null;
  private finished: Element[] = [];
  private boxes: Element[] = [];
  private all: Element[] = [];
  private stopped = false;
  private interval: ReturnType<typeof setInterval> | null = null;
  private _util: Util | null = null;

  constructor(options: WOWOptions = {}) {
    this.scrolled = true;
    this.config = this.util().extend<Required<WOWOptions>>(options as any, {
      boxClass: this.defaults.boxClass,
      animateClass: this.defaults.animateClass,
      offset: this.defaults.offset,
      mobile: this.defaults.mobile,
      live: this.defaults.live,
      callback: this.defaults.callback as any,
      scrollContainer: this.defaults.scrollContainer as any
    });

    if (typeof window !== "undefined" && options.scrollContainer) {
      (this.config as any).scrollContainer = document.querySelector(options.scrollContainer);
    }

    this.animationNameCache = new (WOWWeakMap as any)();
    this.wowEvent = this.util().createEvent(this.config.boxClass);
  }

  init(): void {
    if (typeof window === "undefined") return;
    this.element = window.document.documentElement;

    if (document.readyState === "interactive" || document.readyState === "complete") {
      this.start();
    } else {
      this.util().addEvent(document, "DOMContentLoaded", this.start);
    }

    this.finished = [];
  }

  private start = (): void => {
    if (typeof window === "undefined" || !this.element) return;

    this.stopped = false;
    this.boxes = Array.from(this.element.querySelectorAll(`.${this.config.boxClass}`));
    this.all = [...this.boxes];

    if (this.boxes.length) {
      if (this.disabled()) {
        this.resetStyle();
      } else {
        this.boxes.forEach((box) => this.applyStyle(box, true));
      }
    }

    if (!this.disabled()) {
      this.util().addEvent(
        ((this.config as any).scrollContainer as Element) || window,
        "scroll",
        this.scrollHandler
      );
      this.util().addEvent(window, "resize", this.scrollHandler);
      this.interval = setInterval(this.scrollCallback, 50);
    }

    if ((this.config as any).live) {
      new WOWMutationObserver((records: MutationRecord[]) => {
        records.forEach((record) => {
          if (record.addedNodes) {
            Array.from(record.addedNodes).forEach((node) => {
              if ((node as Element).nodeType === 1) {
                this.doSync(node as Element);
              }
            });
          }
        });
      }).observe(document.body, { childList: true, subtree: true });
    }
  };

  stop(): void {
    this.stopped = true;
    if (typeof window !== "undefined") {
      this.util().removeEvent(
        ((this.config as any).scrollContainer as Element) || window,
        "scroll",
        this.scrollHandler
      );
      this.util().removeEvent(window, "resize", this.scrollHandler);
    }
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  sync(): void {
    if ((WOWMutationObserver as any).notSupported) {
      this.doSync(this.element || undefined);
    }
  }

  private doSync(element?: Element): void {
    if (typeof window === "undefined") return;
    element = element || this.element || undefined;
    if (!element || (element as any).nodeType !== 1) return;

    element = (element.parentNode as Element) || element;
    const newBoxes = Array.from(element.querySelectorAll(`.${this.config.boxClass}`));

    newBoxes.forEach((box) => {
      if (!this.all.includes(box)) {
        this.boxes.push(box);
        this.all.push(box);

        if (this.stopped || this.disabled()) this.resetStyle();
        else this.applyStyle(box, true);

        this.scrolled = true;
      }
    });
  }

  private show(box: Element): Element {
    this.applyStyle(box);
    (box as HTMLElement).className = `${(box as HTMLElement).className} ${this.config.animateClass}`;

    if ((this.config as any).callback) (this.config as any).callback(box);

    this.util().emitEvent(box, this.wowEvent);

    const resetAnimation = this.resetAnimation;
    this.util().addEvent(box, "animationend", resetAnimation as any);
    this.util().addEvent(box, "oanimationend", resetAnimation as any);
    this.util().addEvent(box, "webkitAnimationEnd", resetAnimation as any);
    this.util().addEvent(box, "MSAnimationEnd", resetAnimation as any);

    return box;
  }

  private applyStyle(box: Element, hidden?: boolean): void {
    const duration = box.getAttribute("data-wow-duration");
    const delay = box.getAttribute("data-wow-delay");
    const iteration = box.getAttribute("data-wow-iteration");

    this.animate(() => this.customStyle(box, hidden, duration, delay, iteration));
  }

  private animate = (() => {
    if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
      return (callback: () => void) => window.requestAnimationFrame(callback);
    } else {
      return (callback: () => void) => callback();
    }
  })();

  private resetStyle(): void {
    this.boxes.forEach((box) => {
      (box as HTMLElement).style.visibility = "visible";
    });
  }

  private resetAnimation = (event: AnimationEvent): void => {
    if (event.type.toLowerCase().includes("animationend")) {
      const target = (event.target || (event as any).srcElement) as HTMLElement;
      target.className = target.className.replace(new RegExp(this.config.animateClass, "g"), "").trim();
    }
  };

  private customStyle(
    box: Element,
    hidden?: boolean,
    duration?: string | null,
    delay?: string | null,
    iteration?: string | null
  ): void {
    if (hidden) this.cacheAnimationName(box);

    const style = (box as HTMLElement).style;
    style.visibility = hidden ? "hidden" : "visible";

    if (duration) this.vendorSet(style, { animationDuration: duration });
    if (delay) this.vendorSet(style, { animationDelay: delay });
    if (iteration) this.vendorSet(style, { animationIterationCount: iteration });

    this.vendorSet(style, {
      animationName: hidden ? "none" : this.cachedAnimationName(box)
    });
  }

  private vendors = ["moz", "webkit"];

  private vendorSet(elem: CSSStyleDeclaration, properties: Record<string, string>): void {
    Object.entries(properties).forEach(([name, value]) => {
      (elem as any)[name] = value;
      this.vendors.forEach((vendor) => {
        const vendorName = `${vendor}${name.charAt(0).toUpperCase()}${name.substr(1)}`;
        (elem as any)[vendorName] = value;
      });
    });
  }

  private vendorCSS(elem: Element, property: string): any {
    const style = getWOWComputedStyle(elem);
    let result = (style as any).getPropertyCSSValue?.(property);

    if (!result) {
      this.vendors.forEach((vendor) => {
        result = result || (style as any).getPropertyCSSValue?.(`-${vendor}-${property}`);
      });
    }
    return result;
  }

  private animationName(box: Element): string {
    if (typeof window === "undefined") return "";
    try {
      const animationName = this.vendorCSS(box, "animation-name")?.cssText;
      return animationName === "none" ? "" : animationName || "";
    } catch {
      const style = getWOWComputedStyle(box);
      const animationName = style.getPropertyValue("animation-name");
      return animationName === "none" ? "" : animationName;
    }
  }

  private cacheAnimationName(box: Element): void {
    this.animationNameCache.set(box, this.animationName(box));
  }

  private cachedAnimationName(box: Element): string {
    return this.animationNameCache.get(box) || "";
  }

  private scrollHandler = (): void => {
    this.scrolled = true;
  };

  private scrollCallback = (): void => {
    if (this.scrolled) {
      this.scrolled = false;
      this.boxes = this.boxes.filter((box) => {
        if (this.isVisible(box)) {
          this.show(box);
          return false;
        }
        return true;
      });

      if (!this.boxes.length && !(this.config as any).live) this.stop();
    }
  };

  private offsetTop(element: Element): number {
    if (typeof window === "undefined") return 0;

    let el: Element | null = element;
    while (el && (el as HTMLElement).offsetTop === undefined) {
      el = el.parentNode as Element;
    }
    if (!el) return 0;

    let top = (el as HTMLElement).offsetTop;
    // eslint-disable-next-line no-cond-assign
    while ((el = ((el as HTMLElement).offsetParent as Element))) {
      top += (el as HTMLElement).offsetTop;
    }
    return top;
  }

  private isVisible(box: Element): boolean {
    if (typeof window === "undefined") return false;

    const offsetAttr = parseInt(box.getAttribute("data-wow-offset") || "0", 10);
    const offset = Number.isNaN(offsetAttr) ? (this.config as any).offset : offsetAttr;

    const viewTop =
      ((this.config as any).scrollContainer as any)?.scrollTop ?? window.pageYOffset ?? 0;

    const viewBottom =
      viewTop +
      Math.min(this.element?.clientHeight || 0, this.util().innerHeight()) -
      offset;

    const top = this.offsetTop(box);
    const bottom = top + (box as HTMLElement).clientHeight;

    return top <= viewBottom && bottom >= viewTop;
  }

  private util(): Util {
    if (!this._util) this._util = new Util();
    return this._util;
  }

  private disabled(): boolean {
    return !(this.config as any).mobile && this.util().isMobile(typeof navigator !== "undefined" ? navigator.userAgent : "");
  }
}

// Global export to match original API
declare global {
  interface Window {
    WOW?: typeof WOW;
  }
}
if (typeof window !== "undefined") {
  (window as any).WOW = WOW;
}
