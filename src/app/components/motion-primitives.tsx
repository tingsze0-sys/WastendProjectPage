import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";

// Shared soft ease-out curve used across the page.
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * FadeUp — heading / body line entrance: fade + rise ~20px.
 * Body copy passes a small `delay` (0.08–0.12s) so it trails its heading.
 */
export function FadeUp({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn — image / diagram entrance: 0.97 → 1 scale with opacity 0 → 1,
 * ~0.5s. Used for phone mockups, flow diagrams, and visual-rule cards.
 */
export function ScaleIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/**
 * Stagger + StaggerItem — reveal rows/columns one after another (~60ms apart)
 * to echo "understanding the rules step by step".
 */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * Parallax — translate an element on scroll at a chosen speed.
 * `speed` > 0 lags behind (moves down slower), < 0 leads. Amplitude stays small
 * to keep the spatial hint subtle, not distracting.
 */
export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  // Keep the scroll target non-static so Motion can measure its offset correctly.
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ position: "relative", y: reduce ? 0 : y }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Float — gentle continuous drift (8–16px) for the visual-identity colour
 * icons. Loops softly; disabled under reduced-motion.
 */
export function Float({
  children,
  amplitude = 12,
  duration = 6,
  delay = 0,
  axis = "y",
  className,
}: {
  children: ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  axis?: "x" | "y";
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const animate =
    axis === "y"
      ? { y: [0, -amplitude, 0] }
      : { x: [0, amplitude, 0] };
  return (
    <motion.div
      className={className}
      animate={animate}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
