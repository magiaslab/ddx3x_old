import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Contatta l'Associazione DDX3X Italia ODV per informazioni, iscrizione o supporto.",
};

export default function Page() {
  return (
    <PageShell title={"Contatti"} description={"Contatta l'Associazione DDX3X Italia ODV per informazioni, iscrizione o supporto."}>
      <div dangerouslySetInnerHTML={{ __html: "<img src=\"/media/wp/2025/09/Insieme-per-capire-sostenere-e-dare-voce-alla-Sindrome-DDX3X-1-1.png\" alt=\"\"/>\n<p>Hai bisogno di informazioni sulla Sindrome DDX3X, vuoi unirti alla nostra comunità o sostenerci nelle attività dell’Associazione?</p>\n\n<p><br />Siamo a disposizione per rispondere alle tue domande e per accompagnarti in questo percorso.</p>\n\n<a class=\"btn-link\" href=\"mailto:info@ddx3x.it\">📧 Email</a>\n\n<p><strong>Seguici anche sui social</strong></p>\n\n<p>Rimani aggiornato sulle nostre iniziative e condividi la tua esperienza con la community:</p>\n\n<ul>\n\n</ul>\n\n<p></p>" }} />
    </PageShell>
  );
}
