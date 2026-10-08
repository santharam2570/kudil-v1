"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { round, seeded } from "@/lib/random";
import { Steam } from "./svg/Scenery";
import { BayLeaf, Cardamom, Cinnamon, Clove, Drumstick, MintLeaf, StarAnise } from "./svg/Ingredients";

const steps = [
  { t: "Heat the ghee", tamil: "நெய் காய்ச்சு", body: "Pure ghee shimmering over a roaring wood fire." },
  { t: "Golden onions & whole spices", tamil: "வெங்காயம் & மசாலா", body: "Onions fried golden with star anise, cardamom, cinnamon and bay leaf." },
  { t: "In goes the marinated chicken", tamil: "சிக்கன்", body: "Spiced, juicy and sizzling — the heart of the handi." },
  { t: "Layer the Seeraga Samba", tamil: "சீரக சம்பா", body: "Fragrant short-grain rice, layered gently over the masala." },
  { t: "Saffron, mint & seal", tamil: "குங்குமப்பூ", body: "Saffron milk, fresh mint, then the lid is sealed tight with dough." },
  { t: "Slow dum on charcoal", tamil: "தம்", body: "Low flame below, glowing coals above. Patience is the secret ingredient." },
  { t: "Lift the lid!", tamil: "பிரியாணி ரெடி!", body: "A cloud of aroma — Kudil biriyani is ready to serve." },
];

const CX = 400;
const RIM_Y = 300;
const RIM_RX = 172;
const RIM_RY = 40;

const inEllipse = (i: number, s: number, rx: number, ry: number) => {
  const a = seeded(i, s) * Math.PI * 2;
  const r = Math.sqrt(seeded(i, s + 1));
  return { x: round(CX + Math.cos(a) * rx * r), y: round(RIM_Y + 8 + Math.sin(a) * ry * r) };
};
const grains = Array.from({ length: 70 }, (_, i) => ({ ...inEllipse(i, 1, 145, 28), r: round(seeded(i, 9) * 180) }));
const onionBits = Array.from({ length: 26 }, (_, i) => ({ ...inEllipse(i, 4, 140, 26), r: round(seeded(i, 5) * 180) }));
const saffron = Array.from({ length: 14 }, (_, i) => ({ ...inEllipse(i, 7, 130, 24), r: round(seeded(i, 8) * 180) }));

export default function CookScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=750%", scrub: 1, pin: true, anticipatePin: 1 },
      });

      gsap.set(".ck-cap", { autoAlpha: 0, y: 30 });
      gsap.set(".ck-cap-0", { autoAlpha: 1, y: 0 });
      gsap.set(".ck-fire", { scale: 0, transformOrigin: "50% 100%" });
      gsap.set(".ck-timer", { autoAlpha: 0, scale: 0.7 });

      const caption = (i: number, at: number) => {
        tl.to(".ck-cap", { autoAlpha: 0, y: -30, duration: 0.3 }, at)
          .to(`.ck-cap-${i}`, { autoAlpha: 1, y: 0, duration: 0.4 }, at + 0.2)
          .to(".ck-dot", { backgroundColor: "rgba(255,255,255,0.2)", width: 8, duration: 0.2 }, at)
          .to(`.ck-dot-${i}`, { backgroundColor: "#e8c46a", width: 28, duration: 0.2 }, at);
      };
      const drop = (sel: string, at: number, dur = 0.7) =>
        tl.fromTo(sel, { y: -560, opacity: 1 }, { y: 0, duration: dur, ease: "power2.in" }, at).to(sel, { opacity: 0, duration: 0.2 }, at + dur);
      const surface = (fill: string, at: number) => tl.to(".ck-surface", { fill, opacity: 1, duration: 0.4 }, at);

      tl.to(".ck-dot-0", { backgroundColor: "#e8c46a", width: 28, duration: 0.1 }, 0);

      // 1. ghee
      tl.to(".ck-fire", { scale: 1, duration: 0.6, ease: "back.out(2)" }, 0.1)
        .to(".ck-glow", { opacity: 1, duration: 0.6 }, 0.1)
        .fromTo(".ck-ladle", { x: 300, y: -300, rotation: 0 }, { x: 0, y: 0, duration: 0.4 }, 0.4)
        .to(".ck-ladle", { rotation: -55, svgOrigin: "520 170", duration: 0.25 }, 0.8)
        .fromTo(".ck-ghee", { scaleY: 0 }, { scaleY: 1, transformOrigin: "50% 0%", duration: 0.2 }, 0.95);
      surface("#f2c14e", 1.05);
      tl.to(".ck-ghee", { scaleY: 0, transformOrigin: "50% 100%", duration: 0.15 }, 1.35).to(".ck-ladle", { x: 300, y: -300, duration: 0.3 }, 1.4);

      // 2. onions & spices
      caption(1, 1.6);
      drop(".ck-fall-onion", 1.7);
      drop(".ck-fall-spice", 2.0);
      surface("#a0521d", 2.3);
      tl.to(".ck-tex-onion", { opacity: 1, duration: 0.3 }, 2.4).to(".ck-tex-spice", { opacity: 1, duration: 0.3 }, 2.7);

      // 3. meat
      caption(2, 3.2);
      drop(".ck-fall-meat", 3.3);
      surface("#b8361b", 3.8);
      tl.to(".ck-tex-meat", { opacity: 1, duration: 0.3 }, 3.95).to(".ck-sizzle", { opacity: 1, duration: 0.2, repeat: 3, yoyo: true }, 4.0);

      // 4. rice
      caption(3, 4.6);
      drop(".ck-fall-rice", 4.7, 0.9);
      surface("#f6e7b8", 5.4);
      tl.to(".ck-tex-onion, .ck-tex-spice, .ck-tex-meat", { opacity: 0, duration: 0.4 }, 5.4).to(".ck-tex-rice", { opacity: 1, duration: 0.4 }, 5.45);

      // 5. saffron, mint, lid, seal
      caption(4, 6.2);
      drop(".ck-fall-saffron", 6.3, 0.5);
      tl.to(".ck-tex-saffron", { opacity: 1, duration: 0.3 }, 6.8);
      drop(".ck-fall-mint", 6.6, 0.5);
      tl.to(".ck-tex-mint", { opacity: 1, duration: 0.3 }, 7.1)
        .fromTo(".ck-lid", { y: -620 }, { y: 0, duration: 0.5, ease: "bounce.out" }, 7.2)
        .fromTo(".ck-seal", { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 0.6 }, 7.75);

      // 6. dum
      caption(5, 8.4);
      tl.to(".ck-fire", { scale: 0.42, duration: 0.5 }, 8.4)
        .to(".ck-glow", { opacity: 0.45, duration: 0.5 }, 8.4)
        .fromTo(".ck-coal", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, stagger: 0.06, duration: 0.25, ease: "back.out(3)" }, 8.6)
        .to(".ck-coal-glow", { opacity: 1, duration: 0.4 }, 9)
        .to(".ck-timer", { autoAlpha: 1, scale: 1, duration: 0.3 }, 8.6)
        .fromTo(".ck-timer-ring", { strokeDashoffset: 302 }, { strokeDashoffset: 0, duration: 1.8 }, 8.8)
        .fromTo(".ck-timer-hand", { rotation: 0 }, { rotation: 720, svgOrigin: "60 60", duration: 1.8 }, 8.8)
        .to(".ck-leak", { opacity: 0.8, duration: 0.5 }, 9.2)
        .to(".ck-pot", { x: 2, duration: 0.05, repeat: 25, yoyo: true }, 9.4);

      // 7. reveal
      caption(6, 10.8);
      tl.to(".ck-timer", { autoAlpha: 0, scale: 0.6, duration: 0.3 }, 10.8)
        .to(".ck-leak", { opacity: 0, duration: 0.2 }, 10.8)
        .to(".ck-seal", { opacity: 0, duration: 0.2 }, 10.9)
        .to(".ck-lid", { y: -480, x: 160, rotation: 28, transformOrigin: "50% 50%", duration: 0.7, ease: "power2.out" }, 11)
        .fromTo(".ck-burst", { opacity: 0, scale: 0.4, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1.4, duration: 0.6 }, 11.05)
        .to(".ck-burst", { opacity: 0, y: -120, duration: 0.5 }, 11.7)
        .to(".ck-stage", { opacity: 0.25, scale: 0.9, transformOrigin: "50% 60%", duration: 0.6 }, 11.5)
        .fromTo(".ck-reveal", { autoAlpha: 0, scale: 0.4, rotate: -40 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.4)" }, 11.6)
        .fromTo(".ck-confetti", { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, stagger: 0.02 }, 11.9)
        .to({}, { duration: 0.4 });
    },
    { scope: root },
  );

  return (
    <section id="kitchen" ref={root} className="relative h-svh overflow-hidden bg-maroon-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,rgba(232,100,27,0.35),transparent_55%),radial-gradient(ellipse_at_50%_0%,rgba(232,196,106,0.12),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#e8c46a_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr] px-5 pt-24 pb-4 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-1 lg:items-center lg:pt-10">
        <div>
          <p className="font-display text-xs tracking-[0.4em] text-gold-400 md:text-sm">CHAPTER 03 · THE DUM</p>
          <div className="relative mt-3 h-44 md:h-64">
            {steps.map((s, i) => (
              <div key={s.t} className={`ck-cap ck-cap-${i} absolute inset-0`}>
                <p className="font-display text-sm text-gold-500">
                  STEP {String(i + 1).padStart(2, "0")} <span className="text-gold-500/50">/ 07</span>
                </p>
                <h3 className="mt-1 font-display text-2xl leading-tight font-black text-cream-50 md:text-4xl xl:text-5xl">{s.t}</h3>
                <p className="mt-1 font-tamil text-lg text-saffron-400 md:text-xl">{s.tamil}</p>
                <p className="mt-2 max-w-md text-sm text-cream-200/75 md:text-base">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            {steps.map((s, i) => (
              <span key={s.t} className={`ck-dot ck-dot-${i} block h-2 w-2 rounded-full bg-white/20`} />
            ))}
          </div>
        </div>

        <div className="relative h-full min-h-0">
          <svg viewBox="80 60 640 700" className="ck-stage absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="ck-copper" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5c2a12" />
                <stop offset="0.3" stopColor="#b8673a" />
                <stop offset="0.45" stopColor="#f0b07a" />
                <stop offset="0.6" stopColor="#b8673a" />
                <stop offset="1" stopColor="#4a210b" />
              </linearGradient>
              <linearGradient id="ck-lid-g" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5c2a12" />
                <stop offset="0.4" stopColor="#d08a52" />
                <stop offset="0.55" stopColor="#f4c08f" />
                <stop offset="1" stopColor="#5c2a12" />
              </linearGradient>
              <radialGradient id="ck-glow-g">
                <stop offset="0" stopColor="#ffb347" stopOpacity="0.9" />
                <stop offset="1" stopColor="#ff6a00" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="ck-coal-g">
                <stop offset="0" stopColor="#fff1a8" />
                <stop offset="0.4" stopColor="#ff7a1a" />
                <stop offset="1" stopColor="#8a1a05" />
              </radialGradient>
              <clipPath id="ck-in">
                <ellipse cx={CX} cy={RIM_Y + 6} rx={RIM_RX - 14} ry={RIM_RY - 8} />
              </clipPath>
              <clipPath id="ck-above">
                <rect x="0" y="-800" width="800" height={RIM_Y + 806} />
              </clipPath>
              <clipPath id="ck-view">
                <rect x="80" y="60" width="640" height="700" />
              </clipPath>
            </defs>
            <g clipPath="url(#ck-view)">

            {/* stove */}
            <ellipse className="ck-glow" cx={CX} cy="640" rx="260" ry="120" fill="url(#ck-glow-g)" opacity="0" />
            <g>
              <path d="M210 610 H 590 L 610 740 H 190 Z" fill="#7a2e14" />
              {[630, 660, 690, 720].map((y, r) => (
                <g key={y}>
                  <path d={`M200 ${y} H 600`} stroke="#4a1a08" strokeWidth="3" />
                  {Array.from({ length: 7 }, (_, k) => (
                    <path key={k} d={`M${215 + k * 60 + (r % 2) * 30} ${y - 30} V ${y}`} stroke="#4a1a08" strokeWidth="3" />
                  ))}
                </g>
              ))}
              <path d="M330 740 V 680 C 330 640, 470 640, 470 680 V 740 Z" fill="#1a0602" />
              <path d="M340 740 V 690 C 340 660, 460 660, 460 690 V 740 Z" fill="#ff7a1a" opacity="0.5" className="ck-glow" />
            </g>
            <g className="ck-fire">
              {[-185, -135, -80, -25, 25, 80, 135, 185].map((dx, i) => (
                <g key={dx} transform={`translate(${CX + dx} 618) scale(${1.5 - Math.abs(dx) / 400})`}>
                  <path className="flame svg-origin-bottom" d="M0 0 C -28 -10, -22 -60, 0 -120 C 22 -60, 28 -10, 0 0 Z" fill={i % 2 ? "#ff7a1a" : "#ff5a12"} />
                  <path className="flame svg-origin-bottom" d="M0 0 C -18 -8, -14 -40, 0 -80 C 14 -40, 18 -8, 0 0 Z" fill="#ffb347" />
                  <path className="flame svg-origin-bottom" d="M0 0 C -9 -5, -7 -22, 0 -44 C 7 -22, 9 -5, 0 0 Z" fill="#fff1a8" />
                </g>
              ))}
            </g>

            {/* pot */}
            <g className="ck-pot">
              <path d="M232 300 C 140 350, 150 545, 300 590 Q 400 612 500 590 C 650 545, 660 350, 568 300 Z" fill="url(#ck-copper)" />
              <path d="M190 420 C 300 455, 500 455, 610 420" stroke="#f4c08f" strokeWidth="4" fill="none" opacity="0.5" />
              <path d="M200 460 C 300 495, 500 495, 600 460" stroke="#5c2a12" strokeWidth="3" fill="none" opacity="0.6" />
              {Array.from({ length: 9 }, (_, k) => (
                <circle key={k} cx={225 + k * 44} cy={round(440 + Math.sin((k / 8) * Math.PI) * 26)} r="5" fill="#f4c08f" opacity="0.55" />
              ))}
              <ellipse cx={CX} cy={RIM_Y} rx={RIM_RX} ry={RIM_RY} fill="#2a1206" stroke="#d08a52" strokeWidth="12" />
              <ellipse className="ck-surface" cx={CX} cy={RIM_Y + 6} rx={RIM_RX - 14} ry={RIM_RY - 8} fill="#f2c14e" opacity="0" />

              <g clipPath="url(#ck-in)">
                <g className="ck-tex-onion" opacity="0">
                  {onionBits.map((o, i) => (
                    <path key={i} d="M-8 0 a 8 4 0 0 1 16 0" transform={`translate(${o.x} ${o.y}) rotate(${o.r})`} stroke="#5e2a0c" strokeWidth="3" fill="none" />
                  ))}
                </g>
                <g className="ck-tex-spice" opacity="0">
                  <StarAnise transform={`translate(${CX - 80} ${RIM_Y + 4}) scale(0.5, 0.3)`} />
                  <Cardamom transform={`translate(${CX + 70} ${RIM_Y + 12}) scale(0.6, 0.4)`} />
                  <BayLeaf transform={`translate(${CX + 10} ${RIM_Y - 6}) scale(0.7, 0.4)`} />
                </g>
                <g className="ck-tex-meat" opacity="0">
                  {[-90, -30, 40, 100].map((dx, i) => (
                    <Drumstick key={dx} transform={`translate(${CX + dx} ${RIM_Y + 6 + (i % 2) * 8}) scale(0.9, 0.55) rotate(${i * 40})`} />
                  ))}
                </g>
                <g className="ck-sizzle" opacity="0">
                  {[-60, 0, 70].map((dx) => (
                    <circle key={dx} cx={CX + dx} cy={RIM_Y + 4} r="6" fill="none" stroke="#fff" strokeWidth="2" />
                  ))}
                </g>
                <g className="ck-tex-rice" opacity="0">
                  {grains.map((g, i) => (
                    <ellipse key={i} cx={g.x} cy={g.y} rx="5" ry="1.6" transform={`rotate(${g.r} ${g.x} ${g.y})`} fill="#fffaf0" stroke="#d9c08a" strokeWidth="0.5" />
                  ))}
                </g>
                <g className="ck-tex-saffron" opacity="0">
                  {saffron.map((s, i) => (
                    <path key={i} d="M-14 0 C -6 -4, 6 4, 14 0" transform={`translate(${s.x} ${s.y}) rotate(${s.r * 0.3})`} stroke={i % 2 ? "#e8641b" : "#f5a623"} strokeWidth="5" strokeLinecap="round" fill="none" />
                  ))}
                </g>
                <g className="ck-tex-mint" opacity="0">
                  {[-100, -40, 30, 90].map((dx, i) => (
                    <MintLeaf key={dx} transform={`translate(${CX + dx} ${RIM_Y + 4 + (i % 2) * 10}) rotate(${60 + i * 50}) scale(0.5, 0.35)`} />
                  ))}
                </g>
              </g>

              {/* falling ingredients (land on the surface, then fade) */}
              <g clipPath="url(#ck-above)">
                <g className="ck-fall-onion" opacity="0">
                  {onionBits.slice(0, 14).map((o, i) => (
                    <ellipse key={i} cx={o.x} cy={o.y - 10} rx="10" ry="4" fill="#f5e3f0" stroke="#9b3d6b" strokeWidth="2.5" transform={`rotate(${o.r} ${o.x} ${o.y - 10})`} />
                  ))}
                </g>
                <g className="ck-fall-spice" opacity="0">
                  <StarAnise transform={`translate(${CX - 80} ${RIM_Y - 10}) scale(0.7)`} />
                  <Cardamom transform={`translate(${CX + 70} ${RIM_Y - 4}) scale(0.8)`} />
                  <BayLeaf transform={`translate(${CX + 10} ${RIM_Y - 20})`} />
                  <Cinnamon transform={`translate(${CX - 20} ${RIM_Y}) rotate(20) scale(0.8)`} />
                  <Clove transform={`translate(${CX + 120} ${RIM_Y - 10}) scale(0.8)`} />
                </g>
                <g className="ck-fall-meat" opacity="0">
                  {[-90, -30, 40, 100].map((dx, i) => (
                    <Drumstick key={dx} transform={`translate(${CX + dx} ${RIM_Y - 10}) scale(1.3) rotate(${i * 40})`} />
                  ))}
                </g>
                <g className="ck-fall-rice" opacity="0">
                  {grains.map((g, i) => (
                    <ellipse key={i} cx={g.x} cy={g.y - 40 - (i % 7) * 30} rx="5" ry="1.8" transform={`rotate(${g.r} ${g.x} ${g.y - 40 - (i % 7) * 30})`} fill="#fffaf0" />
                  ))}
                </g>
                <g className="ck-fall-saffron" opacity="0">
                  {saffron.map((s, i) => (
                    <circle key={i} cx={s.x} cy={s.y - 20 - (i % 4) * 20} r="5" fill="#f5a623" />
                  ))}
                </g>
                <g className="ck-fall-mint" opacity="0">
                  {[-100, -40, 30, 90].map((dx, i) => (
                    <MintLeaf key={dx} transform={`translate(${CX + dx} ${RIM_Y - 20}) rotate(${60 + i * 50}) scale(0.8)`} />
                  ))}
                </g>
              </g>

              <path d={`M${CX - RIM_RX} ${RIM_Y} A ${RIM_RX} ${RIM_RY} 0 0 0 ${CX + RIM_RX} ${RIM_Y}`} stroke="#f0b07a" strokeWidth="5" fill="none" opacity="0.7" />

              {/* lid */}
              <g className="ck-lid">
                <path d={`M${CX - RIM_RX - 6} ${RIM_Y} C ${CX - 150} ${RIM_Y - 120}, ${CX + 150} ${RIM_Y - 120}, ${CX + RIM_RX + 6} ${RIM_Y} A ${RIM_RX + 6} ${RIM_RY} 0 0 1 ${CX - RIM_RX - 6} ${RIM_Y} Z`} fill="url(#ck-lid-g)" />
                <path d={`M${CX - 120} ${RIM_Y - 52} C ${CX - 60} ${RIM_Y - 36}, ${CX + 60} ${RIM_Y - 36}, ${CX + 120} ${RIM_Y - 52}`} stroke="#f4c08f" strokeWidth="3" fill="none" opacity="0.6" />
                <rect x={CX - 14} y={RIM_Y - 112} width="28" height="26" rx="6" fill="#5c2a12" />
                <ellipse cx={CX} cy={RIM_Y - 114} rx="30" ry="9" fill="#d08a52" />
                <ellipse className="ck-coal-glow" cx={CX} cy={RIM_Y - 70} rx="150" ry="40" fill="url(#ck-glow-g)" opacity="0" />
                {[-110, -70, -30, 30, 70, 110, -50, 50].map((dx, i) => (
                  <circle key={i} className="ck-coal" cx={CX + dx} cy={RIM_Y - 58 - (i > 5 ? 22 : Math.abs(dx) < 50 ? 18 : 0)} r={i > 5 ? 11 : 13} fill="url(#ck-coal-g)" />
                ))}
              </g>
              <path
                className="ck-seal"
                d={`M${CX - RIM_RX - 4} ${RIM_Y} A ${RIM_RX + 4} ${RIM_RY + 2} 0 0 0 ${CX + RIM_RX + 4} ${RIM_Y}`}
                stroke="#ecd6a4"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="420"
                strokeDashoffset="420"
              />
              <g className="ck-leak" opacity="0">
                <Steam width={60} height={90} color="#fff" transform={`translate(${CX - 175} ${RIM_Y - 4})`} />
                <Steam width={60} height={90} color="#fff" transform={`translate(${CX + 175} ${RIM_Y - 4})`} />
              </g>
            </g>

            <g className="ck-fire">
              {[-150, -90, -30, 30, 90, 150].map((dx, i) => (
                <g key={dx} transform={`translate(${CX + dx} 622)`}>
                  <path className="flame svg-origin-bottom" d="M0 0 C -16 -6, -12 -30, 0 -56 C 12 -30, 16 -6, 0 0 Z" fill={i % 2 ? "#ff7a1a" : "#ffb347"} />
                  <path className="flame svg-origin-bottom" d="M0 0 C -8 -4, -6 -16, 0 -28 C 6 -16, 8 -4, 0 0 Z" fill="#fff1a8" />
                </g>
              ))}
            </g>

            {/* ghee ladle */}
            <g className="ck-ladle">
              <rect x="520" y="60" width="14" height="120" rx="7" fill="#8a8f96" transform="rotate(30 527 170)" />
              <path d="M490 170 a 34 22 0 0 0 68 0 Z" fill="#b9c0c8" stroke="#6b7480" strokeWidth="2" />
              <ellipse cx="524" cy="170" rx="34" ry="8" fill="#f2c14e" />
            </g>
            <rect className="ck-ghee" x={CX + 86} y="180" width="12" height="130" rx="6" fill="#f2c14e" />

            <g className="ck-burst" opacity="0">
              <Steam width={260} height={300} color="#ffffff" transform={`translate(${CX} ${RIM_Y - 10})`} strokeWidth={14} />
              <Steam width={160} height={220} color="#fff7e0" transform={`translate(${CX - 60} ${RIM_Y})`} strokeWidth={10} />
              <Steam width={160} height={220} color="#fff7e0" transform={`translate(${CX + 70} ${RIM_Y})`} strokeWidth={10} />
            </g>
            </g>
          </svg>

          <div className="ck-timer invisible absolute top-4 right-0 flex items-center gap-3 rounded-2xl border border-gold-500/30 bg-black/40 p-3 backdrop-blur md:top-10 md:right-4">
            <svg viewBox="0 0 120 120" className="h-16 w-16 -rotate-90 md:h-20 md:w-20">
              <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
              <circle className="ck-timer-ring" cx="60" cy="60" r="48" fill="none" stroke="#e8c46a" strokeWidth="8" strokeLinecap="round" strokeDasharray="302" strokeDashoffset="302" />
              <line className="ck-timer-hand" x1="60" y1="60" x2="96" y2="60" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
              <circle cx="60" cy="60" r="5" fill="#fff" />
            </svg>
            <div>
              <p className="font-display text-lg font-black text-gold-300">DUM</p>
              <p className="text-xs text-cream-200/70">slow cooking…</p>
            </div>
          </div>

          <div className="ck-reveal invisible absolute inset-0 flex items-center justify-center">
            <div className="relative aspect-square w-[78%] max-w-[480px]">
              <div className="absolute inset-[-25%] animate-spin-slow rounded-full bg-[repeating-conic-gradient(rgba(232,196,106,0.28)_0deg_8deg,transparent_8deg_20deg)] [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" />
              {Array.from({ length: 14 }, (_, i) => (
                <span
                  key={i}
                  className="ck-confetti absolute top-1/2 left-1/2 h-3 w-3 rounded-sm"
                  style={{
                    background: ["#e8c46a", "#e8641b", "#ffffff", "#17704a"][i % 4],
                    transform: `rotate(${i * 26}deg) translate(${200 + (i % 3) * 30}px)`,
                  }}
                />
              ))}
              <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_0_80px_rgba(232,196,106,0.5)] ring-4 ring-gold-400">
                <Image src="/images/chicken.png" alt="Freshly cooked Kudil chicken biriyani" fill sizes="480px" className="scale-125 object-cover" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full border-2 border-gold-400 bg-maroon-700 px-6 py-2 text-center whitespace-nowrap shadow-xl">
                <p className="font-display text-sm font-bold tracking-widest text-gold-200 md:text-base">READY TO SERVE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
