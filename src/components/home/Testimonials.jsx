import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";
import { testimonials } from "../../data/site";
import { EASE } from "../../lib/utils";

const DURATION = 9; // seconds per quote

export default function Testimonials({ index = "05" }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const count = testimonials.length;
  const t = testimonials[current];
  const go = (dir) => setCurrent((c) => (c + dir + count) % count);

  return (
    <section
      className="container-x py-28 md:py-40"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <SectionHeader index={index} label="Kind words" title={[<span key="s">What clients <span className="serif-em">say</span></span>]} />

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="min-h-[19rem] sm:min-h-[16rem] lg:col-span-9 lg:min-h-[22rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <blockquote className="serif-em text-[clamp(1.9rem,4vw,3.75rem)] leading-[1.08] tracking-[-0.015em] text-balance">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span
                  className="grid h-12 w-12 place-items-center rounded-full text-sm font-semibold text-white"
                  style={{ background: t.color }}
                  aria-hidden="true"
                >
                  {t.initials}
                </span>
                <span>
                  <span className="block font-medium">{t.company}</span>
                  <span className="block text-sm text-muted">{t.name}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="flex items-end justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-end lg:justify-between">
          <span className="font-mono text-sm" aria-live="polite">
            {String(current + 1).padStart(2, "0")} <span className="text-muted">/ {String(count).padStart(2, "0")}</span>
          </span>
          <div className="flex gap-2">
            {[
              [-1, FiArrowLeft, "Previous testimonial"],
              [1, FiArrowRight, "Next testimonial"],
            ].map(([dir, Icon, label]) => (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir)}
                aria-label={label}
                className="grid h-14 w-14 place-items-center rounded-full border border-fg/15 transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg"
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar doubles as the auto-advance timer */}
      <div className="mt-12 h-px w-full overflow-hidden bg-fg/10">
        {!reduced && (
          <div
            key={current}
            className="h-full origin-left bg-fg"
            style={{
              animation: `grow-x ${DURATION}s linear forwards`,
              animationPlayState: paused ? "paused" : "running",
            }}
            onAnimationEnd={() => go(1)}
          />
        )}
      </div>
    </section>
  );
}
