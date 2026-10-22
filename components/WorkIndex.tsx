"use client";

import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { platforms, projects, type Project } from "@/lib/data";
import { ProjectCover } from "./ProjectMedia";
import { ease, Tilt } from "./motion";

type View = "grid" | "index";

function GridCard({ p, i }: { p: Project; i: number }) {
  const wide = i % 5 === 0;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease }}
      className={wide ? "md:col-span-2" : ""}
    >
      <Link href={`/work/${p.slug}`} data-cursor="View" className="group block">
        <Tilt className="rounded-3xl" max={4}>
          <div className={`relative overflow-hidden rounded-3xl border border-line bg-card ${wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
            <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]">
              <ProjectCover p={p} sizes={wide ? "(min-width: 768px) 90vw, 100vw" : "(min-width: 768px) 45vw, 100vw"} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
            <span className="absolute left-5 top-5 rounded-full bg-black/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur">
              {p.platform}
            </span>
            <span className="absolute bottom-5 right-5 grid h-12 w-12 translate-y-4 place-items-center rounded-full bg-volt text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              ↗
            </span>
          </div>
        </Tilt>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              <span className="hover-rule">{p.name}</span>
            </h3>
            <p className="mt-1 text-sm text-muted">{p.summary}</p>
          </div>
          <span className="shrink-0 font-mono text-xs text-muted">{p.region}</span>
        </div>
      </Link>
    </motion.div>
  );
}

function IndexList({ list }: { list: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <div className="hidden grid-cols-12 border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:grid">
        <span className="col-span-1">No.</span>
        <span className="col-span-4">Project</span>
        <span className="col-span-3">Industry</span>
        <span className="col-span-2">Platform</span>
        <span className="col-span-2 text-right">Region</span>
      </div>
      {list.map((p, i) => (
        <motion.div
          key={p.slug}
          layout
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease, delay: i * 0.03 }}
        >
          <Link
            href={`/work/${p.slug}`}
            onPointerEnter={() => setHovered(p)}
            className="group relative grid grid-cols-12 items-center gap-2 overflow-hidden border-b border-line py-6 md:py-8"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-volt transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
            <span className="relative col-span-2 font-mono text-xs text-muted transition-colors group-hover:text-ink md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative col-span-10 flex items-center gap-4 font-display text-2xl font-semibold tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-ink md:col-span-4 md:text-4xl">
              <span className="relative h-12 w-[72px] shrink-0 overflow-hidden rounded-lg border border-line md:h-14 md:w-[88px]">
                <ProjectCover p={p} sizes="88px" />
              </span>
              {p.name}
            </span>
            <span className="relative col-span-3 hidden text-sm text-muted transition-colors group-hover:text-ink md:block">{p.industry}</span>
            <span className="relative col-span-2 hidden font-mono text-xs uppercase tracking-[0.14em] transition-colors group-hover:text-ink md:block">{p.platform}</span>
            <span className="relative col-span-2 hidden text-right text-sm text-muted transition-colors group-hover:text-ink md:block">{p.region}</span>
          </Link>
        </motion.div>
      ))}

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="preview"
              initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: 8 }}
              transition={{ duration: 0.45, ease }}
              className="relative overflow-hidden rounded-2xl border border-line shadow-2xl"
              style={{ width: 380, height: 250, marginLeft: -190, marginTop: -125 }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={hovered.slug}
                  className="absolute inset-0"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.55, ease }}
                >
                  <ProjectCover p={hovered} sizes="380px" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function WorkIndex() {
  const [filter, setFilter] = useState<(typeof platforms)[number]>("All");
  const [view, setView] = useState<View>("grid");
  const list = filter === "All" ? projects : projects.filter((p) => p.platform === filter);

  return (
    <LayoutGroup>
      <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by platform">
          {platforms.map((pl) => {
            const count = pl === "All" ? projects.length : projects.filter((p) => p.platform === pl).length;
            const on = filter === pl;
            return (
              <button
                key={pl}
                onClick={() => setFilter(pl)}
                aria-pressed={on}
                className={`relative rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${on ? "border-volt text-ink" : "border-line hover:border-fg/40"}`}
              >
                {on && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-volt" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative">
                  {pl} <sup className="font-mono text-[10px]">{count}</sup>
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex gap-1 self-start rounded-full border border-line p-1" role="group" aria-label="View">
          {(["grid", "index"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`relative rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] ${view === v ? "text-ink" : "text-muted"}`}
            >
              {view === v && <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <span className="relative">{v}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div key={`grid-${filter}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            <AnimatePresence>
              {list.map((p, i) => (
                <GridCard key={p.slug} p={p} i={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div key={`index-${filter}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <IndexList list={list} />
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
