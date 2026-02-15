"use client";

import dynamic from "next/dynamic";
import { m } from "framer-motion";
import Reveal, { revealItemVariants } from "@/components/Reveal";
import Section from "@/components/Section";
import { projects } from "@/data/projects";

const ProjectCard = dynamic(() => import("@/components/ProjectCard"));

const orderedProjects = [...projects].sort((a, b) => {
  if (a.slug === "artworks") return -1;
  if (b.slug === "artworks") return 1;
  return 0;
});

export default function Projects() {
  return (
    <Reveal>
      <Section
        id="projects"
        eyebrow="Projekti"
        title="Izdvojeni projekti"
        description="Svaki projekat je rađen sa fokusom na praktičnu primenu, stabilnu arhitekturu i jasno korisničko iskustvo."
      >
        <m.ul
          className="grid gap-6 md:grid-cols-2"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {orderedProjects.map((project) => (
            <m.li
              key={project.slug}
              variants={revealItemVariants}
              className={project.slug === "artworks" ? "md:col-span-2" : ""}
            >
              <ProjectCard
                project={project}
                featured={project.slug === "artworks"}
              />
            </m.li>
          ))}
        </m.ul>
      </Section>
    </Reveal>
  );
}
