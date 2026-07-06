import type { Metadata } from "next";
import BlogPage from "@/screens/blog/blog-page";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Skincare tips, routines, and ingredient guides from the BYOU team. Science-backed advice for glowing, healthy skin.",
  openGraph: {
    title: "Blog | BYOU",
    description:
      "Skincare tips, routines, and ingredient guides from the BYOU team. Science-backed advice for glowing, healthy skin.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | BYOU",
    description:
      "Skincare tips, routines, and ingredient guides from the BYOU team.",
  },
};

const Page = (props: any) => {
  return <BlogPage {...props} />;
};

export default Page;

