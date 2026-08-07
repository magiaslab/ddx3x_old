import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { CategoryBadge } from "@/components/NewsCard";
import { getPostBySlug, getPosts, urlForImage } from "@/lib/sanity";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Novità" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-stone-300 pl-4 italic">
        {children}
      </blockquote>
    ),
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

  const cover =
    post.coverImageUrl ||
    (post.coverImage
      ? urlForImage(post.coverImage)?.width(1200).height(630).url()
      : null);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8 border-b border-stone-200 pb-6">
        <CategoryBadge category={post.category} />
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
          {post.title}
        </h1>
        <time
          dateTime={post.publishedAt}
          className="mt-3 block text-sm text-stone-500"
        >
          {new Date(post.publishedAt).toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </header>
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt={post.coverImage?.alt || post.title}
          className="mb-8 w-full rounded object-cover"
        />
      ) : null}
      <div className="prose-ddx">
        <PortableText value={post.body} components={portableComponents} />
      </div>
    </main>
  );
}
