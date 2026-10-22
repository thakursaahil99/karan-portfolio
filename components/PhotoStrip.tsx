"use client";

import Link from "next/link";
import { projects } from "@/lib/data";
import { ProjectCover } from "./ProjectMedia";
import { VelocityMarquee } from "./motion";

/** A reel of every project's screenshot that speeds up and reverses with scroll. */
export default function PhotoStrip({ reverse = false }: { reverse?: boolean }) {
  return (
    <section aria-label="Project screenshots" className="py-6">
      <VelocityMarquee baseVelocity={reverse ? 1.4 : -1.4}>
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            data-cursor="View"
            className="group relative mx-3 block aspect-[16/10] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-line md:w-[420px]"
          >
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
              <ProjectCover p={p} sizes="420px" />
            </div>
            <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{p.name}</span>
          </Link>
        ))}
      </VelocityMarquee>
    </section>
  );
}
