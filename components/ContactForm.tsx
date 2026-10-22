"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { profile } from "@/lib/data";
import { ease, Magnetic, RollText } from "./motion";

const types = ["WordPress site", "Shopify store", "WooCommerce", "Webflow / Framer", "Next.js build", "Custom PHP feature", "Redesign"];
const budgets = ["< ₹25k", "₹25k – 50k", "₹50k – 1L", "₹1L +", "Not sure yet"];

/** No backend: composes the enquiry and hands it to the visitor's email app or WhatsApp. */
export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState<null | "email" | "whatsapp">(null);

  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const compose = () => {
    const f = new FormData(form.current!);
    const lines = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      picked.length ? `Project: ${picked.join(", ")}` : "",
      budget ? `Budget: ${budget}` : "",
      "",
      String(f.get("message") ?? ""),
    ].filter((l, i) => l !== "" || i === 4);
    return { name: String(f.get("name")), body: lines.join("\n") };
  };

  const send = (via: "email" | "whatsapp") => {
    if (!form.current!.reportValidity()) return;
    const { name, body } = compose();
    if (via === "email") {
      const subject = `New project enquiry from ${name}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
    }
    setSent(via);
  };

  const chip = (on: boolean) =>
    `relative overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${on ? "border-volt text-ink" : "border-line hover:border-fg/50"}`;

  const field =
    "peer w-full border-b border-line bg-transparent pb-3 pt-7 text-xl outline-none transition-colors placeholder:text-transparent focus:border-volt md:text-2xl";
  const floatLabel =
    "pointer-events-none absolute left-0 top-7 font-display text-xl text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-[11px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-acid peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] md:text-2xl";

  return (
    <div className="relative">
      <form ref={form} onSubmit={(e) => (e.preventDefault(), send("email"))} className="space-y-12">
        <div className="grid gap-10 md:grid-cols-2">
          <label className="relative block">
            <input name="name" required autoComplete="name" placeholder="Name" className={field} />
            <span className={floatLabel}>Your name *</span>
          </label>
          <label className="relative block">
            <input name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
            <span className={floatLabel}>Your email *</span>
          </label>
        </div>

        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">What are we building?</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {types.map((t) => {
              const on = picked.includes(t);
              return (
                <button key={t} type="button" onClick={() => toggle(t)} aria-pressed={on} className={chip(on)}>
                  <motion.span className="absolute inset-0 bg-volt" initial={false} animate={{ y: on ? "0%" : "101%" }} transition={{ duration: 0.4, ease }} />
                  <span className="relative">{t}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Budget</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {budgets.map((b) => (
              <button key={b} type="button" onClick={() => setBudget(b === budget ? "" : b)} aria-pressed={budget === b} className={chip(budget === b)}>
                {budget === b && <motion.span layoutId="budget-pill" className="absolute inset-0 bg-volt" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative">{b}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <label className="relative block">
          <textarea name="message" required rows={4} placeholder="Message" className={`${field} resize-none`} />
          <span className={floatLabel}>Tell me about the project *</span>
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <Magnetic>
            <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-volt py-2 pl-7 pr-2 text-lg font-semibold text-ink">
              <RollText text="Send by email" />
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-acid transition-transform duration-500 group-hover:rotate-45">↗</span>
            </button>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={() => send("whatsapp")}
              className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-7 py-4 text-lg font-semibold transition-colors hover:border-[#25d366] hover:text-[#25d366]"
            >
              <RollText text="WhatsApp instead" />
            </button>
          </Magnetic>
        </div>
      </form>

      <AnimatePresence>
        {sent && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mt-10 flex items-start gap-4 rounded-2xl border border-volt/40 bg-volt/5 p-5"
          >
            <motion.svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-acid" aria-hidden>
              <motion.path d="M4 12.5 9.5 18 20 6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
            </motion.svg>
            <p className="text-fg/80">
              Your {sent === "email" ? "email app" : "WhatsApp"} should have opened with the message filled in. If it didn&apos;t, write to{" "}
              <a className="text-acid underline" href={`mailto:${profile.email}`}>{profile.email}</a> or call{" "}
              <a className="text-acid underline" href={`tel:${profile.phoneHref}`}>{profile.phone}</a>.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
