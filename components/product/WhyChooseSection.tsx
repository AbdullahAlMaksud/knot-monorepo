import Image from "next/image";
import { Droplets, Droplet, Hand, Sparkles, Clock, Leaf, Flower2 } from "lucide-react";

export default function WhyChooseSection() {
  const benefits = [
    "100% Organic – no chemicals, no preservatives",
    "Universal Care – suitable for every hair type",
    "Naturally Effective – nourishes, strengthens, and adds shine",
    "Safe & Gentle – long-term care without damage",
  ];

  const howToSteps = [
    {
      icon: Sparkles,
      title: "Cleanse",
      description: "Wash your face thoroughly to remove dirt and oil.",
    },
    {
      icon: Droplet,
      title: "Apply Drops",
      description: "Take 2-3 drops of serum on your fingertips.",
    },
    {
      icon: Hand,
      title: "Spread Evenly",
      description: "Smooth it gently over your face and neck.",
    },
    {
      icon: Droplets,
      title: "Pat & Absorb",
      description: "Pat lightly so the serum absorbs into your skin.",
    },
    {
      icon: Clock,
      title: "Follow Routine",
      description: "Use before moisturizer, morning and night.",
    },
  ];

  const ingredients = [
    {
      icon: Leaf,
      name: "Hyaluronic Acid",
      benefit: "Deep hydration and plumping effect for youthful skin.",
    },
    {
      icon: Flower2,
      name: "Niacinamide",
      benefit: "Reduces pores, evens skin tone, and strengthens barrier.",
    },
    {
      icon: Droplets,
      name: "Peptides",
      benefit: "Stimulates collagen production for firmer, smoother skin.",
    },
    {
      icon: Sparkles,
      name: "Vitamin C",
      benefit: "Brightens complexion and protects against free radicals.",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-3xl sm:text-5xl font-semibold mb-8">
              Why choose this serum?
            </h2>
            <p className="text-gray-700 mb-12 text-sm leading-relaxed">
              Our 100% organic Jojoba oil–based hair serum is crafted for all
              hair types. Free from harsh chemicals and preservatives, it uses
              only powerful natural ingredients to keep your hair healthy,
              shiny, and strong, just the way it&apos;s meant to be.
            </p>

            <div className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-6">
                Key Benefits
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <span className="text-black mt-1">•</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                Make the Switch
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Stop damaging your hair with chemical-heavy products. Embrace
                organic beauty rituals and let this nourishing blend elevate
                your hair care routine.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[500px] lg:h-auto order-1 lg:order-2">
            <Image
              src="/images/shop/choose.jpg"
              alt="Why choose this serum"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* How to Use Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
          {/* Left Image */}
          <div className="relative h-[500px] lg:h-auto order-1">
            <Image
              src="/images/shop/how.jpg"
              alt="How to use"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content - Black Background */}
          <div className="bg-black text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
              How to Use
            </h2>
            <p className="text-gray-300 mb-12 leading-relaxed text-sm">
              Cleanse your face, apply a few drops of serum, and gently pat
              until absorbed. Follow with moisturizer twice daily for a healthy,
              glowing complexion.
            </p>

            <div className="space-y-8">
              {howToSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="shrink-0">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-3xl sm:text-5xl font-semibold mb-8">
              Key Ingredients
            </h2>
            <p className="text-gray-700 mb-12 text-sm leading-relaxed">
              Our serum is formulated with carefully selected, potent ingredients
              that work in harmony to deliver visible results. Each component is
              chosen for its proven efficacy and gentle nature on all skin types.
            </p>

            <div className="space-y-6">
              {ingredients.map((ingredient, index) => {
                const Icon = ingredient.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="shrink-0">
                      <Icon size={24} className="text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-black">
                        {ingredient.name}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {ingredient.benefit}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[500px] lg:h-auto order-1 lg:order-2">
            <Image
              src="/images/about/ingredient1.jpg"
              alt="Key Ingredients"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
