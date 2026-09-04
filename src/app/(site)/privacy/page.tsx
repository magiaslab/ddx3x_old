import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { siteConfig, withCanonical } from "@/lib/site";

export const metadata: Metadata = withCanonical("/privacy", {
  title: "Privacy",
  description: "Informativa privacy dell'Associazione DDX3X Italia ODV.",
});

export default function Page() {
  return (
    <PageShell title="Informativa privacy">
      <p>
        Questo sito è gestito dall&apos;{siteConfig.name}. I dati personali
        eventualmente raccolti (ad esempio tramite form di contatto o donazioni)
        sono trattati per le finalità associate alle attività istituzionali
        dell&apos;Associazione, nel rispetto della normativa vigente (GDPR).
      </p>
      <p>
        Per esercitare i tuoi diritti o richiedere informazioni sul trattamento
        dei dati, scrivi a{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
      <p>
        I pagamenti con carta o PayPal sono gestiti da provider terzi (Stripe,
        PayPal): non memorizziamo i dati delle carte di credito sui nostri
        server.
      </p>
    </PageShell>
  );
}
