import { Link } from "react-router";
import { Reveal } from "./reveal";

/**
 * UpNext — clickable "next project" card at the foot of a project page.
 * Pass `to` for an internal route, or `href` for an outbound link.
 */
export function UpNext({
  eyebrow,
  title,
  to,
  href,
}: {
  eyebrow: string;
  title: string;
  to?: string;
  href?: string;
}) {
  const className =
    "group block border-t border-[var(--line)] py-14 transition-colors md:py-20";
  const inner = (
    <>
        <span className="text-[12px] uppercase tracking-[0.24em] text-[var(--ink-soft)]">
          Up Next
        </span>
        <div className="mt-4 flex items-center justify-between gap-6">
          <div>
            <p className="text-[14px] text-[var(--green)]">{eyebrow}</p>
            <h3 className="mt-2 text-[clamp(1.8rem,4vw,3rem)] font-medium leading-tight text-[var(--ink)] transition-colors group-hover:text-[var(--green)]">
              {title}
            </h3>
          </div>
          <span className="text-[2rem] text-[var(--ink-soft)] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--green)]">
            →
          </span>
        </div>
    </>
  );

  return (
    <Reveal>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {inner}
        </a>
      ) : (
        <Link to={to ?? "/"} className={className}>
          {inner}
        </Link>
      )}
    </Reveal>
  );
}
