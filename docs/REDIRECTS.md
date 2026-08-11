# Elenco redirect WordPress → Next.js
# Fonte: src/middleware.ts + src/lib/redirects.ts

## page_id → slug
39    → /chi-siamo
2     → /missione-valori-vision
1391  → /mappa-casi-registrati
1571  → /statuto
1569  → /bilanci
55    → /sindrome
1528  → /diagnosi
1454  → /trattamenti-terapie
1537  → /ricerca/italia
1539  → /ricerca/mondo
676   → /pubblicazioni
1162  → /eventi/conferenza-internazionale
1890  → /eventi/international-conference
2210  → /novita/studio-napoli-n-acetilcisteina
1547  → /dona
1549  → /dona/campagne
230   → /dona
1566  → /storie
1404  → /contatti
1378  → /contatti

## p (post) → novità
1994  → /novita/campagna-pasqua-2026
1904  → /novita/conferenza-internazionale-registrati
1791  → /novita/campagna-natale-2025
1249  → /novita/mutazioni-ddx3x-disabilita-intellettiva

## p (post) → pubblicazioni
1245, 1240, 666, 653, 616, 613, 426, 336 → /pubblicazioni/[slug]

## p (post) → storie
1710 agata, 1741 alessandra, 1739 arianna, 1736 bianca,
1734 camilla, 1731 carla, 1728 dalia, 1724 emma,
1721 francesco, 1717 gabriele, 1713 gilda, 1634 lisa,
1743 martina, 1631 michele, 1628 nicoletta, 1620 viola

## Fallback
page_id o p sconosciuti → /pagina-non-trovata (301)
