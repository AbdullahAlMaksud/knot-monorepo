"use client";

import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

import DraggableSlider from "@/components/shared/DraggableSlider";

export interface TestimonialEntry {
  id: number;
  quote: string;
  customerName: string;
  galleryImages: [string, string];
  productImage: string;
  productName: string;
}

export interface TestimonialsSectionProps {
  eyebrow?: string;
  title?: string;
  items?: TestimonialEntry[];
}

const defaultTestimonials: TestimonialEntry[] = [
  {
    id: 1,
    quote:
      "I have been using Glow Getter for 6 weeks and I can honestly say it is one of the best skincare products I've ever come across! My skin is plumper, hydrated but never greasy.",
    customerName: "Steph Durant",
    galleryImages: ["/images/products/product1.jpg", "/images/home/care 1.jpg"],
    productImage: "/images/products/product1.jpg",
    productName: "Glow Getter Brightening & Hydrating Serum",
  },
  {
    id: 2,
    quote:
      "This serum completely changed how my skin looks in the morning. It feels smoother, brighter and deeply hydrated without leaving any heavy residue behind.",
    customerName: "Jenna Morris",
    galleryImages: ["/images/products/product2.jpg", "/images/home/care 2.jpg"],
    productImage: "/images/products/product2.jpg",
    productName: "Glow Getter Brightening & Hydrating Serum",
  },
  {
    id: 3,
    quote:
      "I noticed the glow after the first week, but the real difference came after a month. My skin tone looks more even and makeup sits beautifully all day.",
    customerName: "Rina Harper",
    galleryImages: [
      "/images/products/product3.jpg",
      "/images/contact/contact1.jpg",
    ],
    productImage: "/images/products/product3.jpg",
    productName: "Glow Getter Brightening & Hydrating Serum",
  },
  {
    id: 4,
    quote:
      "My skin feels plumper, calm and healthy. It layers so well with the rest of my routine and gives that polished finish without any irritation.",
    customerName: "Alyssa Stone",
    galleryImages: ["/images/products/product4.jpg", "/images/home/care 3.jpg"],
    productImage: "/images/products/product4.jpg",
    productName: "Glow Getter Brightening & Hydrating Serum",
  },
  {
    id: 5,
    quote:
      "I keep coming back to this because it consistently makes my skin look fresh and healthy. It is lightweight, elegant and very easy to use every day.",
    customerName: "Steph Durant",
    galleryImages: [
      "/images/products/product1.jpg",
      "/images/contact/contact2.jpg",
    ],
    productImage: "/images/products/product1.jpg",
    productName: "Glow Getter Brightening & Hydrating Serum",
  },
  {
    id: 6,
    quote:
      "This has become the hero product in my routine. My face feels comfortable all day and the hydrated glow it gives is exactly what I was looking for.",
    customerName: "Nadia Cole",
    galleryImages: ["/images/products/product2.jpg", "/images/home/care 4.jpg"],
    productImage: "/images/products/product2.jpg",
    productName: "Glow Getter Brightening & Hydrating Serum",
  },
];

function TestimonialCard({ item }: { item: TestimonialEntry }) {
  return (
    <article className="flex h-[33.75rem] flex-col rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-[0_20px_48px_rgba(0,0,0,0.08)] sm:h-[34.5rem] sm:p-6">
      <p className="line-clamp-6 text-[1.02rem] leading-[1.18] tracking-[-0.03em] text-black sm:text-[1.08rem]">
        {item.quote}
      </p>

      <div className="mt-6 flex gap-3">
        {item.galleryImages.map((imageSrc, index) => (
          <div
            key={`${item.id}-${index}`}
            className="relative size-[4.35rem] overflow-hidden rounded-[0.85rem] bg-[#efeae2]"
          >
            <Image
              src={imageSrc}
              alt={`${item.customerName} gallery ${index + 1}`}
              fill
              sizes="74px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-[1rem] font-semibold tracking-[-0.03em] text-black sm:text-[1.12rem]">
          {item.customerName}
        </p>
        <div className="flex items-center gap-[0.15rem] text-black">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="size-[0.95rem]"
              fill="currentColor"
              stroke="currentColor"
            />
          ))}
        </div>
      </div>

      <div className="my-6 h-px w-full bg-black/10" />

      <div className="mt-auto flex items-center gap-4">
        <div className="relative size-[4.8rem] shrink-0 overflow-hidden rounded-full bg-[#e5ddd2]">
          <Image
            src={item.productImage}
            alt={item.productName}
            fill
            sizes="78px"
            className="object-cover"
          />
        </div>
        <p className="max-w-[9.75rem] text-[0.92rem] leading-[1.1] font-medium tracking-[-0.02em] text-black sm:text-[0.98rem]">
          {item.productName}
        </p>
        <ArrowRight
          className="ml-auto size-7 shrink-0 text-black"
          strokeWidth={2.2}
        />
      </div>
    </article>
  );
}

export default function TestimonialsSection({
  eyebrow = "TESTIMONIALS",
  title = "What our customers have experienced",
  items = defaultTestimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
      <div className="absolute inset-y-0 left-0 hidden w-[43.5%] bg-black lg:block" />

      <div className="relative mx-auto max-w-[1760px] overflow-hidden pl-4 sm:pl-6 lg:pl-8 lg:pr-0 xl:pl-12">
        <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(340px,395px)_minmax(0,1fr)] lg:items-center lg:gap-0">
          <div className="relative z-10 bg-black px-8 py-10 text-white sm:px-10 sm:py-12 lg:min-h-[34.5rem] lg:bg-transparent lg:px-0 lg:py-0 lg:pr-14 xl:pr-16">
            <div className="flex h-full flex-col justify-center">
              <p className="mb-5 text-sm tracking-[0.28em] text-white/85 uppercase sm:text-[0.95rem]">
                {eyebrow}
              </p>
              <h2 className="max-w-[10ch] text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.045em] text-white sm:text-[3.35rem] lg:text-[4rem] xl:text-[4.35rem]">
                {title}
              </h2>
            </div>
          </div>

          <div className="relative min-w-0 overflow-visible">
            <div className="min-w-0">
              <DraggableSlider
                items={items}
                getItemKey={(item) => item.id}
                renderItem={(item) => <TestimonialCard item={item} />}
                ariaLabel="Customer testimonials carousel"
                showArrows={false}
                showDots={false}
                customCursorLabel="DRAG"
                snapAlign="start"
                snapOffset={24}
                viewportClassName="pb-1 pt-4 pl-0"
                trackClassName="items-stretch gap-4 sm:gap-5 lg:gap-7"
                slideClassName="w-[80vw] max-w-[19.75rem] sm:w-[21.5rem] lg:w-[18.9rem] xl:w-[19.35rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
