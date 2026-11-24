import type { StaticImageData } from "next/image";

export type Chapter = {
  tag: string;
  title: string;
  text: string;
  text2?: string;
  image?: StaticImageData;
  aspect?: "tall" | "wide";
  points?: { label: string; title: string; text: string }[];
  stats?: { label: string; value: number; suffix?: string }[];
};

export const chapters: Chapter[] = [
  {
    tag: "Welcome to LT Lodge",
    title: "a clean, calm stay in Karaikudi",
    text: "LT Lodge is a budget A/C lodge on 100 Feet Road, right beside the New Bus Stand. Simple rooms, polite staff and no surprises.",
    aspect: "wide",
  },
  {
    tag: "Why guests return",
    title: "clean rooms, kind people",
    text: "Guests keep mentioning spotless rooms and bathrooms, helpful staff and good value for the price.",
    text2: "Family friendly, and easy on the pocket for groups.",
    aspect: "tall",
  },
  {
    tag: "Easy to reach",
    title: "steps from the bus stand",
    text: "Get off the bus, walk a few minutes and you're checked in. Kannadasan Manimandapam and plenty of local eateries are close by.",
    text2: "Car parking space is limited, so call ahead if you're driving.",
  },
  {
    tag: "Every kind of stay",
    title: "rooms, families & groups",
    text: "Whether it's a night in transit or a wedding week, we have a room that fits.",
    points: [
      {
        label: "Comfort",
        title: "A/C rooms",
        text: "Cool, clean and ready after a long journey.",
      },
      {
        label: "Family",
        title: "Family stays",
        text: "Spacious rooms with extra beds on request.",
      },
      {
        label: "Events",
        title: "Group & wedding",
        text: "Book several rooms together for functions.",
      },
    ],
  },
  {
    tag: "Book today",
    title: "call us, we're always open",
    text: "Open 24 hours. Check-in from 3:00 PM. Call to confirm rates and availability.",
    stats: [
      { label: "hours open every day", value: 24 },
      { label: "Justdial rating (out of 5)", value: 4, suffix: ".0" },
    ],
  },
];
