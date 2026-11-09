import { MaskLines } from "./Reveal";
import { cn } from "../../lib/utils";

/** Editorial section opener: hairline, "(02) Label", optional link, then a big masked heading. */
export default function SectionHeader({ index, label, title, aside, className }) {
  return (
    <div className={cn("mb-12 md:mb-20", className)}>
      <div className="flex items-center justify-between gap-6 border-t border-fg/10 pt-5">
        <span className="eyebrow">
          {index && <span className="mr-3">({index})</span>}
          {label}
        </span>
        {aside}
      </div>
      <MaskLines lines={title} className="display mt-8 text-[clamp(2.9rem,8vw,8rem)] md:mt-10" />
    </div>
  );
}
