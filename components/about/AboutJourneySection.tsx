import Image from "next/image";

export default function AboutJourneySection() {
  const philosophies = [
    {
      title: "Science with Purpose",
      description:
        "Every product is developed through careful research, dermatological testing, and proven ingredients to ensure safety, effectiveness, and visible results.",
    },
    {
      title: "Quality Before Hype",
      description:
        "We invest more in formulation, testing, and ingredient integrity than in heavy marketing, because true trust is built through performance and consistency.",
    },
    {
      title: "Just Be You",
      description:
        "Our goal is not to change who you are, but to support healthy, balanced skin that lets your natural confidence shine.  B’You — Just Be You.",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Journey Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
          {/* Left Image */}
          <div className="relative h-[500px] lg:h-auto order-1">
            <Image
              src="/images/about/journey.jpg"
              alt="Our Journey"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2">
            <h2 className="text-3xl font-semibold mb-8">The B’You Story</h2>
            <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
              <p>
                B’You was created from a simple but important realization: most
                skincare products used in Bangladesh are developed for a
                distinct climates and skin needs. We believed Bangladeshi skin
                deserves formulations designed specifically for its own
                environment, lifestyle, and daily challenges. That belief became
                the beginning of our journey.
              </p>
              <p>
                Over the past years, we focused on research, science, and
                careful formulation. We worked with globally experienced
                formulation experts, studied local climate conditions, and
                invested deeply in research and development to ensure every
                product is effective, gentle, and safe. All formulations are
                dermatologist certified and patch-tested before reaching your
                hands.
              </p>
              <p>
                As we proudly launch in 2026, our commitment remains clear—to
                deliver premium, science-backed skincare made especially for
                Bangladeshi skin, built on trust, quality, and real results.
                This is only the beginning of our journey, and we are honored to
                grow with you.
                <br /> <br /> B’You — Just be you.
              </p>
            </div>
          </div>
        </div>

        {/* Our Philosophy Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
          {/* Left Content - Black Background */}
          <div className="bg-black text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-3xl font-semibold mb-8">Our Philosophy</h2>
            <p className="text-gray-300 mb-12 leading-relaxed text-sm">
              At B’You, we believe skincare should be simple, honest, and guided
              by science. Our purpose is to create high-quality formulations
              designed specifically for Bangladeshi skin, climate, and everyday
              life—so that skincare truly works where it matters most.
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
          <div className="relative h-[500px] lg:h-auto order-1 lg:order-2">
            <Image
              src="/images/about/product.jpg"
              alt="Our Philosophy"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
          {/* Left Image */}
          <div className="relative h-[500px] lg:h-auto order-1">
            <Image
              src="/images/about/product.jpg"
              alt="Our Mission"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2">
            <h2 className="text-3xl font-semibold mb-8">Mission & Vision</h2>
            <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
              <div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  Vision
                </h3>
                <p>
                  To become one of the most trusted skincare innovators by
                  creating climate-adaptive, culturally aware formulations that
                  empower every skin type to achieve healthy, confident
                  beauty-starting with Bangladesh and expanding across the
                  globe.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  Mission
                </h3>
                <p>
                  Our mission is to revolutionize skincare with science-backed,
                  weather-specific formulations designed for real skin in real
                  environments.
                </p>
                <p className="mt-4">
                  We partner with global research teams, experts, and
                  dermatologists to:
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-3">
                  <li>
                    Develop products tailored to Bangladeshi climate and skin
                    physiology, setting a new benchmark for relevance and
                    results.
                  </li>
                  <li>
                    Continuously evolve our formulas as we expand to new
                    countries-honoring each region&apos;s unique climate,
                    lifestyle, and skin needs.
                  </li>
                  <li>
                    Deliver high-quality, effective skincare at an accessible
                    price, ensuring advanced care is within reach for everyone.
                  </li>
                  <li>
                    Empower consumers through education, transparency, and
                    evidence-based skincare routines.
                  </li>
                  <li>
                    Innovate sustainably, minimizing environmental impact while
                    maximizing product performance.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
