import Hero from "@/components/home/Hero";
import { Faq, Manifesto, Marquee, Principles, Process, Services, SkillOrbit } from "@/components/home/Sections";
import Showcase from "@/components/home/Showcase";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Manifesto />
      <Showcase />
      <Services />
      <Principles />
      <SkillOrbit />
      <Process />
      <Faq />
    </main>
  );
}
