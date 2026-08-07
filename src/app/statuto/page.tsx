import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Statuto",
  description: "Statuto dell'Associazione DDX3X Italia ODV.",
};

export default function Page() {
  return (
    <PageShell title="Statuto">
      <p>
        Consulta lo statuto vigente dell&apos;Associazione DDX3X Italia ODV:
      </p>
      <p>
        <a
          href="/media/wp/2021/04/statutoddx3xitaliaodv.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Scarica lo Statuto 2024 (PDF)
        </a>
      </p>
    </PageShell>
  );
}
