import PageHeader from "../components/ui/PageHeader";
import SectionHeader from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import FaqList from "../components/ui/FaqList";
import { WhatsAppButton } from "../components/ui/WhatsApp";
import Services from "../components/home/Services";
import Process from "../components/home/Process";
import { faqs, profile, quickFacts } from "../data/site";

/** /services — the hub: "website & mobile app developer", linking to each service page. */
export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="(Services)"
        title={["Website & mobile", <span key="a">app <span className="serif-em">developer</span></span>]}
        intro="Freelance, full stack and end to end — from the first call to launch and the support after it."
        titleClassName="text-[clamp(2.7rem,8.2vw,8.6rem)]"
      />

      {/* Overview */}
      <section className="container-x grid gap-10 py-16 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="eyebrow">(Overview)</span>
        </div>
        <div className="lg:col-span-8">
          <Reveal as="p" className="text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.22] tracking-[-0.025em] text-pretty">
            Need an app, a website or both? I&apos;m {profile.name} — a full stack developer in India who takes products from
            idea to production: React Native apps for Android and iOS, MERN stack web apps, e-commerce stores and SaaS
            dashboards.
          </Reveal>
          <Reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted text-pretty" delay={0.1}>
            <p>
              I work full-time as a senior developer at Loanyfy and take on a small number of freelance projects alongside it, so
              each one gets proper attention.
            </p>
            <p>
              Clients in India and the Middle East work with me directly — one developer accountable for design, code and
              deployment, from the first call to launch and beyond.
            </p>
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap gap-3" delay={0.2}>
            <Button to="/contact">Start a project</Button>
            <WhatsAppButton variant="ghost">WhatsApp me</WhatsAppButton>
          </Reveal>
        </div>
      </section>

      <Services index="01" showAll={false} />

      {/* Why work with me */}
      <section className="container-x pb-28 md:pb-40">
        <SectionHeader
          index="02"
          label="Why me"
          title={["Hire a freelance", <span key="f">app <span className="serif-em">developer</span></span>]}
        />
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((f, i) => (
            <Reveal key={f.label} delay={(i % 4) * 0.05} className="border-t border-fg/10 py-6 pr-4">
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-3 text-lg font-medium tracking-tight">{f.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <Process index="03" />

      <FaqList index="04" items={faqs} />
    </>
  );
}
