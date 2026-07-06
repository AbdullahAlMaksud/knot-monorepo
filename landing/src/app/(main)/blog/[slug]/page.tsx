import type { Metadata } from "next";
import BlogDetailPage from "@/screens/blog/blog-detail-page";
import { getBlogBySlug } from "@/screens/blog/services/api";
import type { Blog, BlogContent } from "@/screens/blog/services/type";
import { getR2ImageUrl } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "https://landing-byou.vercel.app";
const SITE_NAME = "BYOU";
const FALLBACK_IMAGE = `${SITE_URL}/og-default.jpg`;

function getBlogOgImage(blog: Blog): string {
  const imageItem = blog.contents.find((c: BlogContent) => c.type === "IMAGE");
  if (!imageItem) return FALLBACK_IMAGE;
  const content = typeof imageItem.content === "string" ? imageItem.content : "";
  if (content && content.startsWith("http")) return content;
  if (imageItem.contentKey) return getR2ImageUrl(imageItem.contentKey);
  return FALLBACK_IMAGE;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function getBlogDescription(blog: Blog): string {
  const sorted = [...blog.contents].sort((a: BlogContent, b: BlogContent) => a.order - b.order);
  const raw = sorted.find((c: BlogContent) => c.type === "TEXT")?.content ?? "";
  const text = typeof raw === "string" ? stripHtml(raw) : "";
  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);
    const ogImage = getBlogOgImage(blog);
    const description = getBlogDescription(blog);
    const url = `${SITE_URL}/blog/${slug}`;

    return {
      title: `${blog.title} | ${SITE_NAME}`,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        siteName: SITE_NAME,
        title: blog.title,
        description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        tags: blog.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: `Blog | ${SITE_NAME}`,
      description: "Read skincare insights, routines, and tips from BYOU.",
    };
  }
}

const Page = () => {
  return <BlogDetailPage />;
};

export default Page;
