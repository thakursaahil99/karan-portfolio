"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Dot + trailing ring. Any element with data-cursor="Label" turns the ring into a
 * labelled volt disc; links and buttons grow it.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const ok = matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(tagged?.dataset.cursor || null);
      setHover(!!t?.closest("a, button, [role='button'], input, textarea, label, select"));
    };
    const leave = () => setVisible(false);
    const pd = () => setDown(true);
    const pu = () => setDown(false);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", pd);
    window.addEventListener("pointerup", pu);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointerup", pu);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 96 : hover ? 56 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
            label ? "bg-volt text-ink" : "border border-white/70 mix-blend-difference"
          }`}
          animate={{ width: size, height: size, scale: down ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <div
          className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt transition-opacity ${label ? "opacity-0" : "opacity-100"}`}
        />
      </motion.div>
    </div>
  );
}
