import { Calendar } from "lucide-react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { notFound } from "next/navigation";
import Image from "next/image";
import { headers } from "next/headers";
import ShareButtons from "@/components/shared/ShareButtons";
import type { Blog } from "@/services/blogs/type";
import { sanitizeContent } from "@/lib/sanitize";
import { getBlogBySlug, getPublishedBlogs } from "@/services/blogs/api";

async function getRelatedBlogs(
  category: string,
  excludeSlug: string,
): Promise<Blog[]> {
  try {
    const blogs = await getPublishedBlogs(category);
    return blogs.filter((b) => b.slug !== excludeSlug).slice(0, 4);
  } catch {
    return [];
  }
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const getFirstImage = (blog: Blog) =>
  blog.contents.find((c) => c.type === "image")?.content;

const isPublishedBlog = (blog: Blog) =>
  blog.status.trim().toUpperCase() === "PUBLISHED";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const canonicalUrl = `${protocol}://${host}/blog/${slug}`;
  let blog: Blog | null = null;

  try {
    blog = await getBlogBySlug(slug);
  } catch {
    blog = null;
  }

  if (!blog || !isPublishedBlog(blog)) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.category, slug);
  const heroImage = getFirstImage(blog);
  const sortedContents = [...blog.contents].sort((a, b) => a.order - b.order);

  const stripHtml = (html: string) =>
    html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

  const firstTextContent =
    sortedContents.find((c) => c.type === "text")?.content || "";
  const plainText = stripHtml(firstTextContent);
  const description =
    plainText.length > 150 ? plainText.slice(0, 147) + "..." : plainText;

  return (
    <Layout>
      <div className="max-w-[1080px] mx-auto ">
        {/* Hero */}
        <section className="relative h-100 mt-40 sm:h-[500px] rounded-lg overflow-hidden mb-2">
          {heroImage ? (
            <Image
              src={heroImage}
              fill
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400" />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 space-y-5">
            <p className="bg-white w-fit text-black px-4 py-2 rounded-full text-sm font-semibold">
              {blog.category}
            </p>
            <h1 className="text-3xl text-white sm:text-4xl font-light">
              {blog.title}
            </h1>
            <p className="text-white/85 text-sm line-clamp-2">{description}</p>
          </div>
        </section>
        <div className="max-w-[1080px] mx-auto flex items-center justify-end text-gray-500 gap-1">
          <Calendar size={16} />
          <span>{formatDate(blog.createdAt)}</span>
        </div>

        {/* Article Content */}
        <article className="py-16 sm:py-24">
          <div className="">
            {/* Body — render contents in order */}
            <div className="space-y-6">
              {sortedContents.map((item) => {
                if (item.type === "text") {
                  return (
                    <div
                      key={item.order}
                      className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&_a]:underline [&_a]:text-black [&_strong]:font-semibold [&_em]:italic"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeContent(item.content),
                      }}
                    />
                  );
                }
                if (item.type === "image" && item.content) {
                  return (
                    <Image
                      key={item.order}
                      src={item.content}
                      width={1920}
                      height={500}
                      alt={`Blog image ${item.order}`}
                      className="w-full rounded-lg"
                    />
                  );
                }
                return null;
              })}
            </div>

            <div className="mt-12 pb-5 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {blog.tags.length > 0 && (
                  <>
                    <div className="flex gap-1 flex-wrap">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="border-b pb-5 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p>Share this article</p>

              <ShareButtons title={blog.title} url={canonicalUrl} />
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-light mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedBlogs.map((related) => (
                  <Link
                    key={related._id}
                    href={`/blog/${related.slug}`}
                    className="group"
                  >
                    <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                      {getFirstImage(related) ? (
                        <Image
                          src={getFirstImage(related as Blog) as string}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300" />
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="bg-white px-2 py-0.5 rounded-full text-xs font-semibold">
                          {related.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium line-clamp-2 group-hover:text-gray-600 transition">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
