import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import { setScrollLocked } from "../../lib/smoothScroll";
import { EASE, cn } from "../../lib/utils";

/** Full-screen image viewer. `index` null = closed. Arrow keys navigate, Esc closes. */
export default function Lightbox({ items, index, onChange, onClose }) {
  const open = index !== null && index !== undefined;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [open, index, items.length, onChange, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          className="fixed inset-0 z-[96] flex flex-col bg-bg/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className="container-x flex h-16 shrink-0 items-center justify-between md:h-20">
            <span className="font-mono text-sm">
              {String(index + 1).padStart(2, "0")} <span className="text-muted">/ {String(items.length).padStart(2, "0")}</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="grid h-11 w-11 place-items-center rounded-full border border-fg/15 transition-colors hover:border-fg/50"
              aria-label="Close"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            <AnimatePresence mode="wait">
              <motion.img
                key={item.src}
                src={item.src}
                alt={item.caption}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={cn(
                  "max-h-full max-w-full rounded-xl object-contain shadow-2xl",
                  item.kind === "phone" && "rounded-[1.6rem]"
                )}
              />
            </AnimatePresence>
            {items.length > 1 && (
              <>
                <NavButton side="left" onClick={() => onChange((index - 1 + items.length) % items.length)} />
                <NavButton side="right" onClick={() => onChange((index + 1) % items.length)} />
              </>
            )}
          </div>

          <p className="container-x flex h-16 shrink-0 items-center justify-center text-sm text-muted md:h-20">
            {item.caption}
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function NavButton({ side, onClick }) {
  const Icon = side === "left" ? FiArrowLeft : FiArrowRight;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-fg/15 bg-bg/60 backdrop-blur transition-colors hover:border-fg/50",
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
