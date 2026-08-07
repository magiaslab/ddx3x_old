import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Trattamenti e terapie",
  description: "Approcci riabilitativi e di supporto per la sindrome DDX3X.",
};

export default function Page() {
  return (
    <PageShell title={"Trattamenti e terapie"} description={"Approcci riabilitativi e di supporto per la sindrome DDX3X."}>
      <div dangerouslySetInnerHTML={{ __html: "<p>Attualmente <strong>non esiste un protocollo terapeutico unico e condiviso</strong> per la sindrome DDX3X. Ogni percorso viene personalizzato in base alle caratteristiche del singolo bambino o bambina, sotto la guida dei neuropsichiatri e degli specialisti di riferimento.</p>\n\n<p>Tuttavia, nel confronto tra famiglie e nella letteratura scientifica emergono<strong> approcci comuni</strong> che si sono rivelati utili per affrontare alcune delle difficoltà tipiche della sindrome. Tra questi rientrano:</p>\n\n<ul>\n<li><strong>la fisioterapia neuromotoria</strong>, per migliorare il tono muscolare e la motricità;</li>\n\n<li><strong>la logopedia</strong>, per sostenere lo sviluppo comunicativo e del linguaggio;</li>\n\n<li><strong>l’intervento educativo e comportamentale</strong> (es. metodi ABA, DIR/Floortime o Prompt, a seconda del profilo);</li>\n\n<li><strong>la psicomotricità funzionale</strong> e le attività multisensoriali, per favorire l’integrazione corporea e relazionale;</li>\n\n<li><strong>il supporto educativo personalizzato</strong> a scuola, anche con ausili tecnologici o comunicazione aumentativa.</li>\n</ul>\n\n<p>In alcuni casi, si affiancano terapie occupazionali, musicoterapia, idroterapia o <strong>interventi sperimentali</strong> in fase di studio, soprattutto nei paesi dove la ricerca è più avanzata. È importante sottolineare che l’<strong>efficacia delle terapie varia molto da persona a persona</strong>, e che ogni progresso – anche il più piccolo – ha un grande valore.</p>\n\n<p>Come associazione, incoraggiamo un dialogo costante tra famiglie e professionisti, nel rispetto dei percorsi individuali, e promuoviamo<strong> la condivisione di esperienze e buone pratiche</strong> per migliorare la qualità della vita di chi convive con questa sindrome.</p>" }} />
    </PageShell>
  );
}
