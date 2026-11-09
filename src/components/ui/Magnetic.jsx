import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn, useMediaQuery } from "../../lib/utils";

const SPRING = { stiffness: 200, damping: 16, mass: 0.4 };

/** Pulls its child gently toward the cursor (mouse/trackpad only). */
export default function Magnetic({ children, strength = 0.3, className }) {
  const ref = useRef(null);
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const onMove = (e) => {
    if (!finePointer || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
