import { ImageWithFallback } from "./figma/ImageWithFallback";

/**
 * MockupFrame — rounded image / phone-mockup container.
 * Uses ImageWithFallback so uploaded assets drop straight in. `phone` gives a
 * narrow device aspect; otherwise it fills the container.
 */
export function MockupFrame({
  src,
  alt,
  label,
  phone = false,
  className = "",
}: {
  src?: string;
  alt: string;
  label?: string;
  phone?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--paper-soft)] ${
        phone ? "aspect-[9/19] max-w-[280px]" : "aspect-[4/3]"
      } ${className}`}
    >
      {src ? (
        <ImageWithFallback
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
          <span className="text-[13px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Image slot
          </span>
          <span className="text-[13px] text-[var(--ink-soft)]">
            {label ?? alt}
          </span>
        </div>
      )}
    </div>
  );
}
