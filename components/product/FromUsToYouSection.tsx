import Image from "next/image";

export default function FromUsToYouSection() {
  return (
    <section className="relative py-16 sm:py-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/shop/from-us.jpg"
          alt="From Us to You"
          fill
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center text-white">
          <h2 className="text-4xl font-semibold mb-4">From Us to You</h2>
          <p className="text-sm text-gray-200">
            Browse product images and authentic moments
            <br />
            shared by our community.
          </p>
        </div>
      </div>
    </section>
  );
}
