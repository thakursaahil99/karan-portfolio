"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/data";
import { BrowserFrame, ProjectCover } from "./ProjectMedia";
import { ease, Magnetic, Reveal, RollText, SplitChars, SplitWords } from "./motion";

/** The full home page scrolls inside a pinned browser window as you scroll the page. */
export function ScrollShowcase({ p }: { p: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const scale = useTransform(smooth, [0, 0.35], [0.82, 1]);
  const rotateX = useTransform(smooth, [0, 0.35], [18, 0]);
  const travel = p.fullHeight > 0 ? (1 - (1440 * 0.625) / p.fullHeight) * 100 : 0;
  const y = useTransform(smooth, [0.38, 1], ["0%", `-${travel}%`]);

  if (!p.shots) {
    return (
      <section ref={ref} className="px-4 md:px-8">
        <BrowserFrame p={p} />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[170vh] px-4 md:h-[260vh] md:px-8" aria-label={`${p.name} full page preview`}>
      <div className="sticky top-0 flex h-screen items-center [perspective:1400px]">
        <motion.div style={{ scale, rotateX }} className="w-full origin-top">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-line bg-card shadow-[0_60px_160px_-50px_rgb(0_0_0/0.9)]">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex-1 truncate rounded-md bg-bg px-3 py-1 font-mono text-[11px] text-muted">https://{p.domain}</span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-acid sm:block">● live</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <motion.div style={{ y }} className="absolute inset-x-0 top-0">
                <Image src={`/projects/${p.slug}-full.jpg`} alt={`${p.name}, full home page`} width={1440} height={p.fullHeight} sizes="(min-width: 1152px) 1152px, 100vw" className="h-auto w-full" priority />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function CaseHero({ p, index, total }: { p: Project; index: number; total: number }) {
  const meta = [
    ["Category", p.category],
    ["Industry", p.industry],
    ["Platform", p.stack.join(" · ")],
    ["Region", p.region],
  ];
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-36 md:px-8 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full opacity-25"
        style={{ background: `radial-gradient(circle, ${p.colors[0]}, transparent 70%)` }}
      />
      <div className="relative mb-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <Link href="/work" className="group inline-flex items-center gap-2 hover:text-acid">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> All work
        </Link>
        <span>
          Case {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <h1 className="relative font-display text-[13vw] font-semibold leading-[0.88] tracking-[-0.04em] [perspective:800px] md:text-[8.5vw]">
        <SplitChars text={p.name} delay={0.4} stagger={0.035} />
      </h1>
      <div className="relative mt-12 grid gap-10 md:grid-cols-12">
        <motion.p
          className="text-xl leading-relaxed text-fg/80 md:col-span-6 md:text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.8 }}
        >
          {p.summary}
        </motion.p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:col-span-5 md:col-start-8">
          {meta.map(([k, v], i) => (
            <motion.div key={k} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.9 + i * 0.07 }}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{k}</dt>
              <dd className="mt-1 font-medium">{v}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
      <motion.div className="relative mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <Magnetic>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-volt py-2 pl-6 pr-2 font-semibold text-ink"
          >
            <RollText text="Visit live site" />
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-acid transition-transform duration-500 group-hover:rotate-45">↗</span>
          </a>
        </Magnetic>
      </motion.div>
    </section>
  );
}

export function CaseBody({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -220]);
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <>
      <section className="px-4 py-28 md:px-8 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">( Overview )</p>
          </div>
          <div className="md:col-span-8">
            <SplitWords as="p" text={p.overview} stagger={0.012} className="font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl" />
          </div>
        </div>
        <div className="mt-24 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">( My role )</p>
          </div>
          <ul className="md:col-span-8">
            {p.scope.map((s, i) => (
              <Reveal key={s} delay={i * 0.06} y={20}>
                <li className="group flex items-center justify-between border-b border-line py-5 text-xl md:text-3xl">
                  <span className="font-display font-medium transition-transform duration-500 group-hover:translate-x-3">{s}</span>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {p.shots && (
        <section ref={ref} className="relative overflow-hidden px-4 py-28 md:px-8 md:py-40" aria-label="Responsive views">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{ background: `radial-gradient(60% 50% at 30% 50%, ${p.colors[0]}33, transparent), radial-gradient(50% 50% at 80% 60%, ${p.colors[1]}33, transparent)` }}
          />
          <div className="relative mb-16 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
              <SplitWords text="Every breakpoint." />
            </h2>
            <p className="hidden max-w-xs text-fg/60 md:block">Laid out and checked on phone, tablet and desktop before launch.</p>
          </div>
          <div className="relative grid items-center gap-10 md:grid-cols-12">
            <motion.div style={{ y: y1 }} className="md:col-span-8">
              <BrowserFrame p={p} scroll sizes="(min-width: 768px) 60vw, 100vw" />
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Hover to scroll the page</p>
            </motion.div>
            <div className="flex justify-center gap-6 md:col-span-4">
              <motion.div style={{ y: y2, rotate: rot }} className="relative w-[58%] max-w-[260px] md:w-full">
                <div className="relative aspect-[390/844] overflow-hidden rounded-[2.2rem] border-[6px] border-[#1c1f25] bg-black shadow-2xl">
                  <Image src={`/projects/${p.slug}-mobile.jpg`} alt={`${p.name} on mobile`} fill sizes="260px" className="object-cover object-top" />
                  <span className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function NextProject({ p }: { p: Project }) {
  return (
    <section className="border-t border-line px-4 py-24 md:px-8 md:py-32">
      <Link href={`/work/${p.slug}`} data-cursor="Next" className="group block">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Next project</p>
        <div className="mt-6 grid items-center gap-10 md:grid-cols-12">
          <h2 className="font-display text-[12vw] font-semibold leading-[0.9] tracking-[-0.04em] transition-colors duration-500 group-hover:text-acid md:col-span-7 md:text-[7vw]">
            {p.name}
          </h2>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line md:col-span-5">
            <div className="absolute inset-0 scale-110 transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100">
              <ProjectCover p={p} sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
            <div className="absolute inset-0 origin-left bg-volt transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-x-0" />
          </div>
        </div>
      </Link>
    </section>
  );
}
