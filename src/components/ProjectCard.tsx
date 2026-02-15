"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

const springConfig = { stiffness: 180, damping: 20, mass: 0.6 };

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const rotateX = useSpring(rotateXRaw, springConfig);
  const rotateY = useSpring(rotateYRaw, springConfig);

  const shine = useMotionTemplate`radial-gradient(340px circle at ${pointerX}% ${pointerY}%, rgba(125, 211, 252, 0.24), rgba(129, 140, 248, 0.12) 40%, transparent 70%)`;

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    pointerX.set(x * 100);
    pointerY.set(y * 100);
    rotateYRaw.set((x - 0.5) * 6);
    rotateXRaw.set((0.5 - y) * 6);
  };

  const onPointerLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    pointerX.set(50);
    pointerY.set(50);
  };

  return (
    <motion.article
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className={cn(
        "card-premium group relative flex h-full flex-col rounded-3xl",
        featured && "ring-1 ring-sky-300/70 dark:ring-cyan-400/30",
      )}
    >
      <motion.div
        style={{ background: shine }}
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative z-10 flex h-full flex-col">
        <Link
          href={`/projects/${project.slug}`}
          className={cn(
            "relative block overflow-hidden rounded-t-3xl",
            featured ? "h-56 sm:h-64" : "h-52",
          )}
        >
          <Image
            src={project.coverImage}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            priority={featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
          {featured ? (
            <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
              Featured
            </span>
          ) : null}
        </Link>

        <div className="flex flex-1 flex-col space-y-4 p-5 sm:p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              <Link href={`/projects/${project.slug}`} className="text-link">
                {project.title}
              </Link>
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {project.summary}
            </p>
          </div>

          <motion.ul
            className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {project.highlights.slice(0, 4).map((highlight) => (
              <motion.li
                key={highlight}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {highlight}
              </motion.li>
            ))}
          </motion.ul>

          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li key={technology}>
                <span className="inline-flex rounded-full border border-slate-300/70 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
                  {technology}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Demo
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-slate-300/80 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
                Screenshots available
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
