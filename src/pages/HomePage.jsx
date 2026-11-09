import { SEOHead } from "../components/SEOHead";
import Hero from "../components/home/Hero";
import StackMarquee from "../components/home/StackMarquee";
import AboutIntro from "../components/home/AboutIntro";
import SelectedWork from "../components/home/SelectedWork";
import Services from "../components/home/Services";
import ExperienceSection from "../components/home/ExperienceSection";
import Testimonials from "../components/home/Testimonials";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://mohammadshoaibkhan.com/#person",
      name: "Mohammad Shoaib Khan",
      url: "https://mohammadshoaibkhan.com",
      image: "https://res.cloudinary.com/dt7qppfbh/image/upload/v1762139970/aiimg1_jlasiv.png",
      sameAs: ["https://www.linkedin.com/in/shoaibkhan72/", "https://www.instagram.com/shoaib.devs/", "https://github.com/mohdshoaibkhan72"],
      jobTitle: "Senior Full-Stack & Mobile App Developer",
      worksFor: { "@type": "Organization", name: "Loanyfy", url: "https://www.loanyfy.com" },
      email: "mohdshoaibkhan7211@gmail.com",
      telephone: "+917310249234",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      knowsAbout: [
        "React Native", "React.js", "Node.js", "MongoDB", "Express.js", "JavaScript",
        "Full-Stack Development", "Mobile App Development", "MERN Stack", "AWS", "Fintech Development", "SaaS Development",
      ],
      description:
        "Senior Full-Stack & Mobile App Developer with 3+ years experience. Currently working full-time at Loanyfy (fintech). Expert in React Native, MERN Stack. 16+ production apps delivered.",
    },
    {
      "@type": "WebSite",
      "@id": "https://mohammadshoaibkhan.com/#website",
      url: "https://mohammadshoaibkhan.com",
      name: "Mohammad Shoaib Khan — Portfolio",
      description: "Portfolio of Mohammad Shoaib Khan, Senior Full-Stack & Mobile App Developer",
      author: { "@id": "https://mohammadshoaibkhan.com/#person" },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Mohammad Shoaib Khan | Senior Full-Stack & Mobile App Developer"
        description="Senior Full-Stack & Mobile App Developer. Full-time at Loanyfy (fintech). Expert in React Native, MERN Stack, AWS. 16+ production apps including PLP Bazar, KLIMB School ERP, Fugen Health Care and Alras Cars."
        keywords="Mohammad Shoaib Khan, Full-Stack Developer, React Native Developer, MERN Stack, Mobile App Developer, Loanyfy Developer, Freelance Developer India"
        canonicalPath="/"
        structuredData={homeStructuredData}
      />
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
