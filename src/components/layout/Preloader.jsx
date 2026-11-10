import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { heroPortrait, profile } from "../../data/site";
import { setScrollLocked } from "../../lib/smoothScroll";
import { EASE, useMediaQuery } from "../../lib/utils";

const EASE_IO = [0.76, 0, 0.24, 1];
const NAME = profile.shortName.toUpperCase();
const MIN_SECONDS = 1.6; // never shorter than this, so the assembly can finish
const MAX_WAIT_MS = 4500; // never wait longer than this for assets
const PANELS = 6;
const ROWS = 3; // name is sliced into ROWS x cols pieces

/** Resolves when fonts and the hero portrait are ready (or after MAX_WAIT_MS). */
function assetsReady() {
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const img = new Image();
  img.src = heroPortrait.src;
  const portrait = (img.decode ? img.decode() : new Promise((r) => (img.onload = r))).catch(() => {});
  const cap = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));
  return Promise.race([Promise.all([fonts, portrait]), cap]);
}

/** Resolves when the condensed display font is ready (or after `cap` ms), so nothing reflows mid-animation. */
function fontReady(cap = 900) {
  const load = document.fonts?.load ? document.fonts.load('400 100px "Anton"').catch(() => {}) : Promise.resolve();
  return Promise.race([load, new Promise((r) => setTimeout(r, cap))]);
}

/**
 * The name, sliced into a grid of small pieces. Each piece flies in from one of the four
 * sides — spinning and scaled down — and they lock together into the name.
 * Only transform + opacity are animated (GPU-friendly), and it starts once the font is in.
 */
function AssemblingName() {
  const ref = useRef(null);
  const [box, setBox] = useState(null);
  const small = useMediaQuery("(max-width: 640px)");
  const cols = small ? 7 : 10;

  useLayoutEffect(() => {
    let alive = true;
    let fontIn = false;
    const measure = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!alive || !fontIn || !r?.width) return;
      setBox((b) => (b && Math.abs(b.w - r.width) < 1 && Math.abs(b.h - r.height) < 1 ? b : { w: r.width, h: r.height }));
    };
    // Measure only after the font is ready (then again only if the window is resized).
    fontReady().then(() => {
      fontIn = true;
      measure();
    });
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, []);

  // Random start for every piece: a side (top/right/bottom/left), distance, spin and delay.
  const pieces = useMemo(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const list = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < cols; c++) {
        const side = Math.floor(Math.random() * 4);
        const far = 0.5 + Math.random() * 0.5;
        const drift = Math.random() - 0.5;
        const from =
          side === 0 ? { x: drift * vw * 0.7, y: -vh * far }
          : side === 1 ? { x: vw * far, y: drift * vh * 0.7 }
          : side === 2 ? { x: drift * vw * 0.7, y: vh * far }
          : { x: -vw * far, y: drift * vh * 0.7 };
        list.push({
          r,
          c,
          ...from,
          rotate: (Math.random() - 0.5) * 180,
          scale: 0.3 + Math.random() * 0.5,
          delay: Math.random() * 0.45,
        });
      }
    }
    return list;
  }, [cols]);

  const tw = box ? box.w / cols : 0;
  const th = box ? box.h / ROWS : 0;

  return (
    <div
      ref={ref}
      className="relative whitespace-nowrap font-condensed text-[min(15.5vw,10rem)] uppercase leading-[0.95] text-fg"
    >
      {/* Invisible copy keeps the box the right size */}
      <span className="invisible">{NAME}</span>
      {box &&
        pieces.map((p) => (
          <motion.span
            key={`${p.r}-${p.c}-${cols}`}
            aria-hidden="true"
            className="absolute overflow-hidden"
            // +1px overlap so no hairline seams show once the pieces meet
            style={{ left: p.c * tw, top: p.r * th, width: tw + 1, height: th + 1, willChange: "transform, opacity" }}
            initial={{ x: p.x, y: p.y, rotate: p.rotate, scale: p.scale, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.95, ease: EASE, delay: p.delay, opacity: { duration: 0.3, delay: p.delay } }}
          >
            <span
              className="absolute left-0 top-0 block"
              style={{ width: box.w, height: box.h, transform: `translate(${-p.c * tw}px, ${-p.r * th}px)` }}
            >
              {NAME}
            </span>
          </motion.span>
        ))}
    </div>
  );
}

/** Lime corner bracket that slides in from its corner of the screen. */
function Corner({ position }) {
  const [v, h] = position; // "top"/"bottom", "left"/"right"
  return (
    <motion.span
      aria-hidden="true"
      className="absolute h-5 w-5 border-accent-text sm:h-7 sm:w-7"
      style={{
        [v]: 0,
        [h]: 0,
        [`border${v === "top" ? "Top" : "Bottom"}Width`]: 2,
        [`border${h === "left" ? "Left" : "Right"}Width`]: 2,
      }}
      initial={{ x: h === "left" ? "-40vw" : "40vw", y: v === "top" ? "-40vh" : "40vh", opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
    />
  );
}

/**
 * First-visit loading screen. Calls `onFinish` once assets are ready and the name has
 * assembled; the parent then removes it, which plays the panel exit (and starts the hero).
 */
export default function Preloader({ onFinish }) {
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const bar = useTransform(progress, [0, 100], [0, 1]);
  const year = new Date().getFullYear();

  useEffect(() => {
    let cancelled = false;
    window.scrollTo(0, 0);
    setScrollLocked(true);

    // Count most of the way while things load, then finish once assets are in.
    // Creep toward 94% (slowing down) while things load, so the counter never looks stuck.
    const toward = animate(progress, 94, { duration: MIN_SECONDS + 1.2, ease: [0.2, 0.6, 0.35, 1] });
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    // Finish only when assets are in, the minimum time has passed, and the name has assembled.
    const assembled = fontReady().then(() => wait(1400));
    Promise.all([assetsReady(), wait(MIN_SECONDS * 1000), assembled]).then(() => {
      if (cancelled) return;
      toward.stop();
      animate(progress, 100, {
        duration: 0.35,
        ease: EASE,
        onComplete: () => !cancelled && setTimeout(() => !cancelled && onFinish(), 200),
      });
    });

    return () => {
      cancelled = true;
      toward.stop();
      setScrollLocked(false);
    };
  }, [onFinish, progress]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] cursor-wait"
      role="status"
      aria-live="polite"
      data-lenis-prevent
      exit={{ pointerEvents: "none" }}
    >
      <span className="sr-only">Loading {profile.name}&apos;s portfolio</span>

      {/* Background panels — they lift away one after another to reveal the page */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: PANELS }, (_, i) => (
          <motion.div
            key={i}
            className="-mr-px h-full flex-1 bg-bg"
            exit={{ y: "-100%", transition: { duration: 0.85, ease: EASE_IO, delay: 0.15 + i * 0.06 } }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="container-x relative flex h-full flex-col justify-between py-6 md:py-8"
        exit={{ opacity: 0, y: -50, transition: { duration: 0.45, ease: EASE_IO } }}
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow">{profile.name}</span>
          <span className="eyebrow">Portfolio ©{year}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative px-5 py-6 sm:px-10 sm:py-9">
            <Corner position={["top", "left"]} />
            <Corner position={["top", "right"]} />
            <Corner position={["bottom", "left"]} />
            <Corner position={["bottom", "right"]} />
            <AssemblingName />
          </div>
          <motion.p
            className="eyebrow mt-4 text-fg/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          >
            Full-stack &amp; mobile developer
          </motion.p>
        </div>

        <div className="flex items-end justify-between gap-6" aria-hidden="true">
          <span className="eyebrow max-w-[12rem]">Loading the experience</span>
          <span className="font-condensed text-[clamp(3rem,9vw,6.5rem)] leading-none text-fg">
            <motion.span>{counter}</motion.span>
            <span className="text-accent-text">%</span>
          </span>
        </div>
      </motion.div>

      {/* Progress line along the bottom edge */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent"
        style={{ scaleX: bar }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      />
    </motion.div>
  );
}
