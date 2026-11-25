/* Traditional Chettinad mansion backdrop: a colonnade of teak pillars with
   cusped arches, a carved lintel, a tiled-roof eave, and the red and gold
   border band seen on Chettinad tiles and walls. Sits behind each room. */

const BAYS = 7;
const BAY_W = 200;

function Colonnade({ stroke }: { stroke: string }) {
  return (
    <>
      {/* roof eave with scalloped tiles */}
      <path
        d={Array.from(
          { length: BAYS * 10 },
          (_, i) => `M${i * 20} 70 q10 -22 20 0`,
        ).join(" ")}
        stroke={stroke}
        strokeWidth="2"
      />
      <path d="M0 70 H1400" stroke={stroke} strokeWidth="3" />
      {/* carved lintel */}
      <rect
        x="0"
        y="86"
        width="1400"
        height="22"
        stroke={stroke}
        strokeWidth="2"
      />
      {Array.from({ length: BAYS * 10 }, (_, i) => (
        <rect
          key={i}
          x={i * 20 + 6}
          y="92"
          width="8"
          height="10"
          stroke={stroke}
          strokeWidth="1.5"
        />
      ))}

      {Array.from({ length: BAYS }, (_, i) => {
        const x0 = i * BAY_W;
        const l = x0 + 20;
        const r = x0 + BAY_W - 4;
        const mid = (l + r) / 2;
        const rad = (r - l) / 2;
        return (
          <g key={i}>
            {/* pillar with capital and base */}
            <rect
              x={x0}
              y="108"
              width="16"
              height="392"
              stroke={stroke}
              strokeWidth="2.5"
            />
            <rect
              x={x0 - 6}
              y="108"
              width="28"
              height="12"
              rx="2"
              stroke={stroke}
              strokeWidth="2"
            />
            <rect
              x={x0 - 6}
              y="480"
              width="28"
              height="20"
              rx="2"
              stroke={stroke}
              strokeWidth="2"
            />
            {[190, 250, 310].map((y) => (
              <path
                key={y}
                d={`M${x0} ${y} H${x0 + 16}`}
                stroke={stroke}
                strokeWidth="2"
              />
            ))}
            {/* cusped arch with an inner arch */}
            <path
              d={`M${l} 250 V230 A${rad} ${rad} 0 0 1 ${r} 230 V250`}
              stroke={stroke}
              strokeWidth="2.5"
            />
            <path
              d={`M${l + 14} 250 V232 A${rad - 14} ${rad - 14} 0 0 1 ${r - 14} 232 V250`}
              stroke={stroke}
              strokeWidth="1.5"
              opacity="0.7"
            />
            <circle
              cx={mid}
              cy={230 - rad + 22}
              r="7"
              stroke={stroke}
              strokeWidth="2"
            />
            {/* hanging brass lamp */}
            <path d={`M${mid} 120 V150`} stroke={stroke} strokeWidth="1.5" />
            <path
              d={`M${mid - 9} 150 H${mid + 9} L${mid + 6} 170 H${mid - 6} Z`}
              stroke={stroke}
              strokeWidth="1.5"
            />
            {/* carved door panel */}
            <rect
              x={l + 24}
              y="300"
              width={rad * 2 - 48}
              height="180"
              rx="4"
              stroke={stroke}
              strokeWidth="1.5"
              opacity="0.6"
            />
            <path
              d={`M${mid} 300 V480`}
              stroke={stroke}
              strokeWidth="1.5"
              opacity="0.6"
            />
          </g>
        );
      })}
      <rect
        x={BAYS * BAY_W - 6}
        y="108"
        width="16"
        height="392"
        stroke={stroke}
        strokeWidth="2.5"
      />
      <path d="M0 500 H1400" stroke={stroke} strokeWidth="3" />
    </>
  );
}

function Band({ position }: { position: "top" | "bottom" }) {
  const id = `chet-band-${position}`;
  return (
    <svg
      className={`absolute inset-x-0 h-3.5 w-full ${position === "top" ? "top-0" : "bottom-0"}`}
      aria-hidden
    >
      <defs>
        <pattern id={id} width="28" height="14" patternUnits="userSpaceOnUse">
          <rect width="28" height="14" fill="#D9A441" />
          <rect y="0" width="28" height="2" fill="#7A1119" />
          <rect y="12" width="28" height="2" fill="#7A1119" />
          <path d="M14 2 L22 7 L14 12 L6 7 Z" fill="#9E1B26" />
          <circle cx="14" cy="7" r="1.8" fill="#FFF8EA" />
          <rect x="0" y="5" width="3" height="4" fill="#9E1B26" />
        </pattern>
      </defs>
      <rect width="100%" height="14" fill={`url(#${id})`} />
    </svg>
  );
}

export default function ChettinadBackdrop({ dark }: { dark: boolean }) {
  const stroke = dark ? "#FAF6ED" : "#9E1B26";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* soft warm wash so the colonnade fades into the room */}
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(ellipse at 70% 40%, rgba(217,164,65,0.16), transparent 60%)"
            : "radial-gradient(ellipse at 70% 40%, rgba(217,164,65,0.22), transparent 60%)",
        }}
      />
      <svg
        className="absolute inset-x-0 bottom-0 h-[88%] w-full"
        viewBox="0 0 1400 500"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        opacity={dark ? 0.16 : 0.13}
      >
        <Colonnade stroke={stroke} />
      </svg>
      <Band position="top" />
      <Band position="bottom" />
    </div>
  );
}
