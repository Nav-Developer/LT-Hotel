"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { RATING, WHATSAPP_NUMBER } from "@/data/constant";
import { ROOM_TYPES } from "@/data/menu";

/* ---------- Door that opens onto a lit room ---------- */
function Door({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const ARCH = "M40 440 V190 A140 140 0 0 1 320 190 V440 Z";
  const leaf = { transformBox: "fill-box" as const };
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={open}
      aria-label={open ? "Close the room door" : "Open the room door"}
      className="group relative mx-auto block w-full max-w-sm cursor-pointer"
    >
      <svg viewBox="0 0 360 480" className="w-full overflow-visible">
        <defs>
          <clipPath id="arch">
            <path d={ARCH} />
          </clipPath>
          <radialGradient id="glow" cx="50%" cy="70%" r="75%">
            <stop offset="0" stopColor="#FFFDF6" />
            <stop offset="0.55" stopColor="#F3D9CF" />
            <stop offset="1" stopColor="#9E1B26" />
          </radialGradient>
        </defs>

        <path d={ARCH} fill="#3a0a0f" />
        {/* the room */}
        <g clipPath="url(#arch)">
          <rect x="40" y="40" width="280" height="410" fill="url(#glow)" />
          <rect
            x="40"
            y="395"
            width="280"
            height="55"
            fill="#7d1520"
            opacity="0.55"
          />
          {/* bed */}
          <rect x="92" y="372" width="176" height="34" rx="8" fill="#9e1b26" />
          <rect x="88" y="330" width="14" height="76" rx="5" fill="#5a0f17" />
          <rect x="258" y="348" width="14" height="58" rx="5" fill="#5a0f17" />
          <rect x="108" y="356" width="56" height="20" rx="9" fill="#FAF6ED" />
          <rect x="172" y="356" width="56" height="20" rx="9" fill="#FAF6ED" />
          {/* window */}
          <rect
            x="150"
            y="150"
            width="60"
            height="70"
            rx="4"
            fill="#5a0f17"
            opacity="0.35"
          />
          <path
            d="M180 150 V220 M150 185 H210"
            stroke="#FAF6ED"
            strokeWidth="3"
          />
        </g>

        {/* door leaves */}
        <g clipPath="url(#arch)">
          <motion.g
            animate={{ scaleX: open ? 0.1 : 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ ...leaf, transformOrigin: "left" }}
          >
            <rect x="40" y="40" width="141" height="410" fill="#7d1520" />
            <rect
              x="58"
              y="210"
              width="105"
              height="100"
              fill="none"
              stroke="#FAF6ED"
              strokeWidth="2"
              opacity="0.7"
            />
            <rect
              x="58"
              y="330"
              width="105"
              height="90"
              fill="none"
              stroke="#FAF6ED"
              strokeWidth="2"
              opacity="0.7"
            />
          </motion.g>
          <motion.g
            animate={{ scaleX: open ? 0.1 : 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ ...leaf, transformOrigin: "right" }}
          >
            <rect x="179" y="40" width="141" height="410" fill="#7d1520" />
            <rect
              x="197"
              y="210"
              width="105"
              height="100"
              fill="none"
              stroke="#FAF6ED"
              strokeWidth="2"
              opacity="0.7"
            />
            <rect
              x="197"
              y="330"
              width="105"
              height="90"
              fill="none"
              stroke="#FAF6ED"
              strokeWidth="2"
              opacity="0.7"
            />
          </motion.g>
        </g>

        <path d={ARCH} fill="none" stroke="#FAF6ED" strokeWidth="5" />
        <path
          d="M24 440 H336"
          stroke="#FAF6ED"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* room number plate */}
        <motion.g animate={{ opacity: open ? 0 : 1 }}>
          <rect x="148" y="158" width="64" height="36" rx="4" fill="#FAF6ED" />
          <text
            x="180"
            y="183"
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fill="#5a0f17"
            style={{ fontFamily: "var(--font-bodoni), serif" }}
          >
            101
          </text>
        </motion.g>
      </svg>
      <span className="mt-3 block text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-yellow">
        {open ? "Welcome in" : "Tap to open"}
      </span>
    </button>
  );
}

/* ---------- Hero ---------- */
const field =
  "w-full border-0 border-b-2 border-ink/20 bg-transparent px-0 py-2 text-sm font-semibold text-ink outline-none focus:border-brand-red";

export default function HeroLodge() {
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState(ROOM_TYPES[0]);
  const [guests, setGuests] = useState("2");
  const [inDate, setIn] = useState("");
  const [outDate, setOut] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1300);
    return () => clearTimeout(t);
  }, []);

  const msg = `Hi LT Lodge, I'd like to enquire about a ${room} for ${guests} guest(s). Check-in: ${inDate || "to be decided"}, check-out: ${outDate || "to be decided"}.`;
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative overflow-hidden bg-brand-red text-white"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(250,246,237,0.05) 0 1px, transparent 1px 36px), repeating-linear-gradient(-45deg, rgba(250,246,237,0.05) 0 1px, transparent 1px 36px)",
        }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-48 pt-32 md:grid-cols-[1.15fr_0.85fr] md:pb-56 md:pt-40">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-yellow"
            >
              <span className="h-px w-10 bg-brand-yellow" />
              Karaikudi · 100 Feet Road
            </motion.p>

            <h1 className="font-display mt-6 text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
              {["Your room", "is waiting."].map((l, k) => (
                <span key={l} className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    className={`block ${k === 1 ? "italic text-brand-yellow" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.12 * k + 0.1,
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-white/85"
            >
              Clean A/C rooms and warm, polite staff, a short walk from the New
              Bus Stand. Open 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex flex-wrap items-center gap-6 text-sm"
            >
              <span>
                <b className="font-display text-3xl text-brand-yellow">
                  {RATING.google}
                </b>{" "}
                <span className="text-white/70">
                  Google · {RATING.googleCount} reviews
                </span>
              </span>
              <span className="h-8 w-px bg-white/25" />
              <span>
                <b className="font-display text-3xl text-brand-yellow">
                  {RATING.justdial}
                </b>{" "}
                <span className="text-white/70">
                  Justdial · {RATING.justdialCount} ratings
                </span>
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Door open={open} onToggle={() => setOpen((o) => !o)} />
          </motion.div>
        </div>

        {/* booking bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="absolute inset-x-0 bottom-0 z-10 px-4 pb-6 md:pb-10"
        >
          <div className="mx-auto grid max-w-6xl gap-5 border-t-4 border-brand-red-deep bg-cream p-5 text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] md:grid-cols-[1.2fr_1fr_1fr_0.6fr_auto] md:items-end md:p-6">
            <label className="text-[11px] font-bold uppercase tracking-widest text-ink/60">
              Stay type
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className={field}
              >
                {ROOM_TYPES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <label className="text-[11px] font-bold uppercase tracking-widest text-ink/60">
              Check-in (from 3 PM)
              <input
                type="date"
                value={inDate}
                onChange={(e) => setIn(e.target.value)}
                className={field}
              />
            </label>
            <label className="text-[11px] font-bold uppercase tracking-widest text-ink/60">
              Check-out
              <input
                type="date"
                value={outDate}
                min={inDate}
                onChange={(e) => setOut(e.target.value)}
                className={field}
              />
            </label>
            <label className="text-[11px] font-bold uppercase tracking-widest text-ink/60">
              Guests
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={field}
              >
                {["1", "2", "3", "4", "5+"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </label>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red px-7 py-3.5 text-center text-sm font-bold uppercase tracking-widest text-white transition hover:bg-brand-red-dark"
            >
              Enquire
            </a>
          </div>
          <p className="mt-3 text-center text-xs text-white/70">
            Opens WhatsApp with your details. Rates are confirmed by the lodge.{" "}
            <Link
              href="/contact"
              className="text-brand-yellow underline underline-offset-4"
            >
              Other ways to reach us
            </Link>
          </p>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
