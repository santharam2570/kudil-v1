"use client";

import { useRef, useState } from "react";
import { gsap, LOADED_EVENT, useGSAP } from "@/lib/gsap";
import { Steam } from "./svg/Scenery";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(new Event(LOADED_EVENT));
          setDone(true);
        },
      });

      tl.from(".pl-pot", { y: 40, opacity: 0, duration: 0.6, ease: "back.out(1.7)" })
        .from(".pl-char", { yPercent: 110, opacity: 0, stagger: 0.04, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .to(counter, {
          v: 100,
          duration: 1.4,
          ease: "power2.inOut",
          onUpdate: () => setCount(Math.round(counter.v)),
        }, 0.2)
        .to(".pl-fill", { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0.2)
        .to(".pl-inner", { y: -30, opacity: 0, duration: 0.45, ease: "power2.in" }, "+=0.15")
        .to(".pl-curtain", { yPercent: -100, duration: 0.9, ease: "expo.inOut", stagger: 0.08 }, "-=0.15");
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]" aria-hidden>
      <div className="pl-curtain absolute inset-0 bg-gold-500" />
      <div className="pl-curtain bg-royal absolute inset-0 flex items-center justify-center">
        <div className="pl-inner flex flex-col items-center gap-6 px-6 text-center">
          <svg viewBox="-110 -170 220 230" className="pl-pot h-40 w-40">
            <Steam width={110} height={90} color="#f3d98b" transform="translate(0 -70)" opacity="0.8" />
            <ellipse cx="0" cy="-58" rx="78" ry="16" fill="#5c2a12" stroke="#d4a64a" strokeWidth="4" />
            <path d="M-78 -58 C -92 -10, -60 40, 0 44 C 60 40, 92 -10, 78 -58 Z" fill="#b8673a" />
            <path d="M-70 -30 C -40 -20, 40 -20, 70 -30" stroke="#f3d98b" strokeWidth="3" fill="none" opacity="0.6" />
            <ellipse cx="0" cy="-58" rx="66" ry="11" fill="#f6d98f" />
          </svg>
          <div className="overflow-hidden">
            <p className="font-tamil text-4xl font-extrabold text-gold-300 sm:text-5xl">
              {"குடில் பிரியாணி".split(" ").map((w, i) => (
                <span key={i} className="pl-char mr-3 inline-block last:mr-0">
                  {w}
                </span>
              ))}
            </p>
          </div>
          <p className="font-serif text-lg italic text-cream-200/80">Taste that stays with you…</p>
          <div className="mt-2 w-56">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div className="pl-fill h-full w-full origin-left scale-x-0 bg-gradient-to-r from-gold-600 via-gold-300 to-saffron-400" />
            </div>
            <p className="mt-3 font-display text-sm tracking-[0.3em] text-gold-400">
              {count.toString().padStart(3, "0")}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
