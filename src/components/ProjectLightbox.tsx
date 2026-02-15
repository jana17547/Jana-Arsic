"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getBlurDataURL } from "@/lib/image";

type ProjectLightboxProps = {
  projectTitle: string;
  screenshots: string[];
  activeScreenshot: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function ProjectLightbox({
  projectTitle,
  screenshots,
  activeScreenshot,
  onClose,
  onPrev,
  onNext,
}: ProjectLightboxProps) {
  return (
    <m.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        aria-label="Zatvori prikaz slike"
      />

      <m.div
        className="card-premium relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl"
        initial={{ opacity: 0, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.985 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white/85 text-slate-700 dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-[16/9] w-full">
          <Image
            src={screenshots[activeScreenshot]}
            alt={`${projectTitle} screenshot ${activeScreenshot + 1}`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            placeholder="blur"
            blurDataURL={getBlurDataURL(16, 9)}
            className="object-contain bg-slate-950"
          />
        </div>

        <div className="flex items-center justify-between border-t border-slate-200/80 px-4 py-3 dark:border-slate-800/80 sm:px-6">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {projectTitle}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
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
              onClick={onNext}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200"
              aria-label="Sledeća slika"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}
