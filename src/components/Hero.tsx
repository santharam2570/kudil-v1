"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, LOADED_EVENT, useGSAP } from "@/lib/gsap";
import { PHONE } from "@/data/menu";
import { round, seeded } from "@/lib/random";
import { PhoneIcon } from "./Navbar";
import { Steam } from "./svg/Scenery";
import {
  BayLeaf,
  Cardamom,
  Chilli,
  Cinnamon,
  Clove,
  IngredientIcon,
  MintLeaf,
  StarAnise,
} from "./svg/Ingredients";

const spices = [
  { el: <StarAnise />, cls: "left-[2%] top-[18%] w-16 md:w-20", depth: 1.4 },
  { el: <Chilli />, cls: "right-[4%] top-[8%] w-20 md:w-24", depth: 1 },
  { el: <Cardamom />, cls: "left-[8%] bottom-[14%] w-14 md:w-16", depth: 1.8 },
  { el: <BayLeaf />, cls: "right-[0%] bottom-[22%] w-20 md:w-24", depth: 1.2 },
  { el: <MintLeaf />, cls: "left-[40%] -top-[4%] w-12 md:w-14", depth: 2 },
  { el: <Cinnamon />, cls: "right-[30%] -bottom-[4%] w-20 md:w-24", depth: 1.6 },
  { el: <Clove />, cls: "left-[-4%] top-[52%] w-10 md:w-12", depth: 2.2 },
];

const pillars = [
  { title: "Quality Food", icon: "🍲" },
  { title: "Good People", icon: "🤝" },
  { title: "Great Moments", icon: "❤️" },
];

const embers = Array.from({ length: 28 }, (_, i) => ({
  left: `${round(seeded(i, 1) * 100)}%`,
  size: round(2 + seeded(i, 2) * 5),
  delay: `${-round(seeded(i, 3) * 7)}s`,
  duration: `${round(5 + seeded(i, 4) * 6)}s`,
}));

function SplitWord({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-2 ${className ?? ""}`} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} className="hero-char inline-block will-change-transform" aria-hidden>
          {c}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const intro = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
      intro
        .from(".hero-badge", { y: 30, opacity: 0, duration: 0.8 })
        .from(".hero-tamil", { y: 40, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".hero-char", { yPercent: 120, rotate: 8, duration: 1, stagger: 0.04 }, "-=0.6")
        .from(".hero-fade", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.6")
        .from(".hero-pot", { scale: 0.3, rotate: -120, opacity: 0, duration: 1.6, ease: "expo.out" }, 0.2)
        .from(".hero-ring", { scale: 0.6, opacity: 0, duration: 1.4, stagger: 0.15 }, 0.4)
        .from(".hero-spice", { scale: 0, opacity: 0, duration: 1, stagger: 0.07, ease: "back.out(2)" }, 0.8)
        .from(".hero-scroll", { opacity: 0, y: -10, duration: 0.8 }, "-=0.4");

      const play = () => intro.play();
      window.addEventListener(LOADED_EVENT, play, { once: true });

      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(".hero-copy", { yPercent: -35, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(".hero-visual", { yPercent: 18, scale: 1.25, rotate: 25, ease: "none", scrollTrigger: st });
      gsap.utils.toArray<HTMLElement>(".hero-spice-wrap").forEach((el) => {
        const d = Number(el.dataset.depth ?? 1);
        gsap.to(el, { y: -260 * d, x: (Math.random() - 0.5) * 200 * d, rotate: 180 * d, ease: "none", scrollTrigger: st });
      });

      const movers = gsap.utils.toArray<HTMLElement>(".hero-spice-wrap").map((el) => ({
        d: Number(el.dataset.depth ?? 1),
        x: gsap.quickTo(el.firstElementChild, "x", { duration: 0.8, ease: "power3.out" }),
        y: gsap.quickTo(el.firstElementChild, "y", { duration: 0.8, ease: "power3.out" }),
      }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => {
          m.x(nx * 40 * m.d);
          m.y(ny * 40 * m.d);
        });
      };
      window.addEventListener("pointermove", onMove);

      return () => {
        window.removeEventListener(LOADED_EVENT, play);
        window.removeEventListener("pointermove", onMove);
      };
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="bg-royal relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {embers.map((e, i) => (
          <span
            key={i}
            className="animate-ember absolute bottom-[-10px] rounded-full bg-gradient-to-t from-saffron-500 to-gold-300 blur-[0.5px]"
            style={{ left: e.left, width: e.size, height: e.size, animationDelay: e.delay, animationDuration: e.duration }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="hero-copy relative z-10 text-center lg:text-left">
          <p className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-white/5 px-4 py-1.5 text-xs tracking-[0.25em] text-gold-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> 100% HALAL · TRICHY
          </p>
          <p className="hero-tamil font-tamil text-3xl font-extrabold text-saffron-400 sm:text-4xl">குடில் பிரியாணி</p>
          <h1 className="mt-2 font-display font-black leading-[0.95] tracking-wide">
            <SplitWord text="KUDIL" className="text-gold-gradient text-7xl sm:text-8xl xl:text-9xl" />
            <br />
            <SplitWord text="BIRIYANI" className="text-gold-gradient text-5xl sm:text-7xl xl:text-8xl" />
          </h1>
          <p className="hero-fade mt-5 font-serif text-2xl italic text-cream-100 sm:text-3xl">Taste that stays with you…</p>
          <p className="hero-fade mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream-200/75 lg:mx-0">
            Fragrant Seeraga Samba rice, tender meat and hand-ground spices, slow-cooked on dum the traditional Tamil way.
            Scroll down and follow a biriyani from the market to your plate.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#menu"
              className="group relative overflow-hidden rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-7 py-3.5 font-semibold text-maroon-900 shadow-xl shadow-gold-700/30 transition hover:scale-105"
            >
              <span className="relative z-10">Explore Menu</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href={`tel:+91${PHONE}`}
              className="flex items-center gap-2 rounded-full border border-gold-400/60 px-7 py-3.5 font-semibold text-gold-200 transition hover:bg-gold-400/10"
            >
              <PhoneIcon className="h-4 w-4" /> Call to Order
            </a>
          </div>
          <ul className="hero-fade mt-10 flex justify-center gap-6 lg:justify-start">
            {pillars.map((p) => (
              <li key={p.title} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/50 bg-maroon-800/60 text-xl">
                  {p.icon}
                </span>
                <span className="text-[11px] font-medium tracking-[0.18em] text-cream-200/80 uppercase">{p.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual relative mx-auto aspect-square w-full max-w-[540px]">
          <div className="hero-ring absolute inset-[-6%] rounded-full border border-dashed border-gold-500/30 animate-spin-slow" />
          <div className="hero-ring absolute inset-[2%] rounded-full border-2 border-gold-500/40" />
          <div className="hero-ring absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(232,196,106,0.35),transparent_70%)] blur-2xl" />
          <div className="hero-pot absolute inset-[10%] overflow-hidden rounded-full shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] ring-4 ring-gold-400/80 ring-offset-4 ring-offset-maroon-900">
            <Image
              src="/images/chicken.png"
              alt="Kudil chicken biriyani in a copper handi"
              fill
              preload
              sizes="(max-width: 1024px) 80vw, 480px"
              className="scale-125 object-cover"
            />
          </div>
          <svg viewBox="-100 -200 200 200" className="pointer-events-none absolute top-[-26%] left-1/2 w-1/2 -translate-x-1/2 opacity-60 blur-[1.5px]" aria-hidden>
            <Steam width={150} height={190} color="#fff7e0" />
          </svg>

          {spices.map((s, i) => (
            <div key={i} className={`hero-spice-wrap absolute ${s.cls}`} data-depth={s.depth}>
              <div>
                <div className="hero-spice animate-float drop-shadow-[0_12px_14px_rgba(0,0,0,0.45)]" style={{ animationDelay: `${-i * 0.9}s` }}>
                  <IngredientIcon className="h-auto w-full">{s.el}</IngredientIcon>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a href="#journey" className="hero-scroll absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.35em] text-gold-300/80">
        <span className="flex h-10 w-6 justify-center rounded-full border border-gold-400/60 pt-2">
          <span className="h-2 w-1 animate-bounce rounded-full bg-gold-300" />
        </span>
        SCROLL · START THE JOURNEY
      </a>
    </section>
  );
}
