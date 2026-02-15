"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";

const role = "Junior Software Engineer | Full Stack";
const techIcons = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"];

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const allowAmbientMotion = !shouldReduceMotion && !isSmallScreen;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateScreen = () => setIsSmallScreen(mediaQuery.matches);
    updateScreen();
    mediaQuery.addEventListener("change", updateScreen);

    return () => mediaQuery.removeEventListener("change", updateScreen);
  }, []);

  return (
    <section
      id="hero"
      className="card-premium relative isolate overflow-hidden rounded-[2rem] px-6 py-16 sm:px-10 sm:py-20 lg:py-24"
    >
      <m.div
        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl dark:bg-cyan-500/20"
        animate={
          allowAmbientMotion
            ? {
                x: [0, 26, 0],
                y: [0, -18, 0],
                scale: [1, 1.15, 1],
              }
            : undefined
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/20"
        animate={
          allowAmbientMotion
            ? {
                x: [0, -20, 0],
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
              }
            : undefined
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        <m.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: easing }}
          className="mb-6 flex items-center gap-3"
        >
          <m.div
            className="h-px origin-left bg-gradient-to-r from-sky-500 to-transparent dark:from-cyan-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            style={{ width: 48 }}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Portfolio
          </span>
        </m.div>

        <m.h1
          className="text-5xl font-bold leading-[1.06] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-slate-100"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
        >
          Jana Arsić
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: easing }}
          className="mt-4 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-lg font-medium text-transparent sm:text-2xl dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400"
        >
          {role}
        </m.p>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: easing }}
          className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
        >
          Razvijam moderne web aplikacije koristeći React, Next.js i TypeScript,
          uz fokus na stabilan kod i dobro korisničko iskustvo.
        </m.p>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28, ease: easing }}
          className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
        >
          Kroz projekte sam radila na razvoju funkcionalnosti od UI sloja do
          backend logike, uključujući REST API integracije i rad sa bazama
          podataka.
        </m.p>

        <m.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.32, ease: easing }}
        >
          {techIcons.map((tech) => (
            <span
              key={tech}
              className="cursor-default rounded-full border border-sky-200/50 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm dark:border-cyan-800/50 dark:bg-slate-900/80 dark:text-slate-200"
            >
              {tech}
            </span>
          ))}
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38, ease: easing }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="/#projects">
            <span className="btn-glow relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
              <span className="relative">View Projects</span>
              <span className="relative">→</span>
            </span>
          </Link>
          <Link href="/#contact">
            <span className="btn-glow inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
              Contact Me
            </span>
          </Link>
        </m.div>
      </div>
    </section>
  );
}
