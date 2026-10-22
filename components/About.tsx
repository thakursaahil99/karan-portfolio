"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { education, journey, profile, training } from "@/lib/data";
import { Eyebrow } from "./home/Sections";
import { ease, Reveal, SplitWords, Tilt } from "./motion";

/** A component datasheet for a person: the engineer's version of an ID card. */
export function SpecSheet() {
  const rows = [
    ["Part no.", "KS-1990-WEB"],
    ["Function", profile.role],
    ["Origin", profile.origin],
    ["Based in", profile.location],
    ["Currently at", profile.company],
    ["Core", "Diploma, Electronics & Communication"],
    ["Languages", "Hindi · English"],
    ["Status", "Available for projects"],
  ];
  return (
    <Tilt className="rounded-3xl" max={6}>
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.2, ease, delay: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-line bg-card"
      >
        <div className="flex items-center justify-between border-b border-line bg-volt px-6 py-4 text-ink">
          <span className="font-display text-lg font-bold">DATASHEET</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Rev. {new Date().getFullYear()}</span>
        </div>
        <div className="relative p-6">
          <div className="absolute inset-0 bg-dots opacity-40" aria-hidden />
          <div className="relative mb-6 flex items-center gap-5">
            <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-2xl border border-line bg-bg font-display text-3xl font-bold text-acid">
              KS
              {/* IC pins */}
              {[0, 1, 2, 3].map((i) => (
                <span key={`l${i}`} className="absolute -left-2 h-1 w-2 bg-muted/60" style={{ top: 18 + i * 18 }} />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <span key={`r${i}`} className="absolute -right-2 h-1 w-2 bg-muted/60" style={{ top: 18 + i * 18 }} />
              ))}
            </div>
            <div>
              <p className="font-display text-2xl font-semibold">{profile.name}</p>
              <p className="text-sm text-muted">Engineer · Team leader · Developer</p>
            </div>
          </div>
          <dl className="relative divide-y divide-line border-y border-line">
            {rows.map(([k, v], i) => (
              <motion.div
                key={k}
                className="flex justify-between gap-6 py-2.5 text-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.06, duration: 0.6, ease }}
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{k}</dt>
                <dd className={`text-right font-medium ${k === "Status" ? "text-acid" : ""}`}>{v}</dd>
              </motion.div>
            ))}
          </dl>
          <div className="relative mt-5 flex h-8 items-end gap-[3px]" aria-hidden>
            {Array.from({ length: 48 }).map((_, i) => (
              <span key={i} className="flex-1 bg-fg/70" style={{ height: `${30 + ((i * 37) % 70)}%`, opacity: i % 3 === 0 ? 0.3 : 1 }} />
            ))}
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
}

/** Vertical career line that fills as you scroll; web roles in volt, factory roles in signal blue. */
export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const dot = useTransform(fill, [0, 1], ["0%", "100%"]);
  return (
    <section className="px-4 py-28 md:px-8 md:py-40" aria-labelledby="journey-title">
      <div className="mb-16 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <Eyebrow>Journey · 2014 → now</Eyebrow>
          <h2 id="journey-title" className="font-display text-4xl font-semibold leading-[1] tracking-tight md:text-6xl">
            <SplitWords text="From production lines" />
            <br />
            <SplitWords text="to lines of code." className="text-acid" delay={0.12} />
          </h2>
        </div>
        <div className="flex items-end gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted md:col-span-4">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-volt" /> Web</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-signal" /> Manufacturing</span>
        </div>
      </div>

      <div ref={ref} className="relative">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-[calc(25%+7px)]" aria-hidden>
          <motion.div className="w-px origin-top bg-gradient-to-b from-volt via-volt to-signal" style={{ scaleY: fill, height: "100%" }} />
          <motion.span className="absolute -left-[5px] h-[11px] w-[11px] rounded-full bg-volt shadow-[0_0_20px_4px_rgb(200_255_46/0.6)]" style={{ top: dot }} />
        </div>
        <ol className="space-y-14">
          {journey.map((j, i) => (
            <li key={i} className="relative grid gap-3 pl-10 md:grid-cols-4 md:gap-10 md:pl-0">
              <span
                className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 bg-bg md:left-[25%] ${j.kind === "web" ? "border-volt" : "border-signal"}`}
                aria-hidden
              />
              <Reveal y={20} className="md:pr-12 md:text-right">
                <p className={`font-mono text-xs uppercase tracking-[0.18em] ${j.kind === "web" ? "text-acid" : "text-signal"}`}>{j.period}</p>
              </Reveal>
              <Reveal y={30} delay={0.05} className="md:col-span-3 md:pl-12">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{j.role}</h3>
                <p className="mt-1 text-fg/70">
                  {j.company} <span className="text-muted">· {j.place}</span>
                </p>
                {j.points.length > 0 && (
                  <ul className="mt-4 max-w-2xl space-y-2">
                    {j.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-fg/75">
                        <span className="mt-2.5 h-px w-4 shrink-0 bg-muted" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Credentials() {
  return (
    <section className="px-4 py-28 md:px-8 md:py-32" aria-labelledby="cred-title">
      <h2 id="cred-title" className="sr-only">Education and training</h2>
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <Eyebrow>Education</Eyebrow>
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08} y={20}>
              <div className="group grid grid-cols-[80px_1fr] gap-4 border-b border-line py-6">
                <span className="font-mono text-sm text-acid">{e.year}</span>
                <div>
                  <p className="font-display text-lg font-semibold transition-transform duration-500 group-hover:translate-x-2">{e.title}</p>
                  <p className="text-sm text-muted">{e.place}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div>
          <Eyebrow>Training</Eyebrow>
          {training.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08} y={20}>
              <div className="group grid grid-cols-[80px_1fr] gap-4 border-b border-line py-6">
                <span className="font-mono text-sm text-acid">{t.length}</span>
                <div>
                  <p className="font-display text-lg font-semibold transition-transform duration-500 group-hover:translate-x-2">{t.title}</p>
                  <p className="text-sm text-muted">{t.place}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="mt-10 rounded-3xl border border-line bg-card p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Languages</p>
              <p className="mt-2 font-display text-2xl font-semibold">Hindi · English</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
