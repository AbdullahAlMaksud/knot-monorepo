"use client";

import { useState } from "react";

import type { Blog, BlogMeta } from "@/services/blogs/type";
import { ChevronDown, ChevronRight } from "lucide-react";

import BlogPostCard from "@/components/blog/BlogPostCard";
import ErrorState from "@/components/ui/error";
import Skeleton from "@/components/ui/skeleton";
import { cn, getR2ImageUrl } from "@/lib/utils";

interface BlogPostsSectionProps {
  blogs: Blog[];
  isLoading: boolean;
  isError?: boolean;
  meta?: BlogMeta;
  page?: number;
  onPageChange?: (page: number) => void;
  errorMessage?: string;
  onRetry?: () => void;
  searchQuery: string;
  selectedCategory?: string;
  onCategoryChange?: (category: string | undefined) => void;
  selectedTag?: string;
  onTagChange?: (tag: string | undefined) => void;
}

const sidebarPills = [
  "Hair Care",
  "Skin Tips",
  "Makeup",
  "Trends",
  "Self Care",
  "Products",
  "Tutorials",
  "Color",
  "Styling",
];

const sidebarCategories = [
  { label: "Accessories", keywords: ["accessories"], apiValue: "ACCESSORIES" },
  { label: "Hair", keywords: ["hair"], apiValue: "HAIR" },
  { label: "Beauty", keywords: ["beauty"], apiValue: "BEAUTY" },
  { label: "Skincare", keywords: ["skincare", "skin"], apiValue: "SKINCARE" },
  { label: "Lifestyle", keywords: ["lifestyle"], apiValue: "LIFESTYLE" },
  {
    label: "Wellness",
    keywords: ["wellness", "self care", "self-care"],
    apiValue: "WELLNESS",
  },
  { label: "Makeup", keywords: ["makeup", "cosmetic"], apiValue: "MAKEUP" },
  { label: "Nails", keywords: ["nail"], apiValue: "NAILS" },
  {
    label: "Fragrance",
    keywords: ["fragrance", "perfume"],
    apiValue: "FRAGRANCE",
  },
  { label: "Jewelry", keywords: ["jewelry", "jewellery"], apiValue: "JEWELRY" },
  { label: "Other", keywords: ["other"], apiValue: "OTHER" },
];

function getFirstImage(blog: Blog): string | undefined {
  const item = blog.contents.find((c) => c.type === "IMAGE");
  if (!item) return undefined;
  const content = typeof item.content === "string" ? item.content : "";
  if (content && content.startsWith("http")) return content;
  if (item.contentKey) return getR2ImageUrl(item.contentKey);
  return undefined;
}

function getFirstText(blog: Blog, maxLength: number) {
  const item = blog.contents.find(
    (content) => content.type === "TEXT" && content.content,
  );

  if (!item) return "";
  const text = typeof item.content === "string" ? item.content : "";

  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function normalizeValue(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getCategoryCount(blogs: Blog[], keywords: string[]) {
  return blogs.filter((blog) => {
    const values = [blog.category, ...blog.tags].map(normalizeValue);

    return keywords.some((keyword) => {
      const normalizedKeyword = normalizeValue(keyword);

      return values.some((value) => value.includes(normalizedKeyword));
    });
  }).length;
}

function SidebarPill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex rounded-full border px-4 py-1.5 text-[0.86rem] font-medium tracking-[-0.02em] shadow-[0_1px_0_rgba(255,255,255,0.85)_inset] transition-colors duration-200 sm:px-4.5 sm:text-[0.92rem]",
        active
          ? "border-black bg-black text-white"
          : "border-black/8 bg-[#f5f2ec] text-black hover:bg-[#ece7de]",
      )}
    >
      {children}
    </button>
  );
}

function SidebarSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 text-[0.94rem] tracking-[0.34em] text-black/92"
      >
        <span>{title}</span>
        <ChevronDown
          className="size-4 shrink-0 text-black/75 transition-transform duration-300"
          style={{ transform: open ? "rotate(-180deg)" : "rotate(0deg)" }}
          strokeWidth={1.5}
        />
      </button>

      <div className="mt-3 h-px bg-black/20" />

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export default function BlogPostsSection({
  blogs,
  isLoading,
  isError = false,
  errorMessage,
  onRetry,
  searchQuery,
  meta,
  page = 1,
  onPageChange,
  selectedCategory,
  onCategoryChange,
  selectedTag,
  onTagChange,
}: BlogPostsSectionProps) {
  const featuredBlog = blogs.find((blog) => blog.isFeatured) ?? blogs[0];
  const gridBlogs = blogs.filter((blog) => blog._id !== featuredBlog?._id);
  const categoryRows = [
    {
      label: "All",
      count: meta?.total ?? blogs.length,
      apiValue: undefined as string | undefined,
    },
    ...sidebarCategories.map((category) => ({
      label: category.label,
      count: getCategoryCount(blogs, category.keywords),
      apiValue: category.apiValue as string | undefined,
    })),
  ];

  return (
    <section className="bg-transparent py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,23rem)] xl:gap-12">
            <div>
              <Skeleton className="mb-8 h-[420px] rounded-lg" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="h-52 rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
            <aside className="hidden space-y-4 lg:block">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-64 rounded-lg" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-32 rounded-lg" />
            </aside>
          </div>
        ) : isError ? (
          <ErrorState
            message={errorMessage}
            onRetry={onRetry}
            className="rounded-[2rem] border border-gray-100 bg-white"
          />
        ) : blogs.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-16 text-center text-white/70">
            No articles found
            {searchQuery ? ` for "${searchQuery}"` : ""}.
          </div>
        ) : (
          <>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,23rem)] xl:gap-12">
              <div>
                {featuredBlog ? (
                  <BlogPostCard
                    blog={featuredBlog}
                    imageSrc={getFirstImage(featuredBlog)}
                    excerpt={getFirstText(featuredBlog, 180)}
                    variant="featured"
                    priority
                    className="mb-8 lg:mb-10"
                  />
                ) : null}

                {gridBlogs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {gridBlogs.map((blog) => (
                      <BlogPostCard
                        key={blog._id}
                        blog={blog}
                        imageSrc={getFirstImage(blog)}
                        excerpt={getFirstText(blog, 72)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>

              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="overflow-hidden rounded-none bg-transparent px-5 py-5 shadow-none sm:px-6 sm:py-6">
                  <SidebarSection title="Categories">
                    <div className="mt-2 divide-y divide-black/6">
                      {categoryRows.map((category) => (
                        <button
                          key={category.label}
                          type="button"
                          onClick={() => onCategoryChange?.(category.apiValue)}
                          className={cn(
                            "flex w-full cursor-pointer items-center justify-between gap-4 py-3 text-[1.04rem] tracking-[0.01em] transition-colors",
                            selectedCategory === category.apiValue
                              ? "font-semibold text-black"
                              : "text-black/88 hover:text-black",
                          )}
                        >
                          <span>{category.label}</span>
                          <span className="min-w-8 text-right font-medium tracking-[0.12em] text-black/72">
                            {String(category.count).padStart(2, "0")}
                          </span>
                        </button>
                      ))}
                    </div>
                  </SidebarSection>
                </div>
              </aside>
            </div>

            {meta && meta.totalPage > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => onPageChange?.(p)}
                      className={cn(
                        "h-10 min-w-10 rounded-full px-3 text-sm font-medium transition-colors",
                        p === page
                          ? "bg-black text-white"
                          : "border border-black/15 bg-white text-black hover:bg-black/5",
                      )}
                    >
                      {p}
                    </button>
                  ),
                )}
                {page < meta.totalPage && (
                  <button
                    type="button"
                    onClick={() => onPageChange?.(page + 1)}
                    className="flex h-10 items-center gap-1.5 rounded-full border border-black/15 bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-black/5"
                  >
                    Next
                    <ChevronRight className="size-4" strokeWidth={1.5} />
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
