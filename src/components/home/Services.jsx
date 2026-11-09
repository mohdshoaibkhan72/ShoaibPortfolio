import SectionHeader from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import { services } from "../../data/site";

export default function Services({ index = "03" }) {
  return (
    <section className="container-x py-28 md:py-40">
      <SectionHeader index={index} label="Services" title={[<span key="d">What I <span className="serif-em">do</span></span>]} />
      <ul className="border-b border-fg/10">
        {services.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.05} className="group relative border-t border-fg/10">
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
            />
            <div className="relative grid gap-4 py-8 transition-[color,padding] duration-500 ease-out-expo group-hover:text-accent-ink md:grid-cols-12 md:items-center md:gap-6 md:py-10 md:group-hover:px-6">
              <span className="font-mono text-sm text-muted transition-colors duration-500 group-hover:text-accent-ink/60 md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="text-[2rem] font-medium leading-none tracking-[-0.04em] md:col-span-5 md:text-5xl">{s.title}</h3>
              <p className="max-w-md text-muted transition-colors duration-500 text-pretty group-hover:text-accent-ink/80 md:col-span-4">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 md:col-span-2 md:justify-end">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-fg/[0.12] px-2.5 py-0.5 text-[11px] text-fg/70 transition-colors duration-500 group-hover:border-accent-ink/25 group-hover:text-accent-ink/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
