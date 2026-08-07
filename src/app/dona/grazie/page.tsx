import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Grazie per la donazione",
  description: "La tua donazione all'Associazione DDX3X Italia ODV è andata a buon fine.",
};

export default function Page() {
  return (
    <PageShell title="Grazie di cuore">
      <p>
        La tua donazione è stata ricevuta. Ogni contributo ci aiuta a sostenere
        famiglie, ricerca e sensibilizzazione sulla sindrome DDX3X.
      </p>
      <p>
        <Link href="/">Torna alla home</Link>
        {" · "}
        <Link href="/novita">Ultime novità</Link>
      </p>
    </PageShell>
  );
}
