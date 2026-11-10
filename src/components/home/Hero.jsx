import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { Button } from "../ui/Button";
import Magnetic from "../ui/Magnetic";
import CountUp from "../ui/CountUp";
import { Availability, LocalTime } from "../ui/Status";
import { WhatsAppButton } from "../ui/WhatsApp";
import { heroPortrait, heroStats, profile } from "../../data/site";
import { useIntroDone } from "../../context/IntroContext";
import { scrollToTarget } from "../../lib/smoothScroll";
import { EASE, cn, useMediaQuery } from "../../lib/utils";

const BACKDROP_WORD = "DEVELOPER";
const TAGS = ["Mobile apps", "Web platforms", "SaaS products"];

/** Fade + rise. Holds at the start until `play` (i.e. the loading screen has lifted). */
const fadeUp = (delay, play) => ({
  initial: { opacity: 0, y: 24 },
  animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  transition: { duration: 1, ease: EASE, delay },
});

const letters = (text) => text.split("").map((ch) => (ch === " " ? " " : ch));

/**
 * Font size (px) at which `text` exactly spans its container.
 * A hidden copy at 100px — split into the same per-letter spans — is measured, so kerning matches.
 */
function useFitText(text, fill = 1) {
  const wrapRef = useRef(null);
  const measureRef = useRef(null);
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    const fit = () => {
      const width = wrapRef.current?.clientWidth;
      const natural = measureRef.current?.getBoundingClientRect().width;
      if (width && natural) setSize((width / natural) * 100 * fill);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrapRef.current);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [text, fill]);

  const measure = (
    <span ref={measureRef} aria-hidden="true" className="invisible absolute left-0 top-0 whitespace-nowrap text-[100px]">
      {letters(text).map((ch, i) => (
        <span key={i} className="inline-block">
          {ch}
        </span>
      ))}
    </span>
  );
  return { wrapRef, measure, size };
}

/** The giant word behind the portrait. */
function BackdropWord({ play }) {
  const { wrapRef, measure, size } = useFitText(BACKDROP_WORD, 0.98);
  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none relative select-none font-condensed uppercase">
      {measure}
      <div className="flex justify-center whitespace-nowrap leading-[0.84]" style={{ fontSize: size ? `${size}px` : "22vw" }}>
        {letters(BACKDROP_WORD).map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block bg-gradient-to-b from-accent-text via-accent-text/50 to-accent-text/0 bg-clip-text pb-[0.05em] text-transparent"
            initial={{ y: "30%", opacity: 0 }}
            animate={play ? { y: "0%", opacity: 1 } : { y: "30%", opacity: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.1 + i * 0.05 }}
          >
            {ch}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/** "SHOAIB KHAN", sized to fill the text column. */
function Name({ play }) {
  const name = profile.shortName.toUpperCase();
  const { wrapRef, measure, size } = useFitText(name);
  return (
    <span ref={wrapRef} className="relative block font-condensed uppercase">
      {measure}
      <span
        className="block overflow-hidden whitespace-nowrap pb-[0.04em] leading-[0.9] text-fg"
        style={{ fontSize: size ? `${size}px` : "15vw" }}
      >
        {letters(name).map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: "105%" }}
            animate={{ y: play ? "0%" : "105%" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.45 + i * 0.035 }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const play = useIntroDone();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  // Scroll: the word lags behind, the portrait sinks a little, the text drifts up and fades.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Mouse: only the giant word drifts a little (desktop only); the portrait stays still.
  const mouse = useSpring(useMotionValue(0), { stiffness: 50, damping: 18 });
  const wordX = useTransform(mouse, (v) => v * -26);
  const onPointerMove = (e) => {
    if (!finePointer || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouse.set((e.clientX - r.left) / r.width - 0.5);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => mouse.set(0)}
      className="relative isolate overflow-hidden lg:min-h-[100svh]"
    >
      {/* Glow behind the portrait */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[18%] aspect-square w-[min(110vw,820px)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.14),transparent)] lg:left-[58%]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Stage: giant word + portrait. Absolute layer on desktop, its own block on phones. */}
      <div className="relative h-[min(58svh,540px)] min-h-[400px] lg:absolute lg:inset-0 lg:h-auto">
        <motion.div style={{ y: wordY }} className="absolute inset-x-0 top-[15%] px-2 lg:top-[11%] lg:px-6">
          <motion.div style={{ x: wordX }}>
            <BackdropWord play={play} />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-1/2 h-[80%] -translate-x-1/2 lg:left-[58%] lg:h-[76%]">
          <motion.div style={{ y: portraitY }} className="h-full">
            <motion.img
              src={heroPortrait.src}
              width={heroPortrait.width}
              height={heroPortrait.height}
              alt="Shoaib Khan in a maroon shirt and sunglasses"
              fetchpriority="high"
              decoding="async"
              draggable="false"
              initial={{ opacity: 0, y: 70 }}
              animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              className="portrait-fade h-full w-auto max-w-none select-none"
            />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 -mt-24 pb-14 sm:-mt-28 lg:mt-0 lg:grid lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-16 lg:pt-36"
      >
        <div className="lg:col-span-6">
          <motion.ul {...fadeUp(0.2, play)} className="mb-7 hidden flex-wrap gap-2 lg:flex" aria-label="What I build">
            {TAGS.map((t) => (
              // Pill backdrop keeps the tags readable where they sit over the giant word
              <li
                key={t}
                className="eyebrow flex items-center gap-2 rounded-full border border-fg/10 bg-bg/85 px-3 py-2 text-fg/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-text" />
                {t}
              </li>
            ))}
          </motion.ul>

          <h1>
            <motion.span {...fadeUp(0.35, play)} className="serif-em block text-[clamp(2rem,3.4vw,3.4rem)] leading-none">
              Hello, I&apos;m
            </motion.span>
            <Name play={play} />
            <span className="sr-only"> — {profile.role}</span>
          </h1>

          <motion.p
            {...fadeUp(0.75, play)}
            className="mt-3 font-condensed text-[clamp(1.45rem,2.3vw,2.35rem)] uppercase leading-none tracking-[0.01em] text-accent-text"
          >
            Full-stack &amp; mobile developer
          </motion.p>

          <motion.p {...fadeUp(0.85, play)} className="mt-6 max-w-md text-[15px] leading-relaxed text-muted text-pretty md:text-base">
            I build React Native apps, MERN platforms and SaaS products — from first pixel to production — for founders and
            businesses ready to grow.
          </motion.p>

          {/* On phones the two buttons share the row; below ~340px they stack */}
          <motion.div {...fadeUp(0.95, play)} className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
            <Magnetic className="min-w-[9rem] flex-1 sm:flex-none">
              <Button onClick={() => scrollToTarget("#work", { offset: -20 })} icon={FiArrowDown} className="w-full px-4 sm:px-6">
                See my work
              </Button>
            </Magnetic>
            <Magnetic className="min-w-[9rem] flex-1 sm:flex-none">
              <WhatsAppButton variant="ghost" className="w-full px-4 sm:px-6">
                WhatsApp me
              </WhatsAppButton>
            </Magnetic>
          </motion.div>

          <motion.p {...fadeUp(1.05, play)} className="eyebrow mt-8 flex flex-wrap gap-x-3 gap-y-1">
            <span>Sr. Developer @ Loanyfy</span>
            <span aria-hidden="true">·</span>
            <span>
              India · <LocalTime />
            </span>
          </motion.p>
        </div>

        {/* Right rail: availability + key numbers */}
        <motion.aside {...fadeUp(1, play)} className="mt-12 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:justify-self-end">
          <Availability className="hidden lg:inline-flex" />
          <p className="mt-6 hidden max-w-[15rem] text-sm leading-snug text-muted lg:block">
            Every build ships to production — and gets judged by results.
          </p>
          <dl className="grid grid-cols-3 border-y border-fg/10 lg:mt-8 lg:grid-cols-1 lg:gap-7 lg:border-0">
            {heroStats.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "flex flex-col-reverse gap-2 py-5 lg:flex-row-reverse lg:items-center lg:justify-end lg:gap-4 lg:py-0",
                  i > 0 && "border-l border-fg/10 pl-4 lg:border-0 lg:pl-0"
                )}
              >
                <dt className="whitespace-pre-line text-[12px] leading-snug text-muted">{s.label}</dt>
                <dd className="font-condensed text-[2.1rem] leading-none text-accent-text min-[400px]:text-[2.5rem] lg:w-[5.5rem] lg:text-6xl">
                  <CountUp to={s.value} play={play} delay={0.9} />
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
          <Link
            to="/contact"
            className="eyebrow group mt-9 hidden items-center gap-2 py-2 text-fg transition-colors hover:text-accent-text lg:inline-flex"
          >
            Let&apos;s talk
            <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
          </Link>
        </motion.aside>
      </motion.div>
    </section>
  );
}
