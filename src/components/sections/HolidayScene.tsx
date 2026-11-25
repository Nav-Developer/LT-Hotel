/* Holiday-booking layer for StoryTravellers: bobbing location pins, a
   dashed route with a plane that flies as you scroll, a floating suitcase,
   and a "Stay booked" confirmation that pops up when the family arrives.
   Render it inside the StoryTravellers wrapper div. moveTravellers drives
   [data-plane] and [data-trail]. */

const GOLD = "#D9A441";
const RED = "#9E1B26";
const TEAK = "#5A3320";

const css = `
@keyframes hs-float { from { transform: translateY(0); } to { transform: translateY(-9px); } }
@keyframes hs-drop { from { transform: translateY(-14px) scale(.6); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes hs-pulse { from { transform: scale(1); opacity: .5; } to { transform: scale(1.8); opacity: 0; } }
.hs-pin { animation: hs-float 1.6s ease-in-out infinite alternate; }
.hs-ring { transform-box: fill-box; transform-origin: center; animation: hs-pulse 1.8s ease-out infinite; }
.hs-ticket { opacity: 0; transform: translateY(14px) scale(.9); transition: opacity .5s .5s, transform .5s .5s cubic-bezier(.2,1.4,.4,1); }
[data-arrived="true"] .hs-ticket { opacity: 1; transform: none; }
.hs-stars span { opacity: 0; }
[data-arrived="true"] .hs-stars span { animation: hs-drop .35s ease-out forwards; }
.hs-check { stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset .5s 1s; }
[data-arrived="true"] .hs-check { stroke-dashoffset: 0; }
@media (prefers-reduced-motion: reduce) {
  .hs-pin, .hs-ring { animation: none; }
  .hs-ticket, .hs-check { transition: none; }
}
`;

function Pin({ label, delay }: { label: string; delay: string }) {
  return (
    <div
      className="hs-pin flex flex-col items-center"
      style={{ animationDelay: delay }}
    >
      <span className="mb-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-red shadow">
        {label}
      </span>
      <svg
        viewBox="0 0 32 42"
        className="h-8 w-6 md:h-10 md:w-8 overflow-visible"
      >
        <ellipse
          className="hs-ring"
          cx="16"
          cy="39"
          rx="8"
          ry="2.5"
          fill={RED}
        />
        <path
          d="M16 40 C4 26 4 18 4 14 A12 12 0 0 1 28 14 C28 18 28 26 16 40Z"
          fill={RED}
          stroke="#fff"
          strokeWidth="1.5"
        />
        <circle cx="16" cy="14" r="5" fill="#fff" />
      </svg>
    </div>
  );
}

function Plane() {
  return (
    <svg viewBox="0 0 48 24" className="h-6 w-12 overflow-visible">
      <path
        d="M2 12 L30 9 L44 12 L30 15 Z"
        fill="#fff"
        stroke={RED}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M22 10 L16 1 L26 9Z M22 14 L16 23 L26 15Z"
        fill={GOLD}
        stroke={RED}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M2 12 L8 6 L10 11Z" fill={RED} />
    </svg>
  );
}

function Suitcase() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8 md:h-10 md:w-10">
      <path d="M14 10 V6 H26 V10" stroke={TEAK} strokeWidth="3" fill="none" />
      <rect x="4" y="10" width="32" height="26" rx="4" fill={TEAK} />
      <path d="M13 10 V36 M27 10 V36" stroke={GOLD} strokeWidth="2.5" />
      <rect x="18" y="20" width="4" height="6" rx="1" fill={GOLD} />
    </svg>
  );
}

export default function HolidayScene() {
  return (
    <>
      <style>{css}</style>

      {/* sky layer above the walkers */}
      <div className="absolute inset-x-0 bottom-[8.5rem] h-0 md:bottom-[16rem]">
        {/* dashed route that draws as you scroll */}
        <div
          data-trail
          className="absolute left-0 top-0 h-0 border-t-2 border-dashed border-brand-red/50"
          style={{ width: 0 }}
        />
        <div
          data-plane
          className="absolute left-0 top-[-12px] will-change-transform"
        >
          <Plane />
        </div>

        <div className="absolute left-[16%] top-[-3.5rem] md:top-[-5rem]">
          {/* <Pin label="Rooms" delay="0s" /> */}
        </div>
        <div className="absolute left-[40%] top-[-4.5rem] md:top-[-6rem]">
          {/* <Pin label="" delay=".5s" /> */}
        </div>
        <div className="absolute left-[62%] top-[-3.5rem] md:top-[-5rem]">
          {/* <Pin label="Dining" delay="1s" /> */}
        </div>
        <div
          className="hs-pin absolute left-[28%] top-[1rem] hidden md:block"
          style={{ animationDelay: ".3s" }}
        >
          <Suitcase />
        </div>
      </div>

      {/* booking confirmation card beside the door */}
      <div className="hs-ticket absolute bottom-[9rem] right-[5.5rem] w-44 rounded-xl border-2 border-brand-red bg-white p-3 shadow-lg md:bottom-[17rem] md:right-56 md:w-52">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0">
            <circle cx="12" cy="12" r="11" fill="#2E7D4F" />
            <path
              className="hs-check"
              d="M6.5 12.5 L10.5 16.5 L17.5 8"
              stroke="#fff"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-xs font-bold text-ink md:text-sm">Stay booked!</p>
        </div>
        <p className="mt-1 text-[11px] text-ink/70 md:text-xs">24 hours Open</p>
        <p className="hs-stars mt-1 flex gap-0.5 text-sm text-brand-yellow">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} style={{ animationDelay: `${1.1 + i * 0.1}s` }}>
              ★
            </span>
          ))}
        </p>
      </div>
    </>
  );
}
