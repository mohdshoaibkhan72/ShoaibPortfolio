import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_NAME, absoluteUrl, getRouteMeta, jsonForScript } from "../seo/meta";

/** Find-or-create a <meta> by attribute, then set its content (or remove it when content is empty). */
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keeps <head> in sync with the current route during client-side navigation.
 * The first load already has the right tags baked in by the prerender step;
 * this only matters once the visitor clicks around. All values come from src/seo/meta.js.
 */
export function SEOHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const image = absoluteUrl(meta.image.src);

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta(
      "name",
      "robots",
      meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );
    setLink("canonical", meta.url);

    setMeta("property", "og:type", meta.type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", meta.url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:width", String(meta.image.width));
    setMeta("property", "og:image:height", String(meta.image.height));
    setMeta("property", "og:image:alt", meta.image.alt);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", image);
    setMeta("name", "twitter:image:alt", meta.image.alt);

    let ld = document.getElementById("seo-jsonld");
    if (!meta.jsonLd) {
      ld?.remove();
    } else {
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "seo-jsonld";
        document.head.appendChild(ld);
      }
      ld.textContent = jsonForScript(meta.jsonLd);
    }
  }, [pathname]);

  return null;
}
