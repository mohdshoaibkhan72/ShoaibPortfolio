import { Link } from "react-router-dom";
import { Contact } from "../components/ContactUs";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Mohammad Shoaib Khan",
  url: "https://mohammadshoaibkhan.com/contact",
  description: "Hire Mohammad Shoaib Khan for mobile app development, full-stack web development, or e-commerce solutions.",
  mainEntity: {
    "@type": "Person",
    name: "Mohammad Shoaib Khan",
    email: "info@mohammadshoaibkhan.com",
    telephone: "+917310249234",
    url: "https://mohammadshoaibkhan.com",
    sameAs: ["https://github.com/mohdshoaibkhan72", "https://www.linkedin.com/in/shoaibkhan72/"],
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".contact-intro"],
  },
  about: {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How quickly do you respond?",
        acceptedAnswer: { "@type": "Answer", text: "I typically respond within 24 hours on business days." },
      },
      {
        "@type": "Question",
        name: "Are you available for freelance work?",
        acceptedAnswer: { "@type": "Answer", text: "Yes! I am available for freelance projects alongside my full-time role at Loanyfy." },
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <SEOHead
        title="Hire Mohammad Shoaib Khan | Contact a Full-Stack & Mobile App Developer"
        description="Get in touch with Mohammad Shoaib Khan for React Native mobile apps, MERN Stack development, e-commerce platforms, or freelance projects. Based in India, working globally."
        keywords="hire React Native developer, hire full-stack developer India, contact Mohammad Shoaib Khan, freelance mobile app developer, MERN Stack freelancer"
        canonicalPath="/contact"
        structuredData={contactStructuredData}
      />

      <div className="min-h-screen bg-slate-950 text-white pt-24">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6 pt-4 pb-0">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to="/" className="hover:text-slate-300">Home</Link>
            <span>/</span>
            <span className="text-slate-300">Contact</span>
          </nav>

          <div className="text-center mb-4">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Let's Work <span className="text-indigo-400">Together</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6 rounded-full" />
            <p className="contact-intro text-slate-400 max-w-2xl mx-auto text-base">
              Have a project in mind? I'm available for freelance work alongside my full-time role.
              Let's discuss your idea and bring it to life with clean code and premium UX.
            </p>
          </div>
        </div>

        <Contact />
        <Footer />
      </div>
    </>
  );
}
