"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        menuPanelRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target)
      ) {
        return;
      }

      setIsMobileMenuOpen(false);
    };

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMobileMenuOpen]);

  const isHome = pathname === "/";
  const visibleActiveSection = isHome ? activeSection : "";
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/45 bg-white/55 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/55">
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500/70 via-indigo-500/70 to-purple-500/70 dark:from-cyan-400/70 dark:via-indigo-400/70 dark:to-purple-400/70"
      />

      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8 lg:px-16">
        <Link
          href="/#hero"
          className="group inline-flex items-center gap-2 text-base font-semibold tracking-tight text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:text-slate-100 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-slate-900 sm:text-lg"
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

        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "nav-link rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:text-slate-300 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-slate-900",
                    visibleActiveSection === link.id && "nav-link-active",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle
            className="hidden md:inline-flex"
            labels={{
              dark: "Tamno",
              light: "Svetlo",
              neutral: "Tema",
              ariaLabel: "Promeni temu",
            }}
          />

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMobileMenuOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300/80 bg-white/80 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-900 md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <>
            <m.button
              key="mobile-menu-backdrop"
              type="button"
              aria-label="Zatvori mobilni meni"
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            />
            <m.div
              key="mobile-menu-panel"
              id="mobile-navigation"
              ref={menuPanelRef}
              className="absolute inset-x-4 top-[calc(100%+0.5rem)] z-50 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.18)] dark:border-slate-700/80 dark:bg-slate-950/95 md:hidden"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.98 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.985 }}
              transition={{ duration: shouldReduceMotion ? 0.12 : 0.2, ease: "easeOut" }}
            >
              <ul className="space-y-1.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "nav-link block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:text-slate-300 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-slate-900",
                        visibleActiveSection === link.id && "nav-link-active",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-slate-200/80 pt-4 dark:border-slate-700/80">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  Tema
                </p>
                <ThemeToggle
                  className="w-full justify-center px-4 py-2 text-sm"
                  labels={{
                    dark: "Tamno",
                    light: "Svetlo",
                    neutral: "Tema",
                    ariaLabel: "Promeni temu",
                  }}
                />
              </div>
            </m.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
