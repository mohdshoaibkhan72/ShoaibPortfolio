import SectionHeader from "../ui/SectionHeader";
import { ArrowLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { experience } from "../../data/site";

export default function ExperienceSection() {
  const loanyfy = experience[0];
  return (
    <section className="container-x py-28 md:py-40">
      <SectionHeader
        index="04"
        label="Experience"
        title={[<span key="w">Where I’ve <span className="serif-em">worked</span></span>]}
        aside={<ArrowLink to="/experience">Full experience</ArrowLink>}
      />

      <ul className="border-b border-fg/10">
        {experience.map((e, i) => (
          <Reveal
            as="li"
            key={e.id}
            delay={i * 0.08}
            className="grid gap-3 border-t border-fg/10 py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:py-10"
          >
            <span className="font-mono text-sm text-muted md:col-span-3">{e.period}</span>
            <div className="md:col-span-6">
              <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-[2.1rem] md:leading-tight">{e.role}</h3>
              <p className="mt-3 max-w-xl text-muted text-pretty">{e.summary}</p>
            </div>
            <div className="flex items-center gap-3 md:col-span-3 md:justify-end">
              {e.href ? (
                <a href={e.href} target="_blank" rel="noreferrer" className="font-medium underline decoration-fg/25 underline-offset-4 hover:decoration-fg">
                  {e.company}
                </a>
              ) : (
                <span className="font-medium">{e.company}</span>
              )}
              <span className="chip">{e.type}</span>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-16 md:mt-24">
        <p className="eyebrow mb-6">Impact at {loanyfy.company}</p>
        <div className="grid gap-px overflow-hidden rounded-[24px] border border-fg/10 bg-fg/10 sm:grid-cols-3">
          {loanyfy.achievements.map((a) => (
            <div key={a.value} className="bg-bg p-7 md:p-10">
              <div className="display text-[clamp(3.2rem,6vw,5.5rem)]">{a.value}</div>
              <p className="mt-5 max-w-[17rem] text-muted text-pretty">{a.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
