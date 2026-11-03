"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

export const LOADED_EVENT = "kudil:loaded";

/**
 * Adds a scroll-scrubbed walk cycle for a <Person /> inside `scope`.
 * Legs and the free arm swing for `duration` timeline units, then settle.
 */
export function addWalk(
  tl: gsap.core.Timeline,
  scope: string,
  at: number,
  duration: number,
  step = 0.22,
) {
  const swings = Math.max(2, Math.round(duration / step));
  const repeat = swings - 1;
  const settle = { rotation: 0, duration: step * 0.6, ease: "sine.out" };
  const t = at + step * swings;

  const o = "50% 0%";
  const swing = { duration: step, repeat, yoyo: true, ease: "sine.inOut", immediateRender: false };
  tl.fromTo(`${scope} .p-leg-f`, { rotation: -24, transformOrigin: o }, { rotation: 24, ...swing }, at)
    .fromTo(`${scope} .p-leg-b`, { rotation: 24, transformOrigin: o }, { rotation: -24, ...swing }, at)
    .fromTo(`${scope} .p-arm-swing`, { rotation: 20, transformOrigin: o }, { rotation: -20, ...swing }, at)
    .fromTo(`${scope} .p-body`, { y: 0 }, { y: -6, duration: step / 2, repeat: swings * 2 - 1, yoyo: true, ease: "sine.inOut", immediateRender: false }, at)
    .to(`${scope} .p-leg-f, ${scope} .p-leg-b, ${scope} .p-arm-swing`, settle, t)
    .to(`${scope} .p-body`, { y: 0, duration: step * 0.6 }, t);
}
