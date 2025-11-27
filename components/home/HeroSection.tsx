import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[600px] sm:h-[700px] lg:h-[900px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/images/home/hero-bg.jpg)" }}
        >
          {/* Placeholder for hero image */}
          <div className="w-full h-full bg-black/20" />
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-white max-w-xl">
          <h1 className="text-[32px] tracking-[0.2em] font-semibold mb-4">
            Unveil Your Natural
            <br />
            Glow
          </h1>
          <p className="text-sm mb-6 tracking-[0.2em]">
            Byou brings you simple, pure, and effective beauty
            <br />
            essentials designed to highlight your true self.{" "}
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black px-8 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Choose Your Glow
          </Link>
        </div>
      </div>
    </section>
  );
}
