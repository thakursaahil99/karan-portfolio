"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/data";
import LocalTime from "./LocalTime";
import { ease, Magnetic, RollText } from "./motion";
import { useLenis } from "./Providers";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, lenis]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease }}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-6 px-4 py-4 transition-[background,backdrop-filter,border-color] duration-500 md:px-8 ${
            scrolled && !open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3" aria-label="Karan Singh, home">
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-volt font-display text-sm font-bold text-ink">
              <span className="transition-transform duration-500 group-hover:-translate-y-10">KS</span>
              <span className="absolute translate-y-10 transition-transform duration-500 group-hover:translate-y-0">↗</span>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-sm font-semibold tracking-tight">{profile.name}</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{profile.role}</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-line bg-bg-2/60 p-1 backdrop-blur-md md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${active(n.href) ? "text-ink" : "text-fg"}`}
              >
                {active(n.href) && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-volt" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">
                  <RollText text={n.label} />
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
              </span>
              <LocalTime /> IST
            </span>
            <ThemeToggle className="relative z-[60]" />
            <Magnetic strength={0.3} className="hidden md:inline-block">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-volt hover:bg-volt hover:text-ink"
              >
                <RollText text="Let's talk" />
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[60] grid h-11 w-11 place-items-center rounded-full bg-fg text-ink md:hidden"
            >
              <motion.span className="absolute h-[2px] w-5 rounded bg-ink" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} transition={{ duration: 0.4, ease }} />
              <motion.span className="absolute h-[2px] w-5 rounded bg-ink" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} transition={{ duration: 0.4, ease }} />
            </button>
          </div>
        </div>
        <motion.div className="h-[2px] origin-left bg-volt" style={{ scaleX: scrollYProgress }} aria-hidden />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-volt px-5 pb-8 pt-28 text-ink md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 38px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 38px) 38px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 38px) 38px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((n, i) => (
                <div key={n.href} className="overflow-hidden border-b border-ink/15">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.07 }}
                  >
                    <Link href={n.href} className="flex items-baseline justify-between py-3">
                      <span className="font-display text-5xl font-semibold tracking-tight">{n.label}</span>
                      <span className="font-mono text-xs">{n.index}</span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease }}
              className="space-y-1 text-sm font-medium"
            >
              <a href={`mailto:${profile.email}`} className="block">{profile.email}</a>
              <a href={`tel:${profile.phoneHref}`} className="block">{profile.phone}</a>
              <p className="pt-3 font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">{profile.location}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
