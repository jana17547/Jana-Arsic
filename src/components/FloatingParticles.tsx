"use client";

import { useEffect, useMemo, useState } from "react";
import { m } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

export default function FloatingParticles({ count = 30 }: { count?: number }) {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)",
    ).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)",
    );
    const updateEnabled = () => {
      setEnabled((current) => {
        const next = !mediaQuery.matches;
        return current === next ? current : next;
      });
    };
    mediaQuery.addEventListener("change", updateEnabled);

    return () => mediaQuery.removeEventListener("change", updateEnabled);
  }, []);

  const particles = useMemo<Particle[]>(
    () =>
      enabled
        ? Array.from({ length: count }, (_, i) => ({
            id: i,
            x: pseudoRandom(i + 1) * 100,
            y: pseudoRandom(i + 17) * 100,
            size: pseudoRandom(i + 31) * 4 + 1,
            duration: pseudoRandom(i + 47) * 20 + 15,
            delay: pseudoRandom(i + 71) * 10,
            drift: pseudoRandom(i + 97) * 40 - 20,
          }))
        : [],
    [count, enabled],
  );

  if (!enabled || particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((p) => (
        <m.div
          key={p.id}
          className="absolute rounded-full bg-sky-400/20 dark:bg-cyan-400/15"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, p.drift, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
