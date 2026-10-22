"use client";

import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;

/** Delay hero choreography until the preloader has left (first visit only). */
export function useIntroDelay() {
  const [delay, setDelay] = useState<number | null>(null);
  useEffect(() => {
    setDelay(document.documentElement.hasAttribute("data-preload") ? 2.9 : 0.15);
  }, []);
  return delay;
}

/* ------------------------------------------------------------------ */
/* Text                                                                */
/* ------------------------------------------------------------------ */

/** Words rise out of a mask, staggered, when scrolled into view. */
export function SplitWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  once = true,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -12% 0px" });
  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", rotate: 4 }}
            animate={inView ? { y: "0%", rotate: 0 } : { y: "110%", rotate: 4 }}
            transition={{ duration: 1, ease, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Letters drop in one by one with a spring. */
export function SplitChars({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "105%", rotateX: -80 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 16, mass: 0.9, delay: delay + i * stagger }}
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const highlight = children.startsWith("*");
  const word = highlight ? children.slice(1) : children;
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${highlight ? "text-acid" : ""}`}>
      {word}
    </motion.span>
  );
}

/** Hover: the label rolls up letter by letter and a copy rolls in from below. */
export function RollText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span initial="rest" whileHover="hover" animate="rest" className={`relative inline-flex overflow-hidden ${className}`} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} aria-hidden className="relative inline-block">
          <motion.span
            className="inline-block"
            variants={{ rest: { y: "0%" }, hover: { y: "-100%" } }}
            transition={{ duration: 0.45, ease, delay: i * 0.018 }}
          >
            {c === " " ? " " : c}
          </motion.span>
          <motion.span
            className="absolute left-0 top-full inline-block"
            variants={{ rest: { y: "0%" }, hover: { y: "-100%" } }}
            transition={{ duration: 0.45, ease, delay: i * 0.018 }}
          >
            {c === " " ? " " : c}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Characters scramble through glyphs before settling, when in view. */
export function Scramble({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!inView) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const glyphs = "!<>-_\\/[]{}=+*^?#01";
    let frame = 0;
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const settled = Math.floor(frame / 2);
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " || i < settled ? c : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join("")
      );
      if (settled < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, delay]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Layout reveal                                                       */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A horizontal rule that draws from the left when it scrolls in. */
export function DrawLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`h-px origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease, delay }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Pointer                                                              */
/* ------------------------------------------------------------------ */

/** Pulls its child toward the pointer while hovered, springs back on leave. */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** 3D tilt toward the pointer with a moving glare. */
export function Tilt({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const gx = useTransform(px, [0, 1], ["0%", "100%"]);
  const gy = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(500px circle at ${gx} ${gy}, rgb(255 255 255 / 0.12), transparent 45%)`;
  return (
    <motion.div
      ref={ref}
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]" style={{ background: glare }} />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Numbers & loops                                                       */
/* ------------------------------------------------------------------ */

export function Counter({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {String(v).padStart(2, "0")}
      {suffix}
    </span>
  );
}

/** Marquee whose speed and direction follow scroll velocity, skewing as it goes. */
export function VelocityMarquee({ children, baseVelocity = -3, className = "" }: { children: ReactNode; baseVelocity?: number; className?: string }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2000, 0, 2000], [8, 0, -8]);
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);
  const box = useRef<HTMLDivElement>(null);
  const visible = useInView(box);
  useAnimationFrame((_, delta) => {
    if (!visible) return; // no per-frame work while off screen
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });
  return (
    <div ref={box} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max flex-nowrap will-change-transform" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
