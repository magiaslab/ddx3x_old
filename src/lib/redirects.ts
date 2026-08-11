/** Mapping page_id WordPress → nuovo slug (SEO / continuità link esterni) */
export const PAGE_ID_REDIRECTS: Record<string, string> = {
  "39": "/chi-siamo",
  "2": "/missione-valori-vision",
  "1391": "/mappa-casi-registrati",
  "1571": "/statuto",
  "1569": "/bilanci",
  "55": "/sindrome",
  "1528": "/diagnosi",
  "1454": "/trattamenti-terapie",
  "1537": "/ricerca/italia",
  "1539": "/ricerca/mondo",
  "676": "/pubblicazioni",
  "1162": "/eventi/conferenza-internazionale",
  "1890": "/eventi/international-conference",
  "2210": "/novita/studio-napoli-n-acetilcisteina",
  "1547": "/dona",
  "1549": "/dona/campagne",
  "230": "/dona",
  "1566": "/storie",
  "1404": "/contatti",
  "1378": "/contatti", // iscrizione → contatti (email info@ddx3x.it)
};

/** Mapping post ID WordPress → slug novità / storie */
export const POST_ID_REDIRECTS: Record<string, string> = {
  "1994": "/novita/campagna-pasqua-2026",
  "1904": "/novita/conferenza-internazionale-registrati",
  "1791": "/novita/campagna-natale-2025",
  "1249": "/novita/mutazioni-ddx3x-disabilita-intellettiva",
  "1245":
    "/pubblicazioni/perturbazioni-specifiche-del-sesso-nello-sviluppo-neuronale-causate-da-mutazioni-nel-gene-di-rischio-per-lautismo-ddx3x",
  "1240":
    "/pubblicazioni/ampliare-la-comprensione-del-disturbo-neuroevolutivo-correlato-addx3x-nei-maschi",
  "666":
    "/pubblicazioni/fenotipi-evolutivi-e-comportamentali-in-un-nuovo-modello-murino-di-sindrome-ddx3x",
  "653": "/pubblicazioni/disturbo-del-neurosviluppo-correlato-al-ddx3x",
  "616":
    "/pubblicazioni/le-mutazioni-appena-identificate-chiariscono-il-legame-del-gene-con-lautismo-la-disabilita-intellettiva",
  "613":
    "/pubblicazioni/abilita-motorie-volume-cerebrale-influenzato-nel-modello-di-topo-della-sindrome-ddx3x",
  "426": "/pubblicazioni/lo-stato-della-ricerca",
  "336": "/pubblicazioni/super-nonno-bruno",
  "1710": "/storie/agata",
  "1741": "/storie/alessandra",
  "1739": "/storie/arianna",
  "1736": "/storie/bianca",
  "1734": "/storie/camilla",
  "1731": "/storie/carla",
  "1728": "/storie/dalia",
  "1724": "/storie/emma",
  "1721": "/storie/francesco",
  "1717": "/storie/gabriele",
  "1713": "/storie/gilda",
  "1634": "/storie/lisa",
  "1743": "/storie/martina",
  "1631": "/storie/michele",
  "1628": "/storie/nicoletta",
  "1620": "/storie/viola",
};

export const UNKNOWN_LEGACY_PATH = "/pagina-non-trovata";
