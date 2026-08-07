import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "La sindrome DDX3X",
  description: "Cos'è la sindrome DDX3X, sintomi e stato della ricerca.",
};

export default function Page() {
  return (
    <PageShell title={"La sindrome DDX3X"} description={"Cos'è la sindrome DDX3X, sintomi e stato della ricerca."}>
      <div dangerouslySetInnerHTML={{ __html: "<img src=\"/media/wp/2025/11/Screenshot-2025-10-16-112710.png\" alt=\"\"/>\n<h2>Cos’è la sindrome</h2>\n\n<p>E’ una rara mutazione genetica che influisce sullo sviluppo nei soggetti affetti dal concepimento in poi. La maggior parte delle mutazioni si trovano nelle femmine e non sono ereditate dai loro genitori; le poche mutazioni nei maschi sono ereditate da madri apparentemente asintomatiche. È stata scoperto solo nel 2014 e i medici ritengono che sia la <strong>causa dall’1 al 3% di tutte le disabilità intellettive nelle donne</strong>.</p>\n\n<p></p>\n\n<p></p>\n\n<p>Viene spesso diagnosticata erroneamente come disturbo dello spettro autistico, paralisi cerebrale, sindrome di Rett, sindrome di Dandy Walker o un’etichetta generica con ritardo dello sviluppo.</p>\n\n<p>I soggetti presentano disabilità intellettive di varia gravità, convulsioni, autismo, basso tono muscolare, anomalie del cervello e sviluppo fisico precoce.</p>\n\n<p><strong>Ha un ampio spettro</strong>: alcuni bambini imparano a parlare riuscendo a formulare frasi complete mentre altri non parlano; alcuni corrono, saltano e perfino sciano mentre altri non sono in grado di camminare.</p>\n\n<p>I ricercatori di tutto il mondo stanno ora esaminando la sindrome DDX3X e i suoi effetti.&nbsp;</p>\n\n<h2><strong>Sintomi </strong></h2>\n\n<p>Pensi che un tuo conoscente possa essere affetto da sindrome DDX3X?</p>\n\n<p><strong>Non tutti gli individui con DDX3X presentano le stesse caratteristiche</strong>. Tuttavia, possono essere riscontrati i seguenti sintomi:</p>\n\n<ul>\n<li>Disabilità intellettuale</li>\n\n<li>Ritardi nello sviluppo</li>\n\n<li>Basso tono muscolare / ipotonia</li>\n\n<li>Difficoltà di linguaggio</li>\n\n<li>Difficoltà nella deglutizione</li>\n\n<li>Epilessia / convulsioni</li>\n\n<li>Disturbi sensoriali e del movimento</li>\n\n<li>Disturbi del sonno</li>\n\n<li>Anomalie del cervello</li>\n\n<li>Microcefalia</li>\n</ul>" }} />
    </PageShell>
  );
}
