import { FadeUp } from "./motion-primitives";

/**
 * SectionHeading — eyebrow label + large main line.
 * Eyebrow and headline fade up together; the eyebrow leads by a hair.
 */
export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <FadeUp>
        <span className="block text-[12px] uppercase tracking-[0.24em] text-[var(--green)]">
          {eyebrow}
        </span>
      </FadeUp>
      <FadeUp delay={0.1} y={24}>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(1.9rem,4vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.01em] text-[var(--ink)]">
          {title}
        </h2>
      </FadeUp>
    </div>
  );
}
