import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: "L'Associazione DDX3X Italia ODV: famiglie unite per informazione, supporto e ricerca.",
};

export default function Page() {
  return (
    <PageShell title={"Chi siamo"} description={"L'Associazione DDX3X Italia ODV: famiglie unite per informazione, supporto e ricerca."}>
      <div dangerouslySetInnerHTML={{ __html: "<p>Siamo l’Associazione DDX3X Italia ODV, una realtà senza scopo di lucro fondata nel 2020 da genitori uniti dal desiderio di offrire supporto e informazioni a chi affronta la diagnosi DDX3X.</p>\n\n<p>In collegamento con la DDX3X Foundation (USA) e le altre realtà Europee, promuoviamo la sensibilizzazione pubblica, il sostegno alla ricerca e la creazione di una rete internazionale tra famiglie e specialisti.&nbsp;</p>\n\n<p>Molte famiglie hanno vissuto anni di incertezza prima di ricevere la diagnosi: la nostra missione è accoglierle, orientarle e aiutarle anche sul piano concreto.</p>\n\n<h2>Storia dell’Associazione</h2>\n\n<p>La storia dell’Associazione DDX3X Italia ODV nasce nel luglio 2019, quando Martina Faletti riceve la diagnosi di sindrome DDX3X presso l’Ospedale Gaslini di Genova, dopo anni di incertezze e di ricerche. In quel periodo in Italia non esisteva alcun punto di riferimento, se non una piccola pagina Facebook seguita da poche famiglie.</p>\n\n<img src=\"/media/wp/2025/11/Screenshot-2025-11-06-105921.png\" alt=\"\"/>\n<p>Dopo il contatto della famiglia di Martina con la dott.ssa Silvia De Rubeis, ricercatrice a New York, e grazie alla spinta di genitori motivati come Cinzia, mamma di Martina, è maturata l’idea di creare una realtà capace di offrire supporto concreto e di avviare percorsi di ricerca. Con l’aiuto del Celivo – Centro di Servizio per il Volontariato di Genova, nel novembre 2020 è stata ufficialmente fondata l’Associazione DDX3X Italia ODV.</p>\n\n<p>Fin dall’inizio gli obiettivi sono stati due: aggregare le famiglie e sostenere la ricerca scientifica. La pagina Facebook è stata rinnovata, è stato aperto un sito web, creato una chat WhatsApp per rimanere in contatto e organizzato le prime iniziative di raccolta fondi. I primi contributi sono arrivati da parenti e amici, seguiti da campagne solidali come la vendita delle uova pasquali e piccoli mercatini natalizi a Genova e Portofino.</p>\n\n<p>Negli anni successivi abbiamo ottenuto il riconoscimento come ODV iscritta al RUNTS, l’accesso al 5x1000 e la possibilità di usufruire delle agevolazioni previste per le organizzazioni non profit. Da quel primo gruppo di famiglie isolate, oggi siamo diventati una rete nazionale in continua crescita, che lavora per sostenere chi vive la diagnosi e per costruire un futuro di speranza e ricerca.<br /></p>" }} />
    </PageShell>
  );
}
