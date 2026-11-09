import { cn } from "../../lib/utils";

/** Text that rolls up to a copy of itself on hover. The hover target needs `group/roll`. */
export default function RollText({ children, className }) {
  return (
    <span className={cn("relative inline-block overflow-hidden align-top", className)}>
      <span className="block transition-transform duration-500 ease-out-expo group-hover/roll:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover/roll:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
