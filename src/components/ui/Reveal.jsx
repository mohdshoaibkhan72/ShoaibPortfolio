import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE, cn } from "../../lib/utils";

/** Fade + rise into view once. */
export function Reveal({ children, delay = 0, y = 28, as = "div", amount = 0.2, className, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

const lineVariants = {
  hide: { y: "108%" },
  show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
};

/** Heading whose lines slide up from behind a mask. `lines` is an array of nodes. */
export function MaskLines({ lines, as = "h2", className, delay = 0, onMount = false }) {
  const Tag = as;
  const trigger = onMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, amount: 0.35 } };
  return (
    <Tag className={className}>
      <motion.span
        className="block"
        initial="hide"
        {...trigger}
        variants={{ hide: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
      >
        {lines.map((line, i) => (
          // Padding + negative margin widens the clip box so italics and descenders aren't cut off.
          <span key={i} className="-mx-[0.08em] -mb-[0.12em] block overflow-hidden px-[0.08em] pb-[0.12em]">
            <motion.span className="block" variants={lineVariants}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

function Word({ children, progress, range, emphasis }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={cn(emphasis && "serif-em text-[1.06em]")}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Paragraph that lights up word by word as it scrolls through the viewport. *word* = serif italic. */
export function ScrollWords({ text, className }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  let inEmphasis = false;
  const words = text.split(" ").map((raw) => {
    const starts = raw.startsWith("*");
    const ends = raw.replace(/[.,;:—]+$/, "").endsWith("*");
    if (starts) inEmphasis = true;
    const word = { text: raw.replace(/\*/g, ""), emphasis: inEmphasis };
    if (ends) inEmphasis = false;
    return word;
  });

  if (reduced) {
    return (
      <p className={className}>
        {words.map((w, i) => (
          <span key={i} className={cn(w.emphasis && "serif-em text-[1.06em]")}>
            {w.text}{" "}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} emphasis={w.emphasis}>
          {w.text}
        </Word>
      ))}
    </p>
  );
}
