import { cn } from "../../lib/utils";

/** Infinite horizontal ticker. Content is rendered twice and the track slides by half its width. */
export default function Marquee({ children, duration = 40, reverse = false, className }) {
  return (
    <div className={cn("group flex overflow-hidden", className)} style={{ "--marquee-duration": `${duration}s` }}>
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
