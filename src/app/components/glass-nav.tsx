/**
 * GlassNav — fixed, translucent frosted header. Stays at the top during scroll
 * for positioning without competing with the content. No personal branding or
 * other module links (page is Wastend-only).
 */
export function GlassNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 md:px-10">
        <span className="text-[14px] tracking-[0.02em] text-[var(--ink)]">
          Sze Wa Ting
        </span>
      </nav>
    </header>
  );
}
