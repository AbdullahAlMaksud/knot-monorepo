"use client";

import { useState } from "react";

import Layout from "@/components/Layout";
import BlogPostsSection from "@/components/blog/BlogPostsSection";
import RealStoriesSliderSection from "@/components/blog/RealStoriesSliderSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import { useGetPublishedBlogs } from "@/services/blogs/query";

export default function BlogPageClient() {
  const searchQuery = "";
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useGetPublishedBlogs(
    page,
    searchQuery,
  );

  const blogs = data?.data ?? [];
  const meta = data?.meta;

  return (
    <Layout>
      <div className="pt-32">
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
      </div>
    </Layout>
  );
}
