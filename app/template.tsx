"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { getProject, nav } from "@/lib/data";

function labelFor(path: string) {
  if (path.startsWith("/work/")) return getProject(path.split("/")[2])?.name ?? "Work";
  return nav.find((n) => n.href === path)?.label ?? "Karan";
}

const cols = 5;

/** Re-mounts on every navigation: five shutters lift away in a wave, carrying the page name. */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] flex">
        {Array.from({ length: cols }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1 origin-top bg-volt"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.15 + i * 0.05 }}
          />
        ))}
        <motion.span
          className="absolute inset-0 grid place-items-center font-display text-4xl font-semibold tracking-tight text-ink md:text-7xl"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          {labelFor(pathname)}
        </motion.span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
