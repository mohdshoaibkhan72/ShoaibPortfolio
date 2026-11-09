import { Link } from "react-router-dom";
import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import Magnetic from "../ui/Magnetic";
import { MaskLines } from "../ui/Reveal";
import { CopyButton, LocalTime } from "../ui/Status";
import { WhatsAppButton } from "../ui/WhatsApp";
import { navLinks, profile, socials } from "../../data/site";
import { scrollToTarget } from "../../lib/smoothScroll";

/** Inverted footer with the closing call to action. `compact` drops the big CTA (used on /contact). */
export default function Footer({ compact = false }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden rounded-t-[28px] bg-fg text-bg md:rounded-t-[44px]">
      <div className="container-x pb-8 pt-20 md:pt-28">
        {!compact && (
          <div className="relative mb-20 md:mb-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bg/55">Have a project in mind?</p>
            <MaskLines
              lines={["Let’s work", <span key="t" className="serif-em">together</span>]}
              className="display mt-8 text-[clamp(3.6rem,13vw,13.5rem)] leading-[0.86]"
            />
            <div className="mt-10 md:absolute md:bottom-[6%] md:right-0 md:mt-0">
              <Magnetic strength={0.4}>
                <Link
                  to="/contact"
                  className="group/roll grid h-36 w-36 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-out-expo hover:scale-105 md:h-48 md:w-48"
                >
                  <span className="flex flex-col items-center gap-2 text-[15px] font-medium md:text-base">
                    <FiArrowUpRight className="h-6 w-6 transition-transform duration-500 ease-out-expo group-hover/roll:rotate-45" />
                    Get in touch
                  </span>
                </Link>
              </Magnetic>
            </div>
          </div>
        )}

        <div className="grid gap-12 border-t border-bg/15 pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bg/55">Email</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="break-all text-[1.2rem] font-medium tracking-tight underline decoration-bg/25 underline-offset-[6px] transition-colors hover:decoration-bg min-[400px]:text-2xl sm:text-3xl lg:text-4xl"
              >
                {profile.email}
              </a>
              <CopyButton value={profile.email} className="border-bg/25" />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <WhatsAppButton showNumber />
              <a href={profile.phoneHref} className="text-sm text-bg/70 transition-colors hover:text-bg">
                or call {profile.phone}
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bg/55">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 hover:underline">
                    {s.label}
                    <FiArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.cv} download className="group inline-flex items-center gap-1.5 hover:underline">
                  Download CV
                  <FiArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bg/55">Sitemap</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1">
              {navLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right padding keeps "Back to top" clear of the floating WhatsApp button */}
        <div className="mt-16 flex flex-col gap-4 border-t border-bg/15 pr-20 pt-6 text-sm text-bg/60 sm:flex-row sm:items-center sm:justify-between md:pr-24">
          <p>© {year} {profile.name}. Designed & built by me.</p>
          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <LocalTime className="font-mono text-xs" />
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="inline-flex items-center gap-2 text-bg transition-opacity hover:opacity-70"
            >
              Back to top <FiArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
