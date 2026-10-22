"use client";

import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "./motion";

const boot = ["init  karan.singh", "load  wordpress · shopify · next.js", "calibrate  production → pixels", "status  ready"];

/**
 * First visit per session only (the inline boot script sets html[data-preload]).
 * Counts 0→100 while a boot log types out, then the two shutters part.
 */
export default function Preloader() {
  const [active, setActive] = useState(true);
  const [n, setN] = useState(0);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-preload")) {
      setActive(false);
      return;
    }
    const c = animate(0, 100, { duration: 2.1, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setN(Math.round(v)) });
    const timers = boot.map((_, i) => setTimeout(() => setLines(i + 1), 250 + i * 450));
    const done = setTimeout(() => {
      setActive(false);
      try {
        sessionStorage.setItem("ks-boot", "1");
      } catch {}
      setTimeout(() => root.removeAttribute("data-preload"), 1200);
    }, 2350);
    return () => {
      c.stop();
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div className="preloader fixed inset-0 z-[100] flex" exit={{ pointerEvents: "none" }} aria-hidden>
          <motion.div
            className="relative h-full w-1/2 bg-bg"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="relative h-full w-1/2 bg-bg"
            exit={{ y: "100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />
          <motion.div
            className="absolute inset-0 flex flex-col justify-between p-5 md:p-10"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span>KS / Portfolio</span>
              <span>{new Date().getFullYear()}</span>
            </div>

            <div className="space-y-1 font-mono text-xs text-muted md:text-sm">
              {boot.slice(0, lines).map((l, i) => (
                <motion.div key={l} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease }}>
                  <span className="text-acid">›</span> {l}
                  {i === lines - 1 && i < boot.length - 1 && <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-volt align-middle" />}
                </motion.div>
              ))}
            </div>

            <div>
              <div className="flex items-end justify-between">
                <span className="font-display text-[22vw] font-semibold leading-[0.8] tracking-tight md:text-[16vw]">
                  {String(n).padStart(3, "0")}
                </span>
                <span className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">loading</span>
              </div>
              <div className="mt-4 h-px w-full bg-line">
                <div className="h-px bg-volt" style={{ width: `${n}%` }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
