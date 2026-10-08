"use client";

import { useRef } from "react";
import { addWalk, gsap, useGSAP } from "@/lib/gsap";
import Person from "./svg/Person";
import { CoconutTree, Hut, Rockfort, Steam } from "./svg/Scenery";

const GROUND = 680;
const CAM = 520;
const START_X = 250;
const SHOP = 1500;
const STOP_X = 1330;
const EXIT_X = 2350;

const captions = [
  { title: "Craving biriyani?", body: "That unmistakable aroma drifts down the street…" },
  { title: "Order at the counter", body: "“ஒரு சிக்கன் பிரியாணி பார்சல்!” — one chicken biriyani parcel, please!" },
  { title: "Packed hot & fresh", body: "Straight from the handi, sealed and handed over with a smile." },
  { title: "Taste that stays with you…", body: "And they always come back for more." },
];

function Bag() {
  return (
    <g>
      <path d="M-14 4 C -14 -10, 14 -10, 14 4" stroke="#7a4520" strokeWidth="3.5" fill="none" />
      <path d="M-30 4 H 30 L 34 78 H -34 Z" fill="#c8924a" stroke="#7a4520" strokeWidth="2.5" />
      <path d="M-30 4 L -24 -2 H 24 L 30 4" fill="#a8743a" />
      <path d="M0 22 L 20 46 H -20 Z" fill="#e8641b" />
      <rect x="-14" y="46" width="28" height="16" fill="#7a3d18" />
      <text x="0" y="58" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff4dc" fontFamily="sans-serif">KUDIL</text>
    </g>
  );
}

function AutoRickshaw(props: React.SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <ellipse cx="0" cy="4" rx="130" ry="10" fill="rgba(0,0,0,0.2)" />
      <path d="M-110 -40 C -110 -150, -40 -170, 30 -170 H 70 C 100 -170, 110 -120, 110 -40 Z" fill="#1f1f1f" />
      <path d="M-120 -40 H 120 V -90 C 120 -110, 90 -120, 60 -120 H -60 C -100 -120, -120 -100, -120 -70 Z" fill="#f5c518" />
      <path d="M-110 -120 H 100" stroke="#2f7a3a" strokeWidth="10" />
      <rect x="-30" y="-150" width="70" height="40" rx="6" fill="#bfe3f5" opacity="0.8" />
      <rect x="-120" y="-50" width="240" height="14" fill="#2f7a3a" />
      <circle cx="-80" cy="-14" r="26" fill="#1f1f1f" />
      <circle cx="-80" cy="-14" r="10" fill="#9aa3ad" />
      <circle cx="85" cy="-14" r="26" fill="#1f1f1f" />
      <circle cx="85" cy="-14" r="10" fill="#9aa3ad" />
      <circle cx="118" cy="-80" r="8" fill="#fff1a8" />
    </g>
  );
}

export default function ShopScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=450%", scrub: 1, pin: true, anticipatePin: 1 },
      });

      gsap.set(".sh-world", { x: CAM - START_X });
      gsap.set(".sh-far", { x: (CAM - START_X) * 0.25 });
      gsap.set(".sh-cap", { autoAlpha: 0, y: 30 });
      gsap.set(".sh-cap-0", { autoAlpha: 1, y: 0 });

      const caption = (i: number, at: number) =>
        tl.to(`.sh-cap-${i - 1}`, { autoAlpha: 0, y: -30, duration: 0.3 }, at).to(`.sh-cap-${i}`, { autoAlpha: 1, y: 0, duration: 0.4 }, at + 0.2);

      const walk = (from: number, to: number, at: number, dur: number) => {
        tl.fromTo(".sh-cust", { x: from - START_X }, { x: to - START_X, duration: dur }, at)
          .fromTo(".sh-world", { x: CAM - from }, { x: CAM - to, duration: dur }, at)
          .fromTo(".sh-far", { x: (CAM - from) * 0.25 }, { x: (CAM - to) * 0.25, duration: dur }, at);
        addWalk(tl, ".sh-cust", at, dur);
      };

      walk(START_X, STOP_X, 0.2, 3);
      tl.to(".sh-aroma", { opacity: 1, duration: 0.6 }, 1.2);

      caption(1, 3.1);
      tl.fromTo(".sh-bubble", { scale: 0, opacity: 0, transformOrigin: "0% 100%" }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.5)" }, 3.3)
        .to(".sh-keeper .p-arm-f", { rotation: -150, transformOrigin: "50% 0%", duration: 0.25 }, 3.5)
        .to(".sh-keeper .p-arm-f", { rotation: -120, duration: 0.12, repeat: 3, yoyo: true }, 3.75)
        .to(".sh-keeper .p-arm-f", { rotation: 0, duration: 0.25 }, 4.25)
        .to(".sh-bubble", { scale: 0, opacity: 0, duration: 0.25 }, 4.4);

      caption(2, 4.5);
      tl.to(".sh-handi-lid", { y: -50, rotation: -20, transformOrigin: "50% 100%", duration: 0.3 }, 4.6)
        .fromTo(".sh-handi-steam", { opacity: 0, scale: 0.5, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1.3, duration: 0.4 }, 4.65)
        .fromTo(".sh-parcel", { scale: 0, opacity: 0, transformOrigin: "50% 100%" }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 4.9)
        .to(".sh-handi-lid", { y: 0, rotation: 0, duration: 0.25 }, 5.1)
        .to(".sh-handi-steam", { opacity: 0, duration: 0.3 }, 5.2)
        .to(".sh-parcel", { x: -120, duration: 0.4, ease: "power2.inOut" }, 5.3)
        .to(".sh-parcel", { opacity: 0, duration: 0.05 }, 5.72)
        .to(".sh-cust-a", { opacity: 0, duration: 0.05 }, 5.72)
        .to(".sh-cust-b", { opacity: 1, duration: 0.05 }, 5.72)
        .fromTo(".sh-coin", { opacity: 1, x: 0, y: 0 }, { keyframes: [{ x: 60, y: -90, rotation: 360, duration: 0.25 }, { x: 140, y: -20, rotation: 720, duration: 0.25 }] }, 5.8)
        .to(".sh-coin", { opacity: 0, duration: 0.05 }, 6.3)
        .fromTo(".sh-thanks", { scale: 0, opacity: 0, transformOrigin: "50% 100%" }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2.5)" }, 6.3)
        .to(".sh-thanks", { scale: 0, opacity: 0, duration: 0.2 }, 6.9);

      caption(3, 7.1);
      walk(STOP_X, EXIT_X, 7.1, 2.8);
      tl.fromTo(
        ".sh-heart",
        { y: 0, scale: 0, opacity: 0 },
        {
          keyframes: [
            { scale: 1, opacity: 1, y: -40, duration: 0.3 },
            { y: -160, opacity: 0, duration: 0.7 },
          ],
          stagger: 0.25,
        },
        7.6,
      ).to({}, { duration: 0.3 });
    },
    { scope: root },
  );

  return (
    <section id="visit" ref={root} className="relative h-svh overflow-hidden bg-[#9fd3ee]">
      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="sh-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6fb7e0" />
            <stop offset="0.7" stopColor="#ffe8bf" />
            <stop offset="1" stopColor="#ffd28a" />
          </linearGradient>
        </defs>
        <rect x="-2000" y="0" width="6000" height="800" fill="url(#sh-sky)" />
        <circle cx="980" cy="160" r="60" fill="#fff1b8" />
        <circle cx="980" cy="160" r="100" fill="#fff1b8" opacity="0.3" />

        <g className="sh-far">
          <path d="M-1000 640 C -600 580, -300 610, 0 590 C 300 560, 600 610, 1000 580 C 1400 550, 1800 610, 2600 580 L 2600 800 L -1000 800 Z" fill="#c9a26b" opacity="0.6" />
          <Rockfort transform={`translate(700 ${GROUND - 40}) scale(0.8)`} fill="#b06a4a" opacity="0.65" />
        </g>

        <g className="sh-world">
          {Array.from({ length: 18 }, (_, i) => {
            const x = -500 + i * 240;
            if (x > SHOP - 420 && x < SHOP + 260) return null;
            const h = 180 + ((i * 53) % 100);
            const colors = ["#f2c7a5", "#e6a57e", "#f7dcb0", "#d9927a", "#fbe3c0"];
            return (
              <g key={i} transform={`translate(${x} ${GROUND - 40})`}>
                <rect x="0" y={-h} width="210" height={h} fill={colors[i % colors.length]} />
                <rect x="-6" y={-h - 14} width="222" height="16" fill="#a0482a" />
                <rect x="34" y={-h + 34} width="40" height="48" fill="#6b3a17" opacity="0.5" />
                <rect x="132" y={-h + 34} width="40" height="48" fill="#6b3a17" opacity="0.5" />
                <rect x="80" y="-80" width="50" height="80" fill="#6b3a17" opacity="0.6" />
              </g>
            );
          })}
          <rect x="-2000" y={GROUND - 40} width="7000" height="40" fill="#e0b27a" />
          <rect x="-2000" y={GROUND} width="7000" height="200" fill="#8a8f96" />
          {Array.from({ length: 50 }, (_, i) => (
            <rect key={i} x={-1000 + i * 120} y={GROUND + 70} width="60" height="8" rx="4" fill="#f4f4f4" opacity="0.8" />
          ))}

          <CoconutTree transform={`translate(700 ${GROUND - 30})`} />
          <CoconutTree transform={`translate(1090 ${GROUND - 30}) scale(0.85)`} />
          <CoconutTree transform={`translate(1960 ${GROUND - 30}) scale(1.05)`} />
          <AutoRickshaw transform={`translate(900 ${GROUND + 40})`} />

          <g className="sh-aroma" opacity="0">
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${SHOP - 200} ${GROUND - 260 - i * 30} C ${SHOP - 400} ${GROUND - 320 - i * 30}, ${SHOP - 600} ${GROUND - 200 - i * 30}, ${SHOP - 900} ${GROUND - 280 - i * 30}`}
                stroke="#fff"
                strokeWidth="6"
                strokeDasharray="14 18"
                fill="none"
                opacity="0.6"
                strokeLinecap="round"
              />
            ))}
          </g>

          <Hut id="sh-hut" transform={`translate(${SHOP} ${GROUND})`}>
            <g className="sh-keeper">
              <Person variant="chef" shirt="#0f5132" skin="#9a5e36" x={60} y={-30} scale={0.8} />
            </g>
            <rect x="-210" y="-150" width="420" height="150" rx="6" fill="#8a4a20" />
            <rect x="-220" y="-162" width="440" height="18" rx="6" fill="#5a2a12" />
            <rect x="-150" y="-120" width="300" height="70" rx="10" fill="#7b1113" stroke="#d4a64a" strokeWidth="3" />
            <text x="0" y="-78" textAnchor="middle" fontSize="30" fontWeight="900" letterSpacing="4" fill="#f3d98b" style={{ fontFamily: "var(--font-display)" }}>
              KUDIL
            </text>
            <text x="0" y="-60" textAnchor="middle" fontSize="11" letterSpacing="6" fill="#fff4dc" fontFamily="sans-serif">
              BIRIYANI
            </text>
            <g transform="translate(130 -162)">
              <path d="M-50 0 C -60 -50, 60 -50, 50 0 Z" fill="#b8673a" />
              <ellipse cx="0" cy="-30" rx="44" ry="10" fill="#f6e7b8" />
              <g className="sh-handi-lid">
                <path d="M-48 -30 C -40 -70, 40 -70, 48 -30 Z" fill="#d08a52" />
                <circle cx="0" cy="-62" r="6" fill="#5c2a12" />
              </g>
              <g className="sh-handi-steam" opacity="0">
                <Steam width={80} height={110} color="#fff" transform="translate(0 -60)" />
              </g>
            </g>
            <g className="sh-parcel" opacity="0">
              <g transform="translate(20 -162)">
                <rect x="-28" y="-46" width="56" height="46" rx="4" fill="#c8924a" stroke="#7a4520" strokeWidth="2" />
                <path d="M-28 -30 H 28" stroke="#7a4520" strokeWidth="2" />
                <path d="M0 -44 L 14 -32 H -14 Z" fill="#e8641b" />
              </g>
            </g>
            <g className="sh-coin" opacity="0">
              <g transform="translate(-110 -150)">
                <circle r="14" fill="#f3d98b" stroke="#b8862f" strokeWidth="3" />
                <text y="5" textAnchor="middle" fontSize="15" fontWeight="800" fill="#8a5f1c" fontFamily="sans-serif">₹</text>
              </g>
            </g>
            <g className="sh-thanks" opacity="0">
              <g transform="translate(100 -360)">
                <rect x="-70" y="-34" width="140" height="44" rx="22" fill="#fff" stroke="#0f5132" strokeWidth="3" />
                <path d="M-10 10 L -24 28 L 6 10 Z" fill="#fff" />
                <text y="-5" textAnchor="middle" fontSize="18" fontWeight="800" fill="#0f5132" style={{ fontFamily: "var(--font-tamil)" }}>
                  நன்றி! 🙏
                </text>
              </g>
            </g>
          </Hut>

          <g className="sh-cust">
            <g className="sh-cust-a">
              <Person variant="woman" bottom="#7b1113" accent="#e8c46a" skin="#b8784e" x={START_X} y={GROUND + 20} />
            </g>
            <g className="sh-cust-b" opacity="0">
              <Person variant="woman" bottom="#7b1113" accent="#e8c46a" skin="#b8784e" x={START_X} y={GROUND + 20} holding={<Bag />} />
            </g>
            <g transform={`translate(${START_X} ${GROUND - 280})`}>
              <g className="sh-bubble" opacity="0">
                <rect x="-40" y="-70" width="250" height="52" rx="26" fill="#fff" stroke="#7b1113" strokeWidth="3" />
                <path d="M0 -20 L -8 4 L 24 -20 Z" fill="#fff" stroke="#7b1113" strokeWidth="3" strokeLinejoin="round" />
                <rect x="-2" y="-24" width="28" height="8" fill="#fff" />
                <text x="85" y="-38" textAnchor="middle" fontSize="15" fontWeight="800" fill="#7b1113" style={{ fontFamily: "var(--font-tamil)" }}>
                  ஒரு சிக்கன் பிரியாணி பார்சல்!
                </text>
              </g>
              {[-20, 10, 40].map((dx, i) => (
                <path
                  key={i}
                  className="sh-heart"
                  opacity="0"
                  transform={`translate(${dx} 0)`}
                  d="M0 8 C -14 -2, -12 -16, 0 -10 C 12 -16, 14 -2, 0 8 Z"
                  fill={i === 1 ? "#e8641b" : "#c8211b"}
                />
              ))}
            </g>
          </g>
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pt-24 md:px-12 md:pt-28">
        <p className="font-display text-xs tracking-[0.4em] text-maroon-800 md:text-sm">CHAPTER 04 · YOUR TURN</p>
        <div className="relative mt-3 h-40 max-w-md">
          {captions.map((c, i) => (
            <div key={c.title} className={`sh-cap sh-cap-${i} absolute inset-0`}>
              <h3 className="font-display text-3xl font-black text-maroon-900 md:text-5xl">{c.title}</h3>
              <p className="mt-3 max-w-sm text-sm text-maroon-950/80 md:text-base">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
