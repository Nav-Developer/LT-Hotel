import { forwardRef } from "react";
import HolidayScene from "./HolidayScene";

/* ---------------- EDIT THESE ---------------- */
const FIRST_LINE = "Vanakkam, Karaikudi!";
const MIDDLE_LINES = [
  "Booking our holiday stay!",
  "Check the rooms and the pool.",
  "A heritage mansion, perfect!",
];
const LAST_LINE = "Stay booked!";
const HOST_LINE = "வணக்கம்!";
/* -------------------------------------------- */

const DAD = "#A9673F";
const MUM = "#B97A56";
const KID = "#C48863";
const HAIR = "#1F100C";
const GOLD = "#D9A441";
const CREAM = "#FFF8EA";
const TEAK = "#5A3320";

const timers = new WeakMap<HTMLElement, number>();

/** Moves the family along the floor. progress goes from 0 to 1. */
export function moveTravellers(
  stage: HTMLElement | null,
  progress: number,
  total: number,
) {
  if (!stage) return;
  const family = stage.querySelector<HTMLElement>("[data-family]");
  const figures = stage.querySelector<SVGElement>("[data-figures]");
  const bubble = stage.querySelector<HTMLElement>("[data-bubble]");
  const door = stage.querySelector<HTMLElement>("[data-door]");
  if (!family || !figures || !bubble || !door) return;

  const p = Math.min(Math.max(progress, 0), 1);
  const last = Number(stage.dataset.last ?? p);
  stage.dataset.last = String(p);

  // walk from the left edge to just before the door
  const start = stage.clientWidth < 768 ? 44 : 64;
  const end = door.offsetLeft - family.offsetWidth - 20;
  family.style.transform = `translateX(${start + (end - start) * p}px)`;

  // holiday plane flies along the dashed route as you scroll
  const plane = stage.querySelector<HTMLElement>("[data-plane]");
  const trail = stage.querySelector<HTMLElement>("[data-trail]");
  const w = stage.clientWidth;
  if (plane) {
    plane.style.transform = `translate(${(w - 48) * p}px, ${-Math.sin(Math.PI * p) * 36}px) rotate(${-Math.cos(Math.PI * p) * 14}deg)`;
  }
  if (trail) trail.style.width = `${(w - 48) * p}px`;

  const arrived = p > 0.96;
  stage.dataset.near = String(p > 0.72);
  stage.dataset.arrived = String(arrived);

  // speech bubble follows the current room
  const room = Math.round(p * Math.max(total - 1, 0));
  const line = arrived
    ? LAST_LINE
    : room === 0
      ? FIRST_LINE
      : MIDDLE_LINES[(room - 1) % MIDDLE_LINES.length];
  if (bubble.textContent !== line) bubble.textContent = line;

  // legs move only while the visitor is scrolling
  if (Math.abs(p - last) < 0.00005) return;
  figures.style.transform = p < last && !arrived ? "scaleX(-1)" : "scaleX(1)";
  stage.dataset.walking = "true";
  window.clearTimeout(timers.get(stage));
  timers.set(
    stage,
    window.setTimeout(() => {
      stage.dataset.walking = "false";
    }, 180),
  );
}

const css = `
.st-leg, .st-body, .st-arm, .st-wave { transform-box: fill-box; }
.st-leg, .st-body, .st-arm { transform-origin: 50% 0; }
.st-wave { transform-origin: 50% 100%; }
[data-walking="true"] .st-leg { animation: st-step .42s ease-in-out infinite alternate; }
[data-walking="true"] .st-leg-b { animation-direction: alternate-reverse; }
[data-walking="true"] .st-arm { animation: st-swing .42s ease-in-out infinite alternate-reverse; }
[data-walking="true"] .st-body { animation: st-bob .21s ease-in-out infinite alternate; }
@keyframes st-step { from { transform: rotate(22deg); } to { transform: rotate(-22deg); } }
@keyframes st-swing { from { transform: rotate(14deg); } to { transform: rotate(-14deg); } }
@keyframes st-bob { from { transform: translateY(0); } to { transform: translateY(-2.5px); } }
@keyframes st-wave { from { transform: rotate(-14deg); } to { transform: rotate(16deg); } }

.st-up { opacity: 0; }
[data-arrived="true"] .st-up { opacity: 1; }
[data-arrived="true"] .st-up .st-wave { animation: st-wave .45s ease-in-out infinite alternate; }
[data-arrived="true"] .st-down { opacity: 0; }

.st-door { opacity: 0; transition: opacity .4s; }
[data-near="true"] .st-door { opacity: 1; }
.st-leaf { transform-box: fill-box; transition: transform .9s ease; }
.st-leaf-l { transform-origin: 0 50%; }
.st-leaf-r { transform-origin: 100% 50%; }
[data-arrived="true"] .st-leaf { transform: scaleX(.1); }
.st-host { opacity: 0; transform: translateY(8px); transition: opacity .5s .35s, transform .5s .35s; }
[data-arrived="true"] .st-host { opacity: 1; transform: none; }
.st-glow { opacity: 0; transition: opacity .6s .3s; }
[data-arrived="true"] .st-glow { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .st-leg, .st-body, .st-arm, .st-wave { animation: none !important; }
  .st-door, .st-leaf, .st-host, .st-glow { transition: none; }
}
`;

function Leg({
  x,
  y,
  b = false,
  skin = MUM,
}: {
  x: number;
  y: number;
  b?: boolean;
  skin?: string;
}) {
  return (
    <g className={`st-leg ${b ? "st-leg-b" : ""}`}>
      <path
        d={`M${x} ${y} V152`}
        stroke={skin}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* chappal */}
      <path
        d={`M${x - 2} 154 H${x + 8}`}
        stroke={TEAK}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </g>
  );
}

function Face({
  x,
  y,
  r,
  skin,
}: {
  x: number;
  y: number;
  r: number;
  skin: string;
}) {
  return (
    <>
      <circle cx={x} cy={y} r={r} fill={skin} />
      <circle cx={x - r + 1} cy={y + 2} r="2.2" fill={skin} />
      <circle cx={x + 1} cy={y - 1} r="1.7" fill={HAIR} />
      <circle cx={x + 8} cy={y - 1} r="1.7" fill={HAIR} />
      <path
        d={`M${x} ${y + 6} Q${x + 4} ${y + 10} ${x + 9} ${y + 6}`}
        stroke={HAIR}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

/* Appa in shirt, veshti and angavastram with a suitcase; amma in a Kanjivaram
   saree with jasmine in her hair; and their child, waving once they arrive. */
function Family() {
  return (
    <svg
      data-figures
      viewBox="0 0 180 160"
      className="h-full w-auto overflow-visible transition-transform duration-200"
    >
      <ellipse cx="92" cy="157" rx="82" ry="3.5" fill="rgba(42,10,13,0.18)" />

      {/* ---------- appa ---------- */}
      <Leg x={118} y={134} skin={DAD} />
      <Leg x={134} y={134} b skin={DAD} />
      <g className="st-arm">
        <path
          d="M110 60 L103 92"
          stroke={DAD}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      <g className="st-body">
        {/* shirt */}
        <path d="M108 54 Q126 44 144 54 L146 92 H106 Z" fill="#E39B2D" />
        <path d="M122 50 L127 60 L133 50" fill={CREAM} />
        <rect x="132" y="68" width="9" height="10" rx="1.5" fill="#C97F18" />
        {/* veshti with pleats and a gold border */}
        <path d="M106 88 H146 L150 134 H102 Z" fill={CREAM} />
        <path
          d="M118 90 V132 M128 90 V132 M138 90 V132"
          stroke="#E6D3A8"
          strokeWidth="1.5"
        />
        <path d="M102 130 H150" stroke={GOLD} strokeWidth="5" />
        <path d="M106 88 H146" stroke={GOLD} strokeWidth="2.5" />
        {/* angavastram */}
        <path
          d="M112 54 L140 98"
          stroke={CREAM}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path d="M108 58 L136 102" stroke={GOLD} strokeWidth="1.6" />
        {/* head */}
        <Face x={126} y={30} r={17} skin={DAD} />
        <path
          d="M108 30 Q108 8 128 11 Q146 12 143 27 Q130 17 108 30Z"
          fill={HAIR}
        />
        <path
          d="M128 38 Q134 35 141 38"
          stroke={HAIR}
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* arm and suitcase */}
        <path
          d="M142 58 L156 90"
          stroke={DAD}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M150 94 V89 H163 V94"
          stroke={HAIR}
          strokeWidth="3"
          fill="none"
        />
        <rect x="143" y="94" width="30" height="24" rx="4" fill={TEAK} />
        <path d="M151 94 V118 M165 94 V118" stroke={GOLD} strokeWidth="2" />
        <rect x="156" y="104" width="4" height="5" rx="1" fill={GOLD} />
      </g>

      {/* ---------- amma ---------- */}
      <Leg x={66} y={142} b skin={MUM} />
      <Leg x={78} y={142} skin={MUM} />
      <g className="st-body">
        {/* hair bun with jasmine */}
        <circle cx="55" cy="38" r="10" fill={HAIR} />
        {[30, 35, 41, 47].map((y, i) => (
          <circle key={y} cx={i % 2 ? 48 : 51} cy={y} r="2.6" fill="#fff" />
        ))}
        {/* saree */}
        <path d="M58 62 Q72 52 87 62 L96 144 H48 Z" fill="#1F7A63" />
        <path d="M61 62 Q72 54 85 62 L85 82 H62 Z" fill="#B3141F" />
        <path
          d="M60 144 V112 M70 144 V108 M80 144 V112"
          stroke="#16604D"
          strokeWidth="1.6"
        />
        <path d="M48 140 H96" stroke={GOLD} strokeWidth="5" />
        <path d="M48 135 H96" stroke="#fff" strokeWidth="1" opacity="0.6" />
        {/* pallu over the shoulder */}
        <path
          d="M61 60 L90 106"
          stroke={GOLD}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M61 60 L90 106"
          stroke="#B3141F"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* head */}
        <Face x={72} y={40} r={15} skin={MUM} />
        <path d="M56 41 Q54 21 74 23 Q89 24 88 36 Q74 27 56 41Z" fill={HAIR} />
        <circle cx="77" cy="32" r="2" fill="#B3141F" />
        <circle cx="58" cy="50" r="2.2" fill={GOLD} />
        {/* arm, bangles and purse */}
        <path
          d="M84 68 L96 96"
          stroke={MUM}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M93 90 L99 93" stroke={GOLD} strokeWidth="3" />
        <rect x="93" y="96" width="13" height="11" rx="2.5" fill={GOLD} />
        <path
          d="M95 96 Q99.5 89 104 96"
          stroke={TEAK}
          strokeWidth="1.6"
          fill="none"
        />
      </g>

      {/* ---------- child ---------- */}
      <Leg x={17} y={134} skin={KID} />
      <Leg x={29} y={134} b skin={KID} />
      <g className="st-body">
        <rect x="2" y="92" width="15" height="28" rx="6" fill="#B3141F" />
        <rect x="5" y="104" width="9" height="8" rx="2" fill="#8E0F19" />
        <path d="M12 92 Q24 84 37 92 L40 122 H9 Z" fill="#3567B0" />
        <path d="M9 120 H40 L43 135 H6 Z" fill="#2F3E6B" />
        <Face x={24} y={74} r={14} skin={KID} />
        <path d="M9 74 Q7 55 25 57 Q41 58 39 70 Q26 61 9 74Z" fill={HAIR} />
        <circle cx="29" cy="68" r="1.6" fill="#B3141F" />
        {/* arm down while walking, waving once they arrive */}
        <g className="st-down">
          <g className="st-arm">
            <path
              d="M35 98 L44 120"
              stroke={KID}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        </g>
        <g className="st-up">
          <g className="st-wave">
            <path
              d="M35 98 L50 80"
              stroke={KID}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="51" cy="78" r="3.6" fill={KID} />
          </g>
        </g>
      </g>
    </svg>
  );
}

/* A Chettinad lodge entrance: teak pillars, a studded arched door with a
   mango-leaf thoranam, a name plaque, and a host who greets the family. */
function LodgeDoor() {
  const ARCH = "M26 160 V104 A36 36 0 0 1 98 104 V160 Z";
  return (
    <svg viewBox="0 0 124 176" className="h-full w-auto overflow-visible">
      {/* kalasam and pediment */}
      <circle cx="62" cy="11" r="4" fill={GOLD} />
      <path d="M62 15 V18" stroke={GOLD} strokeWidth="3" />
      <path
        d="M40 36 L62 17 L84 36 Z"
        fill="#9E1B26"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 60 L30 36 H94 L116 60 Z"
        fill="#9E1B26"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="32"
        y="40"
        width="60"
        height="16"
        rx="3"
        fill={CREAM}
        stroke={GOLD}
        strokeWidth="1.5"
      />
      <text
        x="62"
        y="52"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="#9E1B26"
      >
        LT LODGE
      </text>
      {/* lintel */}
      <rect x="6" y="60" width="112" height="8" fill={TEAK} />
      {Array.from({ length: 13 }, (_, i) => (
        <rect
          key={i}
          x={10 + i * 8.4}
          y="62"
          width="4"
          height="3"
          fill={GOLD}
        />
      ))}
      {/* pillars */}
      {[10, 102].map((x) => (
        <g key={x}>
          <rect x={x} y="68" width="12" height="92" fill={TEAK} />
          <rect x={x - 3} y="66" width="18" height="6" rx="1.5" fill={GOLD} />
          <rect x={x - 3} y="152" width="18" height="8" rx="1.5" fill={GOLD} />
          {[88, 108, 128].map((y) => (
            <rect key={y} x={x} y={y} width="12" height="3.5" fill={GOLD} />
          ))}
        </g>
      ))}

      {/* warm doorway and the host */}
      <path d={ARCH} fill="#FBE7C2" />
      <path className="st-glow" d={ARCH} fill="#FFD27A" opacity="0.5" />
      <g className="st-host">
        <path d="M44 112 Q62 102 80 112 L82 148 H42 Z" fill="#fff" />
        <path
          d="M44 116 L78 146"
          stroke="#9E1B26"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M41 140 H83 L86 160 H38 Z" fill={CREAM} />
        <path d="M38 156 H86" stroke={GOLD} strokeWidth="4" />
        <circle cx="62" cy="92" r="13" fill={DAD} />
        <circle cx="57" cy="90" r="1.6" fill={HAIR} />
        <circle cx="67" cy="90" r="1.6" fill={HAIR} />
        <path
          d="M56 98 Q62 103 68 98"
          stroke={HAIR}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M56 96 Q62 93 68 96"
          stroke={HAIR}
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M49 90 Q47 72 62 74 Q77 72 75 90 Q62 80 49 90Z" fill={HAIR} />
        {/* marigold garland */}
        <path
          d="M47 106 Q62 124 77 106"
          stroke="#F28C1B"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M47 106 Q62 124 77 106"
          stroke="#FFD34D"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
          fill="none"
        />
        {/* namaste */}
        <path
          d="M62 112 L56 124 L62 132 L68 124 Z"
          fill={DAD}
          stroke={HAIR}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </g>

      {/* two door leaves swing open on arrival */}
      <g className="st-leaf st-leaf-l">
        <path d="M26 160 V104 A36 36 0 0 1 62 68 V160 Z" fill={TEAK} />
        {[88, 106, 124, 142].map((y) => (
          <circle key={y} cx="40" cy={y} r="2" fill={GOLD} />
        ))}
        {[88, 106, 124, 142].map((y) => (
          <circle key={`b${y}`} cx="54" cy={y} r="2" fill={GOLD} />
        ))}
        <circle cx="57" cy="118" r="3" stroke={GOLD} strokeWidth="1.5" />
      </g>
      <g className="st-leaf st-leaf-r">
        <path d="M62 68 A36 36 0 0 1 98 104 V160 H62 Z" fill={TEAK} />
        {[88, 106, 124, 142].map((y) => (
          <circle key={y} cx="70" cy={y} r="2" fill={GOLD} />
        ))}
        {[88, 106, 124, 142].map((y) => (
          <circle key={`b${y}`} cx="84" cy={y} r="2" fill={GOLD} />
        ))}
        <circle cx="67" cy="118" r="3" stroke={GOLD} strokeWidth="1.5" />
      </g>
      <path
        d="M26 160 V104 A36 36 0 0 1 98 104 V160"
        stroke={GOLD}
        strokeWidth="4"
        fill="none"
      />

      {/* thoranam: mango leaves and marigolds */}
      {Array.from({ length: 9 }, (_, i) => {
        const a = (Math.PI * i) / 8;
        const x = 62 - 42 * Math.cos(a);
        const y = 104 - 42 * Math.sin(a);
        return i % 2 === 0 ? (
          <ellipse key={i} cx={x} cy={y + 4} rx="2.6" ry="6" fill="#2E7D4F" />
        ) : (
          <circle key={i} cx={x} cy={y + 2} r="3" fill="#F28C1B" />
        );
      })}

      {/* steps */}
      <rect x="12" y="160" width="100" height="5" fill="#C9A66B" />
      <rect x="6" y="165" width="112" height="5" fill="#B8935A" />
      <path
        d="M0 171 H124"
        stroke={GOLD}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const bubbleCls =
  "font-display whitespace-nowrap rounded-full border-2 border-brand-red bg-white px-3 py-1 text-xs font-semibold text-brand-red shadow-md md:text-sm";
const SIZE = "h-24 md:h-[clamp(6rem,16vh,9.5rem)]";
const DOOR_SIZE = "h-28 md:h-[clamp(7rem,21vh,12rem)]";
const OUTLINE =
  "[filter:drop-shadow(0_0_2px_#fff8ea)_drop-shadow(0_4px_4px_rgba(42,10,13,0.35))]";

const StoryTravellers = forwardRef<HTMLDivElement>(
  function StoryTravellers(_, ref) {
    return (
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none sticky bottom-0 z-30 h-0 md:absolute md:inset-x-0"
      >
        <style>{css}</style>

        {/* holiday booking layer: pins, plane, route, confirmation card */}
        <HolidayScene />

        {/* door */}
        <div
          data-door
          className="absolute bottom-3 right-3 md:bottom-10 md:right-8"
        >
          <div className="st-door flex flex-col items-center">
            <span className={`st-host mb-2 ${bubbleCls}`}>{HOST_LINE}</span>
            <div className={`${DOOR_SIZE} ${OUTLINE}`}>
              <LodgeDoor />
            </div>
          </div>
        </div>

        {/* family */}
        <div
          data-family
          className="absolute bottom-3 left-0 flex flex-col items-center md:bottom-10"
        >
          <span data-bubble className={`mb-2 w-max ${bubbleCls}`}>
            {FIRST_LINE}
          </span>
          <div className={`${SIZE} ${OUTLINE}`}>
            <Family />
          </div>
        </div>
      </div>
    );
  },
);

export default StoryTravellers;
