import Link from "next/link";
import { footerLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-semibold text-stone-900">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-stone-600">
            Insieme per capire, sostenere e dare voce alla Sindrome DDX3X.
          </p>
          <p className="mt-3 text-sm text-stone-600">
            Email:{" "}
            <a
              className="underline hover:text-stone-900"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900">Link utili</p>
          <ul className="mt-2 space-y-1">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-stone-600 underline-offset-2 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900">Social</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a
                href={siteConfig.social.facebook}
                className="text-stone-600 underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.instagram}
                className="text-stone-600 underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-200 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti
        riservati.
      </div>
    </footer>
  );
}
