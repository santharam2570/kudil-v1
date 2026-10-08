import type { ReactNode } from "react";

type Variant = "man" | "woman" | "chef";

type PersonProps = {
  variant?: Variant;
  skin?: string;
  shirt?: string;
  bottom?: string;
  accent?: string;
  hair?: string;
  /** Rendered upright at the forward hand. Arm stays raised while holding. */
  holding?: ReactNode;
  className?: string;
  x?: number;
  y?: number;
  scale?: number;
};

/** Where the held item sits relative to the feet origin (for flight targets). */
export const HAND = { x: 55, y: -138 };

const SHOULDER_Y = -208;
const HIP_Y = -112;

function Leg({ className, color, shoe, dx = 0 }: { className: string; color: string; shoe: string; dx?: number }) {
  return (
    <g className={className}>
      <rect x={dx - 8} y={HIP_Y} width="16" height="104" rx="8" fill={color} />
      <path d={`M${dx - 9} -13 h22 a7 7 0 0 1 0 13 h-22 z`} fill={shoe} />
    </g>
  );
}

export default function Person({
  variant = "man",
  skin = "#b9784a",
  shirt = "#1d6fa5",
  bottom = "#f7f1e1",
  accent = "#d4a64a",
  hair = "#1b1110",
  holding,
  className,
  x = 0,
  y = 0,
  scale = 1,
}: PersonProps) {
  const sleeve = variant === "woman" ? skin : shirt;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className={className}>
        <ellipse cx="0" cy="2" rx="46" ry="8" fill="rgba(40,10,5,0.22)" />
        <g className="p-body">
          {/* back limbs */}
          <g className="p-arm-b p-arm-swing">
            <rect x="-24" y={SHOULDER_Y} width="14" height="86" rx="7" fill={sleeve} style={{ filter: "brightness(0.85)" }} />
            <circle cx="-17" cy={SHOULDER_Y + 88} r="8" fill={skin} />
          </g>
          <Leg className="p-leg-b" color={variant === "woman" ? skin : skin} shoe="#3b2416" dx={-6} />
          <Leg className="p-leg-f" color={skin} shoe="#4a2c1a" dx={6} />

          {/* torso */}
          {variant === "chef" ? (
            <>
              <rect x="-32" y="-218" width="64" height="122" rx="22" fill="#fbfaf6" stroke="#e2dccd" strokeWidth="2" />
              <path d="M-6 -212 V -104" stroke="#e2dccd" strokeWidth="2" />
              {[-190, -168, -146].map((cy) => (
                <g key={cy}>
                  <circle cx="-14" cy={cy} r="3" fill={accent} />
                  <circle cx="2" cy={cy} r="3" fill={accent} />
                </g>
              ))}
              <path d="M-34 -150 h68 v34 a10 10 0 0 1 -10 10 h-48 a10 10 0 0 1 -10 -10 z" fill={shirt} />
            </>
          ) : (
            <rect x="-30" y="-218" width="60" height="118" rx="22" fill={shirt} />
          )}

          {variant === "man" && (
            <>
              <path d="M-31 -118 L31 -118 L36 -46 L-36 -46 Z" fill={bottom} />
              <path d="M-36 -54 L36 -54" stroke={accent} strokeWidth="5" />
              <path d="M-31 -118 L31 -118" stroke="#00000022" strokeWidth="4" />
              <path d="M-4 -216 L0 -196 L4 -216" stroke="#ffffff66" strokeWidth="3" fill="none" />
            </>
          )}

          {variant === "woman" && (
            <>
              <path d="M-30 -120 C -34 -80, -40 -40, -44 -14 L 44 -14 C 40 -40, 34 -80, 30 -120 Z" fill={bottom} />
              <path d="M-44 -24 L 44 -24" stroke={accent} strokeWidth="6" />
              <path d="M-4 -110 L -8 -16 M6 -110 L 10 -16 M16 -110 L 22 -16" stroke="#00000018" strokeWidth="3" />
              <path d="M22 -214 C 6 -190, -18 -150, -30 -120 L -16 -112 C -4 -146, 18 -180, 30 -206 Z" fill={bottom} />
              <path d="M24 -212 C 8 -188, -14 -150, -26 -122" stroke={accent} strokeWidth="4" fill="none" />
            </>
          )}

          {variant === "chef" && (
            <path d="M-31 -100 L31 -100 L33 -46 L-33 -46 Z" fill="#2b2b2b" />
          )}

          {/* head */}
          <rect x="-8" y="-232" width="16" height="18" fill={skin} />
          <circle cx="0" cy="-252" r="27" fill={skin} />
          <circle cx="24" cy="-250" r="5" fill={skin} />
          <circle cx="6" cy="-256" r="2.8" fill="#1b1110" />
          <circle cx="17" cy="-256" r="2.8" fill="#1b1110" />
          <path d="M5 -240 Q 12 -233 19 -240" stroke="#5a1c10" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="-8" cy="-244" r="5" fill="#e07a6a" opacity="0.35" />

          {variant === "man" && (
            <>
              <path d="M-27 -256 C -30 -284, 24 -290, 28 -258 C 18 -270, -8 -274, -27 -256 Z" fill={hair} />
              <path d="M4 -246 C 9 -250, 16 -250, 21 -246 C 16 -243, 9 -243, 4 -246 Z" fill={hair} />
            </>
          )}
          {variant === "woman" && (
            <>
              <path d="M-28 -250 C -32 -286, 26 -292, 28 -258 C 16 -272, -6 -276, -22 -260 L -24 -236 Z" fill={hair} />
              <circle cx="-30" cy="-248" r="13" fill={hair} />
              {[-262, -254, -246, -238].map((cy, i) => (
                <circle key={cy} cx={-40 + (i % 2) * 3} cy={cy} r="3.2" fill="#fffdf4" />
              ))}
              <circle cx="11" cy="-268" r="3" fill="#c8211b" />
            </>
          )}
          {variant === "chef" && (
            <>
              <path d="M-27 -258 C -26 -276, 26 -278, 27 -258 Z" fill={hair} />
              <rect x="-24" y="-290" width="48" height="26" rx="4" fill="#ffffff" stroke="#e2dccd" strokeWidth="2" />
              <circle cx="-14" cy="-298" r="14" fill="#ffffff" stroke="#e2dccd" strokeWidth="2" />
              <circle cx="4" cy="-306" r="16" fill="#ffffff" stroke="#e2dccd" strokeWidth="2" />
              <circle cx="18" cy="-296" r="12" fill="#ffffff" stroke="#e2dccd" strokeWidth="2" />
              <rect x="-23" y="-282" width="46" height="16" fill="#ffffff" />
              <path d="M4 -246 C 9 -250, 16 -250, 21 -246 C 16 -243, 9 -243, 4 -246 Z" fill={hair} />
            </>
          )}

          {/* front arm */}
          {holding ? (
            <g className="p-arm-f" transform={`rotate(-35 6 ${SHOULDER_Y})`}>
              <rect x="-1" y={SHOULDER_Y} width="14" height="86" rx="7" fill={sleeve} />
              <circle cx="6" cy={SHOULDER_Y + 86} r="8.5" fill={skin} />
              <g transform={`translate(6 ${SHOULDER_Y + 86}) rotate(35)`}>{holding}</g>
            </g>
          ) : (
            <g className="p-arm-f p-arm-swing">
              <rect x="10" y={SHOULDER_Y} width="14" height="86" rx="7" fill={sleeve} />
              <circle cx="17" cy={SHOULDER_Y + 88} r="8.5" fill={skin} />
            </g>
          )}
        </g>
      </g>
    </g>
  );
}
