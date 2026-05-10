"use client";

import { useMemo, useState } from "react";

import Layout from "@/components/Layout";
import BlogPostsSection from "@/components/blog/BlogPostsSection";
import RealStoriesSliderSection from "@/components/blog/RealStoriesSliderSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import HeroCarousel from "@/components/shared/HeroCarousel";
import type { Blog } from "@/services/blogs/type";

export default function BlogPageClient({
  initialBlogs,
}: {
  initialBlogs: Blog[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const blogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return initialBlogs;
    return initialBlogs.filter((b) => b.title.toLowerCase().includes(q));
  }, [initialBlogs, searchQuery]);

  const heroMedia = [{ type: "image" as const, src: "/images/blog/cover.jpg" }];

  return (
    <Layout>
      <HeroCarousel
        mediaItems={heroMedia}
        title={
          <>
            Your Daily Glow
            <br />
            Guide
          </>
        }
        description={
          <>
            From expert tips to real stories, explore everything you need for
            healthier skin.
          </>
        }
        searchBar={{
          placeholder: "Search articles...",
          value: searchQuery,
          onChange: setSearchQuery,
        }}
      />

      <BlogPostsSection
        blogs={blogs}
        isLoading={false}
        searchQuery={searchQuery}
      />

      <RealStoriesSliderSection />
      <TestimonialsSection />
    </Layout>
  );
}
