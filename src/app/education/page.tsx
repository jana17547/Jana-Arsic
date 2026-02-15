import type { Metadata } from "next";
import Education from "@/components/Education";

export const metadata: Metadata = {
  title: "Obrazovanje",
  description:
    "Akademski put i formalno obrazovanje iz oblasti računarstva i softverskog inženjerstva.",
  alternates: {
    canonical: "/education",
  },
};

export default function EducationPage() {
  return (
    <>
      <h1 className="sr-only">Obrazovanje</h1>
      <Education />
    </>
  );
}
