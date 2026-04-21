import Link from "next/link";
import Image from "next/image";

export default function OurStorySection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
              Just Be You
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At <span className="font-bold">B&apos;You</span>, we understand
              how dullness, acne marks, blemishes, hyperpigmentation, and uneven
              skin tone can affect your skin and your confidence. That’s why we
              create science-backed skincare formulated specifically for
              Bangladeshi skin and climate. Our formulas are transparent,
              effective, and gentle—even for sensitive skin—designed to improve
              clarity, enhance brightness, and support overall skin health.
              Because when your skin feels understood and cared for, it helps
              bring out the best version of you.{" "}
              <span className="block font-bold mt-4">
                B&apos;You — Just Be You.
              </span>
            </p>
            <Link
              href="/about"
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Our Story
            </Link>
          </div>
          <div className="relative h-[400px] sm:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/images/home/our-story.jpg"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
