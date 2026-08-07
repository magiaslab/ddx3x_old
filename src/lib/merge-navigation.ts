import { mainNavigation, type NavItem } from "@/lib/navigation";

const GROUP_LABEL: Record<string, string> = {
  associazione: "L'Associazione",
  sindrome: "Sindrome DDX3X",
  ricerca: "La Ricerca",
  eventi: "Eventi & Iniziative",
  donazioni: "Donazioni",
  root: "",
};

export type CmsNavPage = {
  title: string;
  slug: string;
  navLabel?: string;
  navGroup?: string;
};

/** Unisce il menu fisso con le pagine Sanity marcate "Mostra nel menu". */
export function mergeNavigation(cmsPages: CmsNavPage[]): NavItem[] {
  const nav: NavItem[] = structuredClone(mainNavigation);

  for (const page of cmsPages) {
    const href = `/${page.slug}`.replace(/\/+/g, "/");
    const label = page.navLabel || page.title;
    const group = page.navGroup || "root";

    if (group === "root") {
      // Inserisci prima di Contatti se presente
      const contattiIdx = nav.findIndex((i) => i.href === "/contatti");
      const item = { label, href };
      if (contattiIdx >= 0) nav.splice(contattiIdx, 0, item);
      else nav.push(item);
      continue;
    }

    const groupLabel = GROUP_LABEL[group];
    const parent = nav.find((i) => i.label === groupLabel);
    if (parent?.children) {
      if (!parent.children.some((c) => c.href === href)) {
        parent.children.push({ label, href });
      }
    } else {
      nav.push({ label, href });
    }
  }

  return nav;
}
