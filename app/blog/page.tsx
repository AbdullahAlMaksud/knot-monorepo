"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Play } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useGetPublishedBlogs, type Blog } from "@/hooks/useBlogs";
import Image from "next/image";

const videos = [
  { id: 1, thumbnail: "/images/video-1.jpg" },
  { id: 2, thumbnail: "/images/video-2.jpg" },
  { id: 3, thumbnail: "/images/video-3.jpg" },
  { id: 4, thumbnail: "/images/video-4.jpg" },
];

const getFirstImage = (blog: Blog) =>
  blog.contents.find((c) => c.type === "image")?.content;

const getFirstText = (blog: Blog) => {
  const item = blog.contents.find((c) => c.type === "text" && c.content);
  if (!item) return "";
  if (typeof window === "undefined") return item.content.substring(0, 120);
  const div = document.createElement("div");
  div.innerHTML = item.content;
  return (div.textContent || "").substring(0, 120);
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });


export default function BlogPage() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);

  // Debounce search input
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput]);

  // Filtered results for the main content area
  const { data: blogs = [], isLoading } = useGetPublishedBlogs(
    activeCategory !== "All" ? activeCategory : undefined,
    debouncedSearch,
    activeTag
  );

  // Unfiltered — always all published blogs, used only for sidebar categories & tags
  const { data: allPublishedBlogs = [] } = useGetPublishedBlogs();

  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    allPublishedBlogs.forEach((b) => categoriesSet.add(b.category));
    const sorted = Array.from(categoriesSet).sort((a, b) => a.localeCompare(b));
    return ["All", ...sorted];
  }, [allPublishedBlogs]);

  const blogTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allPublishedBlogs.forEach((b) => b.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [allPublishedBlogs]);

  // No client-side filtering, use API results directly
  const featuredBlog = blogs.find((b) => b.isFeatured) ?? blogs[0];
  const gridBlogs = blogs.filter((b) => b._id !== featuredBlog?._id);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] bg-linear-to-r from-gray-300 to-gray-400">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4">
            Your Daily Glow Guide
          </h1>
          <p className="text-lg mb-8 max-w-2xl">
            Stay updated with tips, hacks, product reviews — everything you need for healthier skin.
          </p>
          <div className="w-full max-w-xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-black outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Blog Posts Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="py-12 text-center text-gray-500">Loading articles...</div>
              ) : blogs.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  No articles found{debouncedSearch ? ` for "${debouncedSearch}"` : ""}.
                </div>
              ) : (
                <>
                  {/* Featured Post */}
                  {featuredBlog && (
                    <Link href={`/blog/${featuredBlog.slug}`} className="block mb-12 group">
                      <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden mb-4">
                        {getFirstImage(featuredBlog) ? (
                          <Image
                            src={getFirstImage(featuredBlog as Blog) as string}
                            alt={featuredBlog.title}
                            fill
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300" />
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white px-4 py-1 rounded-full text-sm font-semibold">
                            {featuredBlog.category}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 text-white">
                          <h2 className="text-2xl sm:text-3xl font-light mb-2 line-clamp-2">
                            {featuredBlog.title}
                          </h2>
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {getFirstText(featuredBlog)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Grid Posts */}
                  {gridBlogs.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                      {gridBlogs.map((post) => (
                        <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                          <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                            {getFirstImage(post) ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={getFirstImage(post)}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300" />
                            )}
                            <div className="absolute top-3 left-3">
                              <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <h3 className="font-medium mb-1 group-hover:text-gray-600 transition line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <div className="space-y-1">
                  {allCategories.map((cat) => (
                    <Button
                      key={cat}
                      variant={activeCategory === cat ? "default" : "ghost"}
                      className="w-full flex items-center justify-start px-4 py-2 h-auto font-normal text-left"
                      onClick={() => {
                        setActiveCategory(cat);
                        setActiveTag(undefined);
                      }}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blogTags.map((tag, index) => (
                    <Button
                      key={index}
                      variant={activeTag === tag ? "default" : "secondary"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => {
                        setActiveTag(tag);
                        setSearchInput("");
                      }}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 sm:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-2 gap-4">
              {videos.map((video) => (
                <div key={video.id} className="relative h-48 sm:h-64 rounded-lg overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-linear-to-br from-gray-600 to-gray-800" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={20} fill="black" className="ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">REAL STORIES. REAL RESULTS.</p>
              <h2 className="text-3xl sm:text-4xl font-light mb-4">
                See how our customers share their journey with Byou.
              </h2>
              <p className="text-gray-300 mb-6">
                Watch real testimonials and learn how BYOU has transformed skincare routines around the world.
              </p>
              <Button variant="secondary" className="rounded-full bg-white text-black hover:bg-gray-200">
                Watch More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gray-600 text-sm mb-2">TESTIMONIALS</p>
            <h2 className="text-3xl sm:text-4xl font-light">
              What our customers<br />have experienced
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white border border-gray-200 p-6 rounded-lg">
                <p className="text-sm mb-4">
                  I have been using Glow — can honestly say it is one of the best skincare products I have ever used! My skin is glowing!
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="text-yellow-400">★</div>
                  ))}
                </div>
                <p className="font-semibold text-sm mb-1">Steph Durant</p>
                <p className="text-xs text-gray-600">Glow Getter Peptide Mist</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
