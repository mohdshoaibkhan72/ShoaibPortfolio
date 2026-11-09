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
    <section aria-label="Technologies I work with" className="border-y border-fg/10 py-6 md:py-8">
      <p className="sr-only">{STACK.map(([, label]) => label).join(", ")}</p>
      <Marquee duration={50} className="[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
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
    </section>
  );
}
