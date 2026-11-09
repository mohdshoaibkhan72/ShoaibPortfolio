import { motion } from "framer-motion";
import { MaskLines } from "./Reveal";
import { EASE, cn } from "../../lib/utils";

/** Opening block for inner pages: eyebrow, huge masked title, optional intro on the right. */
export default function PageHeader({ eyebrow, title, intro, className, titleClassName }) {
  return (
    <header className={cn("container-x pt-32 md:pt-44", className)}>
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      >
        {eyebrow}
      </motion.p>
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
        <MaskLines
          as="h1"
          onMount
          delay={0.25}
          lines={title}
          className={cn("display text-[clamp(3.4rem,10.5vw,11rem)] lg:col-span-9", titleClassName)}
        />
        {intro && (
          <motion.p
            className="max-w-sm text-lg leading-snug text-muted text-pretty lg:col-span-3 lg:pb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </header>
  );
}
