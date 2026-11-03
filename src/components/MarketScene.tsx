"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { addWalk, gsap, useGSAP } from "@/lib/gsap";
import Person from "./svg/Person";
import { Bunting, CoconutTree, Hut, Rockfort } from "./svg/Scenery";
import { Chilli, Drumstick, MintLeaf, MuttonPiece, Onion, RiceSack, SpicePouch, Tomato } from "./svg/Ingredients";

const GROUND = 680;
const CAM = 560;
const START_X = 300;
const STALLS = [1000, 1700, 2400, 3100];
const KITCHEN_X = 3900;
const STAND_OFFSET = -90;

const captions = [
  { title: "Dawn at the Trichy market", body: "Before the city wakes up, our chef is already out with his basket." },
  { title: "Seeraga Samba rice", body: "Short-grain, fragrant Seeraga Samba — the soul of a true Tamil biriyani." },
  { title: "Fresh chicken & mutton", body: "Tender cuts, picked fresh every single morning. Always halal." },
  { title: "Onions, tomatoes & mint", body: "Crisp onions, juicy tomatoes and a fistful of fresh mint." },
  { title: "Hand-picked spices", body: "Star anise, cardamom, cinnamon, cloves and fiery red chillies." },
  { title: "Back to the Kudil kitchen", body: "Basket full. Now the real magic begins…" },
];

const list = ["Rice", "Meat", "Veggies", "Spices"];

function Awning({ color }: { color: string }) {
  const n = 9;
  const w = 380 / n;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={-190 + i * w} y={-372} width={w + 0.5} height={62} fill={i % 2 ? "#fff4dc" : color} />
      ))}
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={-190 + i * w + w / 2} cy={-310} r={w / 2} fill={i % 2 ? "#fff4dc" : color} />
      ))}
      <rect x="-196" y="-380" width="392" height="12" rx="4" fill="#5a2a12" />
    </g>
  );
}

function Stall({
  x,
  color,
  label,
  tamil,
  vendor,
  children,
}: {
  x: number;
  color: string;
  label: string;
  tamil: string;
  vendor: ReactNode;
  children: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${GROUND})`}>
      <rect x="-170" y="-310" width="340" height="170" fill="#6b3a17" opacity="0.25" />
      <rect x="-172" y="-372" width="14" height="372" fill="#7a4520" />
      <rect x="158" y="-372" width="14" height="372" fill="#7a4520" />
      {vendor}
      <rect x="-180" y="-150" width="360" height="150" rx="4" fill="#9a5a2c" />
      {[-110, -40, 30, 100].map((px) => (
        <path key={px} d={`M${px} -140 V -6`} stroke="#6b3a17" strokeWidth="3" opacity="0.6" />
      ))}
      <rect x="-188" y="-162" width="376" height="16" rx="4" fill="#6b3a17" />
      {children}
      <Awning color={color} />
      <g transform="translate(0 -420)">
        <path d="M-60 26 V 40 M60 26 V 40" stroke="#5a2a12" strokeWidth="3" />
        <rect x="-110" y="-20" width="220" height="48" rx="8" fill="#fff4dc" stroke={color} strokeWidth="4" />
        <text x="0" y="2" textAnchor="middle" fontSize="20" fontWeight="800" fill={color} style={{ fontFamily: "var(--font-tamil)" }}>
          {tamil}
        </text>
        <text x="0" y="20" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="3" fill="#5a2a12" fontFamily="sans-serif">
          {label}
        </text>
      </g>
    </g>
  );
}

function Basket() {
  return (
    <g>
      <path d="M-30 36 C -30 -12, 30 -12, 30 36" stroke="#7a4520" strokeWidth="5" fill="none" />
      <g className="mk-bk-0" opacity="0"><RiceSack transform="translate(-18 22) scale(0.55)" /></g>
      <g className="mk-bk-1" opacity="0"><Drumstick transform="translate(14 20) scale(0.6) rotate(-30)" /></g>
      <g className="mk-bk-2" opacity="0"><Onion transform="translate(-2 18) scale(0.55)" /></g>
      <g className="mk-bk-3" opacity="0"><SpicePouch transform="translate(22 24) scale(0.5)" /></g>
      <path d="M-40 34 H 40 L 32 80 Q 0 90 -32 80 Z" fill="#c8924a" stroke="#7a4520" strokeWidth="3" />
      <path d="M-38 48 H 38 M-36 62 H 36 M-20 36 V 84 M0 36 V 88 M20 36 V 84" stroke="#9a6a30" strokeWidth="2" />
      <rect x="-44" y="30" width="88" height="9" rx="4" fill="#9a6a30" />
    </g>
  );
}

export default function MarketScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=600%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.set(".mk-world", { x: CAM - START_X });
      gsap.set(".mk-far", { x: (CAM - START_X) * 0.25 });
      gsap.set(".mk-cap", { autoAlpha: 0, y: 30 });
      gsap.set(".mk-cap-0", { autoAlpha: 1, y: 0 });

      const showCaption = (i: number, at: number) => {
        tl.to(`.mk-cap-${i - 1}`, { autoAlpha: 0, y: -30, duration: 0.35 }, at).to(
          `.mk-cap-${i}`,
          { autoAlpha: 1, y: 0, duration: 0.45 },
          at + 0.25,
        );
      };

      let t = 0.4;
      const walkTo = (target: number, dur: number) => {
        tl.to(".mk-char", { x: target - START_X, duration: dur }, t)
          .to(".mk-world", { x: CAM - target, duration: dur }, t)
          .to(".mk-far", { x: (CAM - target) * 0.25, duration: dur }, t);
        addWalk(tl, ".mk-char", t, dur);
        t += dur;
      };

      STALLS.forEach((stallX, i) => {
        walkTo(stallX + STAND_OFFSET, 2);
        showCaption(i + 1, t - 0.6);
        tl.to(`.mk-pick-${i}`, {
          keyframes: [
            { x: -10, y: -150, rotation: 200, scale: 1.2, duration: 0.5, ease: "power2.out" },
            { x: 5, y: 70, rotation: 360, scale: 0.4, opacity: 0, duration: 0.45, ease: "power2.in" },
          ],
        }, t + 0.1)
          .fromTo(`.mk-bk-${i}`, { opacity: 0, scale: 0, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, t + 0.95)
          .to(`.mk-tick-${i}`, { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(3)" }, t + 0.95)
          .to(`.mk-li-${i}`, { color: "#0f5132", duration: 0.2 }, t + 0.95)
          .fromTo(`.mk-sparkle-${i}`, { scale: 0, opacity: 1, transformOrigin: "50% 50%" }, { scale: 2, opacity: 0, duration: 0.5 }, t + 0.9);
        t += 1.4;
      });

      walkTo(KITCHEN_X - 40, 2.4);
      showCaption(5, t - 0.8);
      tl.to(".mk-door-glow", { opacity: 1, duration: 0.5 }, t)
        .to(".mk-char", { opacity: 0, scale: 0.85, transformOrigin: "50% 100%", duration: 0.6 }, t + 0.3)
        .to(".mk-steam", { opacity: 1, duration: 0.6 }, t + 0.5);
      t += 1.2;

      tl.to(".mk-day", { opacity: 1, duration: t }, 0)
        .to(".mk-sun", { y: -360, duration: t }, 0)
        .to(".mk-clouds", { x: -300, duration: t }, 0);
    },
    { scope: root },
  );

  return (
    <section id="market" ref={root} className="relative h-svh overflow-hidden bg-[#f6b26b]">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="mk-dawn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3d0a2e" />
            <stop offset="0.45" stopColor="#c2410c" />
            <stop offset="0.8" stopColor="#f6b26b" />
          </linearGradient>
          <linearGradient id="mk-daylight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8ec5e8" />
            <stop offset="0.6" stopColor="#fde9c4" />
            <stop offset="1" stopColor="#ffd99a" />
          </linearGradient>
          <radialGradient id="mk-sun-g">
            <stop offset="0" stopColor="#fff6c9" />
            <stop offset="0.5" stopColor="#ffd166" />
            <stop offset="1" stopColor="#ffd166" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="-2000" y="0" width="5200" height="800" fill="url(#mk-dawn)" />
        <rect className="mk-day" x="-2000" y="0" width="5200" height="800" fill="url(#mk-daylight)" opacity="0" />
        <g className="mk-sun">
          <circle cx="760" cy="620" r="150" fill="url(#mk-sun-g)" />
          <circle cx="760" cy="620" r="58" fill="#fff1b8" />
        </g>
        <g className="mk-clouds" fill="#fff" opacity="0.7">
          {[120, 520, 980, 1400].map((cx, i) => (
            <g key={cx} transform={`translate(${cx} ${120 + (i % 2) * 70})`}>
              <ellipse cx="0" cy="0" rx="70" ry="20" />
              <ellipse cx="-30" cy="-12" rx="34" ry="22" />
              <ellipse cx="22" cy="-16" rx="40" ry="26" />
            </g>
          ))}
        </g>

        <g className="mk-far">
          <path d="M-1000 640 C -600 560, -300 600, 0 570 C 300 540, 600 600, 1000 560 C 1400 520, 1800 600, 2400 560 L 2400 800 L -1000 800 Z" fill="#a8452a" opacity="0.5" />
          <Rockfort transform={`translate(900 ${GROUND - 40}) scale(0.9)`} fill="#7b1113" opacity="0.8" />
          <Rockfort transform={`translate(-300 ${GROUND - 40}) scale(0.5)`} fill="#7b1113" opacity="0.5" />
          <Rockfort transform={`translate(1900 ${GROUND - 40}) scale(0.6)`} fill="#7b1113" opacity="0.55" />
        </g>

        <g className="mk-world">
          {/* houses */}
          {Array.from({ length: 22 }, (_, i) => {
            const x = -600 + i * 220;
            const h = 160 + ((i * 37) % 90);
            const colors = ["#e7b98a", "#d98e73", "#f0d1a0", "#c97b5a", "#e9c79c"];
            return (
              <g key={i} transform={`translate(${x} ${GROUND - 40})`}>
                <rect x="0" y={-h} width="190" height={h} fill={colors[i % colors.length]} />
                <rect x="-6" y={-h - 14} width="202" height="16" fill="#8f3f22" />
                <rect x="30" y={-h + 30} width="36" height="44" fill="#5a2a12" opacity="0.55" />
                <rect x="120" y={-h + 30} width="36" height="44" fill="#5a2a12" opacity="0.55" />
              </g>
            );
          })}
          <rect x="-2000" y={GROUND - 40} width="8000" height="40" fill="#d9a066" />
          <rect x="-2000" y={GROUND} width="8000" height="200" fill="#b98552" />
          {Array.from({ length: 60 }, (_, i) => (
            <rect key={i} x={-1000 + i * 100} y={GROUND + 60} width="50" height="6" rx="3" fill="#f3e2c0" opacity="0.6" />
          ))}

          <CoconutTree transform={`translate(560 ${GROUND - 30})`} />
          <CoconutTree transform={`translate(2050 ${GROUND - 30}) scale(0.9)`} />
          <CoconutTree transform={`translate(3500 ${GROUND - 30}) scale(1.1)`} />

          <Bunting x1={820} x2={1180} y={GROUND - 470} />
          <Bunting x1={1520} x2={1880} y={GROUND - 470} />
          <Bunting x1={2220} x2={2580} y={GROUND - 470} />
          <Bunting x1={2920} x2={3280} y={GROUND - 470} />

          <Stall x={STALLS[0]} color="#7b1113" label="RICE" tamil="அரிசி" vendor={<Person variant="man" shirt="#e8641b" x={80} y={-20} scale={0.85} />}>
            {[-130, 60, 130].map((gx) => (
              <g key={gx} transform={`translate(${gx} -170)`}>
                <path d="M-34 0 C -36 -30, 36 -30, 34 0 Z" fill="#fff6dc" stroke="#d9c08a" />
                <path d="M-38 0 C -40 -16, -30 -24, -26 -20 M38 0 C 40 -16, 30 -24, 26 -20" stroke="#c8a465" strokeWidth="6" fill="none" />
              </g>
            ))}
            <g className="mk-pick-0"><RiceSack transform="translate(-40 -186)" /></g>
            <circle className="mk-sparkle-0" cx="-40" cy="-186" r="30" fill="none" stroke="#ffd166" strokeWidth="4" opacity="0" />
          </Stall>

          <Stall x={STALLS[1]} color="#b8292c" label="MEAT · HALAL" tamil="இறைச்சி" vendor={<Person variant="man" shirt="#f7f1e1" bottom="#b8292c" x={80} y={-20} scale={0.85} />}>
            <path d="M-150 -300 H 150" stroke="#555" strokeWidth="4" />
            {[-110, -60, 60, 110].map((hx, i) => (
              <g key={hx} transform={`translate(${hx} -300)`}>
                <path d="M0 0 V 18 a6 6 0 1 0 6 6" stroke="#777" strokeWidth="3" fill="none" />
                {i % 2 ? <MuttonPiece transform="translate(4 46) scale(0.9)" /> : <Drumstick transform="translate(4 46) rotate(80)" />}
              </g>
            ))}
            <rect x="20" y="-176" width="150" height="16" rx="6" fill="#d8d8d8" />
            <Drumstick transform="translate(60 -184) scale(0.8)" />
            <MuttonPiece transform="translate(120 -182) scale(0.7)" />
            <g className="mk-pick-1"><Drumstick transform="translate(-40 -184)" /></g>
            <circle className="mk-sparkle-1" cx="-40" cy="-184" r="30" fill="none" stroke="#ffd166" strokeWidth="4" opacity="0" />
          </Stall>

          <Stall x={STALLS[2]} color="#0f5132" label="VEGETABLES" tamil="காய்கறி" vendor={<Person variant="woman" bottom="#0f5132" accent="#e8c46a" x={80} y={-20} scale={0.85} />}>
            {[
              { gx: 50, el: (k: number) => <Tomato key={k} transform={`translate(${(k % 3) * 22 - 22} ${-Math.floor(k / 3) * 18}) scale(0.55)`} /> },
              { gx: 130, el: (k: number) => <Onion key={k} transform={`translate(${(k % 3) * 22 - 22} ${-Math.floor(k / 3) * 18}) scale(0.5)`} /> },
            ].map(({ gx, el }) => (
              <g key={gx} transform={`translate(${gx} -176)`}>
                {Array.from({ length: 5 }, (_, k) => el(k))}
                <path d="M-40 -2 H 40 L 34 16 H -34 Z" fill="#c8924a" stroke="#7a4520" strokeWidth="2" />
              </g>
            ))}
            {[-140, -120, -100].map((mx, k) => (
              <MintLeaf key={mx} transform={`translate(${mx} -186) rotate(${-20 + k * 20}) scale(0.7)`} />
            ))}
            <g className="mk-pick-2"><Onion transform="translate(-40 -186)" /></g>
            <circle className="mk-sparkle-2" cx="-40" cy="-186" r="30" fill="none" stroke="#ffd166" strokeWidth="4" opacity="0" />
          </Stall>

          <Stall x={STALLS[3]} color="#e8641b" label="SPICES" tamil="மசாலா" vendor={<Person variant="man" shirt="#7b1113" x={80} y={-20} scale={0.85} />}>
            {[
              { gx: 20, c: "#c8211b" },
              { gx: 80, c: "#e8b500" },
              { gx: 140, c: "#7a3b17" },
              { gx: -130, c: "#d96a1e" },
            ].map(({ gx, c }) => (
              <g key={gx} transform={`translate(${gx} -164)`}>
                <path d="M-26 -2 L 0 -42 L 26 -2 Z" fill={c} />
                <path d="M-30 -4 H 30 L 24 10 H -24 Z" fill="#b8673a" stroke="#7a3b17" strokeWidth="2" />
              </g>
            ))}
            <Chilli transform="translate(120 -300) rotate(90) scale(0.9)" />
            <Chilli transform="translate(140 -296) rotate(80) scale(0.9)" />
            <g className="mk-pick-3"><SpicePouch transform="translate(-40 -188)" /></g>
            <circle className="mk-sparkle-3" cx="-40" cy="-188" r="30" fill="none" stroke="#ffd166" strokeWidth="4" opacity="0" />
          </Stall>

          <Hut id="mk-hut" transform={`translate(${KITCHEN_X} ${GROUND})`}>
            <rect x="-70" y="-230" width="140" height="230" rx="6" fill="#2a1206" />
            <rect className="mk-door-glow" x="-70" y="-230" width="140" height="230" rx="6" fill="#ffb347" opacity="0" />
            <g className="mk-steam" opacity="0">
              <path d="M-30 -250 c -10 -20 10 -30 0 -50 M0 -250 c -10 -20 10 -30 0 -50 M30 -250 c -10 -20 10 -30 0 -50" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
            </g>
          </Hut>

          <g className="mk-char">
            <Person variant="chef" shirt="#7b1113" skin="#a8693e" x={START_X} y={GROUND + 10} holding={<Basket />} />
          </g>
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pt-24 md:px-12 md:pt-28">
        <p className="font-display text-xs tracking-[0.4em] text-cream-50 drop-shadow md:text-sm">CHAPTER 01 · THE PURCHASE</p>
        <div className="relative mt-3 h-40 max-w-md md:h-44">
          {captions.map((c, i) => (
            <div key={c.title} className={`mk-cap mk-cap-${i} absolute inset-0`}>
              <h3 className="font-display text-3xl font-black text-white drop-shadow-[0_3px_10px_rgba(61,10,14,0.6)] md:text-5xl">{c.title}</h3>
              <p className="mt-3 max-w-sm text-sm text-white/90 drop-shadow md:text-base">{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10 rounded-2xl border border-gold-500/40 bg-cream-50/90 p-4 shadow-2xl backdrop-blur md:bottom-10 md:left-12">
        <p className="mb-2 font-display text-[11px] font-bold tracking-[0.25em] text-maroon-700">SHOPPING LIST</p>
        <ul className="space-y-1.5">
          {list.map((l, i) => (
            <li key={l} className={`mk-li-${i} flex items-center gap-2 text-sm font-medium text-maroon-900/60`}>
              <span className="relative flex h-4 w-4 items-center justify-center rounded border border-maroon-700/40">
                <span className={`mk-tick-${i} invisible scale-0 text-xs leading-none text-leaf-600`}>✓</span>
              </span>
              {l}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
