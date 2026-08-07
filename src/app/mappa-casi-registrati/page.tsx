import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Mappa dei casi registrati",
  description: "Distribuzione geografica dei casi di sindrome DDX3X registrati dall'Associazione.",
};

export default function Page() {
  return (
    <PageShell title={"Mappa dei casi registrati"} description={"Distribuzione geografica dei casi di sindrome DDX3X registrati dall'Associazione."}>
      <div dangerouslySetInnerHTML={{ __html: "<img src=\"/media/wp/2025/09/Mappa-dei-casi-1.png\" alt=\"\"/>" }} />
    </PageShell>
  );
}
