import { Calendar, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

type BlogContent = {
    order: number;
    type: "text" | "image" | "video";
    content: string;
    contentKey?: string;
};

type Blog = {
    _id: string;
    title: string;
    slug: string;
    category: string;
    tags: string[];
    status: string;
    isFeatured: boolean;
    contents: BlogContent[];
    createdAt: string;
    updatedAt: string;
};

async function getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/blogs/slug/${slug}`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) return null;
        const json = await res.json();
        return json.data ?? null;
    } catch {
        return null;
    }
}

async function getRelatedBlogs(category: string, excludeSlug: string): Promise<Blog[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/blogs?status=Published&category=${encodeURIComponent(category)}`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) return [];
        const json = await res.json();
        const blogs: Blog[] = json.data ?? [];
        return blogs.filter((b) => b.slug !== excludeSlug).slice(0, 4);
    } catch {
        return [];
    }
}

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
    });

const getFirstImage = (blog: Blog) =>
    blog.contents.find((c) => c.type === "image")?.content;

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog || blog.status !== "Published") {
        notFound();
    }

    const relatedBlogs = await getRelatedBlogs(blog.category, slug);
    const heroImage = getFirstImage(blog);
    const sortedContents = [...blog.contents].sort((a, b) => a.order - b.order);

    return (
        <Layout>
            {/* Hero */}
            <section className="relative h-100 sm:h-125">
                {heroImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={heroImage} alt={blog.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400" />
                )}
                <div className="absolute top-4 left-4">
                    <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold">
                        {blog.category}
                    </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-8">
                    <div className="max-w-4xl mx-auto text-white">
                        <h1 className="text-3xl sm:text-4xl font-light mb-2 line-clamp-3">
                            {blog.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                <span>{formatDate(blog.createdAt)}</span>
                            </div>
                            {blog.tags.length > 0 && (
                                <>
                                    <span>•</span>
                                    <div className="flex gap-1 flex-wrap">
                                        {blog.tags.map((tag) => (
                                            <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition">
                            <Share2 size={16} />
                            Share
                        </button>
                    </div>

                    {/* Body — render contents in order */}
                    <div className="space-y-6">
                        {sortedContents.map((item) => {
                            if (item.type === "text") {
                                return (
                                    <div
                                        key={item.order}
                                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&_a]:underline [&_a]:text-black [&_strong]:font-semibold [&_em]:italic"
                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                    />
                                );
                            }
                            if (item.type === "image" && item.content) {
                                return (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        key={item.order}
                                        src={item.content}
                                        alt={`Blog image ${item.order}`}
                                        className="w-full rounded-lg"
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Back link */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <Link href="/blog">
                            <Button variant="ghost" className="flex items-center gap-2">
                                <ArrowLeft size={16} />
                                Back to Blog
                            </Button>
                        </Link>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-light mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedBlogs.map((related) => (
                                <Link key={related._id} href={`/blog/${related.slug}`} className="group">
                                    <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                                        {getFirstImage(related) ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={getFirstImage(related)}
                                                alt={related.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-linear-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300" />
                                        )}
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-white px-2 py-0.5 rounded-full text-xs font-semibold">
                                                {related.category}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-medium line-clamp-2 group-hover:text-gray-600 transition">
                                        {related.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
}
