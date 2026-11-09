import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "../../lib/utils";

const SPRING = { stiffness: 520, damping: 42, mass: 0.45 };
const INTERACTIVE = "a, button, [role='button'], label, summary";
const TEXT_INPUT = "input, textarea, select";

/**
 * A small blend-mode dot that trails the pointer (desktop only — the native cursor stays).
 * It grows over links, and becomes a labelled bubble over elements with data-cursor="Label".
 */
export default function Cursor() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useSpring(useMotionValue(-100), SPRING);
  const y = useSpring(useMotionValue(-100), SPRING);
  const [mode, setMode] = useState("idle");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => {
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.getAttribute("data-cursor"));
      } else if (target?.closest(TEXT_INPUT)) {
        setMode("hidden");
      } else if (target?.closest(INTERACTIVE)) {
        setMode("link");
      } else {
        setMode("idle");
      }
    };
    const hide = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const dotSize = mode === "link" ? 46 : mode === "idle" ? 10 : 0;
  const bubbleSize = mode === "label" ? 92 : 0;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x, y }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ width: dotSize, height: dotSize, opacity: visible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        />
      </motion.div>
      <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x, y }}>
        <motion.div
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full bg-accent text-accent-ink shadow-xl"
          animate={{ width: bubbleSize, height: bubbleSize, opacity: visible && mode === "label" ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          <span className="whitespace-nowrap text-[13px] font-medium">{label}</span>
        </motion.div>
      </motion.div>
    </>
  );
}
