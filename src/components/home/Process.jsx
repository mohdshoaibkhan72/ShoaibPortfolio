import SectionHeader from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { workProcess } from "../../data/site";

/** "How I work" — the four-step process grid (About page and service pages). */
export default function Process({ index = "02" }) {
  return (
    <section className="container-x py-28 md:py-40">
      <SectionHeader index={index} label="Process" title={[<span key="w">How I <span className="serif-em">work</span></span>]} />
      <ol className="grid gap-px overflow-hidden rounded-[24px] border border-fg/10 bg-fg/10 sm:grid-cols-2 lg:grid-cols-4">
        {workProcess.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.07} className="flex min-h-[11rem] flex-col justify-between gap-6 bg-bg p-6 sm:min-h-[16rem] md:p-9">
            <span className="font-mono text-sm text-muted">0{i + 1}</span>
            <div>
              <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">{step.title}</h3>
              <p className="mt-3 text-muted text-pretty">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
