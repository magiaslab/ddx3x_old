"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNavigation } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/wp/2025/09/logo-ASSOCIAZIONE.png"
            alt=""
            className="h-10 w-auto"
          />
          <span>
            <span className="block text-lg font-semibold tracking-tight text-stone-900">
              {siteConfig.shortName}
            </span>
            <span className="block text-xs text-stone-500">Associazione ODV</span>
          </span>
        </Link>

        <button
          type="button"
          className="rounded border border-stone-300 px-3 py-1.5 text-sm text-stone-800 lg:hidden"
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav
          id="primary-menu"
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full max-h-[80vh] flex-col overflow-y-auto border-b border-stone-200 bg-white px-4 py-3 lg:static lg:flex lg:max-h-none lg:flex-row lg:items-center lg:gap-1 lg:overflow-visible lg:border-0 lg:p-0`}
        >
          {mainNavigation.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded px-2 py-2 text-left text-sm font-medium text-stone-800 hover:bg-stone-50 lg:w-auto"
                  onClick={() =>
                    setOpenDropdown((cur) =>
                      cur === item.label ? null : item.label,
                    )
                  }
                >
                  {item.label}
                  <span className="ml-1 text-stone-400">▾</span>
                </button>
                <ul
                  className={`${openDropdown === item.label ? "block" : "hidden"} lg:absolute lg:left-0 lg:min-w-[240px] lg:rounded-md lg:border lg:border-stone-200 lg:bg-white lg:py-1 lg:shadow-md`}
                >
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="rounded px-2 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href="/dona"
            className="mt-2 rounded bg-stone-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-stone-800 lg:ml-2 lg:mt-0"
            onClick={() => setOpen(false)}
          >
            Dona ora
          </Link>
        </nav>
      </div>
    </header>
  );
}
