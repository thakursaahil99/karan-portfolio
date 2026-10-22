import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseBody, CaseHero, NextProject, ScrollShowcase } from "@/components/CaseStudy";
import { getProject, nextProject, projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.name, description: `${p.summary} ${p.category} built on ${p.stack.join(", ")} by Karan Singh.` };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const index = projects.findIndex((x) => x.slug === slug);
  return (
    <main>
      <CaseHero p={p} index={index} total={projects.length} />
      <ScrollShowcase p={p} />
      <CaseBody p={p} />
      <NextProject p={nextProject(slug)} />
    </main>
  );
}
