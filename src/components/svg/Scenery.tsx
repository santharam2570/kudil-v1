import type { ReactNode, SVGProps } from "react";

type G = SVGProps<SVGGElement>;

export function Steam({ width = 120, height = 160, color = "#ffffff", ...props }: G & { width?: number; height?: number; color?: string }) {
  const w = width / 4;
  return (
    <g className="steam" fill="none" stroke={color} strokeLinecap="round" strokeWidth="6" {...props}>
      {[-1, 0, 1].map((i) => (
        <path
          key={i}
          d={`M${i * w} 0 C ${i * w - w * 0.6} ${-height * 0.25}, ${i * w + w * 0.6} ${-height * 0.5}, ${i * w} ${-height * 0.7} S ${i * w - w * 0.4} ${-height * 0.95}, ${i * w} ${-height}`}
        />
      ))}
    </g>
  );
}

export function Bell({ ...props }: G) {
  return (
    <g {...props}>
      <path d="M0 -40 V -8" stroke="#8a5f1c" strokeWidth="2" />
      <path d="M-10 -8 C -10 -18, 10 -18, 10 -8 L 14 14 H -14 Z" fill="#d4a64a" stroke="#8a5f1c" strokeWidth="1.5" />
      <rect x="-16" y="12" width="32" height="5" rx="2" fill="#b8862f" />
      <circle cx="0" cy="21" r="4" fill="#8a5f1c" />
    </g>
  );
}

/** Thatched Kudil storefront. Origin = ground centre. */
export function Hut({ id, children, ...props }: G & { id: string; children?: ReactNode }) {
  return (
    <g {...props}>
      <defs>
        <linearGradient id={`${id}-roof`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb347" />
          <stop offset="0.55" stopColor="#f0761f" />
          <stop offset="1" stopColor="#b7410e" />
        </linearGradient>
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a0612f" />
          <stop offset="1" stopColor="#6b3a17" />
        </linearGradient>
      </defs>
      {/* back wall */}
      <rect x="-230" y="-300" width="460" height="300" fill="#5a2a12" />
      <path d="M-230 -300 H230 V0 H-230 Z" fill="#3d1a0a" opacity="0.35" />
      {/* posts */}
      <rect x="-236" y="-320" width="22" height="320" fill={`url(#${id}-wood)`} />
      <rect x="214" y="-320" width="22" height="320" fill={`url(#${id}-wood)`} />
      {children}
      {/* roof */}
      <clipPath id={`${id}-roof-clip`}>
        <path d="M0 -560 C 60 -500, 200 -380, 320 -300 L -320 -300 C -200 -380, -60 -500, 0 -560 Z" />
      </clipPath>
      <path d="M0 -560 C 60 -500, 200 -380, 320 -300 L -320 -300 C -200 -380, -60 -500, 0 -560 Z" fill={`url(#${id}-roof)`} />
      <g clipPath={`url(#${id}-roof-clip)`}>
        {Array.from({ length: 26 }, (_, i) => {
          const x = -300 + i * 24;
          return <path key={i} d={`M${x * 0.15} -540 L ${x} -296`} stroke="#c2410c" strokeWidth="2" opacity="0.55" />;
        })}
        {[-470, -420, -370].map((y) => (
          <path key={y} d={`M-320 ${y + 40} Q 0 ${y + 10}, 320 ${y + 40}`} stroke="#ffcf7a" strokeWidth="2" fill="none" opacity="0.35" />
        ))}
      </g>
      <path
        d={`M-320 -300 ${Array.from({ length: 32 }, (_, i) => `L ${-320 + (i + 0.5) * 20} ${-282 - (i % 2) * 6} L ${-320 + (i + 1) * 20} -300`).join(" ")}`}
        fill="#d9561a"
      />
      <circle cx="0" cy="-560" r="10" fill="#d4a64a" />
      {/* sign */}
      <g transform="translate(0 -318)">
        <path d="M-120 -40 V -20 M120 -40 V -20" stroke="#5a2a12" strokeWidth="4" />
        <rect x="-160" y="-22" width="320" height="56" rx="8" fill="#7a3d18" stroke="#4a210b" strokeWidth="3" />
        <rect x="-152" y="-15" width="304" height="42" rx="5" fill="none" stroke="#d4a64a" strokeWidth="1.5" />
        <text x="0" y="16" textAnchor="middle" fontSize="30" fontWeight="800" fill="#fff4dc" style={{ fontFamily: "var(--font-tamil)" }}>
          குடில் பிரியாணி
        </text>
      </g>
      <Bell transform="translate(-270 -250)" />
      <Bell transform="translate(270 -250)" />
    </g>
  );
}

/** Trichy Rockfort (Malaikottai) silhouette. Origin = ground centre. */
export function Rockfort({ fill = "#7b1113", ...props }: G & { fill?: string }) {
  return (
    <g {...props} fill={fill}>
      <path d="M-420 0 C -380 -60, -320 -90, -260 -120 C -220 -170, -150 -200, -90 -215 C -40 -250, 40 -250, 90 -215 C 160 -190, 230 -150, 280 -110 C 340 -80, 390 -40, 430 0 Z" />
      <rect x="-30" y="-290" width="60" height="50" />
      <path d="M-40 -290 H40 L 30 -310 H -30 Z" />
      <path d="M-18 -310 C -18 -335, 18 -335, 18 -310 Z" />
      <rect x="-2" y="-350" width="4" height="22" />
      <rect x="-110" y="-245" width="70" height="32" />
      <path d="M-116 -245 H -34 L -44 -262 H -106 Z" />
      <rect x="60" y="-232" width="54" height="26" />
      <path d="M54 -232 H 120 L 110 -246 H 64 Z" />
      <rect x="-200" y="-150" width="400" height="20" opacity="0.6" />
    </g>
  );
}

export function CoconutTree({ ...props }: G) {
  return (
    <g {...props}>
      <path d="M0 0 C 10 -80, -8 -170, 14 -260" stroke="#7a4a24" strokeWidth="16" fill="none" strokeLinecap="round" />
      {[-60, -25, 15, 50, 85, 130].map((a) => (
        <path
          key={a}
          d="M0 0 C 30 -30, 80 -30, 120 10"
          transform={`translate(14 -260) rotate(${a})`}
          stroke="#2f7a3a"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <circle cx="8" cy="-252" r="9" fill="#5b3a1a" />
      <circle cx="22" cy="-250" r="9" fill="#5b3a1a" />
    </g>
  );
}

export function Bunting({ x1, x2, y, colors = ["#7b1113", "#d4a64a", "#0f5132", "#e8641b"] }: { x1: number; x2: number; y: number; colors?: string[] }) {
  const n = Math.max(2, Math.floor((x2 - x1) / 36));
  const sag = 30;
  return (
    <g>
      <path d={`M${x1} ${y} Q ${(x1 + x2) / 2} ${y + sag * 2} ${x2} ${y}`} stroke="#5a2a12" strokeWidth="2" fill="none" />
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 0.5) / n;
        const px = x1 + (x2 - x1) * t;
        const py = y + sag * 2 * 2 * t * (1 - t);
        return <path key={i} d={`M${px - 12} ${py} L ${px + 12} ${py} L ${px} ${py + 24} Z`} fill={colors[i % colors.length]} />;
      })}
    </g>
  );
}
