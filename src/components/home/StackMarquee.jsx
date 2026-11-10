import {
  SiAmazonwebservices,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiRazorpay,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import Marquee from "../ui/Marquee";

const STACK = [
  [SiReact, "React Native"],
  [SiNextdotjs, "Next.js"],
  [SiNodedotjs, "Node.js"],
  [SiExpress, "Express"],
  [SiMongodb, "MongoDB"],
  [SiMysql, "MySQL"],
  [SiRedux, "Redux"],
  [SiExpo, "Expo"],
  [SiFirebase, "Firebase"],
  [SiAmazonwebservices, "AWS"],
  [SiTypescript, "TypeScript"],
  [SiTailwindcss, "Tailwind"],
  [SiRazorpay, "Razorpay"],
  [SiVercel, "Vercel"],
  [SiDocker, "Docker"],
];

export default function StackMarquee() {
  return (
    <section aria-label="Technologies I work with" className="relative border-y border-fg/10 py-6 md:py-8">
      <p className="sr-only">{STACK.map(([, label]) => label).join(", ")}</p>
      <Marquee duration={50}>
        {STACK.map(([Icon, label]) => (
          <span
            key={label}
            aria-hidden="true"
            className="flex items-center gap-3 whitespace-nowrap pr-10 text-2xl font-medium tracking-[-0.03em] text-fg/85 md:gap-4 md:pr-14 md:text-[2.6rem]"
          >
            <Icon className="h-6 w-6 text-fg/60 md:h-9 md:w-9" />
            {label}
            <span className="ml-6 text-base text-accent-text md:ml-10 md:text-xl">✦</span>
          </span>
        ))}
      </Marquee>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent md:w-40" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent md:w-40" />
    </section>
  );
}
