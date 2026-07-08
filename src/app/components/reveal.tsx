import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Reveal — subtle scroll-in reveal used across sections.
 * Fade + slight vertical rise, soft easing, fires once. Honors reduced-motion
 * by keeping the movement small and non-essential.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
