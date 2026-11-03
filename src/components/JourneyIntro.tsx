"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Drumstick, IngredientIcon, Onion, RiceSack, SpicePouch } from "./svg/Ingredients";

const text =
  "Every plate of Kudil biriyani begins long before it reaches you — at dawn in the Trichy market, on our chopping boards, and over a slow, patient dum fire.";

const steps = [
  { n: "01", t: "The Purchase", icon: <RiceSack /> },
  { n: "02", t: "The Prep", icon: <Onion /> },
  { n: "03", t: "The Dum", icon: <Drumstick /> },
  { n: "04", t: "Your Plate", icon: <SpicePouch /> },
];

export default function JourneyIntro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ji-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".ji-text", start: "top 80%", end: "bottom 40%", scrub: true },
        },
      );
      gsap.from(".ji-step", {
        y: 80,
        opacity: 0,
        rotate: (i) => (i % 2 ? 6 : -6),
        stagger: 0.12,
        duration: 1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".ji-steps", start: "top 85%" },
      });
      gsap.from(".ji-line", {
        scaleX: 0,
        ease: "none",
        scrollTrigger: { trigger: ".ji-steps", start: "top 80%", end: "bottom 60%", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="journey" ref={root} className="bg-paper relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <p className="font-display text-sm tracking-[0.4em] text-maroon-600">THE KUDIL JOURNEY</p>
        <h2 className="mt-4 font-display text-4xl font-black text-maroon-800 md:text-6xl">
          From the Market <span className="font-serif font-normal italic text-gold-600">to</span> Your Plate
        </h2>
        <p className="ji-text mx-auto mt-10 max-w-4xl font-serif text-2xl leading-snug text-maroon-900 md:text-4xl">
          {text.split(" ").map((w, i) => (
            <span key={i} className="ji-word">
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="ji-steps relative mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="ji-line absolute top-12 right-[12%] left-[12%] hidden h-0.5 origin-left bg-gradient-to-r from-gold-500 via-maroon-600 to-gold-500 md:block" />
          {steps.map((s) => (
            <div key={s.n} className="ji-step relative flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold-500 bg-cream-50 shadow-xl shadow-gold-700/20">
                <IngredientIcon className="h-14 w-14">{s.icon}</IngredientIcon>
              </div>
              <span className="mt-4 font-display text-xs tracking-[0.3em] text-gold-600">CHAPTER {s.n}</span>
              <span className="mt-1 font-display text-xl font-bold text-maroon-800">{s.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
