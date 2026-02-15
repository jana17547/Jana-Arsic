import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteShell from "@/components/site-shell";
import "./globals.css";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.vercel.app";
const siteUrl = configuredSiteUrl.startsWith("http")
  ? configuredSiteUrl
  : `https://${configuredSiteUrl}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jana Arsić | Junior Software Engineer",
    template: "%s | Jana Arsić",
  },
  description:
    "Portfolio sa pregledom projekata, veština i obrazovanja iz oblasti software razvoja. React, Next.js, TypeScript i full stack praksa.",
  keywords: [
    "Jana Arsić",
    "Junior Software Engineer",
    "Frontend",
    "Full Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "/",
    siteName: "Jana Arsić Portfolio",
    title: "Jana Arsić | Junior Software Engineer",
    description:
      "Portfolio sa pregledom projekata, veština i obrazovanja iz oblasti software razvoja.",
    images: [
      {
        url: "/img.jpg",
        width: 1200,
        height: 630,
        alt: "Jana Arsić portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jana Arsić | Junior Software Engineer",
    description:
      "Portfolio sa pregledom projekata, veština i obrazovanja iz oblasti software razvoja.",
    images: ["/img.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="sr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteShell currentYear={currentYear}>{children}</SiteShell>
      </body>
    </html>
  );
}
