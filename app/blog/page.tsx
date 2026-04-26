"use client";

import { useState } from "react";

import Layout from "@/components/Layout";
import BlogPostsSection from "@/components/blog/BlogPostsSection";
import RealStoriesSliderSection from "@/components/blog/RealStoriesSliderSection";
import { useGetPublishedBlogs } from "@/hooks/useBlogs";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import HeroCarousel from "@/components/shared/HeroCarousel";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: blogs = [], isLoading } = useGetPublishedBlogs(
    undefined,
    searchQuery,
  );

  const heroMedia = [{ type: "image" as const, src: "/images/blog/cover.jpg" }];
  return (
    <Layout>
      {/* Hero Section */}
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
        searchQuery={searchQuery}
      />

      <RealStoriesSliderSection />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </Layout>
  );
}
