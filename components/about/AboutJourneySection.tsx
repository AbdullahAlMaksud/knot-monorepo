import Image from "next/image";

export default function AboutJourneySection() {
  const philosophies = [
    {
      title: "Purity",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nulla purus sit velit quis tortor malesuada facilisi condimentum volutpat. Vulputate vestibulum lacus mattis dignissim. Amet posuere.",
    },
    {
      title: "Innovation",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ornare turpis auctor diam eros proin adipiscing sem phaseus. Odio enim enim erat facilisis molestie commodo. Bibendum ut pretique in fames.",
    },
    {
      title: "Sustainability",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque adipiscing nscetur turpis at facilisis proin arcu pulvinar. Eget vestibulum turpis nibh mauris pellentesque molliducin libero.",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Journey Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Image */}
          <div className="relative h-[500px] lg:h-auto">
            <Image
              src="/images/about/journey.jpg"
              alt="Our Journey"
              fill
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

        {/* Our Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Content - Black Background */}
          <div className="bg-black text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-8">Our Philosophy</h2>
            <p className="text-gray-300 mb-12 leading-relaxed text-sm">
              Founded in 2018, Byou began with a clear mission: to create
              skincare that is safe, simple, and effective. Born out of
              frustration with harsh chemicals and overpromising products,
              Byou&apos;s founder set out to build a brand that values honesty,
              light and high-performing ingredients. Every product is designed
              to nourish the skin while staying true to our values of
              transparency and care.
            </p>

            <div className="space-y-8">
              {philosophies.map((item, index) => (
                <div key={index} className="border-l-2 border-white pl-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[500px] lg:h-auto">
            <Image
              src="/images/about/product.jpg"
              alt="Our Philosophy"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
