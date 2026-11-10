import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import RollText from "../ui/RollText";
import ThemeToggle from "../ui/ThemeToggle";
import { LocalTime } from "../ui/Status";
import { WhatsAppButton } from "../ui/WhatsApp";
import { navLinks, profile, socials } from "../../data/site";
import { setScrollLocked } from "../../lib/smoothScroll";
import { EASE, cn } from "../../lib/utils";
import { useIntroDone } from "../../context/IntroContext";

const EASE_IO = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const introDone = useIntroDone(); // stays tucked away until the loading screen lifts
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 320 && y > prev + 2);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [open]);

  const isActive = (path) => (path === "/" ? pathname === "/" : pathname.startsWith(path));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{ y: !introDone || (hidden && !open) ? "-105%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color] duration-500",
            scrolled && !open ? "border-fg/[0.07] bg-bg/[0.92]" : "border-transparent bg-transparent"
          )}
        >
          <nav className="container-x flex h-16 items-center justify-between gap-4 md:h-20" aria-label="Main">
            <Link to="/" className="group/roll flex items-center gap-2.5" aria-label={`${profile.shortName} — home`}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-fg text-[11px] font-semibold tracking-tight text-bg">
                SK
              </span>
              <span className="hidden text-[15px] font-medium tracking-tight sm:block">
                <RollText>{profile.shortName}</RollText>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 rounded-full border border-fg/10 bg-bg/80 p-1 md:flex">
              {navLinks.slice(1).map((link) => {
                const active = isActive(link.path);
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group/roll relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                        active ? "text-bg" : "text-fg/75 hover:text-fg"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-fg"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <RollText className="relative">{link.label}</RollText>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link to="/contact" className="btn-primary group/roll hidden h-10 px-5 text-sm md:inline-flex">
                <RollText>Let&apos;s talk</RollText>
                <FiArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover/roll:rotate-45" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="flex h-10 items-center gap-2 rounded-full border border-fg/15 px-4 text-sm md:hidden"
              >
                <span className="relative block h-2.5 w-4" aria-hidden="true">
                  <span
                    className={cn(
                      "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
                      open ? "top-1/2 rotate-45" : "top-0"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
                      open ? "top-1/2 -rotate-45" : "top-full"
                    )}
                  />
                </span>
                {open ? "Close" : "Menu"}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg pt-20 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_IO }}
          >
            <nav className="container-x flex-1 overflow-y-auto pt-6" aria-label="Mobile">
              <ul className="border-b border-fg/10">
                {navLinks.map((link, i) => (
                  <li key={link.path} className="overflow-hidden border-t border-fg/10">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.8, ease: EASE }}
                    >
                      <Link
                        to={link.path}
                        className="flex items-center justify-between py-[clamp(0.6rem,1.8svh,1rem)] text-[clamp(1.9rem,6.4svh,2.6rem)] font-semibold leading-none tracking-[-0.04em]"
                      >
                        <span className="flex items-center gap-3">
                          {isActive(link.path) && <span className="h-2.5 w-2.5 rounded-full bg-accent-text" />}
                          {link.label}
                        </span>
                        <span className="eyebrow">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="container-x flex flex-col gap-5 pb-8 pt-6 [@media(max-height:640px)]:gap-4 [@media(max-height:640px)]:pb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <WhatsAppButton showNumber className="w-full" />
              <a href={`mailto:${profile.email}`} className="text-lg font-medium [@media(max-height:640px)]:hidden">
                {profile.email}
              </a>
              {/* Right padding keeps these clear of the floating WhatsApp button */}
              <div className="flex flex-col gap-3 pr-20">
                <div className="flex gap-5 text-sm">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
                      {s.label}
                    </a>
                  ))}
                </div>
                <LocalTime className="eyebrow [@media(max-height:640px)]:hidden" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
