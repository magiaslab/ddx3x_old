import type { ReactNode } from "react";

export function PageShell({
  title,
  description,
  children,
  after,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  /** Contenuto fuori dal blocco tipografico (es. form). */
  after?: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-[40rem] px-4 py-10 sm:px-6 sm:py-14 md:px-8">
      <header className="mb-7 border-b border-[var(--border)] pb-5 sm:mb-8 sm:pb-6">
        <h1 className="font-serif text-[1.65rem] font-semibold tracking-tight text-[var(--ink)] sm:text-3xl md:text-[2rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-[var(--gray-600)] sm:text-base">
            {description}
          </p>
        ) : null}
      </header>
      <div className="prose-ddx max-w-[65ch]">{children}</div>
      {after}
    </main>
  );
}
