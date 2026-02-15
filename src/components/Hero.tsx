"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const roles = [
  "Junior Software Engineer | Full Stack",
];

const techIcons = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"];

function useTypingEffect(words: string[], typingSpeed = 80, deleteSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          if (displayText.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deleteSpeed, pauseTime]);

  return displayText;
}

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  const typedText = useTypingEffect(roles);
  const nameLetters = "Jana Arsić".split("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      className="card-premium relative isolate overflow-hidden rounded-[2rem] px-6 py-16 sm:px-10 sm:py-20 lg:py-24"
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl dark:bg-cyan-500/20"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/20"
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-48 rounded-full bg-purple-400/15 blur-3xl dark:bg-purple-500/15"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [0.8, 1.1, 0.9, 0.8],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        {/* Eyebrow with animated line */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center gap-3"
        >
          <motion.div
            className="h-px bg-gradient-to-r from-sky-500 to-transparent dark:from-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Portfolio
          </span>
        </motion.div>

        {/* Animated name - letter by letter with 3D flip */}
        <h1 className="text-5xl font-bold leading-[1.06] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-slate-100">
          {mounted ? (
            nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ perspective: 600 }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))
          ) : (
            <span>Jana Arsić</span>
          )}
        </h1>

        {/* Typing effect subtitle */}
        <div className="mt-4 flex items-center gap-1 text-lg font-medium text-slate-700 sm:text-2xl dark:text-slate-300">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400"
          >
            {typedText}
          </motion.span>
          <motion.span
            className="inline-block h-7 w-0.5 bg-sky-500 sm:h-8 dark:bg-cyan-400"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>

        {/* Description with staggered reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
        >
          Razvijam moderne web aplikacije koristeći React, Next.js i TypeScript,
          uz fokus na stabilan kod i dobro korisničko iskustvo.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
        >
          Kroz projekte sam radila na razvoju funkcionalnosti od UI sloja do
          backend logike, uključujući REST API integracije i rad sa bazama
          podataka.
        </motion.p>

        {/* Floating tech badges */}
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 1.0 },
            },
          }}
        >
          {techIcons.map((tech) => (
            <motion.span
              key={tech}
              variants={{
                hidden: { opacity: 0, scale: 0, rotate: -180 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  },
                },
              }}
              whileHover={{
                scale: 1.15,
                y: -4,
                boxShadow: "0 8px 30px rgba(56,189,248,0.3)",
              }}
              className="cursor-default rounded-full border border-sky-200/50 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm dark:border-cyan-800/50 dark:bg-slate-900/80 dark:text-slate-200"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons with glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="/#projects">
            <motion.span
              className="btn-glow relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <span className="relative">View Projects</span>
              <motion.span
                className="relative"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.span>
          </Link>
          <Link href="/#contact">
            <motion.span
              className="btn-glow inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <Link href="/#about">
          <motion.span
            className="inline-flex flex-col items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>Scroll</span>
            <span className="relative h-6 w-4 rounded-full border-2 border-slate-400/60 dark:border-slate-600">
              <motion.span
                className="absolute left-1/2 top-1 h-1.5 w-1 -translate-x-1/2 rounded-full bg-sky-500 dark:bg-cyan-400"
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
