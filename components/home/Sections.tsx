"use client";

import { AnimatePresence, motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { faqs, marquee, principles, process, services, skills, stats, type Service } from "@/lib/data";
import { Counter, DrawLine, ease, Magnetic, Reveal, RollText, Scramble, ScrollWords, SplitWords, VelocityMarquee } from "../motion";

/* ------------------------------------------------------------------ */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
      <span className="h-px w-8 bg-volt" />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */

export function Marquee() {
  return (
    <section aria-label="Platforms" className="relative z-10 -mt-px border-y border-line bg-volt py-5 text-ink md:py-7">
      <VelocityMarquee baseVelocity={-2.2}>
        {marquee.map((m) => (
          <span key={m} className="flex items-center font-display text-3xl font-semibold uppercase tracking-tight md:text-6xl">
            <span className="px-6 md:px-10">{m}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-10 md:w-10" aria-hidden>
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Manifesto() {
  return (
    <section className="px-4 py-28 md:px-8 md:py-44">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow>About</Eyebrow>
          <p className="font-mono text-xs leading-relaxed text-muted">
            <Scramble text="ECE DIPLOMA → TEAM LEADER → WEB DEVELOPER" />
          </p>
        </div>
        <div className="md:col-span-9">
          <ScrollWords
            className="font-display text-[7.4vw] font-medium leading-[1.12] tracking-tight md:text-[3.6vw]"
            text="I spent five years running *production lines — planning shifts, cutting rejection, balancing every station. Now I run *websites the same way: a clear plan, clean *build, and a launch that holds up long after day one."
          />
          <div className="mt-20 grid grid-cols-2 gap-y-12 border-t border-line pt-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="pr-4">
                  <Counter to={s.value} suffix={s.suffix} className="font-display text-5xl font-semibold tracking-tight md:text-7xl" />
                  <p className="mt-3 max-w-[16ch] text-sm text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ServiceCard({ s, i, total, progress }: { s: Service; i: number; total: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.04]);
  const dim = useTransform(progress, [i / total, (i + 1) / total], [0, i === total - 1 ? 0 : 0.45]);
  return (
    <div className="sticky h-[78vh] md:h-[82vh]" style={{ top: `calc(6rem + ${i * 28}px)` }}>
      <motion.article style={{ scale }} className="relative h-[70vh] origin-top overflow-hidden rounded-[2rem] border border-line bg-card p-6 md:p-12">
        <div className="absolute inset-0 bg-dots opacity-50 [mask-image:linear-gradient(to_left,black,transparent_60%)]" aria-hidden />
        <div className="relative grid h-full gap-8 md:grid-cols-12">
          <div className="flex flex-col justify-between md:col-span-7">
            <div>
              <span className="font-mono text-sm text-acid">{s.no}</span>
              <h3 className="mt-4 font-display text-4xl font-semibold leading-[1] tracking-tight md:text-7xl">{s.title}</h3>
            </div>
            <p className="max-w-lg text-lg leading-relaxed text-fg/75 md:text-xl">{s.desc}</p>
          </div>
          <div className="flex flex-col justify-between md:col-span-5">
            <ul className="divide-y divide-line border-y border-line">
              {s.points.map((pt) => (
                <li key={pt} className="flex items-center justify-between py-3 text-sm md:py-4 md:text-base">
                  {pt}
                  <span className="text-acid">+</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <motion.div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: dim }} aria-hidden />
      </motion.article>
    </div>
  );
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="px-4 pt-28 md:px-8 md:pt-40" aria-labelledby="services-title">
      <div className="mb-14 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow>Services</Eyebrow>
          <h2 id="services-title" className="font-display text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">
            <SplitWords text="One developer," />
            <br />
            <SplitWords text="six platforms." className="text-acid" delay={0.15} />
          </h2>
        </div>
        <p className="self-end text-lg text-fg/70 md:col-span-4 md:col-start-9">
          Builder when it&apos;s faster, hand-written code when it&apos;s better. The platform follows the project, not the other way round.
        </p>
      </div>
      <div ref={ref} className="relative">
        {services.map((s, i) => (
          <ServiceCard key={s.no} s={s} i={i} total={services.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Skills on three counter-rotating rings around a core. */
export function SkillOrbit() {
  const rings = [
    { items: skills.filter((s) => s.group === "Data").concat(skills.filter((s) => s.name === "AJAX" || s.name === "jQuery")), d: "min(46vw, 320px)", dur: 40, dir: 1 },
    { items: skills.filter((s) => s.group === "Code" && s.name !== "AJAX" && s.name !== "jQuery"), d: "min(70vw, 520px)", dur: 60, dir: -1 },
    { items: skills.filter((s) => s.group === "Build"), d: "min(94vw, 720px)", dur: 80, dir: 1 },
  ];
  const orbit = useRef<HTMLDivElement>(null);
  const live = useInView(orbit);
  return (
    <section className="relative overflow-hidden px-4 py-28 md:px-8 md:py-40" aria-labelledby="stack-title">
      <div className="relative z-10 mb-10 text-center">
        <Eyebrow>
          <span className="mx-auto">Toolbox</span>
        </Eyebrow>
        <h2 id="stack-title" className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
          <SplitWords text="The stack in orbit" />
        </h2>
      </div>
      <div ref={orbit} data-paused={!live} className="relative mx-auto grid aspect-square w-full max-w-[760px] place-items-center">
        <motion.div
          className="absolute grid h-28 w-28 place-items-center rounded-full bg-volt font-display text-2xl font-bold text-ink shadow-[0_0_120px_20px_rgb(200_255_46/0.25)] md:h-36 md:w-36 md:text-3xl"
          animate={live ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          KS
        </motion.div>
        {rings.map((r, ri) => (
          <div
            key={ri}
            className="spin absolute rounded-full border border-dashed border-line"
            style={{ width: r.d, height: r.d, ["--dur" as string]: `${r.dur}s`, ["--dir" as string]: r.dir > 0 ? "normal" : "reverse" }}
          >
            {r.items.map((s, i) => {
              const a = (360 / r.items.length) * i + ri * 20;
              return (
                <div
                  key={s.name}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${a}deg) translateX(calc(${r.d} / 2)) rotate(${-a}deg)` }}
                >
                  {/* Counter-spin so labels stay upright */}
                  <div className="spin" style={{ ["--dur" as string]: `${r.dur}s`, ["--dir" as string]: r.dir > 0 ? "reverse" : "normal" }}>
                    <span className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-bg-2 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-volt hover:text-acid md:px-4 md:py-2 md:text-sm">
                      {s.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Lessons from the factory floor, each card flips to volt on hover. */
export function Principles() {
  return (
    <section className="px-4 py-28 md:px-8 md:py-40" aria-labelledby="principles-title">
      <div className="mb-14 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <Eyebrow>From the factory floor</Eyebrow>
          <h2 id="principles-title" className="font-display text-4xl font-semibold leading-[1] tracking-tight md:text-6xl">
            <SplitWords text="Lean manufacturing," />
            <br />
            <SplitWords text="applied to the web." className="text-muted" delay={0.12} />
          </h2>
        </div>
      </div>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p, i) => (
          <Reveal key={p.term} delay={i * 0.08} className="h-full">
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden bg-bg p-7"
            >
              <motion.div
                className="absolute inset-0 origin-bottom bg-volt"
                variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                transition={{ duration: 0.6, ease }}
              />
              <div className="relative flex items-start justify-between">
                <span className="font-mono text-xs text-muted transition-colors group-hover:text-ink/60">0{i + 1}</span>
                <motion.span
                  className="text-xl"
                  variants={{ rest: { rotate: 0, color: "#c8ff2e" }, hover: { rotate: 90, color: "#0a0b0d" } }}
                  transition={{ duration: 0.6, ease }}
                >
                  ✳
                </motion.span>
              </div>
              <div className="relative">
                <p className="font-display text-5xl font-bold tracking-tight transition-colors duration-500 group-hover:text-ink">{p.term}</p>
                <p className="mt-3 font-semibold transition-colors duration-500 group-hover:text-ink">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-ink/75">{p.desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  return (
    <section className="px-4 py-28 md:px-8 md:py-40" aria-labelledby="process-title">
      <Eyebrow>Process</Eyebrow>
      <h2 id="process-title" className="mb-16 font-display text-4xl font-semibold tracking-tight md:text-6xl">
        <SplitWords text="Four stations, one line." />
      </h2>
      <div ref={ref} className="relative grid gap-12 md:grid-cols-4 md:gap-8">
        <div className="absolute left-0 right-0 top-[11px] hidden h-px bg-line md:block" aria-hidden>
          <motion.div className="h-px origin-left bg-volt" style={{ scaleX: scrollYProgress }} />
        </div>
        {process.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="relative">
              <span className="relative z-10 mb-8 grid h-6 w-6 place-items-center rounded-full border border-volt bg-bg">
                <span className="h-2 w-2 rounded-full bg-volt" />
              </span>
              <p className="font-mono text-xs text-muted">Station 0{i + 1}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-fg/70">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-4 py-28 md:px-8 md:py-40" aria-labelledby="faq-title">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            <SplitWords text="Good questions." />
          </h2>
          <Magnetic className="mt-8">
            <Link href="/contact" className="inline-flex rounded-full border border-fg/20 px-6 py-3 font-semibold hover:border-volt hover:text-acid">
              <RollText text="Ask me directly" />
            </Link>
          </Magnetic>
        </div>
        <div className="md:col-span-8">
          <DrawLine />
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className={`font-display text-lg font-medium transition-colors md:text-2xl ${isOpen ? "text-acid" : ""}`}>{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease }}
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border text-xl ${isOpen ? "border-volt bg-volt text-ink" : "border-line"}`}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 leading-relaxed text-fg/70 md:text-lg">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
