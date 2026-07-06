import Link from "next/link";
import { Calendar, Share2 } from "lucide-react";
import Layout from "@/components/common/layout";
import { Button } from "@/components/ui/button";

const BlogPostPage = () => {
  const relatedPosts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur...",
      category: "Wellness",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur...",
      category: "Wellness",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur...",
      category: "Wellness",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet consectetur...",
      category: "Skincare",
    },
    {
      id: 5,
      title: "Lorem ipsum dolor sit amet consectetur...",
      category: "Wellness",
    },
  ];

  return (
    <Layout>
      {/* Hero Image */}
      <section className="relative h-100 sm:h-125">
        <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400" />
        <div className="absolute top-4 left-4">
          <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold">
            Wellness
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-8">
          <div className="max-w-4xl mx-auto text-white">
            <p className="text-sm mb-2">
              Lorem ipsum dolor sit amet consectetur. Mollis odio nec arcu
              sagittis pellentesque lacus nibh sit. Blandit at condimentum nunc
              risus elit molestie interdum mattis non.
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <p className="font-semibold text-black">Blog Writer Name</p>
                  <p className="text-xs">Design Systems</p>
                </div>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>May 10, 2025</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet consectetur. Penatibus diam ut maecenas
              vitae mauris nunc cursus proin a. Pharetra mauris at porttitor
              varius pharetra quis magna molestie a sapien. Mi diam tempus
              faucibus lectus vitae ultricies. Proin ac erat consectetur nunc
              turpis facilisis accumtorment. Consequat integer blandit morbi
              morbi ultrices hac. Sit semper faucibus lectus ornare dictum
              elementum si dignissim neque ut. Phasellus dictum fermentum eget
              eu. Pellentesque neque vel odio id vel sed ultrices. Scelerisque
              sit libero urna eros integer. At aliquam vel pellentesque laorttis
              congue adipiscing massa eget.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet consectetur. Penatibus diam ut maecenas
              vitae mauris nunc cursus proin a. Pharetra mauris at porttitor
              varius pharetra quis magna molestie a sapien. Mi diam tempus
              faucibus lectus vitae ultricies. Proin ac erat consectetur nunc
              turpis facilisis accumtorment. Consequat integer blandit morbi
              morbi ultrices hac. Sit semper faucibus lectus ornare dictum
              elementum si dignissim neque ut. Phasellus dictum fermentum eget
              eu. Pellentesque neque vel odio id vel sed ultrices. Scelerisque
              sit libero urna eros integer. At aliquam vel pellentesque laorttis
              congue adipiscing massa eget.
            </p>

            <div className="bg-gray-50 border-l-4 border-black p-6 my-8">
              <p className="text-gray-700 italic">
                Lorem ipsum dolor sit amet consectetur. Penatibus diam ut
                maecenas vitae mauris nunc cursus proin a. Pharetra mauris at
                porttitor varius pharetra quis magna molestie a sapien. Mi diam
                tempus faucibus lectus vitae ultricies. Proin ac erat
                consectetur nunc turpis facilisis accumtorment.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet consectetur. Penatibus diam ut maecenas
              vitae mauris nunc cursus proin a. Pharetra mauris at porttitor
              varius pharetra quis magna molestie a sapien. Mi diam tempus
              faucibus lectus vitae ultricies. Proin ac erat consectetur nunc
              turpis facilisis accumtorment. Consequat integer blandit morbi
              morbi ultrices hac. Sit semper faucibus lectus ornare dictum
              elementum si dignissim neque ut. Phasellus dictum fermentum eget
              eu. Pellentesque neque vel odio id vel sed ultrices. Scelerisque
              sit libero urna eros integer. At aliquam vel pellentesque laorttis
              congue adipiscing massa eget.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet consectetur. Penatibus diam ut maecenas
              vitae mauris nunc cursus proin a. Pharetra mauris at porttitor
              varius pharetra quis magna molestie a sapien. Mi diam tempus
              faucibus lectus vitae ultricies. Proin ac erat consectetur nunc
              turpis facilisis accumtorment. Consequat integer blandit morbi
              morbi ultrices hac. Sit semper faucibus lectus ornare dictum
              elementum si dignissim neque ut. Phasellus dictum fermentum eget
              eu. Pellentesque neque vel odio id vel sed ultrices. Scelerisque
              sit libero urna eros integer. At aliquam vel pellentesque laorttis
              congue adipiscing massa eget.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400" />
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur. Penatibus diam ut
                  maecenas vitae mauris nunc cursus proin a. Pharetra mauris at
                  porttitor varius pharetra quis magna molestie a sapien. Mi
                  diam tempus faucibus lectus vitae ultricies. Proin ac erat
                  consectetur nunc.
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet consectetur. Penatibus diam ut maecenas
              vitae mauris nunc cursus proin a. Pharetra mauris at porttitor
              varius pharetra quis magna molestie a sapien. Mi diam tempus
              faucibus lectus vitae ultricies. Proin ac erat consectetur nunc
              turpis facilisis accumtorment. Consequat integer blandit morbi
              morbi ultrices hac. Sit semper faucibus lectus ornare dictum
              elementum si dignissim neque ut. Phasellus dictum fermentum eget
              eu. Pellentesque neque vel odio id vel sed ultrices. Scelerisque
              sit libero urna eros integer. At aliquam vel pellentesque laorttis
              congue adipiscing massa eget.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet consectetur. Penatibus diam ut maecenas
              vitae mauris nunc cursus proin a. Pharetra mauris at porttitor
              varius pharetra quis magna molestie a sapien. Mi diam tempus
              faucibus lectus vitae ultricies. Proin ac erat consectetur nunc
              turpis facilisis accumtorment. Consequat integer blandit morbi
              morbi ultrices hac. Sit semper faucibus lectus ornare dictum
              elementum si dignissim neque ut. Phasellus dictum fermentum eget
              eu. Pellentesque neque vel odio id vel sed ultrices. Scelerisque
              sit libero urna eros integer. At aliquam vel pellentesque laorttis
              congue adipiscing massa eget.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="relative h-32 rounded-lg overflow-hidden"
                >
                  <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap gap-2 mb-6">
              {["Hair Care", "Skin Tips", "Makeup", "Trends"].map((tag) => (
                <Button key={tag} variant="secondary" size="sm" className="rounded-full">
                  {tag}
                </Button>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Share this article</p>
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Share2 size={16} />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.id} href="/blog/post" className="group">
                <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <h3 className="font-medium text-sm group-hover:text-gray-600 transition line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1">5 min read</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default BlogPostPage;
