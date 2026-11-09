import { motion } from "framer-motion";

const EASE_IO = [0.76, 0, 0.24, 1];

/**
 * Page-transition wipe. Lives inside each route's keyed wrapper:
 * on exit a panel rises from the bottom to cover the screen; the next page
 * starts covered and the panel lifts away to the top.
 */
export default function Curtain() {
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-surface-2"
        variants={{
          initial: { scaleY: 0 },
          enter: { scaleY: 0 },
          exit: { scaleY: 1, transition: { duration: 0.5, ease: EASE_IO } },
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-surface-2"
        variants={{
          initial: { scaleY: 1 },
          enter: { scaleY: 0, transition: { duration: 0.7, ease: EASE_IO, delay: 0.08 } },
          exit: { scaleY: 0 },
        }}
      />
    </>
  );
}
