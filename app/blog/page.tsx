"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Play } from "lucide-react";
import Layout from "@/components/Layout";

const blogPosts = [
  {
    id: 1,
    category: "Skincare",
    title:
      "Lorem ipsum dolor sit amet consectetur. Mollis odio elit consectet...",
    excerpt: "Lorem ipsum dolor sit amet...",
    image: "/images/blog-1.jpg",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Wellness",
    title:
      "Lorem ipsum dolor sit amet consectetur. Mollis odio elit consectet...",
    excerpt: "Lorem ipsum dolor sit amet...",
    image: "/images/blog-2.jpg",
    readTime: "5 min read",
  },
  {
    id: 3,
    category: "Wellness",
    title:
      "Lorem ipsum dolor sit amet consectetur. Mollis odio elit consectet...",
    excerpt: "Lorem ipsum dolor sit amet...",
    image: "/images/blog-3.jpg",
    readTime: "5 min read",
  },
  {
    id: 4,
    category: "Skincare",
    title:
      "Lorem ipsum dolor sit amet consectetur. Mollis odio elit consectet...",
    excerpt: "Lorem ipsum dolor sit amet...",
    image: "/images/blog-4.jpg",
    readTime: "5 min read",
  },
  {
    id: 5,
    category: "Wellness",
    title:
      "Lorem ipsum dolor sit amet consectetur. Mollis odio elit consectet...",
    excerpt: "Lorem ipsum dolor sit amet...",
    image: "/images/blog-5.jpg",
    readTime: "5 min read",
  },
  {
    id: 6,
    category: "Wellness",
    title:
      "Lorem ipsum dolor sit amet consectetur. Mollis odio elit consectet...",
    excerpt: "Lorem ipsum dolor sit amet...",
    image: "/images/blog-6.jpg",
    readTime: "5 min read",
  },
  {
    id: 7,
    category: "Skincare",
    title:
      "Lorem ipsum dolor sit amet consectetur. Mollis odio elit consectet...",
    excerpt: "Lorem ipsum dolor sit amet...",
    image: "/images/blog-7.jpg",
    readTime: "5 min read",
  },
  {
    id: 8,
    category: "Wellness",
    title:
      "Lorem ipsum dolor sit amet consectetur. Mollis odio elit consectet...",
    excerpt: "Lorem ipsum dolor sit amet...",
    image: "/images/blog-8.jpg",
    readTime: "5 min read",
  },
  {
    id: 9,
    category: "Wellness",
    title:
      "Lorem ipsum dolor sit amet consectetur. Mollis odio elit consectet...",
    excerpt: "Lorem ipsum dolor sit amet...",
    image: "/images/blog-9.jpg",
    readTime: "5 min read",
  },
];

const categories = [
  { name: "All", count: 69 },
  { name: "Hair", count: 12 },
  { name: "Skincare", count: 69 },
  { name: "Makeup", count: 69 },
  { name: "Wellness", count: 69 },
  { name: "Wellness", count: 69 },
];

const popularTags = [
  "Hair Care",
  "Skin Tips",
  "Makeup",
  "Wellness",
  "Tutorials",
  "Glow",
  "Styling",
];

const videos = [
  { id: 1, thumbnail: "/images/video-1.jpg" },
  { id: 2, thumbnail: "/images/video-2.jpg" },
  { id: 3, thumbnail: "/images/video-3.jpg" },
  { id: 4, thumbnail: "/images/video-4.jpg" },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] bg-gradient-to-r from-gray-300 to-gray-400">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4">
            Your Daily Glow Guide
          </h1>
          <p className="text-lg mb-8 max-w-2xl">
            Stay updated with tips, hacks, product reviews everything you need
            for healthier skin.
          </p>
          <div className="w-full max-w-xl relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-black outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 transition text-left"
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-500 text-sm">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="lg:col-span-3">
              {/* Featured Post */}
              <Link href="/blog/dehydration" className="block mb-12 group">
                <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white px-4 py-1 rounded-full text-sm font-semibold">
                      Skincare
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 text-white">
                    <h2 className="text-2xl sm:text-3xl font-light mb-2">
                      Lorem ipsum dolor sit amet consectetur. Mollis odio elit
                      consectet ultrices massa elit et.
                    </h2>
                    <p className="text-sm text-gray-300">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua...
                    </p>
                  </div>
                </div>
              </Link>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {blogPosts.map((post) => (
                  <Link
                    key={post.id}
                    href="/blog/dehydration"
                    className="group"
                  >
                    <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-medium mb-2 group-hover:text-gray-600 transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600">{post.readTime}</p>
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center">
                <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
                  Load More
                </button>
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
                <div
                  key={video.id}
                  className="relative h-48 sm:h-64 rounded-lg overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={20} fill="black" className="ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">
                REAL STORIES. REAL RESULTS.
              </p>
              <h2 className="text-3xl sm:text-4xl font-light mb-4">
                See how our customers share their journey with Byou.
              </h2>
              <p className="text-gray-300 mb-6">
                Watch real testimonials and learn how BYOU has transformed
                skincare routines around the world.
              </p>
              <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition">
                Watch More
              </button>
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
              What our customers
              <br />
              have experienced
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200 p-6 rounded-lg"
              >
                <p className="text-sm mb-4">
                  I have been using Glow Can honestly say it is one of the best
                  skincare products I have ever used! My skin is glowing!
                  Hydrated but not...
                </p>
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="text-yellow-400">
                      ★
                    </div>
                  ))}
                </div>
                <p className="font-semibold text-sm mb-1">Steph Durant</p>
                <p className="text-xs text-gray-600">
                  Glow Getter Peptide Mist
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
