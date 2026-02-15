"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "portfolio-theme";

type ThemeToggleLabels = {
  dark: string;
  light: string;
  neutral: string;
  ariaLabel: string;
};

type ThemeToggleProps = {
  labels?: ThemeToggleLabels;
};

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function setDocumentTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function ThemeToggle({ labels }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const systemTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = isTheme(savedTheme) ? savedTheme : systemTheme;

    setTheme(initialTheme);
    setDocumentTheme(initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    setDocumentTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={labels?.ariaLabel ?? "Toggle dark mode"}
      className="btn-glow rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
    >
      {mounted
        ? theme === "light"
          ? (labels?.dark ?? "Dark")
          : (labels?.light ?? "Light")
        : (labels?.neutral ?? "Theme")}
    </button>
  );
}
