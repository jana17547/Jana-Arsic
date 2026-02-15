"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";

const navLinks = [
  { id: "hero", href: "/#hero", label: "Početna" },
  { id: "about", href: "/#about", label: "O meni" },
  { id: "skills", href: "/#skills", label: "Veštine" },
  { id: "projects", href: "/#projects", label: "Projekti" },
  { id: "education", href: "/#education", label: "Obrazovanje" },
  { id: "contact", href: "/#contact", label: "Kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window === "undefined") {
      return "hero";
    }

    return window.location.hash.replace("#", "") || "hero";
  });

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionElements = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionElements.length) {
      return;
    }

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (rafId) {
          return;
        }

        rafId = window.requestAnimationFrame(() => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          const nextSection = visibleEntries[0]?.target.id;
          if (nextSection) {
            setActiveSection((current) =>
              current === nextSection ? current : nextSection,
            );
          }

          rafId = 0;
        });
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    const onHashChange = () => {
      const nextHash = window.location.hash.replace("#", "");
      if (nextHash) {
        setActiveSection(nextHash);
      }
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname]);

  const isHome = useMemo(() => pathname === "/", [pathname]);
  const visibleActiveSection = isHome ? activeSection : "";

  return (
    <header className="sticky top-0 z-50 border-b border-white/45 bg-white/55 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/55">
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500/70 via-indigo-500/70 to-purple-500/70 dark:from-cyan-400/70 dark:via-indigo-400/70 dark:to-purple-400/70"
      />

      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/#hero"
          className="group inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100"
        >
          <m.span
            className="h-2.5 w-2.5 rounded-full bg-sky-500 shadow-[0_0_14px_rgba(56,189,248,0.65)] dark:bg-cyan-400"
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: [1, 1.22, 1], opacity: [0.8, 1, 0.8] }
            }
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>Jana Arsić</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "nav-link rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300",
                    visibleActiveSection === link.id && "nav-link-active",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle
            labels={{
              dark: "Tamno",
              light: "Svetlo",
              neutral: "Tema",
              ariaLabel: "Promeni temu",
            }}
          />
        </div>
      </nav>

      <ul className="mx-auto flex w-full max-w-6xl items-center gap-2 overflow-x-auto px-4 pb-3 md:hidden sm:px-6 lg:px-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "nav-link rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                visibleActiveSection === link.id && "nav-link-active",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
