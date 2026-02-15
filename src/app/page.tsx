import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Hero from "@/components/Hero";

const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Projects = dynamic(() => import("@/components/Projects"));
const Education = dynamic(() => import("@/components/Education"));
const Contact = dynamic(() => import("@/components/Contact"));

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="space-y-8 pb-6 md:space-y-12 md:pb-8 lg:space-y-16 lg:pb-10">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </div>
  );
}
