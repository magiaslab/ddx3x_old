# Guida CMS — come pubblicare e modificare i contenuti

**Per:** Valentina e chi gestisce i contenuti dell’Associazione  
**Sito pubblico:** https://www.ddx3x.it  
**Area di lavoro (Studio):** https://www.ddx3x.it/studio

Questa guida spiega solo cosa serve per le **Novità** (post). Non serve sapere di programmazione.

---

## 1. Come entrare

1. Apri nel browser: **https://www.ddx3x.it/studio**
2. Accedi con l’account Google / email che ti è stato autorizzato su Sanity.
3. Se è la prima volta, accetta i permessi e attendi il caricamento della schermata “DDX3X Italia — CMS”.

**Nota:** non usare più indirizzi `*.vercel.app`. L’indirizzo ufficiale è sempre `www.ddx3x.it/studio`.

### Lingua dell’interfaccia

Puoi scegliere **Italiano** o **English** per i menu e i pulsanti di Studio (non riguarda i testi delle novità, che restano come li scrivi tu):

1. In basso a sinistra clicca sul tuo nome / avatar.
2. Apri la voce sulla lingua (Display language / Lingua).
3. Seleziona **Italiano**.

Se non riesci ad accedere (“CORS” / login che non apre): chiedi ad Andrea di verificare in Sanity Manage → API → CORS che sia presente `https://www.ddx3x.it`.

---

## 2. Cosa puoi gestire oggi

| Cosa | Dove si vede sul sito | Dove si modifica |
|------|------------------------|------------------|
| **Novità** (campagne, eventi, comunicati) | https://www.ddx3x.it/novita e in home | Studio → **Novità** |
| Pagine “fisse” (Chi siamo, Sindrome, Ricerca…) | Varie URL | In parte nello Studio (tipo **Page**), in parte ancora nel sito — se non le trovi, chiedi ad Andrea |

Il lavoro quotidiano più importante è su **Novità**.

---

## 3. Pubblicare una nuova novità (passo passo)

1. Entra in **https://www.ddx3x.it/studio**
2. Nel menu a sinistra clicca **Novità**
3. In alto a destra clicca **Create** / **Crea** (o “+”)
4. Compila i campi:

| Campo | Cosa scrivere | Consigli |
|-------|----------------|----------|
| **Titolo** | Titolo del pezzo | Chiaro e completo |
| **Slug** | Indirizzo URL | Clicca **Generate** dal titolo. Es. titolo “Campagna di Natale 2026” → slug `campagna-di-natale-2026`. Non usare spazi né accenti. |
| **Estratto** | 1–2 frasi | Compare nelle card di home e nell’elenco novità |
| **Body** / corpo | Testo dell’articolo | Paragrafi, titoli, elenchi. Evita di incollare codice o script da WordPress. |
| **Immagine di copertina** | Foto / grafica | Carica un JPG o PNG; compila il **testo alternativo** (descrizione breve per accessibilità) |
| **Categoria** | Una tra: Campagna / Evento / Comunicato | Serve per il badge colorato sul sito |
| **Data di pubblicazione** | Data e ora | Le novità più recenti appaiono per prime |

5. In basso a destra (o in alto) clicca **Publish** / **Pubblica**
6. Controlla sul sito:
   - elenco: https://www.ddx3x.it/novita
   - pagina singola: `https://www.ddx3x.it/novita/IL-TUO-SLUG`

Di solito **non serve un nuovo deploy**: dopo Publish il sito legge i contenuti aggiornati (a volte serve un refresh o 1–2 minuti).

---

## 4. Modificare una novità già online

1. Studio → **Novità**
2. Clicca il pezzo dall’elenco
3. Modifica titolo, testo, immagine, data, ecc.
4. **Publish** di nuovo

Se cambi lo **slug**, cambia anche l’URL pubblico. Meglio non cambiare lo slug di pezzi già condivisi (link Facebook, newsletter, GSC).

---

## 5. Togliere / non mostrare più un pezzo

- **Unpublish** (togli dalla pubblicazione): il pezzo resta in bozza nello Studio ma non compare sul sito.
- **Delete**: cancellazione definitiva — usala solo se sei sicura.

---

## 6. Bozze

Puoi salvare senza pubblicare (stato draft). Sul sito pubblico si vedono **solo** i documenti pubblicati.

---

## 7. Cosa non fare

- Non incollare pezzi di codice / script da vecchio WordPress nel testo.
- Non lasciare lo slug vuoto.
- Non pubblicare senza **data** e **categoria**.
- Non usare file enormi (meglio immagini sotto 1–2 MB).
- Non lavorare da `ddx3x-old.vercel.app` — usa sempre `www.ddx3x.it`.

---

## 8. Problemi frequenti

| Problema | Cosa provare |
|----------|----------------|
| Non vedo il pezzo sul sito | Hai cliccato **Publish**? Aspetta 1–2 minuti e ricarica la pagina (anche con Ctrl/Cmd+Shift+R). |
| Login Studio non funziona | Usa https://www.ddx3x.it/studio · chiedi di aggiungere CORS · verifica di essere invitata al progetto Sanity. |
| Lo slug è già usato | Cambia leggermente lo slug (es. aggiungi l’anno). |
| L’immagine non si vede | Ricaricala; controlla di aver premuto Publish dopo l’upload. |
| Devo mettere qualcosa “in evidenza” in home | Oggi alcuni box home sono ancora fissi: chiedi ad Andrea se serve un campo “In evidenza” (si può aggiungere). |

---

## 9. Contatti tecnici

Per accessi, CORS, errori Studio o nuove funzioni (evidenze in home, pagine da modificare): **Andrea / Magiaslab**.

---

*Documento aggiornato: settembre 2026 — sito Next.js + Sanity Studio.*
