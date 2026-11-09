import { cn } from "../../lib/utils";

/** Screenshot inside a modern phone bezel. Size it with a height (or width) class. */
export function PhoneFrame({ src, alt = "", className, style, eager = false }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] shrink-0 rounded-[14%/6.5%] bg-[#0c0c0e] p-[3%] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/20",
        className
      )}
      style={style}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[11.5%/5.3%] bg-[#111]">
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable="false"
          className="h-full w-full object-cover object-top"
        />
        <span className="absolute left-1/2 top-[1.4%] h-[3%] w-[28%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

/** Screenshot inside a light browser window. */
export function BrowserFrame({ src, url, alt = "", className, eager = false }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[8px] bg-white shadow-[0_30px_70px_-25px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.07] sm:rounded-[12px]",
        className
      )}
    >
      <div className="flex h-[18px] items-center gap-[5px] border-b border-black/[0.06] bg-[#f5f5f3] px-2.5 sm:h-7 sm:gap-1.5 sm:px-3.5">
        <span className="h-[6px] w-[6px] rounded-full bg-[#ff5f57] sm:h-2.5 sm:w-2.5" />
        <span className="h-[6px] w-[6px] rounded-full bg-[#febc2e] sm:h-2.5 sm:w-2.5" />
        <span className="h-[6px] w-[6px] rounded-full bg-[#28c840] sm:h-2.5 sm:w-2.5" />
        {url && (
          <span className="mx-auto hidden max-w-[50%] truncate rounded-md bg-black/[0.05] px-3 py-0.5 font-mono text-[10px] text-black/45 sm:block">
            {url}
          </span>
        )}
      </div>
      <img
        src={src}
        alt={alt}
        width={1600}
        height={900}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable="false"
        className="block aspect-[16/9] w-full object-cover object-top"
      />
    </div>
  );
}
