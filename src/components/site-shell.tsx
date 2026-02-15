"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/MotionProvider";

const FloatingParticles = dynamic(() => import("@/components/FloatingParticles"), {
  ssr: false,
});
const MouseGlow = dynamic(() => import("@/components/MouseGlow"), {
  ssr: false,
});

const socialLinks = [
  { href: "https://github.com/jana17547", label: "GitHub" },
  { href: "mailto:janaarsic04@gmail.com", label: "Email" },
];

type SiteShellProps = {
  children: React.ReactNode;
  currentYear: number;
};

export default function SiteShell({ children, currentYear }: SiteShellProps) {
  return (
    <MotionProvider>
      <div className="app-shell relative min-h-screen overflow-hidden text-slate-900 transition-colors duration-500 dark:text-slate-100">
        <div aria-hidden className="aurora-bg" />
        <div aria-hidden className="noise-bg" />
        <FloatingParticles count={14} />
        <MouseGlow />

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="border-t border-slate-200/80 px-4 py-6 backdrop-blur-sm dark:border-slate-800/80 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © {currentYear} Jana Arsić
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-link text-sm text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      link.href.startsWith("mailto:")
                        ? undefined
                        : "noreferrer noopener"
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </MotionProvider>
  );
}
