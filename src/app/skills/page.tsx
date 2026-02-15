import type { Metadata } from "next";
import Skills from "@/components/Skills";

export const metadata: Metadata = {
  title: "Veštine",
  description:
    "Pregled tehnologija i alata koje koristim: React, Next.js, TypeScript, Node.js i baze podataka.",
  alternates: {
    canonical: "/skills",
  },
};

export default function SkillsPage() {
  return (
    <>
      <h1 className="sr-only">Veštine</h1>
      <Skills />
    </>
  );
}
