import Hero from "../components/home/Hero";
import StackMarquee from "../components/home/StackMarquee";
import AboutIntro from "../components/home/AboutIntro";
import SelectedWork from "../components/home/SelectedWork";
import Services from "../components/home/Services";
import ExperienceSection from "../components/home/ExperienceSection";
import Testimonials from "../components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <AboutIntro />
      <SelectedWork />
      <Services />
      <ExperienceSection />
      <Testimonials />
    </>
  );
}
