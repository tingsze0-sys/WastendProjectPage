import { FadeUp, ScaleIn } from "./motion-primitives";
import { MockupFrame } from "./mockup-frame";

/**
 * FeatureBlock — one of the four "What users get" features.
 * Mockup scales in (0.97 → 1); caption lines fade up and trail behind.
 * Alternating sides on desktop, stacked on mobile with the same visual order.
 */
export function FeatureBlock({
  index,
  name,
  caption,
  src,
  reverse = false,
}: {
  index: string;
  name: string;
  caption: string;
  src?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-8 md:gap-16 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="w-full md:w-1/2 md:flex md:justify-center">
        <ScaleIn>
          <MockupFrame src={src} alt={`${name} feature mockup`} label={`${name} screen`} phone />
        </ScaleIn>
      </div>
      <div className="w-full md:w-1/2">
        <FadeUp>
          <span className="text-[12px] uppercase tracking-[0.24em] text-[var(--blue)]">
            {index}
          </span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h3 className="mt-3 text-[1.6rem] font-medium leading-tight text-[var(--ink)]">
            {name}
          </h3>
        </FadeUp>
        <FadeUp delay={0.14}>
          <p className="mt-4 max-w-[42ch] text-[16px] leading-relaxed text-[var(--ink-soft)]">
            {caption}
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
