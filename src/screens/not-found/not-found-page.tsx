import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Compass, MoveRight, ShoppingBag } from "lucide-react";
import Layout from "@/components/common/layout";
import { Button } from "@/components/ui/button";

const quickLinks = [
  {
    href: "/",
    label: "Go Home",
    icon: ArrowLeft,
  },
  {
    href: "/shop",
    label: "Browse Shop",
    icon: ShoppingBag,
  },
  {
    href: "/contact",
    label: "Contact Us",
    icon: Compass,
  },
];

const NotFound = () => {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f1e7_0%,#fbf7f0_38%,#ffffff_100%)] py-24 sm:py-32 lg:py-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[6%] top-16 h-48 w-48 rounded-full bg-stone-200/70 blur-3xl" />
          <div className="absolute right-[8%] top-24 h-64 w-64 rounded-full bg-amber-100/80 blur-3xl" />
          <div className="absolute bottom-10 left-1/3 h-40 w-40 rounded-full bg-rose-100/60 blur-3xl" />
          <div className="absolute left-1/2 top-20 h-24 w-24 -translate-x-1/2 rounded-full border border-stone-300/60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white/75 shadow-[0_24px_100px_rgba(28,25,23,0.10)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr] md:mt-10 mt-0 lg:mt-0 ">
            <div className="relative px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.38em] text-stone-500">
                  404 Error
                </span>
                <span className="text-[11px] uppercase tracking-[0.32em] text-stone-400">
                  BYOU Skincare
                </span>
              </div>

              <h1 className="max-w-2xl text-5xl leading-[0.92] text-stone-950 sm:text-6xl lg:text-7xl">
                This page is no longer part of the ritual.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
                The destination you requested could not be found. You can return
                to the homepage, explore the shop, or contact us if something
                feels off.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {quickLinks.map(({ href, label, icon: Icon }, index) => (
                  <Button
                    key={href}
                    asChild
                    variant={index === 0 ? "default" : "outline"}
                    className="rounded-full px-5"
                  >
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2"
                    >
                      <Icon className="size-4" />
                      {label}
                    </Link>
                  </Button>
                ))}
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50/80 p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-stone-400">
                    Suggested
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    Head back to the shop and continue browsing products.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50/80 p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-stone-400">
                    Broken Link
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-700">
                    If you followed a bad link, contact us and we&apos;ll fix
                    it.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50/80 p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-stone-400">
                    Explore
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-stone-900">
                    Discover best sellers
                    <MoveRight className="size-4" />
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[420px] border-t border-stone-200/70 bg-[linear-gradient(180deg,#ece4d6_0%,#f8f3eb_42%,#fdfbf8_100%)] lg:min-h-full lg:border-t-0 lg:border-l">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.85),transparent_34%)]" />
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="text-xs uppercase tracking-[0.35em]">
                    Lost Route
                  </span>
                  <span className="rounded-full border border-stone-300/70 px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                    404
                  </span>
                </div>

                <div className="relative mx-auto my-8 w-full max-w-sm">
                  <div className="absolute -left-6 top-8 h-24 w-24 rounded-full border border-white/80" />
                  <div className="absolute -right-4 bottom-8 h-20 w-20 rounded-full bg-white/50 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/60 p-3 shadow-[0_20px_60px_rgba(28,25,23,0.10)] backdrop-blur">
                    <div className="relative h-[340px] overflow-hidden rounded-[1.5rem]">
                      <Image
                        src="/images/auth/auth-bg.png"
                        alt="BYOU skincare visual"
                        fill
                        priority
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.08)_0%,rgba(17,24,39,0.48)_100%)]" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <p className="text-[11px] uppercase tracking-[0.34em] text-white/75">
                          Return to Care
                        </p>
                        <p className="mt-3 text-6xl leading-none text-white sm:text-7xl">
                          404
                        </p>
                        <p className="mt-3 max-w-[14rem] text-sm leading-6 text-white/80">
                          A missing page should not interrupt a thoughtful
                          routine.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/80 bg-white/65 p-4 text-sm text-stone-600 backdrop-blur">
                  <p className="font-semibold text-stone-900">
                    Need a quick reset?
                  </p>
                  <p className="mt-1 leading-6">
                    Start from the homepage or jump straight into the shop to
                    keep browsing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default NotFound;
