"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Mail, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

const contactCards = [
  {
    title: "Email",
    value: "janaarsic04@gmail.com",
    href: "mailto:janaarsic04@gmail.com?subject=Upit%20sa%20portfolio%20sajta",
    description: "Za saradnju, posao ili tehničke upite, odgovaram direktno mejlom.",
    icon: Mail,
    cta: "Pošalji poruku",
  },
  {
    title: "GitHub",
    value: "github.com/jana17547",
    href: "https://github.com/jana17547",
    description: "Ako želiš pregled koda i projekata, ovde su svi relevantni repozitorijumi.",
    icon: Github,
    cta: "Otvori profil",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Reveal>
      <Section
        id="contact"
        eyebrow="Kontakt"
        title="Hajde da se povežemo"
        description="Najbrži kontakt je putem email-a. Otvorena sam za junior prilike i projekte gde mogu da doprinesem frontend i full stack razvoju."
      >
        <m.div
          className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contactCards.map((card) => {
            const Icon = card.icon;
            const isExternal = card.href.startsWith("http");

            return (
              <m.a
                key={card.title}
                variants={itemVariants}
                href={card.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer noopener" : undefined}
                whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
                className="card-premium group relative min-w-0 rounded-2xl p-4 text-center sm:p-5 sm:text-left"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center self-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-200">
                  <Icon className="h-5 w-5" />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>
                <p className="mt-2 break-all text-sm font-semibold text-slate-900 sm:text-base dark:text-slate-100">
                  {card.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {card.description}
                </p>

                <span className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-slate-800 sm:w-auto sm:justify-start dark:text-slate-100">
                  {card.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </m.a>
            );
          })}
        </m.div>

        <m.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto mt-4 max-w-4xl rounded-2xl border border-sky-200/70 bg-white/70 p-4 text-sm text-slate-700 shadow-[0_10px_35px_rgba(56,189,248,0.12)] backdrop-blur-md sm:p-5 dark:border-cyan-500/30 dark:bg-slate-900/65 dark:text-slate-200 dark:shadow-[0_16px_45px_rgba(34,211,238,0.15)]"
        >
          <p className="flex flex-col items-center gap-2 text-center leading-relaxed sm:flex-row sm:items-start sm:text-left">
            <Sparkles className="h-4 w-4 shrink-0 text-sky-500 dark:text-cyan-400 sm:mt-0.5" />
            <span>
              Najbolje je da mi pošalješ poruku na{" "}
              <a
                className="text-link break-all font-semibold"
                href="mailto:janaarsic04@gmail.com"
              >
                janaarsic04@gmail.com
              </a>{" "}
              i dodaš kratak opis projekta ili pozicije.
            </span>
          </p>
        </m.div>
      </Section>
    </Reveal>
  );
}
