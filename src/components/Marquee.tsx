"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const rowA = ["Seeraga Samba", "Dum Cooked", "குடில் பிரியாணி", "100% Halal", "Trichy Heritage", "Fresh Every Day"];
const rowB = ["Chicken 65", "Mutton Biriyani", "Thalcha", "Onion Raitha", "Bread Halwa", "Kesari", "Firni"];

function Row({ items, reverse, className }: { items: string[]; reverse?: boolean; className: string }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className={`flex w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
      {doubled.map((t, i) => (
        <span key={i} className={`flex items-center gap-8 px-8 whitespace-nowrap ${className}`}>
          {t}
          <span className="text-gold-500">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".mq-track",
        { xPercent: (i) => (i === 0 ? 0 : -8) },
        {
          xPercent: (i) => (i === 0 ? -8 : 0),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative z-10 -my-6 overflow-hidden py-6">
      <div className="mq-track -rotate-2 border-y-2 border-gold-500 bg-maroon-700 py-4 shadow-2xl">
        <Row items={rowA} className="font-display text-2xl font-bold tracking-widest text-gold-200 md:text-4xl" />
      </div>
      <div className="mq-track -mt-3 rotate-1 border-y border-maroon-700/40 bg-gold-400 py-3">
        <Row items={rowB} reverse className="font-serif text-lg italic text-maroon-900 md:text-2xl" />
      </div>
    </div>
  );
}
