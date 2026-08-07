import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Bilanci",
  description: "Bilanci dell'Associazione DDX3X Italia ODV.",
};

const bilanci = [
  { year: 2024, href: "/media/wp/2025/05/bilancio2024-.pdf" },
  { year: 2023, href: "/media/wp/2024/04/bilancio2023.pdf" },
  { year: 2022, href: "/media/wp/2023/06/BILANCIO2022.pdf" },
  { year: 2021, href: "/media/wp/2022/04/bilancio-2021-nota-integrativa.pdf" },
];

export default function Page() {
  return (
    <PageShell
      title="Bilanci"
      description="Trasparenza sulle attività economiche dell'Associazione."
    >
      <ul>
        {bilanci.map((b) => (
          <li key={b.year}>
            <a href={b.href} target="_blank" rel="noreferrer">
              Bilancio {b.year} (PDF)
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
