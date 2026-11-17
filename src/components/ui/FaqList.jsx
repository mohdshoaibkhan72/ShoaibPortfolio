import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";

/** Questions & answers, always expanded — the answers are part of the page for readers and search engines. */
export default function FaqList({ index, items }) {
  return (
    <section className="container-x pb-28 md:pb-40">
      <SectionHeader index={index} label="FAQ" title={[<span key="q">Good <span className="serif-em">questions</span></span>]} />
      <dl className="grid gap-x-12 md:grid-cols-2">
        {items.map((f, i) => (
          <Reveal key={f.q} delay={(i % 2) * 0.06} className="border-t border-fg/10 py-7">
            <dt className="text-xl font-medium tracking-[-0.02em] md:text-2xl">{f.q}</dt>
            <dd className="mt-3 max-w-xl text-muted text-pretty">{f.a}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
