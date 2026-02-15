"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

const educationItems = [
  {
    title:
      "Master studije (u toku): Računarstvo i informatika (modul: Softversko inženjerstvo)",
    details: "Elektronski fakultet, Univerzitet u Nišu",
    status: "active",
  },
  {
    title:
      "Diplomirane studije: Računarstvo i informatika (Elektronski fakultet / Univerzitet u Nišu)",
    details: "Diplomirala 2024",
    status: "completed",
  },
  {
    title: "Srednja škola: Farmaceutski tehničar",
    details: "2015–2019",
    status: "completed",
  },
];

const timelineVariants = {
  hidden: { opacity: 0, x: -30 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Education() {
  return (
    <Reveal>
      <Section id="education" eyebrow="Obrazovanje" title="Akademski put">
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-sky-500 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          <ul className="space-y-4">
            {educationItems.map((item, i) => (
              <motion.li
                key={item.title}
                custom={i}
                variants={timelineVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="group relative pl-8"
              >
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-0 top-5 h-[22px] w-[22px] rounded-full border-2 ${
                    item.status === "active"
                      ? "border-sky-500 bg-sky-500/20 dark:border-cyan-400 dark:bg-cyan-400/20"
                      : "border-slate-400 bg-white dark:border-slate-600 dark:bg-slate-900"
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15 + 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                >
                  {item.status === "active" && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-sky-500/30 dark:bg-cyan-400/30"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </motion.div>

                <motion.div
                  className="card-premium rounded-2xl p-4 transition-transform duration-300 group-hover:-translate-y-1"
                  whileHover={{
                    boxShadow: "0 8px 30px rgba(56,189,248,0.15)",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {item.details}
                      </p>
                    </div>
                    {item.status === "active" && (
                      <motion.span
                        className="shrink-0 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700 dark:bg-cyan-900/50 dark:text-cyan-300"
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        U toku
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Section>
    </Reveal>
  );
}
