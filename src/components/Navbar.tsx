"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
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
  const [activeSection, setActiveSection] = useState<string>("hero");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionElements = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionElements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-32% 0px -52% 0px",
        threshold: [0.12, 0.25, 0.4, 0.6, 0.8],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    const currentHash = window.location.hash.replace("#", "");
    if (currentHash) {
      setActiveSection(currentHash);
    }

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
    };
  }, [pathname]);

  const isHome = useMemo(() => pathname === "/", [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/45 bg-white/55 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/55">
      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400"
        style={{ scaleX }}
      />

      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/#hero"
          className="group inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100"
        >
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-sky-500 shadow-[0_0_16px_rgba(56,189,248,0.85)] dark:bg-cyan-400"
            animate={{
              boxShadow: [
                "0 0 16px rgba(56,189,248,0.85)",
                "0 0 28px rgba(56,189,248,1)",
                "0 0 16px rgba(56,189,248,0.85)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Jana Arsić
          </motion.span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "nav-link rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300",
                    isHome && activeSection === link.id && "nav-link-active",
                  )}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <ThemeToggle
              labels={{
                dark: "Tamno",
                light: "Svetlo",
                neutral: "Tema",
                ariaLabel: "Promeni temu",
              }}
            />
          </motion.div>
        </div>
      </nav>

      <ul className="mx-auto flex w-full max-w-6xl items-center gap-2 overflow-x-auto px-4 pb-3 md:hidden sm:px-6 lg:px-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "nav-link rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300",
                isHome && activeSection === link.id && "nav-link-active",
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
