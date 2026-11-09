import { FiDownload } from "react-icons/fi";
import { SEOHead } from "../components/SEOHead";
import PageHeader from "../components/ui/PageHeader";
import SectionHeader from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import Services from "../components/home/Services";
import Testimonials from "../components/home/Testimonials";
import { profile, quickFacts, toolbox, workProcess } from "../data/site";

const aboutStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "About Mohammad Shoaib Khan",
  url: "https://mohammadshoaibkhan.com/about",
  mainEntity: {
    "@type": "Person",
    name: "Mohammad Shoaib Khan",
    jobTitle: "Senior Full-Stack & Mobile App Developer",
    description:
      "Senior Full-Stack & Mobile App Developer with 3+ years experience. Full-time at Loanyfy (fintech). Expert in React Native, MERN Stack. 16+ production apps delivered including PLP Bazar, KLIMB School ERP, Fugen Health Care and Taleem-e-Ummat.",
    url: "https://mohammadshoaibkhan.com",
    email: "mohdshoaibkhan7211@gmail.com",
    telephone: "+917310249234",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    knowsAbout: ["React Native", "React.js", "Node.js", "MongoDB", "Express.js", "AWS", "Fintech Development", "Mobile App Development", "SaaS"],
    sameAs: ["https://www.linkedin.com/in/shoaibkhan72/", "https://www.instagram.com/shoaib.devs/", "https://github.com/mohdshoaibkhan72"],
  },
};

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Mohammad Shoaib Khan | Senior Full-Stack & React Native Developer"
        description="Learn about Mohammad Shoaib Khan — Senior Full-Stack & Mobile App Developer. 3+ years experience. Full-time at Loanyfy. Expert in React Native, MERN Stack. Available for freelance."
        keywords="About Mohammad Shoaib Khan, React Native developer, MERN Stack expert, full-stack developer India, mobile app developer, freelance developer"
        canonicalPath="/about"
        structuredData={aboutStructuredData}
      />

      <PageHeader
        eyebrow="(About)"
        title={["I turn ideas into", <span key="a">apps people <span className="serif-em">use</span></span>]}
        titleClassName="text-[clamp(3rem,8.4vw,8.8rem)]"
      />

      {/* Portrait + bio */}
      <section className="container-x grid gap-12 py-16 md:py-28 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="overflow-hidden rounded-[24px] md:rounded-[32px]">
            <img
              src={profile.portrait}
              alt="Shoaib Khan working at his desk"
              width={864}
              height={741}
              className="aspect-[4/5] w-full object-cover object-[76%_50%]"
            />
          </div>
          <p className="mt-4 flex items-center justify-between text-sm text-muted">
            <span>{profile.name}</span>
            <span>India</span>
          </p>
        </Reveal>

        <div className="flex flex-col justify-end lg:col-span-7">
          <Reveal as="p" className="text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.22] tracking-[-0.025em] text-pretty">
            I&apos;m Mohammad Shoaib Khan — a full-stack and mobile app developer with {profile.careerYears}+ years of
            hands-on experience shipping production software.
          </Reveal>
          <Reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted text-pretty" delay={0.1}>
            <p>
              I work full-time at{" "}
              <a href="https://www.loanyfy.com" target="_blank" rel="noreferrer" className="text-fg underline decoration-fg/25 underline-offset-4 hover:decoration-fg">
                Loanyfy
              </a>
              , a fintech lending platform, where I lead mobile-first development with React Native and architect the MERN
              backends, CRM and integrations behind it.
            </p>
            <p>
              Alongside that I&apos;ve delivered 16+ projects as a freelancer and through KLIMB — multi-vendor marketplaces,
              quick-commerce apps, healthcare tools, community platforms, SaaS products like a school ERP and an HR CRM, and
              luxury e-commerce for clients in India and the Middle East.
            </p>
            <p>
              I care about the details that make software feel good — fast screens, smooth motion, sensible defaults — and the
              unglamorous parts that keep it running: clean APIs, secure auth and deployments you don&apos;t have to worry about.
            </p>
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap gap-3" delay={0.2}>
            <Button href={profile.cv} download icon={FiDownload}>
              Download CV
            </Button>
            <Button to="/contact" variant="ghost">
              Get in touch
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Quick facts */}
      <section className="container-x pb-20 md:pb-28">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((f, i) => (
            <Reveal key={f.label} delay={(i % 4) * 0.05} className="border-t border-fg/10 py-6 pr-4">
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-3 text-lg font-medium tracking-tight">{f.value}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <Services index="01" />

      {/* Process */}
      <section className="container-x py-28 md:py-40">
        <SectionHeader index="02" label="Process" title={[<span key="w">How I <span className="serif-em">work</span></span>]} />
        <ol className="grid gap-px overflow-hidden rounded-[24px] border border-fg/10 bg-fg/10 sm:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.07} className="flex min-h-[16rem] flex-col justify-between bg-bg p-7 md:p-9">
              <span className="font-mono text-sm text-muted">0{i + 1}</span>
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">{step.title}</h3>
                <p className="mt-3 text-muted text-pretty">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Toolbox */}
      <section className="container-x pb-28 md:pb-40">
        <SectionHeader index="03" label="Toolbox" title={[<span key="t">Tools of the <span className="serif-em">trade</span></span>]} />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {toolbox.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05}>
              <h3 className="eyebrow border-t border-fg/10 pt-5">{g.group}</h3>
              <ul className="mt-5 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="text-lg tracking-tight">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials index="04" />
    </>
  );
}
