"use client";

import { useMemo, useState } from "react";

import Layout from "@/components/Layout";
import BlogPostsSection from "@/components/blog/BlogPostsSection";
import RealStoriesSliderSection from "@/components/blog/RealStoriesSliderSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import HeroCarousel from "@/components/shared/HeroCarousel";
import { useGetPublishedBlogs } from "@/services/blogs/query";

export default function BlogPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: fetchedBlogs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPublishedBlogs();

  const blogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return fetchedBlogs;
    return fetchedBlogs.filter((b) => b.title.toLowerCase().includes(q));
  }, [fetchedBlogs, searchQuery]);

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
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message}
        onRetry={refetch}
        searchQuery={searchQuery}
      />

      <RealStoriesSliderSection />
      <TestimonialsSection />
    </Layout>
  );
}
