// src/wow.ts
export interface WOWOptions {
  boxClass?: string;        // "wow"
  animateClass?: string;    // "animated"
  offset?: number;          // 0
  mobile?: boolean;         // true
  live?: boolean;           // true
  callback?: ((el: HTMLElement) => void) | null; // null
}

const DEFAULTS: Required<WOWOptions> = {
  boxClass: "wow",
  animateClass: "animated",
  offset: 0,
  mobile: true,
  live: true,
  callback: null
};

export default class WOW {
  private options: Required<WOWOptions>;
  private boxes: HTMLElement[] = [];
  private observer?: IntersectionObserver;
  private started = false;
  private mutationObserver?: MutationObserver;

  constructor(opts: WOWOptions = {}) {
    this.options = { ...DEFAULTS, ...opts };
  }

  init() {
    if (this.started) return;
    if (typeof window === "undefined" || typeof document === "undefined") return;

    // Respect mobile option
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent || ""
      );
    if (!this.options.mobile && isMobile) return;

    this.started = true;
    this.boxes = Array.from(document.querySelectorAll(`.${this.options.boxClass}`)) as HTMLElement[];

    // Hide boxes initially
    this.boxes.forEach((el) => {
      if (!el.style.visibility) {
        el.style.visibility = "hidden";
      }
    });

    // Create IntersectionObserver
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            this.show(el);
            this.observer?.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: `0px 0px -${this.options.offset}px 0px`,
        threshold: 0.2
      }
    );

    // Observe current boxes
    this.boxes.forEach((el) => this.observer!.observe(el));

    // Live mode: observe DOM changes & attach to new boxes
    if (this.options.live) {
      this.mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          m.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.classList.contains(this.options.boxClass)) {
                this.prepare(node);
                this.observer?.observe(node);
              }
              // Also inspect children
              node
                .querySelectorAll?.(`.${this.options.boxClass}`)
                .forEach((child) => {
                  this.prepare(child as HTMLElement);
                  this.observer?.observe(child as Element);
                });
            }
          });
        });
      });
      this.mutationObserver.observe(document.body, { childList: true, subtree: true });
    }
  }

  private prepare(el: HTMLElement) {
    if (!el.style.visibility) {
      el.style.visibility = "hidden";
    }
  }

  private show(el: HTMLElement) {
    // WOW.js supports data-wow-* attributes: data-wow-duration, data-wow-delay, data-wow-offset, data-wow-iteration
    const duration = el.getAttribute("data-wow-duration");
    const delay = el.getAttribute("data-wow-delay");
    const iteration = el.getAttribute("data-wow-iteration");

    if (duration) el.style.animationDuration = duration;
    if (delay) el.style.animationDelay = delay;
    if (iteration) el.style.animationIterationCount = iteration;

    // Add animate.css class + specific animation class already present on the element (e.g., fadeInUp)
    const animateClass = this.options.animateClass;
    el.style.visibility = "visible";
    if (!el.classList.contains(animateClass)) {
      el.classList.add(animateClass);
    }

    // Trigger callback (identical to WOW.js behavior)
    if (this.options.callback) {
      this.options.callback(el);
    }
  }

  // WOW.js has sync() to re-scan DOM for new boxes
  sync() {
    if (!this.started) return;
    const newBoxes = Array.from(document.querySelectorAll(`.${this.options.boxClass}`)) as HTMLElement[];
    newBoxes.forEach((el) => {
      if (!this.boxes.includes(el)) {
        this.prepare(el);
        this.boxes.push(el);
        this.observer?.observe(el);
      }
    });
  }

  // Utility to stop observers if needed
  destroy() {
    this.observer?.disconnect();
    this.mutationObserver?.disconnect();
    this.started = false;
  }
}
