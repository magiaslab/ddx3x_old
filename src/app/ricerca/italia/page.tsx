import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "La ricerca in Italia",
  description: "Progetti di ricerca sulla sindrome DDX3X in Italia, incluso il Seed Grant Telethon.",
};

export default function Page() {
  return (
    <PageShell title={"La ricerca in Italia"} description={"Progetti di ricerca sulla sindrome DDX3X in Italia, incluso il Seed Grant Telethon."}>
      <div dangerouslySetInnerHTML={{ __html: "<p>L’Associazione DDX3X Italia odv crede profondamente nella&nbsp;<strong>ricerca scientifica come strumento di conoscenza, speranza e cambiamento.</strong></p>\n\n<p>Per questo motivo siamo orgogliosi di annunciare che stiamo partecipando attivamente all’attivazione di un progetto di ricerca specifico sulla sindrome DDX3X, in collaborazione con&nbsp;<strong>Fondazione Telethon</strong>.</p>\n\n<h2><strong>&nbsp;Cosa sono i Seed Grant di Fondazione Telethon?</strong></h2>\n\n<img src=\"/media/wp/2025/10/Seed-Grant-Telethon-Image.png\" alt=\"\"/>\n<p>I Seed Grant sono finanziamenti promossi da Fondazione Telethon per sostenere&nbsp;<strong>progetti di ricerca innovativi e mirati su malattie genetiche rare ancora poco studiate.</strong><br />Il loro scopo è fornire un “seme” iniziale – da cui il nome – a ricercatori motivati che desiderano avviare nuove linee di studio, con un alto potenziale di impatto per la comunità dei pazienti.</p>\n\n<h2><strong>&nbsp;Il primo progetto italiano sulla DDX3X</strong></h2>\n\n<p>Grazie all’impegno delle famiglie e della nostra associazione, abbiamo intrapreso il percorso per <strong>attivare il primo Seed Grant di Fondazione Telethon dedicato alla mutazione del gene DDX3X in Italia.</strong><br />Il bando ufficiale è stato aperto a metà Ottobre 2025 e rappresenta un passo fondamentale per avviare una <strong>ricerca scientifica mirata, autorevole e condivisa</strong>, con ricadute concrete sulla conoscenza della sindrome, sullo sviluppo di strumenti diagnostici e, nel tempo, su possibili approcci terapeutici.</p>\n\n<h2><strong>&nbsp;Insieme per la ricerca</strong></h2>\n\n<p>L’Associazione DDX3X Italia ODV sarà parte attiva nel progetto, sostenendo la divulgazione, favorendo il collegamento tra ricercatori, medici e famiglie, e contribuendo alla&nbsp;<strong>costruzione di una rete europea di conoscenza e collaborazione</strong>.</p>\n\n<p>Investire nella ricerca è per noi un gesto d’amore e responsabilità verso ogni bambina e bambino con DDX3X e verso tutte le famiglie che cercano risposte</p>\n\n<a class=\"btn-link\" href=\"https://www.fondazionetelethon.it/seed-grant-fall-2025/\" target=\"_blank\" rel=\"noreferrer noopener\">Approfondisci</a>\n\n<p></p>" }} />
    </PageShell>
  );
}
