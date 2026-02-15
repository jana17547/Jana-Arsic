"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";

type ProjectDetailProps = {
  project: Project;
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const screenshots = useMemo(
    () => (project.screenshots.length ? project.screenshots : [project.coverImage]),
    [project.coverImage, project.screenshots],
  );
  const [activeScreenshot, setActiveScreenshot] = useState<number | null>(null);

  const closeLightbox = () => setActiveScreenshot(null);

  const goNext = () => {
    setActiveScreenshot((current) => {
      if (current === null) {
        return 0;
      }

      return (current + 1) % screenshots.length;
    });
  };

  const goPrev = () => {
    setActiveScreenshot((current) => {
      if (current === null) {
        return 0;
      }

      return current === 0 ? screenshots.length - 1 : current - 1;
    });
  };

  useEffect(() => {
    if (activeScreenshot === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeScreenshot, screenshots.length]);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-6"
      >
        <Link
          href="/projects"
          className="btn-glow inline-flex rounded-full border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
        >
          Nazad na projekte
        </Link>

        <section className="card-premium overflow-hidden rounded-3xl">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={project.coverImage}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Projekti
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                {project.title}
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {project.detailedDescription}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Tehnologije
              </h2>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li key={technology}>
                    <span className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {technology}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Ključne funkcionalnosti
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div id="project-screenshots" className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Screenshots
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {screenshots.map((screenshot, index) => (
                  <li key={`${screenshot}-${index}`}>
                    <button
                      type="button"
                      onClick={() => setActiveScreenshot(index)}
                      className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/70 shadow-sm ring-0 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-slate-700"
                    >
                      <div className="relative h-40 w-full">
                        <Image
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveScreenshot(0)}
                  className="btn-glow inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Screenshots available
                </button>
              )}
            </div>
          </div>
        </section>
      </motion.article>

      <AnimatePresence>
        {activeScreenshot !== null ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              aria-label="Zatvori prikaz slike"
            />

            <motion.div
              className="card-premium relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white/85 text-slate-700 dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={screenshots[activeScreenshot]}
                  alt={`${project.title} screenshot ${activeScreenshot + 1}`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain bg-slate-950"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-200/80 px-4 py-3 dark:border-slate-800/80 sm:px-6">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {project.title}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200"
                    aria-label="Prethodna slika"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {activeScreenshot + 1} / {screenshots.length}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200"
                    aria-label="Sledeća slika"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
