import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import Providers from "@/components/Providers";
import "./globals.css";

const display = Unbounded({ subsets: ["latin"], variable: "--font-unbounded", weight: ["400", "500", "600", "700"] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: {
    default: "Karan Singh — Web Designer & Developer",
    template: "%s — Karan Singh",
  },
  description:
    "Karan Singh is a web designer and developer in Chandigarh building WordPress, Shopify, Webflow, Framer and Next.js websites, with custom PHP, JavaScript and MySQL.",
  openGraph: {
    title: "Karan Singh — Web Designer & Developer",
    description: "Engineer by training, team leader by experience, web developer by craft.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f0ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
  ],
};

// Runs before paint: restores day/night (saved choice, else the OS setting) so there's no flash,
// and plays the boot preloader once per session (with a failsafe), never for reduced motion.
const boot = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('ks-theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';d.dataset.theme=t}catch(e){d.dataset.theme='dark'}try{if(!sessionStorage.getItem('ks-boot')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.setAttribute('data-preload','');setTimeout(function(){d.removeAttribute('data-preload')},8000)}}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <Providers>
          <Preloader />
          <Header />
          {children}
          <Footer />
          <Cursor />
        </Providers>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
