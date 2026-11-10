/**
 * Whether to play the loading screen: once per browser session, and never for people who
 * prefer reduced motion. Evaluated once when the app loads (so React StrictMode's double
 * renders can't flip it).
 */
function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    if (sessionStorage.getItem("intro-played")) return false;
    sessionStorage.setItem("intro-played", "1");
  } catch {
    /* storage blocked — just play it */
  }
  return true;
}

export const PLAY_INTRO = shouldPlayIntro();
