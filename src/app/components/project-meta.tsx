/** ProjectMeta — Date / Team / Scope block for project hero sections. */
export function ProjectMeta({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <dl className="grid grid-cols-1 gap-6 border-t border-[var(--line)] pt-8 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-[12px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
            {item.label}
          </dt>
          <dd className="mt-2 text-[15px] leading-relaxed text-[var(--ink)]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
