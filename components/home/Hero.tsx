"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import Circuit from "./Circuit";
import { ease, Magnetic, RollText, SplitChars, useIntroDelay } from "../motion";

const cycle = ["WordPress", "Shopify", "Next.js", "Webflow", "Framer", "PHP"];

function Cycler({ start }: { start: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!start) return;
    const id = setInterval(() => setI((n) => (n + 1) % cycle.length), 1900);
    return () => clearInterval(id);
  }, [start]);
  return (
    <span className="relative inline-grid h-[1.15em] overflow-hidden align-middle">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={cycle[i]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "100%", rotateX: -70, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          exit={{ y: "-100%", rotateX: 70, opacity: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          {cycle[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const delay = useIntroDelay();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 48]);

  // Spotlight that follows the pointer and lights the blueprint grid underneath.
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const spot = useMotionTemplate`radial-gradient(520px circle at ${sx}% ${sy}%, rgb(200 255 46 / 0.13), transparent 60%)`;
  const mask = useMotionTemplate`radial-gradient(360px circle at ${sx}% ${sy}%, black, transparent 75%)`;

  const d = delay ?? 99;
  const ready = delay !== null;

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      <motion.div style={{ scale, borderBottomLeftRadius: radius, borderBottomRightRadius: radius }} className="relative flex h-full flex-col overflow-hidden bg-bg">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <motion.div className="absolute inset-0 bg-grid-hot" style={{ maskImage: mask, WebkitMaskImage: mask }} aria-hidden />
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spot }} aria-hidden />
        {ready && <Circuit delay={d} />}

        <motion.div style={{ opacity: fade }} className="relative z-10 flex h-full flex-col justify-between px-4 pb-8 pt-28 md:px-8 md:pb-10 md:pt-32">
          <div className="flex items-start justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: d + 0.9, duration: 0.8, ease }}>
              ( {profile.role} )
            </motion.p>
            <motion.p
              className="hidden text-right sm:block"
              initial={{ opacity: 0, y: 10 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: d + 1, duration: 0.8, ease }}
            >
              Based in {profile.location}
              <br />
              Working worldwide
            </motion.p>
          </div>

          <h1 className="select-none font-display font-semibold uppercase leading-[0.82] tracking-[-0.04em] [perspective:800px]">
            <motion.span style={{ x: xLeft }} className="block whitespace-nowrap text-[16.5vw] md:text-[17vw]">
              {ready ? <SplitChars text="Karan" delay={d} /> : <span className="opacity-0">Karan</span>}
            </motion.span>
            <motion.span style={{ x: xRight }} className="flex items-center justify-end gap-[3vw] whitespace-nowrap text-[16.5vw] md:text-[17vw]">
              <motion.span
                className="hidden rounded-full border border-line bg-bg-2/80 px-6 py-3 text-left font-sans text-[1.4vw] font-semibold normal-case leading-none tracking-normal backdrop-blur md:inline-flex md:flex-col md:gap-1"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={ready ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: d + 0.7, type: "spring", stiffness: 160, damping: 16 }}
              >
                <span className="font-mono text-[0.55em] uppercase tracking-[0.2em] text-muted">Builds in</span>
                <span className="text-acid">
                  <Cycler start={ready} />
                </span>
              </motion.span>
              {ready ? <SplitChars text="Singh" delay={d + 0.18} /> : <span className="opacity-0">Singh</span>}
            </motion.span>
          </h1>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.p
              className="max-w-md text-base leading-relaxed text-fg/80 md:text-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: d + 1.05, duration: 1, ease }}
            >
              {profile.intro}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: d + 1.2, duration: 1, ease }}
            >
              <Magnetic>
                <Link href="/work" className="group inline-flex items-center gap-3 rounded-full bg-volt py-2 pl-6 pr-2 font-semibold text-ink">
                  <RollText text="See the work" />
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-acid transition-transform duration-500 group-hover:rotate-45">↗</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/about" className="inline-flex items-center rounded-full border border-fg/20 px-6 py-4 font-semibold transition-colors hover:border-fg">
                  <RollText text="My story" />
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted lg:flex"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: d + 1.6 }}
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <motion.span className="absolute left-0 top-0 h-4 w-px bg-volt" animate={{ y: [-16, 40] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
