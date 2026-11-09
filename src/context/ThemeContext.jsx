import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

const META_COLORS = { dark: "#0b0b0c", light: "#f3f1ec" };

const ThemeContext = createContext({ theme: "dark", toggle: () => {} });

const readInitial = () => {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : "dark";
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage can be blocked — the attribute still applies */
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLORS[theme]);
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitial);

  useEffect(() => applyTheme(theme), [theme]);

  /** Switch theme. With an event, the new theme grows out of the clicked element as a circle. */
  const toggle = useCallback((event) => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduced || !event?.currentTarget) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => {
      applyTheme(next);
      flushSync(() => setTheme(next));
    });
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      })
      .catch(() => {});
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
