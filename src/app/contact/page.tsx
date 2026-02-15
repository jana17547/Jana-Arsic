import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktiraj Janu Arsić za saradnju, junior pozicije i full stack/frontend projekte.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <h1 className="sr-only">Kontakt</h1>
      <Contact />
    </>
  );
}
