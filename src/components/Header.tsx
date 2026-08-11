"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { mainNavigation, type NavItem } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

export function Header({ items = mainNavigation }: { items?: NavItem[] }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navId = useId();

  const navItems = items.filter((i) => i.href !== "/contatti");

  function clearLeaveTimer() {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }

  function openDesktopGroup(label: string) {
    clearLeaveTimer();
    setOpenGroup(label);
  }

  function scheduleCloseDesktop() {
    clearLeaveTimer();
    leaveTimer.current = setTimeout(() => setOpenGroup(null), 120);
  }

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
    setMobileGroup(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!headerRef.current?.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      clearLeaveTimer();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(251,249,245,.96)] backdrop-blur-[10px]"
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 md:px-8 md:py-3.5">
        <Link
          href="/"
          className="min-w-0 shrink text-[var(--ink)] no-underline hover:opacity-90"
          onClick={() => setMobileOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={siteConfig.name}
            className="block h-9 w-auto max-w-[min(220px,58vw)] object-contain sm:h-11 sm:max-w-[260px] md:h-[52px]"
          />
        </Link>

        <nav className="ddx-nav" aria-label="Principale">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="nav-item-wrap relative">
                <button
                  type="button"
                  className={`nav-link flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2.5 text-[14.5px] font-medium text-[#3A3247] hover:bg-[#F3EFE7] hover:text-[#4F3A7A] xl:px-3.5 ${
                    openGroup === item.label
                      ? "bg-[#F3EFE7] text-[#4F3A7A]"
                      : ""
                  }`}
                  aria-expanded={openGroup === item.label}
                  aria-haspopup="true"
                  aria-controls={`${navId}-${item.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    clearLeaveTimer();
                    setOpenGroup((cur) =>
                      cur === item.label ? null : item.label,
                    );
                  }}
                  onMouseEnter={() => {
                    // Se un menu è già aperto, passa a questo (comportamento desktop)
                    setOpenGroup((cur) =>
                      cur && cur !== item.label ? item.label : cur,
                    );
                  }}
                >
                  {item.label}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`mt-px transition-transform ${
                      openGroup === item.label ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#8A8195"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  id={`${navId}-${item.label}`}
                  role="menu"
                  className={`nav-dropdown absolute left-0 top-full z-50 min-w-[240px] pt-1.5 ${
                    openGroup === item.label
                      ? "visible opacity-100"
                      : "pointer-events-none invisible opacity-0"
                  }`}
                  onMouseEnter={clearLeaveTimer}
                  onMouseLeave={scheduleCloseDesktop}
                >
                  <div className="rounded-xl border border-[var(--border)] bg-white p-2 shadow-[0_8px_16px_rgba(40,25,60,.08)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        className="block rounded-lg px-3 py-2.5 text-sm text-[#3A3247] no-underline hover:bg-[var(--purple-50)] hover:text-[var(--purple-700)]"
                        onClick={() => setOpenGroup(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="nav-link whitespace-nowrap rounded-lg px-3 py-2.5 text-[14.5px] font-medium text-[#3A3247] no-underline hover:bg-[#F3EFE7] hover:text-[#4F3A7A] xl:px-3.5"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          <Link
            href="/contatti"
            className="ddx-contatti-link px-2 py-2.5 text-sm font-medium text-[#3A3247] no-underline hover:text-[var(--purple-700)]"
          >
            Contatti
          </Link>
          <Link
            href="/dona"
            className="btn-pill btn-primary px-3.5 py-2 text-[13px] sm:px-5 sm:py-2.5 sm:text-[14.5px]"
          >
            Dona
            <span className="hidden sm:inline"> ora</span>
          </Link>
          <button
            type="button"
            className="ddx-burger flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E2D9F0] bg-white"
            aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={mobileOpen}
            aria-controls={`${navId}-mobile`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="#3A3247"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path
                  d="M0 1h18M0 7h18M0 13h18"
                  stroke="#3A3247"
                  strokeWidth="1.6"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id={`${navId}-mobile`}
          className="ddx-mobile-panel border-t border-[var(--border)] bg-white"
        >
          <div className="mx-auto max-h-[min(78vh,640px)] max-w-[1240px] overflow-y-auto overscroll-contain px-4 py-3 sm:px-6 md:px-8">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-[#F3EFE7] py-1">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex min-h-12 w-full items-center justify-between gap-3 py-2.5 text-left text-[15px] font-semibold text-[var(--ink)]"
                      aria-expanded={mobileGroup === item.label}
                      onClick={() =>
                        setMobileGroup((cur) =>
                          cur === item.label ? null : item.label,
                        )
                      }
                    >
                      {item.label}
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--sand-50)] text-base text-[var(--gray-400)] transition-transform ${
                          mobileGroup === item.label ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    {mobileGroup === item.label ? (
                      <div className="flex flex-col gap-0.5 pb-3 pl-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-lg px-3 py-2.5 text-[14.5px] text-[var(--gray-600)] no-underline hover:bg-[var(--purple-50)] hover:text-[var(--purple-700)]"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className="flex min-h-12 items-center py-2.5 text-[15px] font-semibold text-[var(--ink)] no-underline"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contatti"
              className="flex min-h-12 items-center py-3 text-[15px] font-semibold text-[var(--ink)] no-underline"
              onClick={() => setMobileOpen(false)}
            >
              Contatti
            </Link>
            <Link
              href="/dona"
              className="btn-pill btn-primary mb-3 mt-2 w-full px-5 py-3.5 text-[15px]"
              onClick={() => setMobileOpen(false)}
            >
              Dona ora
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
