import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { SEOHead } from "../components/SEOHead";
import PageHeader from "../components/ui/PageHeader";
import { Reveal } from "../components/ui/Reveal";
import { education, experience, profile } from "../data/site";

const expStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Work Experience — Mohammad Shoaib Khan",
  url: "https://mohammadshoaibkhan.com/experience",
  mainEntity: {
    "@type": "Person",
    name: "Mohammad Shoaib Khan",
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Senior App & Full-Stack Developer",
        occupationLocation: { "@type": "Country", name: "India" },
        description: "Leading mobile-first fintech development at Loanyfy using React Native and MERN stack",
        estimatedSalary: { "@type": "MonetaryAmountDistribution", currency: "INR" },
      },
    ],
  },
};

export default function ExperiencePage() {
  return (
    <>
      <SEOHead
        title="Work Experience | Senior Developer at Loanyfy — Mohammad Shoaib Khan"
        description="Full-time at Loanyfy (fintech) as Senior App & Full-Stack Developer since January 2024. 3+ years freelance delivering 16+ production apps. React Native, MERN Stack expert."
        keywords="Mohammad Shoaib Khan experience, Loanyfy developer, React Native developer experience, freelance developer portfolio, full-stack developer career"
        canonicalPath="/experience"
        structuredData={expStructuredData}
      />

      <PageHeader
        eyebrow="(Experience)"
        title={[`${profile.careerYears}+ years of`, <span key="s"><span className="serif-em">shipping</span> software</span>]}
        titleClassName="text-[clamp(3rem,9vw,9.5rem)]"
        intro="Building production fintech products full-time, and shipping apps, SaaS and storefronts for clients on the side."
      />

      <div className="container-x pb-20 pt-16 md:pb-32 md:pt-28">
        {experience.map((role) => (
          <section key={role.id} className="grid gap-10 border-t border-fg/10 py-16 md:py-24 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="flex flex-col gap-4 lg:sticky lg:top-28">
                <span className="font-mono text-sm text-muted">{role.period}</span>
                <div className="flex items-center gap-3">
                  {role.href ? (
                    <a
                      href={role.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-2xl font-medium tracking-tight underline decoration-fg/25 underline-offset-[6px] hover:decoration-fg"
                    >
                      {role.company}
                      <FiArrowUpRight className="h-5 w-5" />
                    </a>
                  ) : (
                    <span className="text-2xl font-medium tracking-tight">{role.company}</span>
                  )}
                  <span className="chip">{role.type}</span>
                </div>
                {role.legalName && <span className="text-sm text-muted">{role.legalName}</span>}
              </div>
            </div>

            <div className="lg:col-span-8">
              <Reveal as="h2" className="display text-[clamp(2.4rem,5.2vw,5rem)]">
                {role.role}
              </Reveal>
              <Reveal as="p" delay={0.1} className="mt-6 max-w-2xl text-xl leading-snug text-muted text-pretty">
                {role.summary}
              </Reveal>

              <ul className="mt-12">
                {role.responsibilities.map((r, i) => (
                  <Reveal as="li" key={r} delay={i * 0.03} className="flex gap-5 border-t border-fg/10 py-5">
                    <span className="font-mono text-xs leading-7 text-muted">0{i + 1}</span>
                    <span className="text-lg leading-7 text-pretty">{r}</span>
                  </Reveal>
                ))}
              </ul>

              {role.achievements && (
                <Reveal className="mt-14">
                  <h3 className="eyebrow mb-5">Impact</h3>
                  <div className="grid gap-px overflow-hidden rounded-2xl border border-fg/10 bg-fg/10 sm:grid-cols-3">
                    {role.achievements.map((a) => (
                      <div key={a.value} className="bg-bg p-6 md:p-8">
                        <div className="display text-[clamp(2.6rem,4.5vw,4rem)]">{a.value}</div>
                        <p className="mt-4 text-sm text-muted text-pretty">{a.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              {role.projects && (
                <Reveal className="mt-14">
                  <h3 className="eyebrow mb-5">Selected clients & products</h3>
                  <div className="flex flex-wrap gap-2">
                    {role.projects.map((p) =>
                      p.id ? (
                        <Link
                          key={p.name}
                          to={`/projects/${p.id}`}
                          className="group inline-flex items-center gap-1.5 rounded-full border border-fg/15 px-4 py-2 text-sm transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg"
                        >
                          {p.name}
                          <FiArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform duration-500 group-hover:rotate-45 group-hover:opacity-100" />
                        </Link>
                      ) : (
                        <span key={p.name} className="rounded-full border border-fg/10 px-4 py-2 text-sm text-muted">
                          {p.name}
                        </span>
                      )
                    )}
                  </div>
                </Reveal>
              )}

              <Reveal className="mt-14">
                <h3 className="eyebrow mb-5">Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {role.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        <section className="grid gap-10 border-t border-fg/10 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Education</span>
          </div>
          <div className="lg:col-span-8">
            {education.map((e) => (
              <Reveal key={e.school} className="grid gap-3 md:grid-cols-8 md:items-baseline">
                <div className="md:col-span-6">
                  <h2 className="text-[clamp(1.8rem,3.4vw,3rem)] font-medium leading-tight tracking-[-0.035em]">{e.degree}</h2>
                  <p className="mt-3 text-lg text-muted">
                    {e.school} · {e.place}
                  </p>
                </div>
                <span className="font-mono text-sm text-muted md:col-span-2 md:text-right">{e.period}</span>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
