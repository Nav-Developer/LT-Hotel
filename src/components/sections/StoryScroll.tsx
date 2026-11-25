"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { chapters } from "@/data/story";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ArchArt({ dark }: { dark: boolean }) {
  const c = dark ? "#FAF6ED" : "#9E1B26";
  return (
    <svg viewBox="0 0 280 360" className="w-full" fill="none" aria-hidden>
      <path
        d="M20 340 V140 A120 120 0 0 1 260 140 V340 Z"
        stroke={c}
        strokeWidth="3"
      />
      <path
        d="M40 340 V145 A100 100 0 0 1 240 145 V340"
        stroke={c}
        strokeWidth="1.5"
        opacity="0.5"
      />
      <circle cx="140" cy="140" r="34" stroke={c} strokeWidth="3" />
      <path
        d="M140 96 V184 M96 140 H184"
        stroke={c}
        strokeWidth="2"
        opacity="0.6"
      />
      <rect
        x="70"
        y="270"
        width="140"
        height="30"
        rx="6"
        stroke={c}
        strokeWidth="3"
      />
      <rect
        x="64"
        y="240"
        width="10"
        height="60"
        rx="3"
        stroke={c}
        strokeWidth="3"
      />
      <rect
        x="206"
        y="256"
        width="10"
        height="44"
        rx="3"
        stroke={c}
        strokeWidth="3"
      />
      <path d="M10 340 H270" stroke={c} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function StoryScroll() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const el = track.current;
        if (!el) return;
        const dist = () => el.scrollWidth - window.innerWidth;

        const tween = gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              gsap.set(".hall-fill", { scaleX: self.progress }),
          },
        });

        // big room numbers drift against the scroll
        gsap.utils.toArray<HTMLElement>(".bignum").forEach((n) => {
          gsap.fromTo(
            n,
            { xPercent: 25 },
            {
              xPercent: -25,
              ease: "none",
              scrollTrigger: {
                trigger: n.closest(".panel"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        // content rises in as each room reaches the viewport
        gsap.utils.toArray<HTMLElement>(".panel").forEach((p) => {
          gsap.from(p.querySelectorAll(".rise"), {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: p,
              containerAnimation: tween,
              start: "left 70%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // count-up stats
        gsap.utils.toArray<HTMLElement>(".stat").forEach((s) => {
          const o = { v: 0 };
          ScrollTrigger.create({
            trigger: s.closest(".panel"),
            containerAnimation: tween,
            start: "left 60%",
            once: true,
            onEnter: () =>
              gsap.to(o, {
                v: Number(s.dataset.value),
                duration: 1.4,
                ease: "power1.out",
                snap: { v: 1 },
                onUpdate: () => {
                  s.textContent = String(o.v);
                },
              }),
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-cream md:h-screen"
    >
      <div ref={track} className="flex flex-col md:h-full md:w-max md:flex-row">
        {chapters.map((c, i) => {
          const dark = i % 2 === 1;
          const num = String(i + 1).padStart(2, "0");
          const hasArt = Boolean(c.image || c.aspect);

          return (
            <article
              key={i}
              className={`panel relative flex min-h-[80vh] items-center overflow-hidden px-6 py-20 md:h-full md:w-screen md:shrink-0 md:px-24 md:py-0 ${
                dark ? "bg-brand-red text-white" : "bg-cream text-ink"
              }`}
            >
              <span
                aria-hidden
                className="bignum font-display pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none text-[16rem] font-semibold italic leading-none text-transparent md:right-20 md:text-[26rem]"
                style={{
                  WebkitTextStroke: `2px ${dark ? "rgba(250,246,237,0.2)" : "rgba(158,27,38,0.16)"}`,
                }}
              >
                {num}
              </span>

              <div className="relative z-10 grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="rise inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em]">
                    <span
                      className={`px-3 py-1.5 ${dark ? "bg-brand-yellow text-brand-red" : "bg-brand-red text-white"}`}
                    >
                      Room {num}
                    </span>
                    <span
                      className={dark ? "text-brand-yellow" : "text-brand-red"}
                    >
                      {c.tag}
                    </span>
                  </p>

                  <h2 className="rise font-display mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                    {c.title}
                  </h2>

                  <div
                    className={`rise my-6 h-1 w-20 ${dark ? "bg-brand-yellow" : "bg-brand-red"}`}
                  />

                  <p
                    className={`rise max-w-lg text-base leading-relaxed md:text-lg ${dark ? "text-white/85" : "text-ink/85"}`}
                  >
                    {c.text}
                  </p>
                  {c.text2 && (
                    <p
                      className={`rise mt-3 max-w-lg text-sm leading-relaxed md:text-base ${dark ? "text-white/65" : "text-ink/65"}`}
                    >
                      {c.text2}
                    </p>
                  )}

                  {c.points && (
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      {c.points.map((p) => (
                        <div
                          key={p.title}
                          className={`rise border-t-4 p-4 ${dark ? "border-brand-yellow bg-white/10" : "border-brand-red bg-white"}`}
                        >
                          <span
                            className={`text-[11px] font-bold uppercase tracking-widest ${dark ? "text-brand-yellow" : "text-brand-red"}`}
                          >
                            {p.label}
                          </span>
                          <h3 className="font-display mt-1 text-xl font-semibold">
                            {p.title}
                          </h3>
                          <p
                            className={`mt-1 text-sm ${dark ? "text-white/70" : "text-ink/70"}`}
                          >
                            {p.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {c.stats && (
                    <div className="mt-8 flex flex-wrap gap-8">
                      {c.stats.map((s) => (
                        <div key={s.label} className="rise">
                          <p
                            className={`font-display text-6xl font-semibold ${dark ? "text-brand-yellow" : "text-brand-red"}`}
                          >
                            <span className="stat" data-value={s.value}>
                              0
                            </span>
                            {s.suffix}
                          </p>
                          <p
                            className={`mt-1 text-xs font-bold uppercase tracking-widest ${dark ? "text-white/70" : "text-ink/70"}`}
                          >
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {hasArt && (
                  <div className="rise mx-auto w-full max-w-[16rem] md:max-w-xs">
                    {c.image ? (
                      <div
                        className={`relative aspect-[4/5] overflow-hidden rounded-t-[999px] border-4 ${dark ? "border-brand-yellow" : "border-brand-red"}`}
                      >
                        <Image
                          src={c.image}
                          alt={c.title}
                          fill
                          sizes="20rem"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <ArchArt dark={dark} />
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* hallway progress */}
      <div className="pointer-events-none absolute inset-x-6 bottom-6 z-20 hidden md:inset-x-24 md:block">
        <div className="relative h-0.5 bg-ink/20">
          <div className="hall-fill h-full origin-left scale-x-0 bg-ink" />
          {chapters.map((_, i) => (
            <span
              key={i}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink px-1.5 py-0.5 text-[10px] font-bold text-brand-yellow"
              style={{
                left: `${(i / Math.max(chapters.length - 1, 1)) * 100}%`,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
