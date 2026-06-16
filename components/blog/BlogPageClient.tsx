"use client";

import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import BlogPostsSection from "@/components/blog/BlogPostsSection";
import RealStoriesSliderSection from "@/components/blog/RealStoriesSliderSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import HeroCarousel from "@/components/shared/HeroCarousel";
import { useGetPublishedBlogs } from "@/services/blogs/query";

export default function BlogPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const { data, isLoading, isError, error, refetch } = useGetPublishedBlogs(
    page,
    searchQuery,
  );

  const blogs = data?.data ?? [];
  const meta = data?.meta;

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
        meta={meta}
        page={page}
        onPageChange={setPage}
      />

      <RealStoriesSliderSection />
      <TestimonialsSection />
    </Layout>
  );
}
