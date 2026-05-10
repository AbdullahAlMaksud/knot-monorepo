import BlogPageClient from "@/components/blog/BlogPageClient";
import type { Blog } from "@/services/blogs/type";
import { getPublishedBlogs } from "@/services/blogs/api";

export const dynamic = "force-dynamic";

async function fetchPublishedBlogs(): Promise<Blog[]> {
  try {
    return await getPublishedBlogs();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await fetchPublishedBlogs();
  return <BlogPageClient initialBlogs={blogs} />;
}
