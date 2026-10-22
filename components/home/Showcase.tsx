"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/data";
import { ProjectCover } from "../ProjectMedia";
import { ease, Magnetic, Reveal, RollText, SplitWords } from "../motion";
import { Eyebrow } from "./Sections";

const featured = projects.slice(0, 7);

/** One project's story. Reports itself as active when it holds the middle of the screen. */
function Chapter({ p, i, active, onActive }: { p: Project; i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);

  return (
    <article ref={ref} className="flex min-h-[auto] flex-col justify-center py-10 md:min-h-[80vh] md:py-0">
      {/* Mobile: the photo sits with its story */}
      <Reveal className="mb-6 md:hidden">
        <Link href={`/work/${p.slug}`} className="relative block aspect-[16/11] overflow-hidden rounded-2xl border border-line">
          <ProjectCover p={p} sizes="100vw" />
        </Link>
      </Reveal>

      <motion.div animate={{ opacity: active ? 1 : 0.22 }} transition={{ duration: 0.6, ease }} className="max-md:!opacity-100">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="text-acid">{String(i + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-line" />
          <span>{p.category}</span>
        </div>
        <h3 className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
          <Link href={`/work/${p.slug}`} className="hover:text-acid">
            {p.name}
          </Link>
        </h3>
        <p className="mt-3 text-sm font-medium text-muted">
          {p.industry} · {p.region}
        </p>
        <p className="mt-6 max-w-md leading-relaxed text-fg/75 md:text-lg">{p.overview}</p>

        <div className="mt-6 grid max-w-md grid-cols-2 gap-4 border-y border-line py-4 text-sm">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Built with</p>
            <p className="mt-1 font-semibold">{p.stack.join(" · ")}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">I did</p>
            <p className="mt-1 font-semibold">{p.scope.slice(0, 3).join(", ")}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Magnetic>
            <Link href={`/work/${p.slug}`} className="group inline-flex items-center gap-2 rounded-full bg-volt py-2 pl-5 pr-2 text-sm font-semibold text-ink">
              <RollText text="Case study" />
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-volt transition-transform duration-500 group-hover:rotate-45">↗</span>
            </Link>
          </Magnetic>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-line px-5 py-2 text-sm font-semibold transition-colors hover:border-acid hover:text-acid"
          >
            {p.domain} ↗
          </a>
        </div>
      </motion.div>
    </article>
  );
}

/** The sticky stage: desktop browser + phone, wiping to the active project. */
function Stage({ p, index }: { p: Project; index: number }) {
  return (
    <div className="relative h-full w-full">
      <AnimatePresence initial={false}>
        <motion.div
          key={`glow-${p.slug}`}
          className="pointer-events-none absolute -inset-20 opacity-50"
          style={{ background: `radial-gradient(40% 40% at 35% 40%, ${p.colors[0]}55, transparent), radial-gradient(35% 35% at 75% 70%, ${p.colors[1]}55, transparent)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          aria-hidden
        />
      </AnimatePresence>

      <Link href={`/work/${p.slug}`} data-cursor="Open" className="absolute inset-x-0 top-1/2 block -translate-y-1/2">
        <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_50px_140px_-40px_rgb(0_0_0/0.55)]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <div className="relative ml-3 h-6 flex-1 overflow-hidden rounded-md bg-bg">
              <AnimatePresence initial={false}>
                <motion.span
                  key={p.domain}
                  className="absolute inset-0 truncate px-3 py-1 font-mono text-[11px] text-muted"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.5, ease }}
                >
                  https://{p.domain}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
            <AnimatePresence initial={false}>
              <motion.div
                key={p.slug}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                exit={{ clipPath: "inset(0% 0% 100% 0%)", scale: 1.04 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              >
                <ProjectCover p={p} sizes="(min-width: 768px) 55vw, 100vw" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Link>

      {/* Phone overlapping the browser */}
      <div className="absolute -bottom-2 -left-6 w-[22%] min-w-[120px] lg:bottom-[6%]">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[1.6rem] border-[5px] border-[#1c1f25] bg-[#1c1f25] shadow-2xl">
          <AnimatePresence initial={false}>
            <motion.div
              key={`m-${p.slug}`}
              className="absolute inset-0"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-30%", opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
            >
              {p.shots ? (
                <Image src={`/projects/${p.slug}-mobile.jpg`} alt={`${p.name} on mobile`} fill sizes="200px" className="object-cover object-top" />
              ) : (
                <ProjectCover p={p} sizes="200px" />
              )}
            </motion.div>
          </AnimatePresence>
          <span className="absolute left-1/2 top-1.5 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-[#1c1f25]" />
        </div>
      </div>

      {/* Counter */}
      <div className="absolute right-0 top-0 flex items-end gap-2 font-display leading-none">
        <div className="relative h-[1em] w-[2.4ch] overflow-hidden text-6xl font-semibold text-acid">
          <AnimatePresence initial={false}>
            <motion.span
              key={index}
              className="absolute right-0"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="mb-1 font-mono text-xs text-muted">/ {String(featured.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

export default function Showcase() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative px-4 pt-24 md:px-8 md:pt-32" aria-labelledby="showcase-title">
      <div className="mb-6 grid gap-6 md:mb-0 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow>Selected work · {featured.length} of {projects.length}</Eyebrow>
          <h2 id="showcase-title" className="font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            <SplitWords text="Sites in" />
            <br />
            <SplitWords text="production." className="text-acid" delay={0.12} />
          </h2>
        </div>
        <p className="self-end text-lg text-fg/70 md:col-span-4 md:col-start-9">
          Live client websites, each with the problem it solved, the platform it runs on and what I built.
        </p>
      </div>

      <div className="grid md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          {featured.map((p, i) => (
            <Chapter key={p.slug} p={p} i={i} active={active === i} onActive={setActive} />
          ))}
        </div>
        <div className="hidden md:col-span-7 md:block">
          <div className="sticky top-0 flex h-screen items-center py-24">
            <div className="relative h-full w-full">
              <Stage p={featured[active]} index={active} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-8 pt-10">
        <Magnetic>
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 rounded-full border border-fg/20 py-2 pl-7 pr-2 text-lg font-semibold transition-colors hover:border-acid"
          >
            <RollText text={`See all ${projects.length} projects`} />
            <span className="grid h-11 w-11 place-items-center rounded-full bg-volt text-ink transition-transform duration-500 group-hover:rotate-45">↗</span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
