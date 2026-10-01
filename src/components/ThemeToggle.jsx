import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

/* 3D flipping coin: moon on one face, sun on the other */
export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      data-mode={theme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`theme-toggle relative h-10 w-10 shrink-0 rounded-full ${className}`}
    >
      <span className="coin absolute inset-0 block">
        <span className="face absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-700 shadow-lg shadow-indigo-500/40 ring-1 ring-white/20 keep-white">
          <FaMoon className="h-4 w-4" />
        </span>
        <span className="face back absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-lg shadow-amber-400/50 ring-1 ring-white/40 keep-white">
          <FaSun className="h-4 w-4" />
        </span>
      </span>
    </button>
  );
}
