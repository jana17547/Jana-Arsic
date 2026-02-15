"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { getBlurDataURL } from "@/lib/image";

type ProjectDetailProps = {
  project: Project;
};

const ProjectLightbox = dynamic(() => import("@/components/ProjectLightbox"), {
  ssr: false,
});

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const screenshots = useMemo(
    () => (project.screenshots.length ? project.screenshots : [project.coverImage]),
    [project.coverImage, project.screenshots],
  );
  const [activeScreenshot, setActiveScreenshot] = useState<number | null>(null);
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshotsRef = useRef<HTMLDivElement | null>(null);

  const closeLightbox = useCallback(() => setActiveScreenshot(null), []);

  const goNext = useCallback(() => {
    setActiveScreenshot((current) => {
      if (current === null) {
        return 0;
      }

      return (current + 1) % screenshots.length;
    });
  }, [screenshots.length]);

  const goPrev = useCallback(() => {
    setActiveScreenshot((current) => {
      if (current === null) {
        return 0;
      }

      return current === 0 ? screenshots.length - 1 : current - 1;
    });
  }, [screenshots.length]);

  useEffect(() => {
    if (showScreenshots) {
      return;
    }

    const node = screenshotsRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        setShowScreenshots(true);
        observer.disconnect();
      },
      { rootMargin: "260px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [showScreenshots]);

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
  }, [activeScreenshot, closeLightbox, goNext, goPrev]);

  return (
    <>
      <m.article
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
              placeholder="blur"
              blurDataURL={getBlurDataURL(16, 9)}
              className="object-cover"
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

            <div id="project-screenshots" ref={screenshotsRef} className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Screenshots
              </h2>
              {showScreenshots ? (
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            placeholder="blur"
                            blurDataURL={getBlurDataURL(16, 9)}
                            className="object-cover transition duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowScreenshots(true)}
                  className="btn-glow inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                >
                  Učitaj screenshots
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-glow inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-glow inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowScreenshots(true);
                    setActiveScreenshot(0);
                  }}
                  className="btn-glow inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  Screenshots available
                </button>
              )}
            </div>
          </div>
        </section>
      </m.article>

      <AnimatePresence>
        {activeScreenshot !== null ? (
          <ProjectLightbox
            projectTitle={project.title}
            screenshots={screenshots}
            activeScreenshot={activeScreenshot}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
