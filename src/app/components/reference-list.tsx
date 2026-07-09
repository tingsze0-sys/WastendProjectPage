import { Stagger, StaggerItem } from "./motion-primitives";

export type ReferenceGroup = {
  region: string;
  items: { title: string; href: string }[];
};

/**
 * ReferenceList — dense, clickable source list grouped by region.
 * Groups stagger in column by column to reinforce the "reading rules step by
 * step" rhythm. Outbound links open in a new tab.
 */
export function ReferenceList({
  groups,
  compact = false,
}: {
  groups: ReferenceGroup[];
  compact?: boolean;
}) {
  return (
    <Stagger
      className={
        compact
          ? "grid grid-cols-1 gap-x-12 gap-y-5 border-t border-[var(--line)] pt-5 sm:grid-cols-2 md:gap-y-8 md:pt-8 lg:grid-cols-3"
          : "grid grid-cols-1 gap-x-12 gap-y-8 border-t border-[var(--line)] pt-8 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {groups.map((group) => (
        <StaggerItem key={group.region}>
          <h4 className="text-[12px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
            {group.region}
          </h4>
          <ul className={compact ? "mt-2 space-y-1.5 md:mt-3 md:space-y-2" : "mt-3 space-y-2"}>
            {group.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    compact
                      ? "group inline-flex items-baseline gap-1 text-[12px] leading-snug text-[var(--ink)] transition-colors hover:text-[var(--green)] md:text-[13px]"
                      : "group inline-flex items-baseline gap-1 text-[13px] leading-snug text-[var(--ink)] transition-colors hover:text-[var(--green)]"
                  }
                >
                  <span className="border-b border-transparent group-hover:border-[var(--green)]">
                    {item.title}
                  </span>
                  <span className="text-[var(--ink-soft)] transition-colors group-hover:text-[var(--green)]">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
