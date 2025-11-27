import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
          Simple, safe, and effective, glowing skin for everyone
        </h2>
        <p className="text-gray-600 max-w-4xl mx-auto mb-8">
          Our face feels and face care are made with a gentle, clean beauty
          formula that works across all skin types and conditions— helping every
          person achieve their healthiest, most radiant skin. Rooted in science
          and free of irritants, our products are carefully formulated to
          nurture your skin and deliver visible results.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
