import { ArrowLink } from "../ui/Button";
import { Reveal, ScrollWords } from "../ui/Reveal";
import { profile } from "../../data/site";

export default function AboutIntro() {
  return (
    <section className="container-x py-28 md:py-44">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <span className="eyebrow">
            <span className="mr-3">(01)</span>About
          </span>
        </div>
        <div className="lg:col-span-9">
          <ScrollWords
            className="text-[clamp(1.85rem,3.7vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.035em]"
            text={`I'm Shoaib — a developer who turns ideas into *production-ready* apps. For ${profile.careerYears}+ years I've shipped React Native apps and MERN platforms: leading mobile-first fintech at Loanyfy by day, and building marketplaces, SaaS products and stores for clients across India and the Middle East.`}
          />

          <Reveal className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-end md:mt-20">
            <div className="relative w-44 shrink-0 overflow-hidden rounded-2xl sm:w-52">
              <img
                src={profile.portrait}
                alt="Shoaib Khan at his desk, coding across two monitors"
                width={864}
                height={741}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-[78%_50%] grayscale transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
            <div className="flex max-w-md flex-col gap-6">
              <p className="text-muted text-pretty">
                Clean code, considered UI, and deployments that don&apos;t break at 2&nbsp;a.m. — that&apos;s the standard I
                hold every project to, whether it&apos;s a fintech app or a corner-shop storefront.
              </p>
              <ArrowLink to="/about" className="self-start">
                More about me
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
