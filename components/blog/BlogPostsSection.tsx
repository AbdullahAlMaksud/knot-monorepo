"use client";

import { useState } from "react";

import type { Blog } from "@/hooks/useBlogs";
import { ChevronDown } from "lucide-react";

import BlogPostCard from "@/components/blog/BlogPostCard";

interface BlogPostsSectionProps {
  blogs: Blog[];
  isLoading: boolean;
  searchQuery: string;
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
  { label: "Hair", keywords: ["hair"] },
  { label: "Skincare", keywords: ["skincare", "skin", "beauty"] },
  { label: "Makeup", keywords: ["makeup", "cosmetic"] },
  { label: "Nails", keywords: ["nail"] },
  { label: "Men's Grooming", keywords: ["men", "groom"] },
  { label: "Wellness", keywords: ["wellness", "self care", "self-care"] },
];

function getFirstImage(blog: Blog) {
  return blog.contents.find((content) => content.type === "image")?.content;
}

function getFirstText(blog: Blog, maxLength: number) {
  const item = blog.contents.find(
    (content) => content.type === "text" && content.content,
  );

  if (!item) return "";

  return item.content
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

function SidebarPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-black/8 bg-[#f5f2ec] px-4 py-1.5 text-[0.86rem] font-medium tracking-[-0.02em] text-black shadow-[0_1px_0_rgba(255,255,255,0.85)_inset] transition-colors duration-200 hover:bg-[#ece7de] sm:px-4.5 sm:text-[0.92rem]">
      {children}
    </span>
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
  searchQuery,
}: BlogPostsSectionProps) {
  const featuredBlog = blogs.find((blog) => blog.isFeatured) ?? blogs[0];
  const gridBlogs = blogs.filter((blog) => blog._id !== featuredBlog?._id);
  const categoryRows = [
    { label: "All", count: blogs.length },
    ...sidebarCategories.map((category) => ({
      label: category.label,
      count: getCategoryCount(blogs, category.keywords),
    })),
  ];

  return (
    <section className="bg-transparent py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-16 text-center text-white/70">
            Loading articles...
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-16 text-center text-white/70">
            No articles found
            {searchQuery ? ` for "${searchQuery}"` : ""}.
          </div>
        ) : (
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
                      <div
                        key={category.label}
                        className="flex items-center justify-between gap-4 py-3 text-[1.04rem] tracking-[0.01em] text-black/88"
                      >
                        <span>{category.label}</span>
                        <span className="min-w-8 text-right font-medium tracking-[0.12em] text-black/72">
                          {String(category.count).padStart(2, "0")}
                        </span>
                      </div>
                    ))}
                  </div>
                </SidebarSection>

                <div className="mt-6">
                  <SidebarSection title="Popular Tags">
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {sidebarPills.map((pill) => (
                        <SidebarPill key={pill}>{pill}</SidebarPill>
                      ))}
                    </div>
                  </SidebarSection>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
