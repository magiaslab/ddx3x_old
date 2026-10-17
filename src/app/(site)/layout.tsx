import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      {children}
      <Footer />
    </>
  );
}
