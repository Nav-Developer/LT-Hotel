"use client";

import { useCallback, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import assets from "@/assets";

/* ---------------- EDIT THESE ---------------- */
const { lodge, lodge2, room, room2, bathroom, parking, parking2 } =
  assets.images;

type Photo = {
  src: StaticImageData;
  title: string;
  caption: string;
  aspect: string; // frame shape
  tilt: number; // hanging angle in degrees
  garland?: boolean; // marigold garland across the top
  offset?: string; // staggers frames like a real wall
};

const PHOTOS: Photo[] = [
  {
    src: lodge,
    title: "The Lodge",
    caption: "LT Lodge beside the New Bus Stand, Karaikudi.",
    aspect: "aspect-[4/5]",
    tilt: -2.2,
    garland: true,
  },
  {
    src: room,
    title: "A/C Room",
    caption: "Clean, cool and comfortable rooms for a good night's rest.",
    aspect: "aspect-[4/3]",
    tilt: 1.8,
    offset: "md:mt-12",
  },
  {
    src: lodge2,
    title: "Entrance",
    caption: "A warm welcome at our doorstep, open 24 hours.",
    aspect: "aspect-square",
    tilt: -1.4,
  },
  {
    src: room2,
    title: "Family Room",
    caption: "Space for the whole family to stay together.",
    aspect: "aspect-[4/5]",
    tilt: 2.4,
    garland: true,
    offset: "md:-mt-6",
  },
  {
    src: bathroom,
    title: "Fresh Bathrooms",
    caption: "Spotless, well kept bathrooms with hot water.",
    aspect: "aspect-[4/3]",
    tilt: -1.9,
    offset: "md:mt-8",
  },
  {
    src: parking,
    title: "Parking",
    caption: "Easy parking for cars and travel groups.",
    aspect: "aspect-square",
    tilt: 1.5,
  },
  {
    src: parking2,
    title: "Secure Parking",
    caption: "Safe, well lit parking right at the lodge.",
    aspect: "aspect-[4/3]",
    tilt: -2,
    offset: "md:mt-10",
  },
];
/* -------------------------------------------- */

const TEAK = "#5A3320";

/** One framed photo: brass nail, string, teak frame, gold mat and nameplate. */
function Frame({ photo, onOpen }: { photo: Photo; onOpen: () => void }) {
  return (
    <figure
      className={`relative mx-auto w-full max-w-sm ${photo.offset ?? ""}`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${photo.title}`}
        className="group block w-full origin-top cursor-zoom-in pt-9 text-left outline-none transition-transform duration-500 ease-out [transform:rotate(var(--tilt))] hover:[transform:rotate(0deg)_scale(1.03)] focus-visible:[transform:rotate(0deg)_scale(1.03)]"
        style={{ "--tilt": `${photo.tilt}deg` } as React.CSSProperties}
      >
        {/* string and brass nail */}
        <svg
          aria-hidden
          viewBox="0 0 100 36"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 h-9 w-full"
        >
          <path
            d="M50 6 L9 36 M50 6 L91 36"
            stroke={TEAK}
            strokeWidth="1.4"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          aria-hidden
          className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full shadow-md"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #FFE9A8, #D9A441 55%, #8A5E14)",
          }}
        />

        {/* teak frame */}
        <div
          className="relative p-2.5 shadow-[0_18px_22px_-10px_rgba(42,10,13,0.55)] md:p-3"
          style={{
            background:
              "linear-gradient(135deg, #7A4528, #5A3320 45%, #3E2214)",
          }}
        >
          {/* brass corner studs */}
          {[
            "left-1 top-1",
            "right-1 top-1",
            "bottom-1 left-1",
            "bottom-1 right-1",
          ].map((pos) => (
            <span
              key={pos}
              aria-hidden
              className={`absolute ${pos} h-1.5 w-1.5 rounded-full bg-brand-yellow`}
            />
          ))}

          {/* gold-edged cream mat */}
          <div className="relative border-2 border-brand-yellow/80 bg-cream p-2">
            <div className={`relative overflow-hidden ${photo.aspect}`}>
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(min-width:1024px) 28vw, (min-width:768px) 40vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* marigold garland */}
          {photo.garland && (
            <svg
              aria-hidden
              viewBox="0 0 100 32"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -top-1 left-0 h-9 w-full overflow-visible"
            >
              <path
                d="M-2 3 Q50 34 102 3"
                stroke="#F28C1B"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M-2 3 Q50 34 102 3"
                stroke="#FFD34D"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="1 9"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}
        </div>

        {/* brass nameplate */}
        <span
          className="font-display mx-auto mt-4 block w-fit px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A2817] shadow-md ring-1 ring-[#8A5E14] md:text-xs"
          style={{ background: "linear-gradient(180deg, #F2D07A, #C99A2E)" }}
        >
          {photo.title}
        </span>
      </button>
    </figure>
  );
}

export default function GalleryWall() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setOpen((i) =>
        i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length,
      ),
    [],
  );

  // keyboard controls and scroll lock while the viewer is open
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const current = open === null ? null : PHOTOS[open];

  return (
    <section className="relative overflow-hidden bg-[#F3E3C3]">
      {/* plaster wall with a faint dotted kolam texture */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(158,27,38,0.12) 1.2px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,248,234,0.9), transparent 60%)",
        }}
      />

      {/* red and gold Chettinad tile band */}
      <div
        aria-hidden
        className="relative h-3.5 border-y-2 border-[#7A1119]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #9E1B26 0 14px, #D9A441 14px 28px)",
        }}
      />

      <header className="relative z-10 px-6 pb-12 pt-14 text-center md:pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red">
          Gallery
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
          Our wall of memories
        </h1>
        <div className="mx-auto my-6 h-1 w-20 bg-brand-red" />
        <p className="mx-auto max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
          Just like the family photos hung in a Chettinad house, here is a look
          around LT Lodge. Tap any frame to see it up close.
        </p>
      </header>

      {/* the wall */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-start gap-x-10 gap-y-14 px-6 pb-28 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
        {PHOTOS.map((p, i) => (
          <Frame key={p.title} photo={p} onOpen={() => setOpen(i)} />
        ))}
      </div>

      {/* teak dado rail along the bottom of the wall */}
      <div
        aria-hidden
        className="relative h-14 border-t-4 border-brand-yellow"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 64px), linear-gradient(180deg, #6B3C22, #3E2214)",
        }}
      />

      {/* viewer */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={close}
          className="fixed inset-0 z-[1300] flex items-center justify-center bg-brand-red-deep/95 p-4 md:p-10"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 h-11 w-11 border border-brand-yellow text-xl text-brand-yellow transition hover:bg-brand-yellow hover:text-brand-red"
          >
            ✕
          </button>
          {(["prev", "next"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              aria-label={dir === "prev" ? "Previous photo" : "Next photo"}
              onClick={(e) => {
                e.stopPropagation();
                step(dir === "prev" ? -1 : 1);
              }}
              className={`absolute top-1/2 z-10 h-11 w-11 -translate-y-1/2 border border-brand-yellow text-xl text-brand-yellow transition hover:bg-brand-yellow hover:text-brand-red ${
                dir === "prev" ? "left-3 md:left-8" : "right-3 md:right-8"
              }`}
            >
              {dir === "prev" ? "‹" : "›"}
            </button>
          ))}

          <div
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-3 shadow-2xl md:p-4"
              style={{
                background:
                  "linear-gradient(135deg, #7A4528, #5A3320 45%, #3E2214)",
              }}
            >
              <div className="border-2 border-brand-yellow/80 bg-cream p-2 md:p-3">
                <div className="relative h-[60vh] md:h-[68vh]">
                  <Image
                    src={current.src}
                    alt={current.title}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <p className="font-display mt-5 text-center text-lg font-semibold text-brand-yellow">
              {current.title}
            </p>
            <p className="mt-1 text-center text-sm text-white/80">
              {current.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
