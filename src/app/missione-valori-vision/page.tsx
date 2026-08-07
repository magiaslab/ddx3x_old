import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Missione, valori e vision",
  description: "Cosa ci guida ogni giorno come Associazione DDX3X Italia ODV.",
};

export default function Page() {
  return (
    <PageShell title={"Missione, valori e vision"} description={"Cosa ci guida ogni giorno come Associazione DDX3X Italia ODV."}>
      <div dangerouslySetInnerHTML={{ __html: "<img src=\"/media/wp/2025/11/Screenshot-2025-10-16-111648.png\" alt=\"\"/>\n<h2>Missione</h2>\n\n<p>Fin dall’inizio, la nostra missione è stata quella di non lasciare nessuna famiglia sola.</p>\n\n<p>Vogliamo offrire supporto concreto, informazione e rappresentanza alle famiglie di persone con mutazione del gene <em>DDX3X</em>, promuovendo una comunità solidale e collaborativa tra famiglie, medici, terapisti e ricercatori. </p>\n\n<p>Crediamo nella forza della condivisione, nel valore della ricerca e nella necessità di sensibilizzare istituzioni e opinione pubblica.</p>\n\n<h2>Valori</h2>\n\n<p>I nostri valori si fondano sull'ascolto, sull'accoglienza delle diversità, sulla condivisione delle esperienze e sull'impegno a costruire percorsi di cura e inclusione in ogni persona. </p>\n\n<p>Crediamo nella forza della rete, nel valore della ricerca e nel rispetto della dignità di ciascuno.</p>\n\n<h2>Vision</h2>\n\n<p>La nostra vision è un futuro in cui la sindrome DDX3X sia conosciuta, riconosciuta e compresa, dove ogni persona possa esprimere il proprio potenziale e ricevere le migliori opportunità di crescita, cura e partecipazione.</p>\n\n<p>Lavoriamo per facilitare l'accesso alle diagnosi, sostenere la ricerca scientifica e rendere visibile ogni voce della nostra comunità.</p>\n\n<p></p>" }} />
    </PageShell>
  );
}
