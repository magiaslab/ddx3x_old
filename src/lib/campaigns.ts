export type Campaign = {
  id: string;
  name: string;
  description: string;
  active: boolean;
};

/** Aggiornare questo array per aggiungere campagne senza deploy separati del form. */
export const CAMPAIGNS: Campaign[] = [
  {
    id: "generale",
    name: "Donazione generale",
    description:
      "A sostegno delle attività dell'Associazione DDX3X Italia ODV",
    active: true,
  },
  {
    id: "pasqua-2026",
    name: "Pasqua 2026",
    description: "Campagna uova di Pasqua solidali — ricerca e supporto famiglie",
    active: false,
  },
  {
    id: "natale-2025",
    name: "Natale 2025",
    description: "Campagna creme spalmabili artigianali",
    active: false,
  },
  {
    id: "ricerca-telethon",
    name: "Ricerca Telethon",
    description: "Sostegno al Seed Grant e progetti di ricerca in Italia",
    active: true,
  },
];

export const SUGGESTED_AMOUNTS = [10, 25, 50, 100, 250] as const;

export const BANK_DETAILS = {
  iban: "IT25A0623001405000040386912",
  bank: "Crédit Agricole — agenzia 00142",
  beneficiary: "Associazione DDX3X ODV",
  causale:
    "Donazione liberale a sostegno delle attività dell'associazione",
  codiceFiscale: "95220880108",
};
