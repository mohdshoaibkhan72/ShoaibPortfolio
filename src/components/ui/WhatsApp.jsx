import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import RollText from "./RollText";
import { whatsapp } from "../../data/site";
import { EASE, cn } from "../../lib/utils";

/**
 * WhatsApp call-to-action.
 * - "solid": WhatsApp green with dark text — the loud version.
 * - "ghost": outlined with a green icon; fills green on hover.
 */
export function WhatsAppButton({ variant = "solid", children = "Chat on WhatsApp", showNumber = false, className }) {
  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat on WhatsApp: ${whatsapp.number}`}
      className={cn(
        "btn group/roll",
        variant === "solid"
          ? "bg-[#25D366] text-[#0b0b0c] hover:bg-[#1fbf5b]"
          : "border border-fg/15 text-fg hover:border-[#25D366] hover:bg-[#25D366] hover:text-[#0b0b0c]",
        className
      )}
    >
      <FaWhatsapp
        aria-hidden="true"
        className={cn(
          "h-[18px] w-[18px] shrink-0 transition-colors duration-300",
          variant === "ghost" && "text-[#25D366] group-hover/roll:text-[#0b0b0c]"
        )}
      />
      <RollText>{children}</RollText>
      {showNumber && <span className="hidden font-mono text-xs opacity-70 min-[380px]:inline">{whatsapp.number}</span>}
    </a>
  );
}

/** Floating WhatsApp button, bottom-right on every page. Its bubble shows briefly, then on hover. */
export function WhatsAppFab() {
  const [mounted, setMounted] = useState(false);
  const [intro, setIntro] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const appear = setTimeout(() => {
      setMounted(true);
      setIntro(true);
    }, 2200);
    const hide = setTimeout(() => setIntro(false), 9000);
    return () => {
      clearTimeout(appear);
      clearTimeout(hide);
    };
  }, []);

  const bubble = intro || hover;

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className="fixed bottom-4 right-4 z-[80] flex items-center gap-3 md:bottom-7 md:right-7"
          initial={{ opacity: 0, scale: 0.4, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          <AnimatePresence>
            {bubble && (
              <motion.a
                href={whatsapp.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                initial={{ opacity: 0, x: 12, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.97 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative hidden rounded-2xl rounded-br-md bg-fg px-4 py-2.5 text-bg shadow-xl sm:block [@media(max-height:560px)]:hidden"
              >
                <span className="block text-sm font-medium">Chat with me on WhatsApp</span>
                <span className="block font-mono text-[11px] opacity-60">{whatsapp.number}</span>
              </motion.a>
            )}
          </AnimatePresence>

          <a
            href={whatsapp.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Chat on WhatsApp: ${whatsapp.number}`}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-6px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-105 md:h-16 md:w-16"
          >
            <span aria-hidden="true" className="absolute inset-0 animate-wa-ring rounded-full bg-[#25D366]" />
            <FaWhatsapp aria-hidden="true" className="relative h-7 w-7 md:h-8 md:w-8" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
