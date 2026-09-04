import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { withCanonical } from "@/lib/site";

export const metadata: Metadata = {
  ...withCanonical("/dona/annullato", {
    title: "Donazione annullata",
    description:
      "La donazione è stata annullata. Puoi riprovare in qualsiasi momento.",
  }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <PageShell title="Donazione annullata">
      <p>
        Il pagamento non è stato completato. Nessun addebito è stato effettuato.
        Puoi riprovare quando vuoi.
      </p>
      <p>
        <Link href="/dona">Torna al form di donazione</Link>
      </p>
    </PageShell>
  );
}
