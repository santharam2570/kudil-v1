"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { round, seeded } from "@/lib/random";
import { Drumstick, Onion } from "./svg/Ingredients";

const steps = [
  { n: "01", t: "Chop", tamil: "நறுக்கு", body: "Mountains of onions, sliced thin by hand for that deep golden fry." },
  { n: "02", t: "Marinate", tamil: "ஊற வை", body: "Chicken bathed in thick curd, ginger-garlic and red chilli masala." },
  { n: "03", t: "Rest", tamil: "ஓய்வு", body: "Left to soak up every spice, so each bite is full of flavour." },
];

const SLICES = 7;
const BOWL = { x: 730, y: 470 };

const particles = Array.from({ length: 22 }, (_, i) => ({
  x: round(BOWL.x - 40 + seeded(i, 1) * 80),
  delay: seeded(i, 2) * 0.6,
  c: ["#c8211b", "#e8b500", "#d96a1e", "#7a3b17"][i % 4],
  r: round(3 + seeded(i, 3) * 3),
}));

export default function PrepScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=400%", scrub: 1, pin: true, anticipatePin: 1 },
      });

      const activate = (i: number, at: number) => {
        tl.to(".pp-step", { opacity: 0.35, scale: 0.96, duration: 0.2 }, at)
          .to(`.pp-step-${i}`, { opacity: 1, scale: 1, duration: 0.3 }, at)
          .fromTo(`.pp-bar-${i}`, { scaleX: 0 }, { scaleX: 1, duration: i === 0 ? 3 : 2.2 }, at);
      };

      gsap.set(".pp-step", { opacity: 0.35, scale: 0.96, transformOrigin: "0% 50%" });

      // chop
      activate(0, 0);
      let t = 0.2;
      for (let i = 0; i < SLICES; i++) {
        tl.to(".pp-knife", { y: 70, duration: 0.18, ease: "power2.in" }, t)
          .to(".pp-knife", { y: 0, x: (i + 1) * 15, duration: 0.18, ease: "power2.out" }, t + 0.18)
          .to(".pp-clip", { attr: { x: 268 + (i + 1) * 15 }, duration: 0.05 }, t + 0.16)
          .fromTo(
            `.pp-slice-${i}`,
            { opacity: 0, x: 0, rotation: 0 },
            { opacity: 1, x: -60 - i * 20, y: 26 + (i % 2) * 8, rotation: -70 + i * 6, duration: 0.3, ease: "power2.out" },
            t + 0.18,
          );
        t += 0.4;
      }
      tl.to(".pp-knife", { x: 260, y: -80, rotation: 30, opacity: 0, duration: 0.4 }, t);
      t += 0.3;

      // marinate
      activate(1, t);
      [0, 1, 2].forEach((i) => {
        tl.fromTo(`.pp-meat-${i}`, { y: -520, rotation: -90 }, { y: 0, rotation: (i - 1) * 25, duration: 0.45, ease: "bounce.out" }, t + i * 0.25);
      });
      t += 1;
      tl.to(".pp-cup", { x: 0, y: 0, rotation: -115, transformOrigin: "0% 0%", duration: 0.4 }, t)
        .fromTo(".pp-stream", { scaleY: 0 }, { scaleY: 1, duration: 0.3, transformOrigin: "50% 0%" }, t + 0.35)
        .to(".pp-surface", { opacity: 1, duration: 0.5 }, t + 0.45)
        .to(".pp-stream", { scaleY: 0, transformOrigin: "50% 100%", duration: 0.2 }, t + 0.9)
        .to(".pp-cup", { x: 200, y: -200, opacity: 0, rotation: -20, duration: 0.4 }, t + 1);
      t += 1.2;
      tl.fromTo(".pp-shaker", { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, t)
        .to(".pp-shaker", { rotation: 160, duration: 0.2 }, t + 0.3)
        .to(".pp-shaker", { x: 14, duration: 0.08, repeat: 7, yoyo: true }, t + 0.5);
      particles.forEach((p, i) => {
        tl.fromTo(`.pp-dust-${i}`, { y: 0, opacity: 0 }, { y: 150, opacity: 1, duration: 0.35, ease: "power1.in" }, t + 0.5 + p.delay)
          .to(`.pp-dust-${i}`, { opacity: 0, duration: 0.05 }, t + 0.85 + p.delay);
      });
      tl.to(".pp-surface", { fill: "#c8501e", duration: 0.6 }, t + 0.7).to(".pp-shaker", { y: -300, opacity: 0, duration: 0.3 }, t + 1.3);
      t += 1.5;

      // rest
      activate(2, t);
      tl.fromTo(".pp-spoon", { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.3 }, t)
        .to(".pp-spoon-rot", { rotation: 720, svgOrigin: `${BOWL.x} ${BOWL.y - 40}`, duration: 1.6 }, t + 0.3)
        .fromTo(".pp-swirl", { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 1.4 }, t + 0.3)
        .to(".pp-meat-wrap", { opacity: 0.35, duration: 1 }, t + 0.4)
        .to(".pp-spoon", { opacity: 0, y: -120, duration: 0.3 }, t + 2)
        .fromTo(".pp-cover", { y: -500 }, { y: 0, duration: 0.4, ease: "bounce.out" }, t + 2.2)
        .fromTo(".pp-done", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", transformOrigin: "50% 50%" }, t + 2.6);
    },
    { scope: root },
  );

  return (
    <section id="prep" ref={root} className="relative h-svh overflow-hidden bg-[#2a1308]">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#4a2410_0_80px,#3d1d0c_80px_82px,#52280f_82px_170px,#3d1d0c_170px_172px)] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,180,90,0.25),transparent_60%)]" />

      <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr] gap-4 px-5 pt-24 pb-6 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:grid-rows-1 lg:items-center lg:pt-16">
        <div>
          <p className="font-display text-xs tracking-[0.4em] text-gold-400 md:text-sm">CHAPTER 02 · THE PREP</p>
          <h2 className="mt-3 font-display text-3xl font-black text-cream-50 md:text-5xl">
            Prepared <span className="font-serif font-normal italic text-gold-300">by hand</span>
          </h2>
          <ol className="mt-5 flex gap-3 lg:mt-10 lg:block lg:space-y-6">
            {steps.map((s, i) => (
              <li key={s.n} className={`pp-step pp-step-${i} flex-1 rounded-2xl border border-gold-500/25 bg-black/20 p-3 backdrop-blur-sm lg:p-5`}>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-gold-500">{s.n}</span>
                  <span className="font-display text-base font-bold text-cream-50 lg:text-2xl">{s.t}</span>
                  <span className="hidden font-tamil text-gold-300/80 sm:inline">{s.tamil}</span>
                </div>
                <p className="mt-2 hidden text-sm text-cream-200/75 lg:block">{s.body}</p>
                <div className="mt-3 h-0.5 overflow-hidden rounded bg-white/10">
                  <div className={`pp-bar-${i} h-full origin-left scale-x-0 bg-gradient-to-r from-gold-500 to-saffron-400`} />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <svg viewBox="40 120 960 520" className="h-full max-h-[70vh] w-full self-center" aria-hidden>
          <defs>
            <clipPath id="pp-onion-clip">
              <rect className="pp-clip" x="268" y="250" width="200" height="200" />
            </clipPath>
            <linearGradient id="pp-blade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f4f6f8" />
              <stop offset="1" stopColor="#9aa3ad" />
            </linearGradient>
            <linearGradient id="pp-bowl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d08a52" />
              <stop offset="1" stopColor="#8f4a25" />
            </linearGradient>
            <clipPath id="pp-bowl-in">
              <ellipse cx={BOWL.x} cy={BOWL.y - 40} rx="150" ry="36" />
              <rect x={BOWL.x - 150} y={-200} width="300" height={BOWL.y - 40 + 200} />
            </clipPath>
            <clipPath id="pp-view">
              <rect x="40" y="120" width="960" height="520" />
            </clipPath>
          </defs>
          <g clipPath="url(#pp-view)">

          {/* board */}
          <ellipse cx="270" cy="520" rx="240" ry="22" fill="rgba(0,0,0,0.35)" />
          <rect x="60" y="390" width="420" height="120" rx="26" fill="#c8924a" />
          <rect x="60" y="390" width="420" height="22" rx="11" fill="#e0ae6a" />
          {[430, 455, 480].map((y) => (
            <path key={y} d={`M90 ${y} C 200 ${y - 8}, 300 ${y + 8}, 450 ${y}`} stroke="#a8743a" strokeWidth="2" fill="none" opacity="0.6" />
          ))}

          {Array.from({ length: SLICES }, (_, i) => (
            <g key={i} className={`pp-slice-${i}`} opacity="0">
              <ellipse cx="282" cy="350" rx="9" ry="46" fill="#f5e3f0" stroke="#9b3d6b" strokeWidth="4" />
              <ellipse cx="282" cy="350" rx="4" ry="30" fill="none" stroke="#c96f9b" strokeWidth="2" />
            </g>
          ))}
          <g clipPath="url(#pp-onion-clip)">
            <Onion transform="translate(330 350) scale(2.2)" />
          </g>

          <g className="pp-knife">
            <g transform="translate(286 200)">
              <path d="M-6 0 L 6 0 L 10 150 C 4 160, -12 160, -16 150 Z" fill="url(#pp-blade)" stroke="#6b7480" strokeWidth="1.5" />
              <rect x="-10" y="-90" width="20" height="92" rx="8" fill="#3b2416" />
              <circle cx="0" cy="-70" r="3" fill="#d4a64a" />
              <circle cx="0" cy="-30" r="3" fill="#d4a64a" />
            </g>
          </g>

          {/* bowl */}
          <ellipse cx={BOWL.x} cy={BOWL.y + 85} rx="180" ry="20" fill="rgba(0,0,0,0.35)" />
          <ellipse cx={BOWL.x} cy={BOWL.y - 40} rx="160" ry="40" fill="#6b3418" />
          <ellipse className="pp-surface" cx={BOWL.x} cy={BOWL.y - 34} rx="146" ry="32" fill="#fbf6ea" opacity="0" />
          <path
            className="pp-swirl"
            d={`M${BOWL.x} ${BOWL.y - 34} m -20 0 a 20 8 0 1 1 40 0 a 50 16 0 1 1 -100 0 a 80 24 0 1 1 160 0 a 110 28 0 1 1 -220 0`}
            stroke="#f3c89a"
            strokeWidth="5"
            fill="none"
            strokeDasharray="600"
            strokeDashoffset="600"
            opacity="0.85"
          />
          <g clipPath="url(#pp-bowl-in)" className="pp-meat-wrap">
            {[-60, 0, 60].map((dx, i) => (
              <g key={i} className={`pp-meat-${i}`}>
                <g transform={`translate(${BOWL.x + dx} ${BOWL.y - 40}) scale(1.4)`}>
                  <Drumstick />
                </g>
              </g>
            ))}
          </g>
          <path
            d={`M${BOWL.x - 160} ${BOWL.y - 40} C ${BOWL.x - 150} ${BOWL.y + 60}, ${BOWL.x - 90} ${BOWL.y + 90}, ${BOWL.x} ${BOWL.y + 92} C ${BOWL.x + 90} ${BOWL.y + 90}, ${BOWL.x + 150} ${BOWL.y + 60}, ${BOWL.x + 160} ${BOWL.y - 40} A 160 40 0 0 1 ${BOWL.x - 160} ${BOWL.y - 40} Z`}
            fill="url(#pp-bowl)"
          />
          <path d={`M${BOWL.x - 160} ${BOWL.y - 40} A 160 40 0 0 0 ${BOWL.x + 160} ${BOWL.y - 40}`} stroke="#f0c48a" strokeWidth="6" fill="none" />
          <path d={`M${BOWL.x - 120} ${BOWL.y + 20} C ${BOWL.x - 60} ${BOWL.y + 44}, ${BOWL.x + 60} ${BOWL.y + 44}, ${BOWL.x + 120} ${BOWL.y + 20}`} stroke="#f0c48a" strokeWidth="3" fill="none" opacity="0.5" />

          {/* curd cup + stream */}
          <rect className="pp-stream" x={BOWL.x - 6} y={190} width="12" height={BOWL.y - 230} rx="6" fill="#fbf6ea" />
          <g className="pp-cup" transform="translate(200 -200)">
            <g transform={`translate(${BOWL.x + 20} 180)`}>
              <path d="M-36 -40 H 36 L 28 30 H -28 Z" fill="#d06a3a" stroke="#8f3f1e" strokeWidth="3" />
              <ellipse cx="0" cy="-40" rx="36" ry="9" fill="#fbf6ea" stroke="#8f3f1e" strokeWidth="3" />
            </g>
          </g>

          {/* spice shaker + dust */}
          <g className="pp-shaker" opacity="0">
            <g transform={`translate(${BOWL.x} 200)`}>
              <rect x="-24" y="-60" width="48" height="70" rx="10" fill="#c8211b" />
              <rect x="-26" y="-74" width="52" height="18" rx="6" fill="#d4a64a" />
              <text x="0" y="-16" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff4dc" fontFamily="sans-serif">MASALA</text>
            </g>
          </g>
          {particles.map((p, i) => (
            <circle key={i} className={`pp-dust-${i}`} cx={p.x} cy={280} r={p.r} fill={p.c} opacity="0" />
          ))}

          <g className="pp-spoon" opacity="0">
            <g className="pp-spoon-rot">
              <g transform={`translate(${BOWL.x + 70} ${BOWL.y - 50}) rotate(25)`}>
                <rect x="-6" y="-200" width="12" height="190" rx="6" fill="#8a5a2c" />
                <ellipse cx="0" cy="0" rx="22" ry="14" fill="#a8743a" />
              </g>
            </g>
          </g>

          <g className="pp-cover">
            <g opacity="0" className="pp-done">
              <rect x={BOWL.x - 120} y={BOWL.y - 210} width="240" height="56" rx="28" fill="#0f5132" stroke="#e8c46a" strokeWidth="3" />
              <text x={BOWL.x} y={BOWL.y - 175} textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff4dc" fontFamily="sans-serif">
                Marinated ✓ Ready
              </text>
            </g>
          </g>
          </g>
        </svg>
      </div>
    </section>
  );
}
