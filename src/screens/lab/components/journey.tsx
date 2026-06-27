import Image from "next/image";

const Journey = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Image */}
          <div className="relative h-[500px] lg:h-auto">
            <Image
              src="/images/lab/journey.jpg"
              alt="Our Journey"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-8">Our Journey</h2>
            <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
              <p>
                Byou was founded in 2018 with a simple vision: to create
                skincare that is honest, effective, and gentle on every skin
                type.
              </p>
              <p>
                What began as a small passion project soon grew into a trusted
                name in beauty. Inspired by the belief that skincare should be
                transparent, safe, and results-driven, Byou focuses on blending
                high-quality ingredients with thoughtful formulations.
              </p>
              <p>
                Today, Byou continues to grow, but our commitment remains the
                same—to deliver simple, effective skincare that helps you feel
                confident in your natural glow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
