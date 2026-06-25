"use client";

import { useState } from "react";

import Layout from "@/components/Layout";
import BlogPostsSection from "@/components/blog/BlogPostsSection";
import RealStoriesSliderSection from "@/components/blog/RealStoriesSliderSection";
import TestimonialsSection from "@/components/shared/TestimonialsSection";
import { useGetPublishedBlogs, useGetBlogTags } from "@/services/blogs/query";

export default function BlogPageClient() {
  const searchQuery = "";
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const { data, isLoading, isError, error, refetch } = useGetPublishedBlogs(
    page,
    searchQuery,
    10,
    { category: selectedCategory, tags: selectedTag },
  );

  const { data: tagsData } = useGetBlogTags();

  const blogs = data?.data ?? [];
  const meta = data?.meta;

  function handleCategoryChange(category: string | undefined) {
    setSelectedCategory(category);
    setPage(1);
  }

  function handleTagChange(tag: string | undefined) {
    setSelectedTag(tag);
    setPage(1);
  }

  function handleResetFilters() {
    setSelectedCategory(undefined);
    setSelectedTag(undefined);
    setPage(1);
  }

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
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedTag={selectedTag}
          onTagChange={handleTagChange}
          tags={tagsData}
          onResetFilters={handleResetFilters}
        />

        <RealStoriesSliderSection />
        <TestimonialsSection />
      </div>
    </Layout>
  );
}
