"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * PCB-style traces behind the hero (a nod to the ECE diploma): each trace draws in,
 * then a bright pulse keeps travelling along it — only while the hero is on screen.
 * No SVG filters: the "glow" is a wider, faint stroke under the pulse, which is cheap to paint.
 */
const traces = [
  "M-20 140 H220 L280 200 H520 L560 160 H760",
  "M1460 120 H1240 L1180 180 H980 L940 220 H860",
  "M-20 620 H140 L200 560 H420 L470 610 H620",
  "M1460 700 H1300 L1240 640 H1060 L1010 690 H900",
  "M300 900 V780 L340 740 H480",
  "M1120 -20 V80 L1080 120 H1000",
];

const pads: [number, number][] = [
  [760, 160],
  [860, 220],
  [620, 610],
  [900, 690],
  [480, 740],
  [1000, 120],
];

export default function Circuit({ delay = 0 }: { delay?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref);
  return (
    <svg
      ref={ref}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      {traces.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="var(--trace)"
          strokeWidth={1.5}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: delay + 0.2 + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
      {inView &&
        traces.map((d, i) => {
          const t = { duration: 3.2 + (i % 3) * 0.6, delay: delay + 1.6 + i * 0.5, repeat: Infinity, repeatDelay: 1.5 + i * 0.4, ease: "easeInOut" as const };
          return (
            <g key={`p${i}`}>
              <motion.path d={d} fill="none" stroke="#c8ff2e" strokeOpacity={0.25} strokeWidth={6} strokeLinecap="round" initial={{ pathLength: 0.06, opacity: 0 }} animate={{ pathOffset: [0, 1], opacity: [0, 1, 1, 0] }} transition={t} />
              <motion.path d={d} fill="none" stroke="#c8ff2e" strokeWidth={2} strokeLinecap="round" initial={{ pathLength: 0.06, opacity: 0 }} animate={{ pathOffset: [0, 1], opacity: [0, 1, 1, 0] }} transition={t} />
            </g>
          );
        })}
      {pads.map(([cx, cy], i) => (
        <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: delay + 1.6 + i * 0.1, type: "spring" }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={7} fill="none" stroke="var(--stroke)" />
          <circle cx={cx} cy={cy} r={2.5} fill="#c8ff2e" />
        </motion.g>
      ))}
    </svg>
  );
}
