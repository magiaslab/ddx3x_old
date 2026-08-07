export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "L'Associazione",
    children: [
      { label: "Chi siamo", href: "/chi-siamo" },
      { label: "Missione, valori e vision", href: "/missione-valori-vision" },
      { label: "Mappa dei casi registrati", href: "/mappa-casi-registrati" },
      { label: "Statuto", href: "/statuto" },
      { label: "Bilanci", href: "/bilanci" },
    ],
  },
  {
    label: "Sindrome DDX3X",
    children: [
      { label: "La sindrome", href: "/sindrome" },
      { label: "Diagnosi", href: "/diagnosi" },
      { label: "Trattamenti e terapie", href: "/trattamenti-terapie" },
    ],
  },
  {
    label: "La Ricerca",
    children: [
      { label: "In Italia", href: "/ricerca/italia" },
      { label: "Nel mondo", href: "/ricerca/mondo" },
      { label: "Pubblicazioni online", href: "/pubblicazioni" },
    ],
  },
  {
    label: "Eventi & Iniziative",
    children: [
      {
        label: "3° Conferenza Internazionale",
        href: "/eventi/conferenza-internazionale",
      },
      { label: "Novità", href: "/novita" },
      { label: "Le nostre storie", href: "/storie" },
    ],
  },
  {
    label: "Donazioni",
    children: [
      { label: "Come contribuire", href: "/dona" },
      { label: "Campagne di raccolta fondi", href: "/dona/campagne" },
    ],
  },
  { label: "Contatti", href: "/contatti" },
];

export const footerLinks = [
  { label: "Statuto", href: "/statuto" },
  { label: "Bilanci", href: "/bilanci" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contatti", href: "/contatti" },
  { label: "Dona", href: "/dona" },
];
