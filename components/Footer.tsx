"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { nav, profile } from "@/lib/data";
import LocalTime from "./LocalTime";
import { Magnetic, RollText, SplitWords } from "./motion";
import { useLenis } from "./Providers";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
  const spread = useTransform(scrollYProgress, [0.2, 1], ["-0.08em", "0em"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 0]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line bg-bg-2">
      <motion.div style={{ y }} className="relative px-4 pb-8 pt-24 md:px-8 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />

        <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span className="text-acid">●</span> Taking new projects
            </p>
            <SplitWords as="h2" text="Have a site in mind?" className="block font-display text-[11vw] font-semibold leading-[0.95] tracking-tight md:text-[6.5vw]" />
            <motion.div style={{ letterSpacing: spread }} className="font-display text-[11vw] font-semibold leading-[0.95] tracking-tight text-acid md:text-[6.5vw]">
              Let&apos;s build it.
            </motion.div>
          </div>

          <Magnetic strength={0.45}>
            <Link
              href="/contact"
              data-cursor="Go"
              className="group relative grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-volt text-ink md:h-52 md:w-52"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-fg transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
              <span className="relative text-center font-display text-sm font-semibold leading-tight md:text-base">
                Start a<br />project
              </span>
              <motion.svg style={{ rotate }} viewBox="0 0 100 100" className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)]" aria-hidden>
                <defs>
                  <path id="ring" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
                </defs>
                <text className="fill-current font-mono text-[7px] uppercase tracking-[0.3em]">
                  <textPath href="#ring">· available for freelance · available for freelance</textPath>
                </text>
              </motion.svg>
            </Link>
          </Magnetic>
        </div>

        <div className="relative mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Email</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="hover-rule font-display text-xl font-medium md:text-2xl">
                {profile.email}
              </a>
              <button onClick={copy} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-volt hover:text-acid">
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Phone · WhatsApp</p>
            <a href={`tel:${profile.phoneHref}`} className="hover-rule mt-2 inline-block font-display text-xl font-medium md:text-2xl">
              {profile.phone}
            </a>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Pages</p>
            <ul className="mt-2 space-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm text-fg/80 hover:text-acid">
                    <RollText text={n.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Local time</p>
            <p className="mt-2 font-mono text-sm">
              <LocalTime seconds /> IST
            </p>
            <p className="text-sm text-muted">{profile.location}</p>
          </div>
        </div>

        <div className="relative mt-16 flex flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Designed &amp; engineered in Next.js + Motion</span>
          <button
            onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
            className="group inline-flex items-center gap-2 hover:text-acid"
          >
            Back to top
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
          </button>
        </div>

        {/* SVG text stretched to the container, so the full name always fits on one line at any width */}
        <motion.svg
          aria-hidden
          viewBox="0 0 1000 118"
          className="pointer-events-none relative mx-auto mt-12 block w-full max-w-[1400px] select-none md:w-[92%]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <text
            x="0"
            y="104"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-display font-bold text-fg/[0.08]"
            fontSize="128"
            fill="currentColor"
          >
            KARAN SINGH
          </text>
        </motion.svg>
      </motion.div>
    </footer>
  );
}
