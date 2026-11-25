"use client";

import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import PopBackground from "@/components/ui/PopBackground";
import { MENU } from "@/data/menu";
import {
  HOURS,
  HOTEL_NAME,
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
} from "@/data/constant";

const SOFT_SHADOW = "shadow-[0_14px_32px_-14px_rgba(66,0,12,0.4)]";
const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const TAGS: Record<string, string> = {
  "A/C Double Room": "A/C",
  "Bulk Room's for A/C / Non-A/C ": "A/C · Bulk",
  // "Group / Wedding Stay": "Groups",
  "Non-A/C Room": "Budget",
};

const GOOD_TO_KNOW = [
  { title: "Check-in", text: " The desk is open 24 hours." },
  {
    title: "Rates",
    text: "Rates vary by season and availability. Call or message to confirm.",
  },
  {
    title: "Parking",
    text: "Car parking space is limited, so please call ahead if driving.",
  },
];

const wa = (room: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi ${HOTEL_NAME}, I'd like to enquire about the ${room}. Please share rates and availability.`,
  )}`;

export default function RoomsPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        {/* HERO */}
        <PopBackground variant="blush" className="pb-16 pt-36">
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white"
            >
              Rooms at {HOTEL_NAME}
            </motion.p>

            <h1 className="font-display mt-4 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-7xl">
              {["pick a room,", "we'll keep it ready."].map((l, k) => (
                <span key={l} className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    className={`block ${k === 1 ? "italic text-brand-red" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.12 * k + 0.1,
                      duration: 0.7,
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
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80"
            >
              Clean, simple rooms for couples, families and groups. Rates are
              confirmed by the lodge, so just call or message us.
            </motion.p>
          </div>
        </PopBackground>

        {/* ROOMS */}
        <section className="bg-cream px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2">
              {MENU.map((room, k) => (
                <motion.article
                  key={room.name}
                  {...fade}
                  transition={{ ...fade.transition, delay: (k % 2) * 0.1 }}
                  className={`flex flex-col rounded-3xl bg-white p-7 ${SOFT_SHADOW}`}
                >
                  <span className="inline-block self-start rounded-full bg-brand-red/10 px-3 py-0.5 text-xs font-bold text-brand-red">
                    {TAGS[room.name] ?? "Stay"}
                  </span>
                  <h2 className="font-display mt-3 text-3xl font-semibold leading-tight text-ink">
                    {room.name}
                  </h2>
                  <p className="mt-2 text-ink/75">{room.note}</p>
                  <p className="mt-4 text-sm font-semibold text-ink/60">
                    Call for today&apos;s rate
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={wa(room.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#1FA855] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#168A44]"
                    >
                      <WhatsAppIcon fontSize="small" /> Enquire
                    </a>
                    <a
                      href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-2.5 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
                    >
                      <CallIcon fontSize="small" /> Call
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* GOOD TO KNOW */}
        <section className="bg-cream px-6 pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <motion.h2
              {...fade}
              className="font-display max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl"
            >
              good to know
            </motion.h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {GOOD_TO_KNOW.map((g, k) => (
                <motion.div
                  key={g.title}
                  {...fade}
                  transition={{ ...fade.transition, delay: k * 0.1 }}
                  className={`rounded-3xl bg-white p-7 ${SOFT_SHADOW}`}
                >
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-base">
                    {g.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <PopBackground variant="red" className="py-20">
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
            <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl">
              ready to book?
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/90">{HOURS}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-brand-yellow px-8 py-3.5 font-bold text-ink shadow-[0_10px_24px_-8px_rgba(42,20,16,0.6)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Contact us
              </Link>
              <Link
                href="/about"
                className="rounded-full border-2 border-white px-8 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-brand-red"
              >
                About the lodge
              </Link>
            </div>
          </div>
        </PopBackground>
      </main>
    </MotionConfig>
  );
}
