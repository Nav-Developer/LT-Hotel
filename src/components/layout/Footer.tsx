import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import {
  ADDRESS,
  HOURS,
  PHONE_LANDLINE,
  PHONE_MOBILE,
  WHATSAPP_NUMBER,
  MAPS_URL,
  FACEBOOK_URL,
  RATING,
  CONTACT_EMAIL,
} from "@/data/constant";
import { ROOM_TYPES } from "@/data/menu";

const heading =
  "mb-5 text-xs font-bold uppercase tracking-[0.25em] text-brand-yellow";
const linkCls = "text-white/80 transition hover:text-brand-yellow";
const telHref = (n: string) => `tel:${n.replace(/\s/g, "")}`;

export default function Footer() {
  return (
    <footer className="bg-brand-red-deep text-white">
      <div className="h-1 bg-brand-red" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
        {/* BRAND */}
        <div>
          <Link
            href="/"
            aria-label="LT Lodge home"
            className="inline-block bg-cream p-3"
          >
            <span className="relative block h-16 w-28">
              <Image
                src={assets.images.logo}
                alt="LT Lodge Hotel"
                fill
                sizes="112px"
                className="object-contain"
              />
            </span>
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed text-white/80">
            A clean, friendly A/C lodge beside the New Bus Stand in Karaikudi.
            Open round the clock for travellers, families and wedding groups.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="border border-brand-yellow/50 px-3 py-1.5">
              ★ {RATING.google} Google · {RATING.googleCount} reviews
            </span>
            <span className="border border-brand-yellow/50 px-3 py-1.5">
              ★ {RATING.justdial} Justdial · {RATING.justdialCount} ratings
            </span>
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className={heading}>Explore</h3>
          <ul className="space-y-3">
            {[
              ["Home", "/"],
              ["Rooms", "/rooms"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([l, h]) => (
              <li key={l}>
                <Link href={h} className={linkCls}>
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* STAYS */}
        <div>
          <h3 className={heading}>Stays</h3>
          <ul className="space-y-3">
            {ROOM_TYPES.map((r) => (
              <li key={r}>
                <Link href="/rooms" className={linkCls}>
                  {r}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className={heading}>Find us</h3>
          <address className="space-y-4 text-sm not-italic text-white/85">
            <p>{ADDRESS}</p>
            <p>{HOURS}</p>
            <p className="space-y-1">
              <a
                href={telHref(PHONE_LANDLINE)}
                className="block font-bold hover:text-brand-yellow"
              >
                {PHONE_LANDLINE}
              </a>
              <a
                href={telHref(PHONE_MOBILE)}
                className="block font-bold hover:text-brand-yellow"
              >
                {PHONE_MOBILE}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="block hover:text-brand-yellow"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </address>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-red transition hover:bg-white"
            >
              Get directions
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-yellow transition hover:bg-brand-yellow hover:text-brand-red"
            >
              WhatsApp
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:border-brand-yellow hover:text-brand-yellow"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/60 md:flex-row md:px-10">
          <p>
            © {new Date().getFullYear()} LT Lodge Hotel, Karaikudi. All rights
            reserved.
          </p>
          <p className="flex items-center gap-2">
            Designed by
            <a
              href="https://www.instagram.com/nk_freaky/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-brand-yellow hover:opacity-80"
            >
              <Image
                src={assets.images.instagram}
                alt="Instagram"
                width={16}
                height={16}
                className="h-4 w-4 object-contain brightness-0 invert"
              />
              nk_freaky
            </a>
            <a
              href="https://www.naveenkumar.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-brand-yellow hover:opacity-80"
            >
              <Image
                src={assets.images.website}
                alt="Website"
                width={16}
                height={16}
                className="h-4 w-4 object-contain brightness-0 invert"
              />
              naveenKumar.site
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
