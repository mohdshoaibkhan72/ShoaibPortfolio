import { useEffect, useState } from "react";

export const cn = (...classes) => classes.filter(Boolean).join(" ");

/** Shared easing — a soft "expo out" used for most motion on the site. */
export const EASE = [0.16, 1, 0.3, 1];

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

/** Live clock for Shoaib's local time (IST). */
export function useLocalTime() {
  const [time, setTime] = useState(() => timeFormat.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(timeFormat.format(new Date())), 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** Whole years elapsed since a "YYYY-MM" date, so stats don't go stale. */
export function yearsSince(yyyyMm) {
  const [y, m] = yyyyMm.split("-").map(Number);
  const now = new Date();
  let years = now.getFullYear() - y;
  if (now.getMonth() + 1 < m) years -= 1;
  return Math.max(years, 0);
}

/** Soft, brand-tinted backdrop — matches the look of the ready-made mockups. */
export const pastelBackground = (color) => ({
  background: [
    "radial-gradient(70% 55% at 50% 0%, rgba(255,255,255,0.85), transparent 70%)",
    `linear-gradient(180deg, color-mix(in oklab, ${color} 8%, #fbfaf7), color-mix(in oklab, ${color} 19%, #f1eee8))`,
  ].join(","),
});

