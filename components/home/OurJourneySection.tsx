import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OurJourneySection() {
  return (
    <section className=" bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image on the left */}
          <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
            {/* Placeholder for image */}
            <Image
              src="/images/home/care.jpg"
              alt="Our Journey"
              fill
              className="object-contain"
            />
          </div>

          {/* Dark box with content on the right */}
          <div className="bg-black rounded-3xl p-8  text-white">
            <h2 className="text-3xl font-medium mb-6 leading-tight">
              We care about quality and safety to bring you trusted skincare
            </h2>
            <p className="text-gray-300 mb-8 text-sm leading-relaxed italic">
              At <span className="font-bold">B&apos;You</span>, efficacy,
              quality and safety are at the core of every formulation. Our
              products are developed with carefully selected, science-backed
              ingredients and undergo dermatological and patch testing to ensure
              effectiveness, tolerance, and reliability. Designed specifically
              for Bangladeshi skin and climate, we are committed to delivering
              trusted skincare that you can confidently use every day.
            </p>
            <Button
              asChild
              className="bg-white text-black hover:bg-gray-100 rounded-full"
            >
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
