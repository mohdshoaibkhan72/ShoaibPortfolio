import { Suspense, lazy, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import { Button } from "../ui/Button";
import Magnetic from "../ui/Magnetic";
import CountUp from "../ui/CountUp";
import { Availability, LocalTime } from "../ui/Status";
import { WhatsAppButton } from "../ui/WhatsApp";
import { heroStats, profile } from "../../data/site";
import { scrollToTarget } from "../../lib/smoothScroll";
import { EASE, cn, useMediaQuery } from "../../lib/utils";

const HeroSphere = lazy(() => import("./HeroSphere"));

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
});

/** The name, sized so its widest line spans the container edge to edge. */
function FitName({ lines }) {
  const wrapRef = useRef(null);
  const measureRef = useRef(null);
  const [fontSize, setFontSize] = useState(null);
  const key = lines.join("|");

  useLayoutEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const measure = measureRef.current;
      if (!wrap || !measure) return;
      const widest = Math.max(...Array.from(measure.children).map((c) => c.getBoundingClientRect().width));
      if (widest) setFontSize((wrap.clientWidth / widest) * 100 * 0.995);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrapRef.current);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [key]);

  let letterIndex = 0;
  return (
    <div ref={wrapRef} className="relative">
      {/* Invisible copy at 100px used to measure each line's natural width */}
      <div ref={measureRef} aria-hidden="true" className="display pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap text-[100px]">
        {lines.map((line) => (
          // Same per-letter inline-blocks as the visible name, so kerning matches what's measured.
          <span key={line} className="block w-max">
            {line.split("").map((ch, i) => (
              <span key={i} className="inline-block">
                {ch === " " ? " " : ch}
              </span>
            ))}
          </span>
        ))}
      </div>

      <h1
        className="display select-none whitespace-nowrap leading-[0.8]"
        style={{ fontSize: fontSize ? `${fontSize}px` : "15vw" }}
      >
        <span className="sr-only">
          {profile.name} — {profile.role}
        </span>
        {lines.map((line) => (
          <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
            {line.split("").map((ch) => {
              const i = letterIndex++;
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.35 + i * 0.035 }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              );
            })}
          </span>
        ))}
      </h1>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const wide = useMediaQuery("(min-width: 640px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sphereY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden pb-6 pt-24 md:pt-28">
      <motion.div
        aria-hidden="true"
        style={{ y: sphereY, scale: sphereScale }}
        className="pointer-events-none absolute -right-[38%] top-[4%] aspect-square w-[118vw] opacity-50 sm:-right-[14%] sm:w-[78vw] sm:opacity-80 lg:right-[1%] lg:top-[5%] lg:w-[50vw] lg:max-w-[780px] lg:opacity-100"
      >
        <Suspense fallback={null}>
          <HeroSphere />
        </Suspense>
      </motion.div>

      <motion.div style={{ y: contentY }} className="container-x relative flex flex-1 flex-col">
        <motion.div {...fadeUp(0.15)} className="flex flex-wrap items-center justify-between gap-3">
          <Availability />
          <LocalTime className="eyebrow hidden sm:inline" />
        </motion.div>

        <div className="mt-12 max-w-[36rem] md:mt-14 lg:max-w-[44rem]">
          <motion.p
            {...fadeUp(0.25)}
            className="text-[1.65rem] leading-[1.12] tracking-[-0.025em] text-balance sm:text-[2.1rem] lg:text-[2.5rem]"
          >
            Full-stack & mobile developer building{" "}
            <span className="serif-em text-[1.1em]">fintech, commerce & SaaS</span> products — from first pixel to
            production.
          </motion.p>
          <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap gap-3 md:mt-10">
            <Magnetic>
              <Button onClick={() => scrollToTarget("#work", { offset: -20 })} icon={FiArrowDown}>
                See my work
              </Button>
            </Magnetic>
            <Magnetic>
              <WhatsAppButton variant="ghost">WhatsApp me</WhatsAppButton>
            </Magnetic>
          </motion.div>
        </div>

        <div className="mt-auto pt-10">
          <FitName lines={wide ? ["Shoaib Khan"] : ["Shoaib", "Khan"]} />

          <motion.dl
            {...fadeUp(0.9)}
            className="mt-5 grid grid-cols-2 border-t border-fg/10 md:mt-6 md:grid-cols-4"
          >
            {heroStats.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "flex flex-col-reverse gap-2 py-5",
                  i % 2 === 1 ? "border-l border-fg/10 pl-4 sm:pl-6" : "pr-4",
                  i >= 2 && "border-t border-fg/10 md:border-t-0",
                  i === 2 && "md:border-l md:pl-6"
                )}
              >
                <dt className="whitespace-pre-line text-[13px] leading-snug text-muted">{s.label}</dt>
                <dd className="text-3xl font-semibold tracking-[-0.04em] md:text-[2.6rem]">
                  <CountUp to={s.value} />
                  <span className={cn(s.suffix.length > 2 && "text-[0.6em] tracking-[-0.02em]")}>{s.suffix}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>
    </section>
  );
}
