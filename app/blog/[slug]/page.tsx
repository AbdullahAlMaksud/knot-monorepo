"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import ShareButtons from "@/components/shared/ShareButtons";
import BlogProductCard from "@/components/blog/BlogProductCard";
import type { Blog, BlogContent } from "@/services/blogs/type";
import type { ApiProduct } from "@/services/products/type";
import { sanitizeContent } from "@/lib/sanitize";
import { cn, getR2ImageUrl } from "@/lib/utils";
import { useGetBlogBySlug, useGetPublishedBlogs } from "@/services/blogs/query";
import ErrorState from "@/components/ui/error";
import Skeleton from "@/components/ui/skeleton";

function BlogPostSkeleton() {
  return (
    <Layout>
      <div className="mx-auto max-w-[1080px] px-4">
        <Skeleton className="mt-40 h-100 rounded-lg sm:h-[500px]" />
        <div className="mt-4 flex justify-end">
          <Skeleton className="h-4 w-44" />
        </div>
        <article className="py-16 sm:py-24">
          <div className="space-y-5">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-10/12" />
            <Skeleton className="h-80 w-full rounded-lg" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </article>
      </div>
    </Layout>
  );
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const getFirstImage = (blog: Blog): string | undefined => {
  const item = blog.contents.find((c) => c.type === "IMAGE");
  if (!item) return undefined;
  const content = typeof item.content === "string" ? item.content : "";
  if (content && content.startsWith("http")) return content;
  if (item.contentKey) return getR2ImageUrl(item.contentKey);
  return undefined;
};

type ContentGroup =
  | { type: "PRODUCT_GROUP"; items: BlogContent[] }
  | { type: "SINGLE"; item: BlogContent };

const groupBlogContents = (contents: BlogContent[]): ContentGroup[] => {
  const groups: ContentGroup[] = [];
  let i = 0;
  while (i < contents.length) {
    const item = contents[i];
    if (item.type === "PRODUCT") {
      const productItems: BlogContent[] = [];
      while (i < contents.length && contents[i].type === "PRODUCT") {
        productItems.push(contents[i]);
        i++;
        if (productItems.length === 3) break;
      }
      groups.push({ type: "PRODUCT_GROUP", items: productItems });
    } else {
      groups.push({ type: "SINGLE", item });
      i++;
    }
  }
  return groups;
};

const isPublishedBlog = (blog: Blog) =>
  blog.status.trim().toUpperCase() === "PUBLISHED";

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const canonicalUrl =
    typeof window === "undefined" ? `/blog/${slug}` : window.location.href;
  const {
    data: blog,
    isLoading: isBlogLoading,
    isError: isBlogError,
  } = useGetBlogBySlug(slug);
  const { data: allBlogsData } = useGetPublishedBlogs(
    1,
    undefined,
    20,
    undefined,
    Boolean(blog?.category),
  );

  const allRelatedBlogs = useMemo(
    () =>
      (allBlogsData?.data ?? [])
        .filter(
          (item) => item.slug !== slug && item.category === blog?.category,
        )
        .slice(0, 12),
    [allBlogsData, slug, blog?.category],
  );
  const [relatedPage, setRelatedPage] = useState(1);
  const RELATED_PER_PAGE = 4;
  const relatedTotalPages = Math.ceil(
    allRelatedBlogs.length / RELATED_PER_PAGE,
  );
  const relatedBlogs = allRelatedBlogs.slice(
    (relatedPage - 1) * RELATED_PER_PAGE,
    relatedPage * RELATED_PER_PAGE,
  );
  const sortedContents = useMemo(
    () => [...(blog?.contents ?? [])].sort((a, b) => a.order - b.order),
    [blog?.contents],
  );
  const heroImage = blog ? getFirstImage(blog) : undefined;
  const description = useMemo(() => {
    const rawContent =
      sortedContents.find((content) => content.type === "TEXT")?.content ?? "";
    const firstTextContent = typeof rawContent === "string" ? rawContent : "";
    const plainText = stripHtml(firstTextContent);

    return plainText.length > 150 ? `${plainText.slice(0, 147)}...` : plainText;
  }, [sortedContents]);

  if (isBlogLoading) {
    return <BlogPostSkeleton />;
  }

  if (isBlogError || !blog || !isPublishedBlog(blog)) {
    return (
      <Layout>
        <ErrorState message="The article you are looking for is unavailable." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1080px] mx-auto ">
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

        <article className="py-16 sm:py-24">
          <div className="">
            <div className="space-y-6">
              {groupBlogContents(sortedContents).map((group, groupIndex) => {
                if (group.type === "PRODUCT_GROUP") {
                  const products = group.items.map(
                    (item) => item.content as ApiProduct,
                  );
                  const colClass =
                    products.length === 1
                      ? "flex justify-center"
                      : products.length === 2
                        ? "grid grid-cols-2 gap-6"
                        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
                  return (
                    <div
                      key={`product-group-${groupIndex}`}
                      className={colClass}
                    >
                      {products.map((product) => (
                        <div
                          key={product._id}
                          className={
                            products.length === 1 ? "w-full max-w-xs" : ""
                          }
                        >
                          <BlogProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  );
                }
                const item = group.item;
                if (item.type === "TEXT") {
                  return (
                    <div
                      key={item.order}
                      className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&_a]:underline [&_a]:text-black [&_strong]:font-semibold [&_em]:italic"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeContent(item.content as string),
                      }}
                    />
                  );
                }
                if (item.type === "IMAGE") {
                  const content = item.content as string;
                  const src = content?.startsWith("http")
                    ? content
                    : item.contentKey
                      ? getR2ImageUrl(item.contentKey)
                      : null;
                  if (!src) return null;
                  return (
                    <Image
                      key={item.order}
                      src={src}
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
                )}
              </div>
            </div>

            <div className="border-b pb-5 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p>Share this article</p>

              <ShareButtons title={blog.title} url={canonicalUrl} />
            </div>
          </div>
        </article>

        {allRelatedBlogs.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-light mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedBlogs.map((related) => {
                  const relatedImg = getFirstImage(related);
                  return (
                    <Link
                      key={related._id}
                      href={`/blog/${related.slug}`}
                      className="group"
                    >
                      <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                        {relatedImg ? (
                          <Image
                            src={relatedImg}
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
                  );
                })}
              </div>

              {relatedTotalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  {Array.from(
                    { length: relatedTotalPages },
                    (_, i) => i + 1,
                  ).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setRelatedPage(p)}
                      className={cn(
                        "h-10 min-w-10 rounded-full px-3 text-sm font-medium transition-colors",
                        p === relatedPage
                          ? "bg-black text-white"
                          : "border border-black/15 bg-white text-black hover:bg-black/5",
                      )}
                    >
                      {p}
                    </button>
                  ))}
                  {relatedPage < relatedTotalPages && (
                    <button
                      type="button"
                      onClick={() => setRelatedPage((p) => p + 1)}
                      className="flex h-10 items-center gap-1.5 rounded-full border border-black/15 bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-black/5"
                    >
                      Next
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
