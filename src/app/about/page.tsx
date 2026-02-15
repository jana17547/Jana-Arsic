import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "O meni",
  description:
    "Saznaj više o Jani Arsić, načinu rada i iskustvu u razvoju modernih web aplikacija.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <h1 className="sr-only">O meni</h1>
      <About />
    </>
  );
}
