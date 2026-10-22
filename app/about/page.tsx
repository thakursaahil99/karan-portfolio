import type { Metadata } from "next";
import { Credentials, Journey, SpecSheet } from "@/components/About";
import { Eyebrow, Marquee, Principles, SkillOrbit } from "@/components/home/Sections";
import { ScrollWords, SplitWords } from "@/components/motion";
import PhotoStrip from "@/components/PhotoStrip";

export const metadata: Metadata = {
  title: "About",
  description:
    "Karan Singh: diploma engineer in electronics, five years leading production teams, now a web designer and developer at Caresort Solutions.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="px-4 pb-24 pt-36 md:px-8 md:pt-44">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>About</Eyebrow>
            <h1 className="font-display text-[12vw] font-semibold leading-[0.9] tracking-[-0.04em] lg:text-[6.4vw]">
              <SplitWords text="Built on the" />
              <br />
              <SplitWords text="factory floor." className="text-acid" delay={0.15} />
            </h1>
            <div className="mt-12 max-w-xl space-y-5 text-lg leading-relaxed text-fg/75">
              <p>
                I&apos;m Karan, from Mandi in Himachal Pradesh. I trained as an electronics engineer, then spent five years as a team leader in
                mobile-phone and electronics manufacturing: planning shifts, analysing rejection data and keeping lines on target with 5-S,
                TPM and Kaizen.
              </p>
              <p>
                I moved into the web through professional training at Imax Infotech in Chandigarh, and now design and develop client websites at
                Caresort Solutions, on WordPress, Shopify, Webflow, Framer and Next.js, with custom PHP, JavaScript and MySQL where they&apos;re needed.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <SpecSheet />
          </div>
        </div>
      </section>

      <Marquee />
      <div className="pt-10"><PhotoStrip /></div>

      <section className="px-4 py-28 md:px-8 md:py-40">
        <ScrollWords
          className="mx-auto max-w-6xl font-display text-[7vw] font-medium leading-[1.12] tracking-tight md:text-[3.4vw]"
          text="A production line taught me that *quality isn't checked at the end — it's built into every station. That's how I build *websites."
        />
      </section>

      <Journey />
      <Principles />
      <SkillOrbit />
      <Credentials />
    </main>
  );
}
