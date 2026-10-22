import type { Metadata } from "next";
import { Eyebrow } from "@/components/home/Sections";
import { Scramble, SplitWords } from "@/components/motion";
import PhotoStrip from "@/components/PhotoStrip";
import WorkIndex from "@/components/WorkIndex";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description: "Live client websites built by Karan Singh on WordPress, WooCommerce and Shopify.",
};

export default function WorkPage() {
  return (
    <main className="px-4 pb-32 pt-36 md:px-8 md:pt-44">
      <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
        <div className="md:col-span-8">
          <Eyebrow>
            <Scramble text={`Index · ${projects.length} live projects`} />
          </Eyebrow>
          <h1 className="font-display text-[15vw] font-semibold leading-[0.85] tracking-[-0.04em] md:text-[9vw]">
            <SplitWords text="Selected" />
            <br />
            <SplitWords text="work" delay={0.1} />
            <sup className="ml-2 align-top font-mono text-[0.18em] tracking-normal text-acid">({projects.length})</sup>
          </h1>
        </div>
        <p className="self-end text-lg leading-relaxed text-fg/70 md:col-span-4">
          Personal brands, manufacturers, SaaS, finance and e-commerce, from Formula 1 to furniture. Every one of these sites is live; hover a card to see it, open it for the full page.
        </p>
      </div>
      <div className="-mx-4 mb-20 md:-mx-8"><PhotoStrip reverse /></div>
      <WorkIndex />
    </main>
  );
}
