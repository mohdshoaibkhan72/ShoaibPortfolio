import { useRef } from "react";

/* Wraps children in a mouse-reactive 3D tilt with a moving glare. */
export default function Tilt3D({ children, className = "", max = 10, scale = 1.02 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) scale(${scale})`;
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div className="perspective-1000 h-full">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={`tilt-3d group/tilt relative h-full ${className}`}
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.14), transparent 55%)" }}
        />
      </div>
    </div>
  );
}
