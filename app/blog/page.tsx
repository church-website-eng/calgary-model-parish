import { getBlogPosts } from "@/lib/contentful";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { placeholderPosts } from "@/data/blog";
import { getContent } from "@/lib/content";
import type { BlogPost } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, reflections, and articles from CCC Calgary Model Parish.",
};

function getEmbedUrl(url: string) {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  return url;
}

export default async function BlogPage() {
  const [contentfulPosts, dbData] = await Promise.all([
    getBlogPosts(20),
    getContent("blog", { posts: [] } as { posts: BlogPost[] }),
  ]);

  // DB posts first, then Contentful, then placeholder
  const items = dbData.posts.length > 0
    ? dbData.posts
    : contentfulPosts.length > 0
      ? contentfulPosts
      : placeholderPosts;

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          News, reflections, and parish updates
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((post) => {
              const image = (post as { imageUrl?: string }).imageUrl || post.featuredImage;
              const video = (post as { videoUrl?: string }).videoUrl;
              return (
                <Card key={post.id} className="flex flex-col">
                  {image && (
                    <img
                      src={image}
                      alt={post.title}
                      className="mb-4 h-48 w-full rounded-lg object-cover"
                    />
                  )}
                  {video && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                          src={getEmbedUrl(video)}
                          className="absolute inset-0 h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={post.title}
                        />
                      </div>
                    </div>
                  )}
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
                    {post.category} &middot; {formatDate(post.date)}
                  </p>
                  <h3 className="mb-2 font-serif text-xl font-bold text-primary">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mb-3 flex-1 text-sm text-foreground/70">
                    {post.excerpt || post.body.substring(0, 150)}
                  </p>
                  <p className="text-xs text-muted">By {post.author}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
