import { BrowserFrame, PhoneFrame } from "./Frames";
import { cn, pastelBackground } from "../../lib/utils";

function Phones({ images, name, eager }) {
  const alt = (i) => `${name} app screen ${i + 1}`;
  if (images.length >= 3) {
    return (
      <>
        <PhoneFrame src={images[0]} alt={alt(0)} eager={eager} className="phone-l z-0 h-[64%]" />
        <PhoneFrame src={images[1]} alt={alt(1)} eager={eager} className="phone-c z-10 h-[80%]" />
        <PhoneFrame src={images[2]} alt={alt(2)} eager={eager} className="phone-r z-0 h-[64%]" />
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <PhoneFrame src={images[0]} alt={alt(0)} eager={eager} className="phone-pair-l z-0 h-[74%]" />
        <PhoneFrame src={images[1]} alt={alt(1)} eager={eager} className="phone-pair-r z-10 h-[74%]" />
      </>
    );
  }
  return <PhoneFrame src={images[0]} alt={alt(0)} eager={eager} className="phone-c h-[80%]" />;
}

function Browsers({ images, url, name, eager }) {
  if (images.length > 1) {
    return (
      <>
        <BrowserFrame
          src={images[1]}
          alt={`${name} — admin screen`}
          eager={eager}
          className="absolute right-[5%] top-[10%] w-[66%] opacity-95 transition-transform duration-[1.1s] ease-out-expo group-hover:-translate-y-[3%] group-hover:translate-x-[2%]"
        />
        <BrowserFrame
          src={images[0]}
          url={url}
          alt={`${name} — homepage`}
          eager={eager}
          className="absolute bottom-[10%] left-[5%] w-[74%] transition-transform duration-[1.1s] ease-out-expo group-hover:-translate-x-[1.5%] group-hover:translate-y-[1%]"
        />
      </>
    );
  }
  return (
    <BrowserFrame
      src={images[0]}
      url={url}
      alt={`${name} — homepage`}
      eager={eager}
      className="w-[82%] transition-transform duration-[1.1s] ease-out-expo group-hover:-translate-y-[2.5%] group-hover:scale-[1.015]"
    />
  );
}

/**
 * The visual for a project: either a ready-made mockup image, or screenshots composed into
 * phone / browser frames on a pastel backdrop. Hover motion reacts to an ancestor `.group`.
 */
export default function ProjectVisual({ project, className, eager = false }) {
  const { cover, color, name } = project;

  if (cover.type === "image") {
    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={{ background: `linear-gradient(180deg, ${cover.bg[0]}, ${cover.bg[1]})` }}
      >
        <img
          src={cover.src}
          alt={`${name} — website and app mockups`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable="false"
          style={{
            aspectRatio: cover.ratio || 1,
            maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
          }}
          className="absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.035]"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={pastelBackground(color)}>
      <div className="absolute inset-0 flex items-center justify-center">
        {cover.type === "phones" ? (
          <Phones images={cover.images} name={name} eager={eager} />
        ) : (
          <Browsers images={cover.images} url={cover.url} name={name} eager={eager} />
        )}
      </div>
    </div>
  );
}
