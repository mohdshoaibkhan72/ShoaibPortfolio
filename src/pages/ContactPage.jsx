import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiLoader, FiPlus, FiSend } from "react-icons/fi";
import { SEOHead } from "../components/SEOHead";
import PageHeader from "../components/ui/PageHeader";
import RollText from "../components/ui/RollText";
import { Reveal } from "../components/ui/Reveal";
import { CopyButton, LocalTime, StatusDot } from "../components/ui/Status";
import { WhatsAppButton } from "../components/ui/WhatsApp";
import { faqs, profile, socials, whatsapp } from "../data/site";
import { EASE, cn } from "../lib/utils";

const WEB3FORMS_KEY = "a723f59c-d1be-44a1-b942-a27a15c862c6";
const PROJECT_TYPES = ["Mobile app", "Web app", "Website", "E-commerce", "SaaS / CRM", "Something else"];

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Mohammad Shoaib Khan",
  url: "https://mohammadshoaibkhan.com/contact",
  description: "Hire Mohammad Shoaib Khan for mobile app development, full-stack web development, SaaS or e-commerce solutions.",
  mainEntity: {
    "@type": "Person",
    name: "Mohammad Shoaib Khan",
    email: "mohdshoaibkhan7211@gmail.com",
    telephone: "+917310249234",
    url: "https://mohammadshoaibkhan.com",
    sameAs: ["https://www.linkedin.com/in/shoaibkhan72/", "https://www.instagram.com/shoaib.devs/", "https://github.com/mohdshoaibkhan72"],
  },
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".contact-intro"] },
  about: {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
};

const inputClass =
  "w-full border-b border-fg/15 bg-transparent pb-4 pt-2 text-xl tracking-tight outline-none transition-colors placeholder:text-fg/25 focus:border-fg md:text-2xl";

function Field({ number, label, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-3 flex items-baseline gap-4 text-sm">
        <span className="font-mono text-xs text-muted">{number}</span>
        <span className="font-medium">{label}</span>
      </label>
      {children}
    </div>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-t border-fg/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-5 text-left font-medium"
      >
        {q}
        <FiPlus className={cn("h-4 w-4 shrink-0 transition-transform duration-500 ease-out-expo", open && "rotate-45")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-8 text-muted text-pretty">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [types, setTypes] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const toggleType = (t) => setTypes((ts) => (ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData();
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `Portfolio enquiry from ${form.name}`);
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("project_type", types.join(", ") || "Not specified");
    data.append("message", form.message);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTypes([]);
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      <SEOHead
        title="Hire Mohammad Shoaib Khan | Contact a Full-Stack & Mobile App Developer"
        description="Get in touch with Mohammad Shoaib Khan for React Native mobile apps, MERN Stack development, SaaS, e-commerce platforms, or freelance projects. Based in India, working globally."
        keywords="hire React Native developer, hire full-stack developer India, contact Mohammad Shoaib Khan, freelance mobile app developer, MERN Stack freelancer"
        canonicalPath="/contact"
        structuredData={contactStructuredData}
      />

      <PageHeader
        eyebrow="(Contact)"
        title={["Let’s build", <span key="g">something <span className="serif-em">great</span></span>]}
        titleClassName="text-[clamp(3rem,9vw,9.5rem)]"
      />

      <section className="container-x grid gap-16 pb-28 pt-14 md:pb-40 md:pt-24 lg:grid-cols-12 lg:gap-12">
        {/* Form */}
        <Reveal className="lg:col-span-7">
          <p className="contact-intro mb-12 max-w-xl text-lg leading-snug text-muted text-pretty">
            Have a project in mind? Tell me a little about it — I usually reply within 24 hours with questions, a rough plan
            and an estimate.
          </p>

          <form onSubmit={submit} className="flex flex-col gap-10">
            <Field number="01" label="What's your name?" htmlFor="name">
              <input id="name" name="name" required autoComplete="name" value={form.name} onChange={update} placeholder="Jane Doe" className={inputClass} />
            </Field>
            <Field number="02" label="What's your email?" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={update}
                placeholder="jane@company.com"
                className={inputClass}
              />
            </Field>
            <fieldset>
              <legend className="mb-4 flex items-baseline gap-4 text-sm">
                <span className="font-mono text-xs text-muted">03</span>
                <span className="font-medium">What are you looking for?</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => {
                  const on = types.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleType(t)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                        on ? "border-fg bg-fg text-bg" : "border-fg/15 hover:border-fg/50"
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <Field number="04" label="Tell me about your project" htmlFor="message">
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={update}
                placeholder="Goals, timeline, links — anything that helps."
                className={cn(inputClass, "resize-none")}
              />
            </Field>

            <div className="flex flex-wrap items-center gap-6">
              <button type="submit" disabled={status === "sending"} className="btn-primary group/roll h-14 px-8 text-base disabled:opacity-60">
                <RollText>{status === "sending" ? "Sending…" : "Send message"}</RollText>
                {status === "sending" ? <FiLoader className="h-4 w-4 animate-spin" /> : <FiSend className="h-4 w-4" />}
              </button>
              <p aria-live="polite" className="text-sm">
                {status === "sent" && (
                  <span className="inline-flex items-center gap-2">
                    <FiCheck className="h-4 w-4 text-accent-text" /> Thanks! Your message is on its way — I&apos;ll be in touch soon.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-red-500">
                    Something went wrong. Please email me at{" "}
                    <a className="underline" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                    .
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>

        {/* Details */}
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <div className="flex flex-col gap-10 lg:sticky lg:top-28">
            <div className="rounded-[24px] border border-fg/10 bg-surface p-7">
              <div className="flex items-center gap-2.5 text-sm">
                <StatusDot />
                Available for freelance work
              </div>
              <p className="mt-6 text-sm leading-snug text-muted">The fastest way to reach me:</p>
              <WhatsAppButton className="mt-3 h-14 w-full text-base" />
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-center font-mono text-sm tracking-tight text-muted hover:text-fg"
              >
                {whatsapp.number}
              </a>
              <p className="eyebrow mt-8">Email</p>
              <a href={`mailto:${profile.email}`} className="mt-2 block break-all text-xl font-medium tracking-tight hover:underline">
                {profile.email}
              </a>
              <CopyButton value={profile.email} className="mt-3 border-fg/20" />
              <p className="eyebrow mt-8">Phone & WhatsApp</p>
              <a href={profile.phoneHref} className="mt-2 block text-xl font-medium tracking-tight hover:underline">
                {profile.phone}
              </a>
              <p className="eyebrow mt-8">Local time</p>
              <LocalTime className="mt-2 block text-xl font-medium tracking-tight" />
              <div className="mt-8 flex gap-5 border-t border-fg/10 pt-6 text-sm">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 hover:underline">
                    {s.label}
                    <FiArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="eyebrow mb-3">Questions</h2>
              <ul className="border-b border-fg/10">
                {faqs.map((f) => (
                  <Faq key={f.q} {...f} />
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
