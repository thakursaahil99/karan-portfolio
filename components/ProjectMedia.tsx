import Image from "next/image";
import type { Project } from "@/lib/data";

/** Desktop screenshot, or a generated duotone cover when the live site couldn't be captured. */
export function ProjectCover({ p, sizes, priority = false, className = "" }: { p: Project; sizes: string; priority?: boolean; className?: string }) {
  if (p.shots) {
    return (
      <Image
        src={`/projects/${p.slug}-desktop.jpg`}
        alt={`${p.name} website, home page`}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover object-top ${className}`}
      />
    );
  }
  const [a, b] = p.colors;
  return (
    <div
      role="img"
      aria-label={`${p.name} cover`}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 90% at 15% 10%, ${a}55, transparent 55%), radial-gradient(120% 90% at 90% 90%, ${b}77, transparent 60%), #0b0d12` }}
    >
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <span className="font-display text-[clamp(2rem,6vw,5rem)] font-bold uppercase tracking-tight" style={{ color: a }}>
          {p.name}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">{p.domain}</span>
      </div>
    </div>
  );
}

/** Browser chrome around a screenshot. With `scroll`, the full page glides down on hover. */
export function BrowserFrame({ p, scroll = false, sizes = "(min-width: 768px) 70vw, 100vw" }: { p: Project; scroll?: boolean; sizes?: string }) {
  const full = scroll && p.shots && p.fullHeight > 1200;
  // Percentage the tall image must travel so its bottom meets the frame's bottom (16:10 frame).
  const travel = full ? (1 - (1440 * 0.625) / p.fullHeight) * 100 : 0;
  return (
    <div className="group overflow-hidden rounded-2xl border border-line bg-card shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-bg px-3 py-1 font-mono text-[11px] text-muted">{p.domain}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {full ? (
          <div className="shot-scroll absolute inset-x-0 top-0 group-hover:[transform:translateY(var(--travel))]" style={{ ["--travel" as string]: `-${travel}%` }}>
            <Image
              src={`/projects/${p.slug}-full.jpg`}
              alt={`${p.name}, full home page`}
              width={1440}
              height={p.fullHeight}
              sizes={sizes}
              className="h-auto w-full"
            />
          </div>
        ) : (
          <ProjectCover p={p} sizes={sizes} />
        )}
      </div>
    </div>
  );
}
