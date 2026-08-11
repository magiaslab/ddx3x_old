import type { Metadata } from "next";
import Link from "next/link";
import { LatestNews } from "@/components/NewsCard";
import { getLatestPosts } from "@/lib/sanity";
import { BANK_DETAILS } from "@/lib/campaigns";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — Insieme per la Sindrome DDX3X`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Insieme per la Sindrome DDX3X`,
    description: siteConfig.description,
    url: "/",
  },
};

const SHOW_CONFERENCE_BANNER = true;
const SHOW_MAP = true;
const FUNDRAISING = { goal: 25000, raised: 12000 };

function formatItNumber(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const HERO_BG =
  "/media/wp/2025/09/Insieme-per-capire-sostenere-e-dare-voce-alla-Sindrome-DDX3X.png";
const MAP_IMG = "/media/wp/2025/09/Mappa-dei-casi-1.png";

export default async function HomePage() {
  const posts = await getLatestPosts(4);
  const progress = Math.min(
    100,
    Math.round((FUNDRAISING.raised / FUNDRAISING.goal) * 100),
  );

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 md:px-8 md:pb-24 md:pt-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_BG}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(251,249,245,.62)] via-[rgba(251,249,245,.38)] to-[var(--sand-50)] sm:bg-gradient-to-r sm:from-[rgba(251,249,245,.78)] sm:via-[rgba(251,249,245,.42)] sm:to-[rgba(251,249,245,.08)]" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-[var(--sand-50)] via-transparent to-transparent sm:block" />

        <div className="relative mx-auto max-w-[1240px]">
          <div className="max-w-[640px]">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#EAF5E4] px-3 py-1.5 text-[12px] font-semibold tracking-[0.04em] text-[var(--green-700)] sm:mb-5 sm:text-[13px]">
              Associazione DDX3X Italia ODV
            </span>
            <h1 className="mb-4 font-serif text-[1.85rem] font-semibold leading-[1.18] text-[var(--ink)] sm:mb-5 sm:text-4xl md:text-[48px] md:leading-[1.14]">
              Insieme per capire, sostenere e dare voce alla Sindrome DDX3X
            </h1>
            <p className="mb-7 max-w-[560px] text-base leading-relaxed text-[var(--gray-600)] sm:mb-8 sm:text-lg">
              Un&apos;associazione di famiglie per condividere esperienze,
              promuovere la ricerca e accompagnare chi vive con la mutazione
              del gene DDX3X.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
              <Link
                href="/dona"
                className="btn-pill btn-primary w-full px-7 py-3.5 text-[15.5px] sm:w-auto"
              >
                Dona ora
              </Link>
              <Link
                href="/contatti"
                className="btn-pill btn-outline w-full text-[15.5px] sm:w-auto"
              >
                Iscriviti all&apos;Associazione
              </Link>
              <Link
                href="/chi-siamo"
                className="px-1 py-2 text-center text-[15px] font-semibold text-[#3A3247] no-underline hover:text-[var(--purple-700)] sm:px-2.5 sm:py-3.5 sm:text-left sm:text-[15.5px]"
              >
                Chi siamo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24 md:px-8">
        <div className="mx-auto grid max-w-[1240px] gap-4 sm:gap-6 md:grid-cols-3">
          <QuickCard
            href="/dona"
            title="Donazione all'Associazione DDX3X"
            body="Questo gruppo è stato fondato da genitori e familiari di bambini affetti da sindrome DDX3X. Un vostro supporto è fondamentale per proseguire il lungo cammino verso nuove scoperte di questa rara sindrome."
            cta="Dona"
            image="/media/wp/2025/09/donazione-home-colonna-a.png"
          />
          <QuickCard
            href="/storie"
            title="Le nostre storie"
            body="Qui trovate una raccolta di testimonianze autentiche che raccontano la vita quotidiana di persone che convivono con la Sindrome, mostrando sempre forza, determinazione e speranza."
            cta="Leggi le storie"
            image="/media/wp/2025/09/storie-home-colonna-b.png"
          />
          <QuickCard
            href="/contatti"
            title="Contatti"
            body="Il contatto con voi sarà costante perché i protagonisti di questa esperienza siete voi ed i vostri bambini. Condividere la vita quotidiana ci permetterà uno scambio di idee utile a tutti."
            cta="Scrivici"
            image="/media/wp/2025/09/contatti-home-colonna-c.png"
          />
        </div>
      </section>

      <section id="dona" className="px-4 pb-16 sm:px-6 sm:pb-24 md:px-8">
        <div className="mx-auto grid max-w-[1240px] gap-4 sm:gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative overflow-hidden rounded-[22px] bg-[var(--purple-900)] p-6 text-white sm:rounded-3xl sm:p-9 md:p-11">
            <span className="text-[12px] font-semibold uppercase tracking-[0.05em] text-[#C3B3E8] sm:text-[13px]">
              Campagna 2026
            </span>
            <h2 className="mb-2.5 mt-3 font-serif text-[22px] font-semibold sm:mt-3.5 sm:text-[26px]">
              Obiettivo raccolta fondi per la ricerca
            </h2>
            <p className="mb-6 max-w-[460px] text-[14.5px] leading-relaxed text-[#D8CFEA] sm:mb-7 sm:text-[15px]">
              Ogni contributo finanzia direttamente i progetti di ricerca sulla
              sindrome DDX3X e il supporto alle famiglie.
            </p>
            <div className="mb-3 h-3 overflow-hidden rounded-full bg-white/14">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--green-600)] to-[#7BC367]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mb-6 flex flex-col gap-1 text-sm text-[#D8CFEA] sm:flex-row sm:justify-between sm:gap-0">
              <span>
                <strong className="text-[17px] text-white">
                  €{formatItNumber(FUNDRAISING.raised)}
                </strong>{" "}
                raccolti
              </span>
              <span>
                Obiettivo €{formatItNumber(FUNDRAISING.goal)}
              </span>
            </div>
            <Link
              href="/dona"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-[var(--purple-900)] no-underline hover:bg-[var(--purple-100)] sm:w-auto"
            >
              Dona ora →
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-[22px] border border-[var(--amber-border)] bg-[var(--amber-tint)] p-6 sm:rounded-3xl sm:p-9">
            <div>
              <span className="mb-3 text-[12px] font-semibold uppercase tracking-[0.05em] text-[#6B4F12] sm:text-[13px]">
                Dichiarazione dei redditi
              </span>
              <h2 className="mb-2.5 font-serif text-[20px] font-semibold text-[var(--ink)] sm:text-[21px]">
                Dona il tuo 5×1000
              </h2>
              <p className="mb-5 text-[14.5px] leading-relaxed text-[#5C4E32]">
                Non ti costa nulla: indica il nostro codice fiscale nella
                dichiarazione dei redditi.
              </p>
            </div>
            <div>
              <div className="mb-4 break-all rounded-xl border border-dashed border-[#E0C27A] bg-white px-3 py-3 font-mono text-[14px] tracking-wide text-[#6B4F12] sm:px-4 sm:text-[15px]">
                {BANK_DETAILS.codiceFiscale}
              </div>
              <Link
                href="/dona"
                className="text-[14.5px] font-semibold text-[#6B4F12] no-underline hover:text-[#4A360C]"
              >
                Scopri come fare →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {SHOW_CONFERENCE_BANNER ? (
        <section className="px-4 pb-16 sm:px-6 sm:pb-24 md:px-8">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-5 rounded-[22px] border border-[#E2D5F2] bg-[var(--purple-50)] px-5 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-7 sm:rounded-3xl sm:px-8 sm:py-8">
            <div className="flex w-fit min-w-[88px] flex-col items-center justify-center rounded-2xl bg-[var(--purple-600)] px-5 py-3.5 text-white">
              <span className="font-serif text-2xl font-bold leading-none">
                5–6
              </span>
              <span className="text-xs uppercase tracking-[0.04em]">
                Maggio
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[var(--purple-600)]">
                In evidenza
              </span>
              <h2 className="my-1.5 font-serif text-[20px] font-semibold text-[var(--ink)] sm:text-[22px]">
                3° Conferenza Internazionale DDX3X
              </h2>
              <p className="m-0 text-[14.5px] text-[var(--gray-600)]">
                Famiglie, professionisti, ricercatori e caregiver insieme per
                condividere conoscenza, esperienze e prospettive.
              </p>
            </div>
            <Link
              href="/eventi/conferenza-internazionale"
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-[var(--ink)] px-6 py-3 text-[14.5px] font-semibold text-white no-underline hover:bg-[#3A2C55] sm:w-auto"
            >
              Scopri di più →
            </Link>
          </div>
        </section>
      ) : null}

      <LatestNews posts={posts} />

      {SHOW_MAP ? (
        <section className="px-4 pb-16 sm:px-6 sm:pb-24 md:px-8">
          <div className="mx-auto grid max-w-[1240px] items-center gap-7 rounded-[22px] border border-[#DCEBD3] bg-[var(--green-50)] p-6 sm:gap-9 sm:rounded-3xl sm:p-10 md:grid-cols-2">
            <div>
              <span className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[var(--green-700)]">
                Rete nazionale
              </span>
              <h2 className="mb-3.5 mt-3 font-serif text-[24px] font-semibold text-[var(--ink)] sm:text-[28px]">
                Mappa dei casi registrati
              </h2>
              <p className="mb-6 max-w-[440px] text-[15px] leading-relaxed text-[var(--gray-600)]">
                Da un primo gruppo di famiglie isolate siamo diventati una rete
                nazionale in continua crescita. Segnala il tuo caso per aiutarci
                a costruire una mappa più completa della sindrome in Italia.
              </p>
              <Link
                href="/mappa-casi-registrati"
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--green-600)] px-6 py-3 text-[14.5px] font-semibold text-white no-underline hover:bg-[var(--green-700)] sm:w-auto"
              >
                Vedi la mappa completa →
              </Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MAP_IMG}
              alt="Mappa dei casi registrati di sindrome DDX3X in Italia"
              className="mx-auto w-full max-w-[420px] rounded-2xl"
            />
          </div>
        </section>
      ) : null}
    </>
  );
}

function QuickCard({
  href,
  title,
  body,
  cta,
  image,
}: {
  href: string;
  title: string;
  body: string;
  cta: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3.5 rounded-[18px] border border-[var(--border)] bg-white p-5 text-[var(--ink)] no-underline transition hover:-translate-y-0.5 hover:border-[#D9CBEF] sm:gap-4 sm:rounded-[20px] sm:p-8"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        className="h-14 w-14 rounded-[12px] object-contain sm:h-[72px] sm:w-[72px] sm:rounded-[14px]"
      />
      <div>
        <h2 className="mb-2 font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
          {title}
        </h2>
        <p className="m-0 text-[14.5px] leading-relaxed text-[var(--gray-600)] sm:text-[15px]">
          {body}
        </p>
      </div>
      <span className="mt-auto text-[14.5px] font-semibold text-[var(--purple-600)]">
        {cta} →
      </span>
    </Link>
  );
}
