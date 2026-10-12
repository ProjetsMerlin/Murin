import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/app/lib/wp";

type BlogProps = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: BlogProps) {
  const articles = await getArticles();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
      <ul className="mt-10 flex flex-row flex-wrap">
        {articles.map((article) => (
          <li className="md:w-1/2 p-4" key={article.id}>
            <Link
              href={`/blog/${article.id}-${article.slug}`}
              className="group block"
            >
              {article.imageUrl && (
                <div className="relative mb-4 aspect-video overflow-hidden rounded">
                  <Image src={article.imageUrl}
                    loading="eager"
                    alt="image"
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <time
                dateTime={article.publishedAt}
                className="text-sm text-neutral-500"
              >
                {new Intl.DateTimeFormat("fr-BE", {
                  dateStyle: "long",
                }).format(new Date(article.publishedAt))}
              </time>
              <h2 className="mt-1 text-2xl font-semibold group-hover:underline">
                {article.title}
              </h2>
              <p className="mt-2 text-neutral-700">{article.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}