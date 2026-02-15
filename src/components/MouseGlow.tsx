"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

export default function MouseGlow() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 1023px), (pointer: coarse)",
    ).matches;
  });
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 1023px), (pointer: coarse)",
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

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let rafId = 0;
    const onMove = (e: MouseEvent) => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        rafId = 0;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <m.div
      className="pointer-events-none fixed z-[2] hidden h-[500px] w-[500px] rounded-full opacity-[0.07] blur-[100px] md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(56,189,248,0.8) 0%, rgba(129,140,248,0.4) 50%, transparent 70%)",
      }}
    />
  );
}
