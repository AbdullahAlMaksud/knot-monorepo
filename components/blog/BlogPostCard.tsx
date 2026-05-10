import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Blog } from "@/services/blogs/type";

interface BlogPostCardProps {
  blog: Blog;
  imageSrc?: string;
  excerpt?: string;
  variant?: "featured" | "default";
  priority?: boolean;
  className?: string;
}

export default function BlogPostCard({
  blog,
  imageSrc,
  excerpt,
  variant = "default",
  priority = false,
  className,
}: BlogPostCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Link href={`/blog/${blog.slug}`} className={cn("group block", className)}>
      <article
        className={cn(
          "relative overflow-hidden rounded-[2rem]",
          isFeatured
            ? "h-[21rem] sm:h-[26rem] lg:h-[34rem]"
            : "h-[19rem] sm:h-[23rem] lg:h-[25rem]",
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={blog.title}
            fill
            priority={priority}
            sizes={
              isFeatured
                ? "(min-width: 1024px) 70vw, 100vw"
                : "(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
            }
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-stone-300 via-stone-200 to-stone-400 transition duration-500 group-hover:scale-[1.03]" />
        )}

        <div
          className={cn(
            "absolute inset-0",
            isFeatured
              ? "bg-linear-to-t from-black/80 via-black/30 to-transparent"
              : "bg-linear-to-t from-black/82 via-black/20 to-transparent",
          )}
        />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 text-white",
            isFeatured ? "p-5 sm:p-7 lg:p-10" : "p-4 sm:p-5",
          )}
        >
          <span className="inline-flex rounded-full bg-white px-3.5 py-1 text-[0.72rem] font-semibold tracking-[0.01em] text-black sm:px-4 sm:py-1.5 sm:text-xs">
            {blog.category}
          </span>

          <h3
            className={cn(
              "mt-4 max-w-[18ch] font-semibold tracking-[-0.04em] text-white",
              isFeatured
                ? "text-[2rem] leading-[1.05] sm:text-[2.55rem] lg:max-w-[26ch] lg:text-[3.2rem]"
                : "text-[1.55rem] leading-[1.08] sm:text-[1.8rem]",
            )}
          >
            {blog.title}
          </h3>

          {excerpt ? (
            <p
              className={cn(
                "mt-3 max-w-[62ch] text-white/90",
                isFeatured
                  ? "text-base leading-7 sm:text-lg sm:leading-8"
                  : "line-clamp-2 text-sm leading-6 text-white/82",
              )}
            >
              {excerpt}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
