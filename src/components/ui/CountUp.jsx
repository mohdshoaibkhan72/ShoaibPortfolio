import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "../../lib/utils";

/** Counts from 0 to `to` the first time it scrolls into view (and `play` is true). */
export default function CountUp({ to, duration = 1.8, delay = 0, play = true, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || !play) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, { duration, delay, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, play, reduced, to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
