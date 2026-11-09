import { BrowserFrame, PhoneFrame } from "./Frames";
import { Reveal } from "../ui/Reveal";
import { cn, pastelBackground } from "../../lib/utils";

const ORDER = ["mockup", "desktop", "phone", "poster"];

/** Screens of a project, grouped by kind. Each tile opens the lightbox at its index. */
export default function Gallery({ project, onOpen }) {
  const items = project.gallery.map((item, index) => ({ ...item, index }));
  const groups = ORDER.map((kind) => [kind, items.filter((i) => i.kind === kind)]).filter(([, list]) => list.length);
  const mockupBg = project.cover.type === "image" ? project.cover.bg : null;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {groups.map(([kind, list]) => (
        <div
          key={kind}
          className={cn(
            "grid gap-4 md:gap-6",
            kind === "desktop" && list.length > 1 && "md:grid-cols-2",
            kind === "phone" && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
            kind === "poster" && "grid-cols-2 lg:grid-cols-4"
          )}
        >
          {list.map((item, i) => (
            <Reveal key={item.src} delay={(i % 4) * 0.06} className={cn(kind === "desktop" && list.length > 2 && i === 0 && "md:col-span-2")}>
              <button
                type="button"
                onClick={() => onOpen(item.index)}
                data-cursor="Open"
                className="group block w-full text-left"
                aria-label={`Open image: ${item.caption}`}
              >
                {kind === "mockup" && (
                  <div
                    className="overflow-hidden rounded-[20px] md:rounded-[28px]"
                    style={mockupBg ? { background: `linear-gradient(180deg, ${mockupBg[0]}, ${mockupBg[1]})` } : pastelBackground(project.color)}
                  >
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto max-h-[80vh] w-auto transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                {kind === "desktop" && (
                  <div className="rounded-[20px] p-[5%] md:rounded-[28px]" style={pastelBackground(project.color)}>
                    <BrowserFrame
                      src={item.src}
                      url={project.cover.url}
                      alt={item.caption}
                      className="transition-transform duration-[1.1s] ease-out-expo group-hover:-translate-y-1"
                    />
                  </div>
                )}
                {kind === "phone" && (
                  <div className="flex aspect-[3/4] items-center justify-center rounded-[20px]" style={pastelBackground(project.color)}>
                    <PhoneFrame
                      src={item.src}
                      alt={item.caption}
                      className="h-[84%] transition-transform duration-[1.1s] ease-out-expo group-hover:-translate-y-1.5"
                    />
                  </div>
                )}
                {kind === "poster" && (
                  <div className="overflow-hidden rounded-[20px]">
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[2/3] w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <span className="mt-3 block text-sm text-muted">{item.caption}</span>
              </button>
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}
