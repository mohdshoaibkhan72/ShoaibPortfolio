import { useEffect } from "react";

const BASE_URL = "https://mohammadshoaibkhan.com";
const OG_IMAGE = "https://res.cloudinary.com/dt7qppfbh/image/upload/v1762139970/aiimg1_jlasiv.png";

export function SEOHead({
  title = "Mohammad Shoaib Khan | Full-Stack & Mobile App Developer",
  description = "Senior Full-Stack & Mobile App Developer with 3+ years experience. Currently at Loanyfy (fintech). Expert in React Native, MERN Stack. 16+ production apps delivered.",
  keywords = "Full-Stack Developer, React Native Developer, MERN Stack, Mobile App Developer, Freelance Developer India, Loanyfy Developer",
  canonicalPath = "/",
  ogImage = OG_IMAGE,
  structuredData = null,
}) {
  useEffect(() => {
    // Title
    document.title = title;

    const setMeta = (selector, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attr, val] = selector.replace("[", "").replace("]", "").split("=");
        el.setAttribute(attr.trim(), val.replace(/"/g, "").trim());
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[name="keywords"]', keywords);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:url"]', `${BASE_URL}${canonicalPath}`);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', ogImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${canonicalPath}`);

    // JSON-LD
    if (structuredData) {
      let script = document.querySelector('script[data-page-ld]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("data-page-ld", "true");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    return () => {
      // reset to defaults on unmount (home page values)
      document.title = "Mohammad Shoaib Khan | Full-Stack & Mobile App Developer";
    };
  }, [title, description, keywords, canonicalPath, ogImage, structuredData]);

  return null;
}
