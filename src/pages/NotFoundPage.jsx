import { SEOHead } from "../components/SEOHead";
import { Button } from "../components/ui/Button";
import { MaskLines, Reveal } from "../components/ui/Reveal";

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="Page not found | Mohammad Shoaib Khan" canonicalPath="/404" />
      <section className="container-x flex min-h-[100svh] flex-col justify-center pb-16 pt-32">
        <p className="eyebrow">(Error 404)</p>
        <MaskLines
          as="h1"
          onMount
          delay={0.2}
          lines={["Lost in the", <span key="c" className="serif-em">codebase.</span>]}
          className="display mt-8 text-[clamp(3.4rem,11vw,11rem)]"
        />
        <Reveal delay={0.5} className="mt-10 flex max-w-xl flex-col gap-8">
          <p className="text-lg text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you somewhere useful.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button to="/">Back home</Button>
            <Button to="/projects" variant="ghost">
              See my work
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
