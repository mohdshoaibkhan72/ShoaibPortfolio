import { useParams } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import SectionHeader from "../components/ui/SectionHeader";
import { ArrowLink, Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import FaqList from "../components/ui/FaqList";
import { WhatsAppButton } from "../components/ui/WhatsApp";
import ProjectCard from "../components/project/ProjectCard";
import Process from "../components/home/Process";
import NotFoundPage from "./NotFoundPage";
import { getServicePage, servicePages } from "../data/services";

/** ["React Native", { em: "app developer" }] → heading lines, the `em` part in the serif italic. */
const toLines = (parts) =>
  parts.map((part, i) =>
    typeof part === "string" ? part : (
      <span key={i} className="serif-em">
        {part.em}
      </span>
    )
  );

/** A service landing page — /services/:slug (content in src/data/services.js). */
export default function ServicePage() {
  const { slug } = useParams();
  const service = getServicePage(slug);
  if (!service) return <NotFoundPage />;

  const others = servicePages.filter((s) => s.slug !== service.slug);
  const allWork = service.projectsFilter ? `/projects?filter=${service.projectsFilter}` : "/projects";

  return (
    <>
      <PageHeader
        eyebrow={service.eyebrow}
        title={toLines(service.heading)}
        intro={service.intro}
        titleClassName="text-[clamp(3rem,9vw,9.5rem)]"
      />

      {/* Overview */}
      <section className="container-x grid gap-10 py-16 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="eyebrow">(Overview)</span>
        </div>
        <div className="lg:col-span-8">
          <Reveal as="p" className="text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.22] tracking-[-0.025em] text-pretty">
            {service.lead}
          </Reveal>
          <Reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted text-pretty" delay={0.1}>
            {service.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap gap-3" delay={0.2}>
            <Button to="/contact">Start a project</Button>
            <WhatsAppButton variant="ghost">WhatsApp me</WhatsAppButton>
          </Reveal>
        </div>
      </section>

      {/* What you get */}
      <section className="container-x pb-28 md:pb-40">
        <SectionHeader index="01" label="What you get" title={[<span key="e">Built end <span className="serif-em">to end</span></span>]} />
        <ul className="grid gap-px overflow-hidden rounded-[24px] border border-fg/10 bg-fg/10 sm:grid-cols-2 lg:grid-cols-3">
          {service.offers.map((o, i) => (
            <Reveal as="li" key={o.title} delay={(i % 3) * 0.06} className="flex flex-col gap-4 bg-bg p-6 md:p-9">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <h3 className="text-2xl font-medium tracking-[-0.03em]">{o.title}</h3>
              <p className="text-muted text-pretty">{o.desc}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-10 flex flex-wrap gap-2">
          {service.stack.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </Reveal>
      </section>

      {/* Relevant projects */}
      <section className="container-x pb-12 md:pb-20">
        <SectionHeader
          index="02"
          label="Selected work"
          title={toLines(service.workHeading)}
          aside={<ArrowLink to={allWork}>See all work</ArrowLink>}
        />
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {service.projects.slice(0, 6).map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <Process index="03" />

      <FaqList index="04" items={service.faqs} />

      {/* Related services */}
      <nav aria-label="More services" className="container-x pb-28 md:pb-40">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-fg/10 pt-8">
          <span className="eyebrow">More services</span>
          {others.map((o) => (
            <ArrowLink key={o.slug} to={`/services/${o.slug}`}>
              {o.label}
            </ArrowLink>
          ))}
          <ArrowLink to="/services">All services</ArrowLink>
        </div>
      </nav>
    </>
  );
}
