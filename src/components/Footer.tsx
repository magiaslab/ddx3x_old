import Link from "next/link";
import { siteConfig } from "@/lib/site";

const cols = [
  {
    title: "L'Associazione",
    links: [
      { label: "Chi siamo", href: "/chi-siamo" },
      { label: "Missione, valori e vision", href: "/missione-valori-vision" },
      { label: "Mappa dei casi", href: "/mappa-casi-registrati" },
      { label: "Statuto", href: "/statuto" },
      { label: "Bilanci", href: "/bilanci" },
    ],
  },
  {
    title: "Scopri di più",
    links: [
      { label: "La sindrome", href: "/sindrome" },
      { label: "Novità", href: "/novita" },
      { label: "Le nostre storie", href: "/storie" },
      { label: "Conferenza internazionale", href: "/eventi/conferenza-internazionale" },
      { label: "Dona", href: "/dona" },
      { label: "Contatti", href: "/contatti" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] px-4 pb-8 pt-12 text-[#D8CFEA] sm:px-6 sm:pt-16 md:px-8">
      <div className="mx-auto mb-10 grid max-w-[1240px] gap-8 sm:mb-12 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-12 w-auto shrink-0 items-center justify-center rounded-xl bg-white px-2 py-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt=""
                className="h-9 w-auto max-w-[180px] object-contain"
              />
            </span>
          </div>
          <p className="mb-1 font-serif text-[15px] font-semibold text-white">
            {siteConfig.name}
          </p>
          <p className="mb-4 max-w-[300px] text-sm leading-relaxed text-[#B6A9D4]">
            Insieme per capire, sostenere e dare voce alla Sindrome DDX3X.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="break-all text-sm text-[#D8CFEA] no-underline hover:text-white"
          >
            {siteConfig.email}
          </a>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-[#382A54] no-underline hover:bg-[#4A366E] sm:h-[38px] sm:w-[38px]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.67 15.5 3.6 14.4 3.6c-2.4 0-4 1.45-4 4.1v2.2H7.7V13h2.7v8h3.1z" />
              </svg>
            </a>
            <a
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-[#382A54] no-underline hover:bg-[#4A366E] sm:h-[38px] sm:w-[38px]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="#fff"
                  strokeWidth="1.7"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="#fff"
                  strokeWidth="1.7"
                />
                <circle cx="17.2" cy="6.8" r="1.1" fill="#fff" />
              </svg>
            </a>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#9382B8] sm:mb-4.5">
              {col.title}
            </h4>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {col.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="py-0.5 text-[14.5px] text-[#D8CFEA] no-underline hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h4 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#9382B8] sm:mb-4.5">
            Social
          </h4>
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-[14.5px] text-[#D8CFEA] no-underline hover:text-white"
            >
              Facebook
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-[14.5px] text-[#D8CFEA] no-underline hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] border-t border-[#382A54] pt-6 text-[12.5px] leading-relaxed text-[#8A7CAA] sm:text-[13px]">
        © {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti
        riservati.
      </div>
    </footer>
  );
}
