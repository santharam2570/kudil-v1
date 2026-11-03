"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, LOADED_EVENT, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    if (reduced) {
      return () => window.removeEventListener("load", refresh);
    }

    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: 0 } });
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const start = () => {
      lenis.start();
      refresh();
    };
    window.addEventListener(LOADED_EVENT, start);

    return () => {
      window.removeEventListener(LOADED_EVENT, start);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
