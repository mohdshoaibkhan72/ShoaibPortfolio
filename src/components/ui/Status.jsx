import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { cn, useLocalTime } from "../../lib/utils";

export function StatusDot({ className }) {
  return (
    <span className={cn("relative flex h-2 w-2", className)} aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-text" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-text" />
    </span>
  );
}

export function Availability({ className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-fg/10 bg-fg/[0.03] py-2 pl-3 pr-4 text-[13px] backdrop-blur",
        className
      )}
    >
      <StatusDot />
      Available for freelance work
    </span>
  );
}

export function LocalTime({ className }) {
  const time = useLocalTime();
  return (
    <span className={className}>
      <time>{time}</time> IST · GMT+5:30
    </span>
  );
}

/** Copies text to the clipboard and briefly confirms. */
export function CopyButton({ value, className, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : `${label} ${value}`}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium opacity-70 transition-opacity hover:opacity-100",
        className || "border-fg/20"
      )}
    >
      {copied ? <FiCheck className="h-3.5 w-3.5" /> : <FiCopy className="h-3.5 w-3.5" />}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
