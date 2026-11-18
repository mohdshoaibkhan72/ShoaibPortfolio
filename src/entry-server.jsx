/**
 * Build-time renderer (not shipped to browsers). scripts/prerender.mjs loads the SSR build of
 * this file and calls render() once per route to write static HTML for every page.
 */
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

export { ROUTES, getRouteMeta, renderHeadTags, SITE_URL } from "./seo/meta";
export { servicePages } from "./data/services";
export { projectsData, CATEGORIES } from "./data/projects";
export { profile, heroPortrait, experience, services, socials, education, faqs, whatsapp } from "./data/site";

/** Render the app at `url` to an HTML string, waiting for lazy-loaded pages to resolve. */
export function render(url) {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new PassThrough();
    sink.on("data", (chunk) => (html += chunk));
    sink.on("end", () => resolve(html));
    sink.on("error", reject);

    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      {
        onAllReady: () => stream.pipe(sink),
        onShellError: reject,
        onError: (err) => reject(err),
      }
    );
  });
}
