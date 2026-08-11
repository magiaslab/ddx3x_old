import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { CategoryBadge, formatDateIt } from "@/components/NewsCard";
import { JsonLd } from "@/components/JsonLd";
import type { Post } from "@/content/seed-posts";
import { getPostBySlug, getPosts, urlForImage } from "@/lib/sanity";
import { absoluteUrl, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

function postCoverUrl(post: Post): string | null {
  if (post.coverImageUrl) return post.coverImageUrl;
  if (post.coverImage) {
    return urlForImage(post.coverImage)?.width(1200).height(630).url() ?? null;
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Novità" };
  const cover = postCoverUrl(post);
  const path = `/novita/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: path,
      publishedTime: post.publishedAt,
      images: cover
        ? [{ url: cover, alt: post.coverImage?.alt || post.title }]
        : undefined,
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      images: cover ? [cover] : undefined,
    },
  };
}

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cover = postCoverUrl(post);
  const pageUrl = absoluteUrl(`/novita/${post.slug}`);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    inLanguage: siteConfig.language,
    image: cover ? [cover] : undefined,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo-color.png"),
      },
    },
  };

  return (
    <main className="mx-auto max-w-[40rem] px-4 py-10 sm:px-6 sm:py-14 md:px-8">
      <JsonLd data={articleLd} />
      <header className="mb-7 border-b border-[var(--border)] pb-5 sm:mb-8 sm:pb-6">
        <CategoryBadge category={post.category} />
        <h1 className="mt-3 font-serif text-[1.65rem] font-semibold tracking-tight text-[var(--ink)] sm:text-3xl md:text-[2rem]">
          {post.title}
        </h1>
        <time
          dateTime={post.publishedAt}
          className="mt-3 block text-sm text-[var(--gray-400)]"
        >
          {formatDateIt(post.publishedAt)}
        </time>
      </header>
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt={post.coverImage?.alt || post.title}
          className="mb-8 w-full rounded-[18px] object-cover"
        />
      ) : null}
      <div className="prose-ddx max-w-[65ch]">
        <PortableText value={post.body} components={portableComponents} />
      </div>
    </main>
  );
}
