"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

const skillsByCategory = [
  {
    category: "Frontend",
    color: "from-sky-500 to-blue-600",
    darkColor: "dark:from-cyan-400 dark:to-blue-500",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "TailwindCSS",
    ],
  },
  {
    category: "Backend",
    color: "from-indigo-500 to-purple-600",
    darkColor: "dark:from-indigo-400 dark:to-purple-500",
    skills: ["Node.js", "Express", "Laravel", "ASP.NET Core", "REST API"],
  },
  {
    category: "Baze podataka",
    color: "from-emerald-500 to-teal-600",
    darkColor: "dark:from-emerald-400 dark:to-teal-500",
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    category: "Alati",
    color: "from-amber-500 to-orange-600",
    darkColor: "dark:from-amber-400 dark:to-orange-500",
    skills: ["Git", "Postman", "Prisma", "Docker (osnove)", "Figma"],
  },
  {
    category: "Ostalo",
    color: "from-rose-500 to-pink-600",
    darkColor: "dark:from-rose-400 dark:to-pink-500",
    skills: ["Responsive dizajn", "UI/UX principi", "rad u timu"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const skillBadgeVariants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
};

export default function Skills() {
  return (
    <Reveal>
      <Section
        id="skills"
        eyebrow="Veštine"
        title="Tehnologije i alati"
        description="Fokus mi je razvoj frontend rešenja u React i Next.js okruženju, uz backend iskustvo koje omogućava full stack realizaciju funkcionalnosti."
      >
        <motion.div
          className="grid gap-5 md:grid-cols-2"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {skillsByCategory.map((group) => (
            <motion.article
              key={group.category}
              variants={cardVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="card-premium group relative space-y-3 rounded-2xl p-5"
            >
              {/* Hover glow effect */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${group.color} ${group.darkColor} opacity-[0.08] blur-sm`} />
              </div>

              <div className="relative">
                <h3 className={`inline-block bg-gradient-to-r ${group.color} ${group.darkColor} bg-clip-text text-sm font-semibold uppercase tracking-wide text-transparent`}>
                  {group.category}
                </h3>
                <motion.ul
                  className="mt-3 flex flex-wrap gap-2"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
                  }}
                >
                  {group.skills.map((skill) => (
                    <motion.li key={skill} variants={skillBadgeVariants}>
                      <motion.span
                        whileHover={{
                          scale: 1.1,
                          y: -2,
                          boxShadow: "0 4px 20px rgba(56,189,248,0.2)",
                        }}
                        className="inline-flex cursor-default rounded-full border border-slate-300/70 bg-white/75 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
                      >
                        {skill}
                      </motion.span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Section>
    </Reveal>
  );
}
