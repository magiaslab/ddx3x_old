import type { Metadata } from "next";
import { Lora, Work_Sans } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/JsonLd";
import {
  organizationWebsiteJsonLd,
  siteConfig,
} from "@/lib/site";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Sindrome DDX3X`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: googleVerification
    ? { google: googleVerification }
    : undefined,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${workSans.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={organizationWebsiteJsonLd()} />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
