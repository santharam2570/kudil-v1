"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Cardamom, Chilli, Drumstick, IngredientIcon, MuttonPiece, RiceSack, StarAnise } from "./svg/Ingredients";

const stats = [
  { value: 9, decimals: 0, suffix: "", label: "Servings in every padi", icon: <RiceSack /> },
  { value: 130, decimals: 0, suffix: "g", label: "Every chicken piece", icon: <Drumstick /> },
  { value: 1.5, decimals: 1, suffix: "kg", label: "Mutton in every padi", icon: <MuttonPiece /> },
  { value: 100, decimals: 0, suffix: "%", label: "Halal, always", icon: <StarAnise /> },
];

export default function Highlights() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hl-big",
        { xPercent: 10 },
        { xPercent: -45, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.from(".hl-card", {
        y: 100,
        opacity: 0,
        scale: 0.85,
        stagger: 0.12,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".hl-grid", start: "top 85%" },
      });
      gsap.utils.toArray<HTMLElement>(".hl-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const decimals = Number(el.dataset.decimals);
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = o.v.toFixed(decimals);
          },
        });
      });
      gsap.to(".hl-float", {
        y: (i) => (i % 2 ? -140 : -260),
        rotate: (i) => (i % 2 ? -120 : 160),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-maroon-800 py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,196,106,0.18),transparent_60%)]" />
      <div className="hl-float pointer-events-none absolute top-[20%] left-[6%] w-16 opacity-60">
        <IngredientIcon><Chilli /></IngredientIcon>
      </div>
      <div className="hl-float pointer-events-none absolute top-[60%] right-[8%] w-14 opacity-60">
        <IngredientIcon><Cardamom /></IngredientIcon>
      </div>
      <div className="hl-float pointer-events-none absolute bottom-[5%] left-[45%] w-16 opacity-50">
        <IngredientIcon><StarAnise /></IngredientIcon>
      </div>

      <p className="hl-big pointer-events-none font-serif text-[16vw] leading-none whitespace-nowrap text-white/[0.06] italic md:text-[11vw]">
        Good Food Brings People Together…
      </p>

      <div className="relative mx-auto -mt-[8vw] max-w-7xl px-5 md:px-8">
        <div className="text-center">
          <p className="font-display text-sm tracking-[0.4em] text-gold-400">WHY KUDIL</p>
          <h2 className="mt-3 font-display text-4xl font-black text-cream-50 md:text-6xl">
            Generous by <span className="text-gold-gradient">tradition</span>
          </h2>
        </div>
        <div className="hl-grid mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="hl-card">
            <div className="group relative h-full overflow-hidden rounded-3xl border border-gold-500/30 bg-maroon-950/40 p-6 text-center backdrop-blur transition hover:-translate-y-2 hover:border-gold-400 md:p-8">
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gold-400/10 transition group-hover:scale-150" />
              <IngredientIcon className="mx-auto h-12 w-12 transition duration-500 group-hover:rotate-[360deg] md:h-14 md:w-14">{s.icon}</IngredientIcon>
              <p className="mt-4 font-display text-4xl font-black text-gold-300 md:text-6xl">
                <span className="hl-num" data-value={s.value} data-decimals={s.decimals}>
                  {s.value.toFixed(s.decimals)}
                </span>
                <span className="text-2xl md:text-3xl">{s.suffix}</span>
              </p>
              <p className="mt-2 text-sm text-cream-200/75">{s.label}</p>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
