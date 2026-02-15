"use client";

import { useRef } from "react";
import { motion, type Variants, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easing },
  },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  staggerChildren?: number;
  direction?: "up" | "left" | "right";
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.2,
  staggerChildren,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, amount });

  const directionProps = {
    up: { y, x: 0 },
    left: { y: 0, x: -30 },
    right: { y: 0, x: 30 },
  };

  const { x, y: yOffset } = directionProps[direction];

  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset, x },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.65,
        ease: easing,
        delay,
        ...(staggerChildren ? { staggerChildren, delayChildren: 0.06 } : {}),
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
