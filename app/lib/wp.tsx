import { z } from "zod";
import type { Article } from "@/app/lib/definitions";

const PostSchema = z.object({
  id: z.number(),
  slug: z.string(),
  date: z.string(),
  title: z.object({ rendered: z.string() }),
  excerpt: z.object({ rendered: z.string() }),
  content: z.object({ rendered: z.string() }),
  _embedded: z
    .object({
      "wp:featuredmedia": z
        .array(z.object({ source_url: z.string().optional() }))
        .optional(),
    })
    .optional(),
});

type Post = z.infer<typeof PostSchema>;

const namedEntities: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&nbsp;": " ",
  "&hellip;": "…",
};

function toText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code)),
    )
    .replace(/&[a-z]+;/gi, (entity) => namedEntities[entity] ?? entity)
    .trim();
}

function toArticle(post: Post): Article {
  return {
    id: String(post.id),
    slug: post.slug,
    title: toText(post.title.rendered),
    excerpt: toText(post.excerpt.rendered),
    content: post.content.rendered,
    publishedAt: post.date,
    imageUrl: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
  };
}

async function wpFetch(path: string): Promise<unknown | null> {
  const baseUrl = process.env.WORDPRESS_URL;

  if (!baseUrl) {
    throw new Error("La variable WORDPRESS_URL n'est pas définie.");
  }

  const response = await fetch(`${baseUrl}/wp-json/wp/v2${path}`, {
    next: { revalidate: 300 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`WordPress a répondu ${response.status}.`);
  }

  return response.json();
}

export async function getArticles(): Promise<Article[]> {
  const data = await wpFetch("/posts?per_page=10&_embed=wp:featuredmedia");
  return z.array(PostSchema).parse(data).map(toArticle);
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!/^\d+$/.test(id)) {
    return null;
  }

  const data = await wpFetch(`/posts/${id}?_embed=wp:featuredmedia`);

  return data ? toArticle(PostSchema.parse(data)) : null;
}