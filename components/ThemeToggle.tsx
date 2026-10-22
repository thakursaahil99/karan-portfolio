"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";

/**
 * Day / night switch. The sun's rays retract into a moon; where the browser supports
 * View Transitions, the new theme spreads out from the button as a growing circle.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) || "dark");
  }, []);

  const apply = (t: Theme) => {
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("ks-theme", t);
    } catch {}
    setTheme(t);
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(next);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc.startViewTransition(() => flushSync(() => apply(next))).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  const dark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
      title={dark ? "Day mode" : "Night mode"}
      className={`grid h-11 w-11 place-items-center rounded-full border border-line bg-bg-2/60 backdrop-blur-md transition-colors hover:border-acid ${className}`}
    >
      <motion.svg viewBox="0 0 24 24" className="h-5 w-5" animate={{ rotate: dark ? 40 : 90 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} aria-hidden>
        <mask id="moon-mask">
          <rect width="24" height="24" fill="white" />
          <motion.circle r="6" fill="black" animate={{ cx: dark ? 17 : 30, cy: dark ? 7 : -6 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
        </mask>
        <motion.circle cx="12" cy="12" fill="currentColor" mask="url(#moon-mask)" animate={{ r: dark ? 8 : 5 }} transition={{ duration: 0.6 }} />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <motion.line
              key={i}
              x1={12 + Math.cos(a) * 8}
              y1={12 + Math.sin(a) * 8}
              x2={12 + Math.cos(a) * 10.5}
              y2={12 + Math.sin(a) * 10.5}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ opacity: dark ? 0 : 1, scale: dark ? 0 : 1 }}
              style={{ transformOrigin: "12px 12px" }}
              transition={{ duration: 0.4, delay: dark ? 0 : 0.15 + i * 0.03 }}
            />
          );
        })}
      </motion.svg>
    </button>
  );
}
