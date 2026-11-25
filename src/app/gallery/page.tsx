import type { Metadata } from "next";
import GalleryWall from "@/components/sections/GalleryWall";

export const metadata: Metadata = {
  title: "Gallery | LT Lodge Hotel, Karaikudi",
  description:
    "Photos of LT Lodge Hotel in Karaikudi: A/C rooms, family rooms, clean bathrooms and secure parking.",
};

export default function GalleryPage() {
  // top padding clears the fixed navbar (64px mobile, 76px desktop)
  return (
    <main className="pt-16 md:pt-[76px]">
      <GalleryWall />
    </main>
  );
}
