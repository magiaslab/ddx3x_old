# Associazione DDX3X Italia ODV — sito provvisorio

Sito Next.js (App Router) + Vercel che sostituisce temporaneamente WordPress su [ddx3x.it](https://www.ddx3x.it), preservando contenuti, SEO e donazioni. Il restyling definitivo arriverà in una fase successiva.

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS
- **Sanity.io** — CMS per le Novità (`/novita`, Studio in `/studio`)
- **Stripe Checkout** + **PayPal Smart Buttons** — donazioni su `/dona`
- Pagine statiche (Chi siamo, Statuto, ecc.) come contenuto React nel repository

## Avvio locale

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

Senza Sanity configurato, le Novità usano i post seed migrati dal blog WordPress (`src/content/seed-posts.ts`).

## Variabili d'ambiente

| Variabile | Dove trovarla |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pubblico (es. `https://www.ddx3x.it` o URL `*.vercel.app`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | [sanity.io/manage](https://www.sanity.io/manage) → progetto → Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Di solito `production` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | [Stripe Dashboard → API keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → API keys (solo server) |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) — **riusa l'account Business già collegato a WordPress** |

Su Vercel: Project → Settings → Environment Variables (Production + Preview).

## Sanity Studio (volontari non tecnici)

1. Crea un progetto Sanity (piano gratuito) e copia Project ID / dataset in `.env.local` e su Vercel.
2. Avvia il sito e apri `/studio` (oppure collega un hostname Sanity dedicato).
3. Accedi con l'account Sanity autorizzato sul progetto.
4. Crea un documento **Novità** (`post`): titolo, slug, estratto, corpo, immagine, categoria (`campagna` \| `evento` \| `comunicato`), data.
5. Pubblica: il sito legge i post via CDN Sanity **senza nuovo deploy**.

Per importare i 4 post seed in Sanity, ricreali dallo Studio partendo da `src/content/seed-posts.ts` (o usa lo script di migrazione in una fase successiva).

## Donazioni

- Pagina `/dona`: importi suggeriti, campo libero, selezione campagna (`src/lib/campaigns.ts`), Stripe Checkout e PayPal.
- Stripe: Route Handler `POST /api/checkout/stripe` con `metadata.campaign`.
- Ritorno: `/dona/grazie`, `/dona/annullato`.
- PayPal: Smart Buttons con `custom_id` = id campagna.
- Bonifico e 5×1000 restano indicati in pagina (IBAN e CF dell'associazione).

## Redirect SEO (WordPress → nuovi slug)

Implementati in `src/middleware.ts` con la mappa in `src/lib/redirects.ts` (elenco in `docs/REDIRECTS.md`).

> **Nota tecnica:** `next.config` `redirects()` con match su query string *preserva* i parametri nella destination (es. `/diagnosi?page_id=1528`). Il middleware emette invece **301 verso slug puliti**, e instrada `page_id` / `p` sconosciuti a `/pagina-non-trovata`.

| Vecchio | Nuovo |
|---|---|
| `/?page_id=39` | `/chi-siamo` |
| `/?page_id=2` | `/missione-valori-vision` |
| `/?page_id=1391` | `/mappa-casi-registrati` |
| `/?page_id=1571` | `/statuto` |
| `/?page_id=1569` | `/bilanci` |
| `/?page_id=55` | `/sindrome` |
| `/?page_id=1528` | `/diagnosi` |
| `/?page_id=1454` | `/trattamenti-terapie` |
| `/?page_id=1537` | `/ricerca/italia` |
| `/?page_id=1539` | `/ricerca/mondo` |
| `/?page_id=676` | `/pubblicazioni` |
| `/?page_id=1162` | `/eventi/conferenza-internazionale` |
| `/?page_id=1547` | `/dona` |
| `/?page_id=1549` | `/dona/campagne` |
| `/?page_id=230` | `/dona` |
| `/?page_id=1566` | `/storie` |
| `/?page_id=1404` | `/contatti` |
| `/?page_id=1378` | `/contatti` |
| `/?p=1994` | `/novita/campagna-pasqua-2026` |
| `/?p=1904` | `/novita/conferenza-internazionale-registrati` |
| `/?p=1791` | `/novita/campagna-natale-2025` |
| `/?p=1249` | `/novita/mutazioni-ddx3x-disabilita-intellettiva` |
| `/?page_id=*` o `/?p=*` sconosciuti | `/pagina-non-trovata` |

Verifica prima del cutover DNS:

```bash
curl -sI "https://TUO-PROGETTO.vercel.app/?page_id=1528" | head -5
# atteso: 301 → /diagnosi
```

## Deploy su Vercel

1. Collega il repository GitHub alla dashboard Vercel.
2. Framework preset: Next.js (default).
3. Imposta le variabili d'ambiente.
4. Deploy → testa sull'URL `*.vercel.app` (redirect, donazioni in modalità test, Studio).

## Cutover DNS (Aruba → Vercel)

Quando l'anteprima è ok:

1. Su Vercel: Project → Domains → aggiungi `ddx3x.it` e `www.ddx3x.it`.
2. Su Aruba (o registrar): aggiorna i record come indicato da Vercel (A / CNAME o nameserver).
3. Attendi la propagazione DNS e verifica HTTPS.
4. Rimuovi o disattiva l'hosting WordPress solo dopo aver confermato redirect e donazioni in produzione.
5. Imposta `NEXT_PUBLIC_SITE_URL=https://www.ddx3x.it`.

## Note sulla migrazione contenuti

- Export WordPress del 2026-08-07 importato: pagine (incluse Chi siamo / Missione / Sindrome dal cestino WP), 16 storie, pubblicazioni, novità.
- **130 file media** scaricati in `public/media/wp/` (~100 MB: immagini + PDF bilanci/statuto/conferenza). Il sito non dipende più da Aruba per questi asset.
- PDF (statuto, bilanci) e immagini usano path locali `/media/wp/...`.

## Cosa non è in scope (fase 2)

Nuovo logo/palette, sezioni “Appena diagnosticati”, API scientifiche esterne, chatbot/AI.
