"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { getBlurDataURL } from "@/lib/image";

const stats = [
  { label: "Projekata", value: "3+" },
  { label: "Tehnologija", value: "15+" },
  { label: "Godina učenja", value: "4+" },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Reveal>
      <Section id="about" eyebrow="O meni" title="Ko sam i kako radim">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="space-y-6">
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Kroz razvoj web aplikacija najviše me motiviše balans između dobrog
              dizajna i funkcionalnosti. Važno mi je da aplikacija bude brza,
              pregledna i jednostavna za korišćenje, ali i da ima stabilnu
              strukturu koda koja omogućava lako proširenje. Imam iskustvo u radu
              sa modernim frontend tehnologijama, kao i u povezivanju aplikacija sa
              backend servisima kroz REST API i baze podataka.
            </p>

            {/* Animated stats */}
            <m.div
              className="flex flex-wrap gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {stats.map((stat) => (
                <m.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, scale: 0.5, y: 20 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      },
                    },
                  }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -1 }}
                  className="text-center"
                >
                  <span className="block bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-2xl font-bold text-transparent dark:from-cyan-400 dark:to-indigo-400">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </m.div>
              ))}
            </m.div>
          </div>

          <m.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative mx-auto sm:mx-0"
          >
            {/* Glow ring behind image */}
            <m.div
              className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 blur-xl dark:from-cyan-500/20 dark:via-indigo-500/15 dark:to-purple-500/15"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [0.5, 0.75, 0.5],
                      scale: [1, 1.03, 1],
                    }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <Image
              src="/img.jpg"
              alt="Profilna slika Jane Arsić"
              width={300}
              height={300}
              placeholder="blur"
              blurDataURL={getBlurDataURL(64, 64)}
              className="relative h-56 w-56 rounded-2xl border border-white/90 object-cover shadow-[0_18px_42px_rgba(15,23,42,0.2)] transition-transform duration-500 group-hover:scale-[1.03] sm:h-64 sm:w-64 dark:border-slate-700"
            />
          </m.div>
        </div>
      </Section>
    </Reveal>
  );
}
