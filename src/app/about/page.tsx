"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import assets from "@/assets";
import PopBackground from "@/components/ui/PopBackground";
import {
  ADDRESS,
  HOURS,
  HOTEL_NAME,
  RATING,
  PHONE_DISPLAY,
} from "@/data/constant";

/* ---------------- EDIT THESE ---------------- */
const { lodge, lodge2, room, room2, bathroom, parking, parking2 } =
  assets.images;

const ESTABLISHED = 1997;
const YEARS = 29; // 2026 - 1997, update every year

const STORY = [
  `Located in Karaikudi, the heart of the Chettinad region, ${HOTEL_NAME} carries forward the warmth, tradition and hospitality that define Chettinad culture. Since ${ESTABLISHED}, we have been welcoming travellers with comfort, care and a genuine spirit of hospitality.`,
  "For nearly three decades, our commitment has remained the same: to offer a welcoming atmosphere, reliable service and comfort for every guest. Whether you are here for business, family, tourism or to explore the heritage of Chettinad, we strive to make every stay pleasant and memorable.",
  "You will find us on 100 Feet Road, right beside the New Bus Stand, with clean A/C rooms and polite staff, open 24 hours.",
];

const MILESTONES = [
  {
    value: `${ESTABLISHED}`,
    title: "Established",
    text: "The year we began welcoming travellers in Karaikudi.",
  },
  {
    value: `${YEARS}`,
    title: "Years of hospitality",
    text: "A journey of serving guests with comfort and care.",
  },
  {
    value: "3rd",
    title: "Generation of business",
    text: "A business legacy carried forward across three generations.",
  },
];

const CLEAN_POINTS = [
  "Fresh linen every stay",
  "Scrubbed bathrooms",
  "Neat, dust-free rooms",
  "Cool A/C all day",
];

const VALUES = [
  {
    label: "Spotless",
    title: "Clean first",
    text: "Fresh rooms and bathrooms are what guests mention most, so that is where we put our effort.",
  },
  {
    label: "Kind staff",
    title: "Warm and polite",
    text: "Someone is always at the desk, day or night, ready to help with check-in or directions.",
  },
  {
    label: "Easy on the pocket",
    title: "Honest value",
    text: "Good for families and groups. Call us for current rates and no hidden surprises.",
  },
];

const SOFT_SHADOW = "shadow-[0_14px_32px_-14px_rgba(90,15,23,0.4)]";
const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};
/* -------------------------------------------- */

const pill =
  "mb-4 inline-block rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white";
const h2 =
  "font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl";

function Photo({
  src,
  alt,
  label,
  className = "",
  priority = false,
}: {
  src: StaticImageData;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <motion.figure
      {...fade}
      className={`group relative overflow-hidden rounded-3xl bg-white ${SOFT_SHADOW} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width:768px) 40rem, 95vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-cream/95 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
        ✓ {label}
      </figcaption>
    </motion.figure>
  );
}

export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        {/* HERO */}
        <PopBackground variant="blush" className="pb-20 pt-36">
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block rounded-full bg-brand-red px-4 py-1.5 text-sm font-semibold text-white"
              >
                Established {ESTABLISHED} • Karaikudi
              </motion.p>

              <h1 className="font-display mt-4 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-7xl">
                {["a legacy of", "Chettinad hospitality."].map((l, k) => (
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
                A third-generation business, welcoming travellers to Karaikudi
                since {ESTABLISHED} with comfortable A/C rooms and caring
                service. Open 24 hours.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative mx-auto w-full max-w-sm"
            >
              <div
                aria-hidden
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[2rem] bg-brand-red"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-white">
                <Image
                  src={lodge}
                  alt={`${HOTEL_NAME} building`}
                  fill
                  priority
                  sizes="(min-width:768px) 24rem, 90vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </PopBackground>

        {/* WHO WE ARE */}
        <section className="bg-cream px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[0.9fr_1.1fr]">
            <motion.div {...fade} className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden
                className="absolute inset-0 -translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[2rem] bg-brand-red/20"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-white">
                <Image
                  src={lodge2}
                  alt={`${HOTEL_NAME} reception and entrance`}
                  fill
                  sizes="(min-width:768px) 24rem, 90vw"
                  className="object-cover"
                />
              </div>

              <motion.div
                aria-hidden
                className={`absolute -right-4 top-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-2xl text-white ring-4 ring-white md:h-20 md:w-20 ${SOFT_SHADOW}`}
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✦
              </motion.div>

              <div
                className={`absolute -bottom-6 left-6 right-6 rounded-3xl bg-white px-5 py-3 ${SOFT_SHADOW}`}
              >
                <p className="font-display text-xl font-semibold text-ink">
                  {HOTEL_NAME} · Since {ESTABLISHED}
                </p>
                <p className="text-sm text-ink/70">
                  Google {RATING.google} · Justdial {RATING.justdial}
                </p>
              </div>
            </motion.div>

            <motion.div {...fade} className="mt-8 md:mt-0">
              <p className={pill}>Who we are</p>
              <h2 className={h2}>welcome to {HOTEL_NAME}.</h2>

              <svg
                aria-hidden
                className="my-5 w-40 text-brand-red"
                viewBox="0 0 160 12"
                fill="none"
              >
                <path
                  d="M2 6 Q 22 -2 42 6 T 82 6 T 122 6 T 158 6"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="max-w-xl space-y-4 text-base leading-relaxed text-ink/85 md:text-lg">
                {STORY.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div
                className={`mt-8 grid max-w-xl grid-cols-2 gap-4 rounded-3xl bg-white p-6 ${SOFT_SHADOW}`}
              >
                <div>
                  <p className="font-display text-4xl font-semibold text-brand-red">
                    {RATING.google}
                  </p>
                  <p className="text-sm text-ink/70">
                    Google · {RATING.googleCount} reviews
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl font-semibold text-brand-red">
                    {RATING.justdial}
                  </p>
                  <p className="text-sm text-ink/70">
                    Justdial · {RATING.justdialCount} ratings
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* LEGACY */}
        <PopBackground variant="blush" className="py-20 md:py-28">
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <motion.div {...fade} className="max-w-2xl">
              <p className={pill}>Our legacy</p>
              <h2 className={h2}>rooted in Chettinad.</h2>
              <p className="mt-5 text-base leading-relaxed text-ink/85 md:text-lg">
                Chettinad is renowned for its rich cultural heritage,
                architectural beauty, traditional values and distinctive
                hospitality. Inspired by this heritage, {HOTEL_NAME} has built a{" "}
                {YEARS}-year journey of welcoming guests, serving travellers and
                creating a comfortable place to stay in Karaikudi.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {MILESTONES.map((m, k) => (
                <motion.div
                  key={m.title}
                  {...fade}
                  transition={{ ...fade.transition, delay: k * 0.1 }}
                  className={`rounded-3xl bg-white p-7 ${SOFT_SHADOW}`}
                >
                  <p className="font-display text-5xl font-semibold text-brand-red">
                    {m.value}
                  </p>
                  <h3 className="font-display mt-3 text-2xl font-semibold leading-tight text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-base">
                    {m.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </PopBackground>

        {/* CLEAN ROOMS + BATHROOM */}
        <section className="bg-cream px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fade} className="max-w-2xl">
              <p className={pill}>See for yourself</p>
              <h2 className={h2}>clean from the bed to the bathroom.</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/80 md:text-lg">
                These are real photos of our rooms. No filters, no surprises
                when you arrive.
              </p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {CLEAN_POINTS.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-brand-red/30 bg-white px-4 py-1.5 text-sm font-semibold text-brand-red"
                  >
                    ✓ {c}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="mt-10 grid gap-5 md:h-[38rem] md:grid-cols-[1.2fr_1fr] md:grid-rows-2">
              <Photo
                src={room}
                alt="Clean A/C room with fresh bedding at LT Lodge"
                label="Fresh A/C room"
                className="aspect-[4/3] md:row-span-2 md:aspect-auto"
              />
              <Photo
                src={room2}
                alt="Another tidy room at LT Lodge"
                label="Neat & tidy"
                className="aspect-[4/3] md:aspect-auto"
              />
              <Photo
                src={bathroom}
                alt="Spotless attached bathroom at LT Lodge"
                label="Spotless bathroom"
                className="aspect-[4/3] md:aspect-auto"
              />
            </div>
          </div>
        </section>

        {/* LOCATION + PARKING */}
        <section className="bg-cream px-6 pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fade} className="max-w-2xl">
              <p className={pill}>Easy to reach</p>
              <h2 className={h2}>steps from the New Bus Stand</h2>
              <p className="mt-5 text-base leading-relaxed text-ink/85 md:text-lg">
                Get off the bus, walk a few minutes and you are checked in.
                Kannadasan Manimandapam and plenty of local eateries are close
                by. Parking space is limited, so please call ahead if you are
                driving.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/65 md:text-base">
                {ADDRESS}
              </p>
            </motion.div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Photo
                src={parking}
                alt="Parking area at LT Lodge"
                label="Parking"
                className="aspect-[4/3]"
              />
              <Photo
                src={parking2}
                alt="More parking space at LT Lodge"
                label="Safe & close"
                className="aspect-[4/3]"
              />
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-cream px-6 pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <motion.h2 {...fade} className={`${h2} max-w-2xl`}>
              what we care about
            </motion.h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {VALUES.map((v, k) => (
                <motion.div
                  key={v.title}
                  {...fade}
                  transition={{ ...fade.transition, delay: k * 0.1 }}
                  className={`rounded-3xl bg-white p-7 ${SOFT_SHADOW}`}
                >
                  <span className="inline-block rounded-full bg-brand-red/10 px-3 py-0.5 text-xs font-bold text-brand-red">
                    {v.label}
                  </span>
                  <h3 className="font-display mt-3 text-2xl font-semibold leading-tight text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75 md:text-base">
                    {v.text}
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
              planning a stay?
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/90">
              {HOURS}. Call {PHONE_DISPLAY} to confirm rates and availability.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-cream px-8 py-3.5 font-bold text-brand-red shadow-[0_10px_24px_-8px_rgba(42,10,13,0.6)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Enquire now
              </Link>
              <Link
                href="/room"
                className="rounded-full border-2 border-white px-8 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-brand-red"
              >
                See the rooms
              </Link>
            </div>
          </div>
        </PopBackground>
      </main>
    </MotionConfig>
  );
}
