/**
 * Generates social-share images and app icons into /public (run manually, commit the output):
 *
 *   npm run og
 *
 *   public/og/default.jpg               1200×630  — home, about, projects, experience, contact
 *                                                  (made from public/og.png if that file exists —
 *                                                   swap og.png and re-run to change the share image)
 *   public/og/projects/<id>.jpg         1200×630  — one per case study
 *   public/icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png, favicon.ico
 *
 * Renders scripts/og/card.html in headless Microsoft Edge / Google Chrome through the DevTools
 * protocol (Node's built-in WebSocket — no extra dependencies). Needs an internet connection for
 * Google Fonts. Set BROWSER_PATH to use a specific browser binary.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { CATEGORIES, projectsData, projectChips } from "../../src/data/projects.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const pub = join(root, "public");
const cardUrl = pathToFileURL(join(root, "scripts/og/card.html")).href;

/* ------------------------------------------------------------ browser */

const CANDIDATES = [
  process.env.BROWSER_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/microsoft-edge",
].filter(Boolean);
const browserPath = CANDIDATES.find((p) => existsSync(p));
if (!browserPath) throw new Error("No Edge/Chrome found — set BROWSER_PATH to a Chromium-based browser.");

const profileDir = await mkdtemp(join(tmpdir(), "og-browser-"));
const browser = spawn(browserPath, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  "--allow-file-access-from-files",
  "--remote-debugging-port=0",
  `--user-data-dir=${profileDir}`,
  "about:blank",
]);

const wsUrl = await new Promise((res, rej) => {
  const timer = setTimeout(() => rej(new Error("Browser did not start")), 20000);
  browser.stderr.on("data", (d) => {
    const m = /DevTools listening on (ws:\/\/\S+)/.exec(String(d));
    if (m) {
      clearTimeout(timer);
      res(m[1]);
    }
  });
});

const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let nextId = 0;
const pending = new Map();
const waiters = [];
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
  } else if (msg.method) {
    for (const w of [...waiters]) if (w.method === msg.method) w.resolve(msg.params);
  }
});
const send = (method, params = {}, sessionId) =>
  new Promise((res, rej) => {
    const id = ++nextId;
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const page = (method, params) => send(method, params, sessionId);
await page("Page.enable");

async function shoot(spec, { width = 1200, height = 630, format = "jpeg", transparent = false }) {
  await page("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  await page("Emulation.setDefaultBackgroundColorOverride", transparent ? { color: { r: 0, g: 0, b: 0, a: 0 } } : {});
  // Navigate via a fresh hash each time (about:blank first so the page really reloads).
  await page("Page.navigate", { url: "about:blank" });
  await page("Page.navigate", { url: `${cardUrl}#${encodeURIComponent(JSON.stringify(spec))}` });
  const { result } = await page("Runtime.evaluate", {
    expression: "new Promise(r => { const t = () => window.cardReady ? window.cardReady.then(r) : setTimeout(t, 30); t(); })",
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.value !== true) throw new Error("Card did not become ready");
  const { data } = await page("Page.captureScreenshot", {
    format,
    ...(format === "jpeg" ? { quality: 86 } : {}),
    clip: { x: 0, y: 0, width, height, scale: 1 },
  });
  return Buffer.from(data, "base64");
}

async function save(rel, buf) {
  const file = join(pub, rel);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, buf);
  console.log(`  ${rel.padEnd(34)} ${(buf.length / 1024).toFixed(0).padStart(4)} KB`);
}

/** Wrap one PNG in an .ico container (PNG-compressed ICO, supported by every current browser). */
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(size >= 256 ? 0 : size, 6);
  header.writeUInt8(size >= 256 ? 0 : size, 7);
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // offset of image data
  return Buffer.concat([header, png]);
}

/* ------------------------------------------------------------ render */

const careerYears = (() => {
  const now = new Date();
  return now.getFullYear() - 2023 - (now.getMonth() + 1 < 1 ? 1 : 0);
})();

try {
  console.log(`Rendering with ${browserPath}\n`);

  // Your own design in public/og.png wins; otherwise a card is drawn from card.html.
  const custom = existsSync(join(pub, "og.png"));
  const defaultSpec = custom ? { kind: "image", src: "/og.png" } : { kind: "default", years: careerYears };
  await save("og/default.jpg", await shoot(defaultSpec, {}));

  for (const p of projectsData) {
    const spec = {
      kind: "project",
      name: p.name,
      tagline: p.tagline,
      color: p.color,
      category: CATEGORIES[p.category].label,
      chips: projectChips(p),
      cover: p.cover,
    };
    await save(`og/projects/${p.id}.jpg`, await shoot(spec, {}));
  }

  const icon = (size, scale, bg) => shoot({ kind: "icon", size, scale, bg }, { width: size, height: size, format: "png", transparent: !bg });
  await save("favicon-96x96.png", await icon(96, 1)); // Google Search favicon (multiple of 48px)
  await save("icon-192.png", await icon(192, 1));
  await save("icon-512.png", await icon(512, 1));
  await save("icon-maskable-512.png", await icon(512, 0.8, "#0b0b0c")); // content inside the 80% safe zone
  await save("apple-touch-icon.png", await icon(180, 1, "#0b0b0c")); // iOS rounds the corners itself
  await save("favicon.ico", pngToIco(await icon(48, 1), 48));
} finally {
  ws.close();
  browser.kill();
  await new Promise((r) => setTimeout(r, 300));
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
}
