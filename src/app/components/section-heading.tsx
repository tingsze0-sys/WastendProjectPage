import { FadeUp } from "./motion-primitives";

/**
 * SectionHeading — eyebrow label + large main line.
 * Eyebrow and headline fade up together; the eyebrow leads by a hair.
 */
export function SectionHeading({
  eyebrow,
  title,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-7 md:mb-14" : "mb-10 md:mb-14"}>
      <FadeUp>
        <span
          className={
            compact
              ? "block text-[10px] uppercase tracking-[0.2em] text-[var(--green)] md:text-[12px] md:tracking-[0.24em]"
              : "block text-[12px] uppercase tracking-[0.24em] text-[var(--green)]"
          }
        >
          {eyebrow}
        </span>
      </FadeUp>
      <FadeUp delay={0.1} y={24}>
        <h2
          className={
            compact
              ? "mt-3 max-w-[16ch] text-[1.65rem] font-medium leading-[1.12] tracking-[-0.01em] text-[var(--ink)] md:mt-4 md:text-[clamp(1.9rem,4vw,3.1rem)] md:leading-[1.1]"
              : "mt-4 max-w-[16ch] text-[clamp(1.9rem,4vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.01em] text-[var(--ink)]"
          }
        >
          {title}
        </h2>
      </FadeUp>
    </div>
  );
}
