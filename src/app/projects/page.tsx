import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projekti",
  description:
    "Izdvojeni full stack i frontend projekti sa opisom funkcionalnosti, tehnologija i rezultatima.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <h1 className="sr-only">Projekti</h1>
      <Projects />
    </>
  );
}
