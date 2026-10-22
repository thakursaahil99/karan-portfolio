import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[90vh] place-items-center px-4 pt-24 text-center">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Error 404 · line stopped</p>
        <h1 className="mt-4 font-display text-[28vw] font-bold leading-[0.8] tracking-tighter text-acid md:text-[18vw]">404</h1>
        <p className="mx-auto mt-6 max-w-sm text-fg/70">This page isn&apos;t on the production schedule.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-volt px-6 py-3 font-semibold text-ink">
          Back to home
        </Link>
      </div>
    </main>
  );
}
