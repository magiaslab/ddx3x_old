import { Header } from "@/components/Header";
import { getNavPages } from "@/lib/sanity";
import { mergeNavigation } from "@/lib/merge-navigation";

export async function SiteHeader() {
  const cmsPages = await getNavPages();
  const items = mergeNavigation(cmsPages);
  return <Header items={items} />;
}
