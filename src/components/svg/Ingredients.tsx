import type { SVGProps } from "react";

type G = SVGProps<SVGGElement>;

/* Each ingredient is drawn around (0,0), roughly 50 units across. */

export function StarAnise(props: G) {
  return (
    <g {...props}>
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45})`}>
          <path d="M0 0 C -6 -8, -5 -20, 0 -24 C 5 -20, 6 -8, 0 0 Z" fill="#7a3b17" stroke="#4a210b" strokeWidth="1" />
          <ellipse cx="0" cy="-12" rx="2.2" ry="4" fill="#c98a4b" />
        </g>
      ))}
      <circle r="4" fill="#4a210b" />
    </g>
  );
}

export function Cardamom(props: G) {
  return (
    <g {...props}>
      <path d="M-20 0 C -14 -11, 14 -11, 22 0 C 14 11, -14 11, -20 0 Z" fill="#8fb34a" stroke="#56751f" strokeWidth="1.5" />
      <path d="M-14 -3 C -4 -6, 8 -6, 16 -2 M-14 3 C -4 6, 8 6, 16 2" stroke="#6b8f2c" strokeWidth="1.2" fill="none" />
      <path d="M22 0 L27 -1" stroke="#56751f" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function Chilli(props: G) {
  return (
    <g {...props}>
      <path d="M-22 -6 C -8 -14, 14 -10, 22 8 C 10 0, -6 0, -20 2 Z" fill="#c8211b" stroke="#8c120d" strokeWidth="1.2" />
      <path d="M-14 -6 C -4 -9, 6 -8, 12 -3" stroke="#ff8a7a" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M-22 -6 C -26 -8, -27 -12, -25 -16" stroke="#3d7a22" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M-24 -2 C -27 -4, -27 -6, -22 -6" fill="#3d7a22" />
    </g>
  );
}

export function BayLeaf(props: G) {
  return (
    <g {...props}>
      <path d="M-24 4 C -10 -16, 14 -16, 24 -2 C 10 14, -10 14, -24 4 Z" fill="#7d8f3a" stroke="#4f5e1d" strokeWidth="1.2" />
      <path d="M-22 4 C -6 -2, 10 -3, 23 -2" stroke="#c7cf8a" strokeWidth="1.2" fill="none" />
    </g>
  );
}

export function Cinnamon(props: G) {
  return (
    <g {...props}>
      <rect x="-24" y="-6" width="48" height="12" rx="5" fill="#9a5a2c" stroke="#5e3214" strokeWidth="1.2" />
      <path d="M-20 -2 H 20 M-18 2 H 16" stroke="#6e3a17" strokeWidth="1" />
      <ellipse cx="24" cy="0" rx="3.5" ry="6" fill="#c2834d" stroke="#5e3214" strokeWidth="1" />
      <path d="M24 -3 a3 3 0 1 1 -1 5" stroke="#5e3214" strokeWidth="1" fill="none" />
    </g>
  );
}

export function Clove(props: G) {
  return (
    <g {...props}>
      <path d="M0 -4 L0 22" stroke="#4a230d" strokeWidth="4" strokeLinecap="round" />
      <circle cx="0" cy="-8" r="6" fill="#5e2e12" />
      <circle cx="-5" cy="-12" r="3" fill="#6e3a17" />
      <circle cx="5" cy="-12" r="3" fill="#6e3a17" />
      <circle cx="0" cy="-15" r="3" fill="#6e3a17" />
    </g>
  );
}

export function MintLeaf(props: G) {
  return (
    <g {...props}>
      <path d="M0 22 C -18 10, -16 -12, 0 -22 C 16 -12, 18 10, 0 22 Z" fill="#2f9e4f" stroke="#1d6b33" strokeWidth="1.2" />
      <path d="M0 20 V -18 M0 6 L-9 -2 M0 6 L9 -2 M0 -6 L-7 -12 M0 -6 L7 -12" stroke="#a7e3b4" strokeWidth="1" fill="none" />
    </g>
  );
}

export function Onion(props: G) {
  return (
    <g {...props}>
      <path d="M0 -24 C 4 -18, 22 -10, 22 4 C 22 18, 10 24, 0 24 C -10 24, -22 18, -22 4 C -22 -10, -4 -18, 0 -24 Z" fill="#9b3d6b" stroke="#6a2148" strokeWidth="1.5" />
      <path d="M0 -22 C -8 -10, -10 10, -4 22 M0 -22 C 8 -10, 10 10, 4 22" stroke="#c96f9b" strokeWidth="1.2" fill="none" />
      <path d="M0 -24 L -2 -30 M0 -24 L 3 -30" stroke="#a87b4f" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

export function Tomato(props: G) {
  return (
    <g {...props}>
      <circle r="20" fill="#e2392b" stroke="#a51f15" strokeWidth="1.5" />
      <ellipse cx="-7" cy="-7" rx="5" ry="3" fill="#ff8f80" opacity="0.7" />
      <path d="M0 -20 L -7 -25 M0 -20 L 7 -25 M0 -20 L 0 -27 M0 -20 L -9 -18 M0 -20 L 9 -18" stroke="#3d7a22" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

export function Drumstick(props: G) {
  return (
    <g {...props}>
      <path d="M-24 -4 C -26 -18, -6 -24, 6 -14 C 14 -8, 12 4, 6 8 L -10 12 C -20 14, -23 6, -24 -4 Z" fill="#c4672b" stroke="#7d3a12" strokeWidth="1.5" />
      <path d="M-18 -8 C -12 -14, -4 -14, 2 -10" stroke="#e8a368" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="4" y="2" width="16" height="6" rx="3" transform="rotate(25 4 2)" fill="#f6ecd8" stroke="#bfae8a" strokeWidth="1" />
      <circle cx="21" cy="14" r="4" fill="#f6ecd8" stroke="#bfae8a" strokeWidth="1" />
      <circle cx="17" cy="17" r="4" fill="#f6ecd8" stroke="#bfae8a" strokeWidth="1" />
    </g>
  );
}

export function MuttonPiece(props: G) {
  return (
    <g {...props}>
      <path d="M-20 -10 C -12 -20, 12 -20, 20 -8 C 24 4, 14 16, 0 16 C -14 16, -24 4, -20 -10 Z" fill="#8a3b22" stroke="#5a2010" strokeWidth="1.5" />
      <path d="M-12 -6 C -4 -10, 6 -10, 12 -4" stroke="#b9664a" strokeWidth="2" fill="none" />
      <ellipse cx="6" cy="4" rx="5" ry="3.5" fill="#f1e2c7" />
    </g>
  );
}

export function RiceSack(props: G) {
  return (
    <g {...props}>
      <path d="M-22 -18 C -18 -26, 18 -26, 22 -18 L 26 20 C 20 28, -20 28, -26 20 Z" fill="#d8b77a" stroke="#8a6a35" strokeWidth="1.5" />
      <path d="M-20 -18 C -10 -12, 10 -12, 20 -18" stroke="#8a6a35" strokeWidth="1.5" fill="none" />
      <rect x="-14" y="-6" width="28" height="16" rx="2" fill="#7b1113" />
      <text x="0" y="5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#f3d98b" fontFamily="sans-serif">SAMBA</text>
    </g>
  );
}

export function SpicePouch(props: G) {
  return (
    <g {...props}>
      <path d="M-18 -10 L 18 -10 L 22 20 C 10 26, -10 26, -22 20 Z" fill="#c8211b" stroke="#7d0f0b" strokeWidth="1.5" />
      <path d="M-18 -10 C -10 -20, 10 -20, 18 -10" fill="#e8641b" stroke="#7d0f0b" strokeWidth="1.5" />
      <path d="M-14 -12 L 14 -12" stroke="#f3d98b" strokeWidth="3" />
      <circle cx="0" cy="6" r="6" fill="#f3d98b" />
    </g>
  );
}

export function RiceGrain(props: G) {
  return (
    <g {...props}>
      <ellipse rx="5" ry="1.8" fill="#fff6dc" stroke="#d9c08a" strokeWidth="0.6" />
    </g>
  );
}

/** Standalone HTML icon wrapper for any ingredient. */
export function IngredientIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg viewBox="-30 -30 60 60" className={className} aria-hidden>
      {children}
    </svg>
  );
}
