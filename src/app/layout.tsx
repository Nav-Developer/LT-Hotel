import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "LT-Hotel",
  description: "Handmade soaps, rooted in nature.",
};

import { Cormorant_Garamond } from "next/font/google";
import { Arima, Catamaran } from "next/font/google";

const heading = Arima({
  subsets: ["latin", "tamil"],
  variable: "--font-bodoni",
  display: "swap",
});

// const heading = Cormorant_Garamond({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   style: ["normal", "italic"],
//   variable: "--font-bodoni",
//   display: "swap",
// });

const body = Catamaran({
  subsets: ["latin", "tamil"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className={`${bodoni.variable} ${montserrat.variable}`}>
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <ThemeRegistry>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
