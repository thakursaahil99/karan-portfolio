import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Eyebrow } from "@/components/home/Sections";
import LocalTime from "@/components/LocalTime";
import { Reveal, SplitWords } from "@/components/motion";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a WordPress, Shopify, Webflow, Framer or Next.js project with Karan Singh. Email ${profile.email} or call ${profile.phone}.`,
};

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  { label: "WhatsApp", value: "Message on WhatsApp", href: `https://wa.me/${profile.whatsapp}` },
];

export default function ContactPage() {
  return (
    <main className="px-4 pb-32 pt-36 md:px-8 md:pt-44">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="font-display text-[14vw] font-semibold leading-[0.88] tracking-[-0.04em] md:text-[8.5vw]">
        <SplitWords text="Let's make" />
        <br />
        <SplitWords text="it live." className="text-acid" delay={0.12} />
      </h1>

      <div className="mt-20 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="space-y-px overflow-hidden rounded-3xl border border-line bg-line">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08} y={20}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative block overflow-hidden bg-bg p-6"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-volt transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />
                  <span className="relative flex items-center justify-between gap-4">
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink/60">{c.label}</span>
                      <span className="mt-1 block break-all font-display text-lg font-semibold transition-colors group-hover:text-ink">{c.value}</span>
                    </span>
                    <span className="text-xl transition-all duration-500 group-hover:rotate-45 group-hover:text-ink">↗</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-8 grid grid-cols-2 gap-6 rounded-3xl border border-line p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Local time</p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  <LocalTime />
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Based in</p>
                <p className="mt-1 font-semibold">{profile.location}</p>
              </div>
              <p className="col-span-2 text-sm text-muted">I usually reply within a working day. Projects worldwide, remote-friendly.</p>
            </div>
          </Reveal>
        </aside>
      </div>
    </main>
  );
}
