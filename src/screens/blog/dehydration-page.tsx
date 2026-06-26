import Link from "next/link";
import { Star } from "lucide-react";
import Layout from "@/components/common/layout";

const DehydrationPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-br from-beige-200 to-beige-300" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <p className="text-sm text-gray-600 mb-2">SKIN CONCERNS</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
              Dehydration
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Dehydrated skin lacks water, not oil. It can feel tight, look
              dull, and show fine lines. Caused by weather, lifestyle, or harsh
              products, it&apos;s a temporary condition.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Shop Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Understanding the Issue */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                UNDERSTANDING THE ISSUE
              </p>
              <h2 className="text-3xl sm:text-4xl font-light mb-6">
                What Causes Dehydration?
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Dehydration happens when your skin loses water faster than it
                can retain it. Unlike dryness (which lacks oil), dehydrated skin
                is a lack of water.
              </p>
              <div>
                <h3 className="font-semibold mb-4">COMMON SYMPTOMS</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Skin looks unusually dull</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Feels tight and itchy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Fine lines appear more visible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Dark circles or sunken eyes</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Designed for Your Needs */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-600 text-sm mb-2">TARGETED SOLUTIONS</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
              Products Designed for Your Needs
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Link href="/product/1" className="group">
              <div className="relative h-[400px] sm:h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-400 group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-center">
                Glow Getter Brightening & Hydrating Serum
              </h3>
              <div className="flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="black" />
                ))}
              </div>
            </Link>
            <Link href="/product/2" className="group">
              <div className="relative h-[400px] sm:h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-400 group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-center">
                Glow Getter Brightening & Hydrating Serum
              </h3>
              <div className="flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="black" />
                ))}
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* What Makes Our Formulas Effective */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-600 text-sm mb-2">
              SCIENCE-BACKED INGREDIENTS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
              What Makes Our Formulas Effective
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Alpha Arbutin",
                percentage: "2%",
                description:
                  "Lorem ipsum dolor sit amet consectetur. Ullamcorper id est ante vulputate consequat porttitor.",
              },
              {
                title: "Niacinamide",
                percentage: "5%",
                description:
                  "Lorem ipsum dolor sit amet consectetur. Ullamcorper id est ante vulputate consequat porttitor.",
              },
              {
                title: "Hyaluronic Acid",
                percentage: "1%",
                description:
                  "Lorem ipsum dolor sit amet consectetur. Ullamcorper id est ante vulputate consequat porttitor.",
              },
            ].map((ingredient, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-light">
                    {ingredient.percentage}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {ingredient.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {ingredient.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use for Best Results */}
      <section className="py-16 sm:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">YOUR ROUTINE</p>
              <h2 className="text-3xl sm:text-4xl font-light mb-8">
                How to Use for Best Results
              </h2>
              <div className="space-y-6">
                {[
                  {
                    number: "01",
                    title: "Cleanse",
                    description: "Start with a clean, dry face",
                  },
                  {
                    number: "02",
                    title: "Apply Drops",
                    description: "3-4 drops morning and evening onto skin",
                  },
                  {
                    number: "03",
                    title: "Take it Day",
                    description: "Gently massage until fully absorbed",
                  },
                  {
                    number: "04",
                    title: "Consistency",
                    description: "Use daily for visible results in 2-4 weeks",
                  },
                ].map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-semibold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
            Simple, safe, and effective, glowing skin for everyone
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto mb-8">
            Our face feels and face care are made with a gentle, clean beauty
            formula that works across all skin types and conditions— helping
            every person achieve their healthiest, most radiant skin.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 sm:py-24 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2">
              <div className="bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="bg-white px-6 py-2 rounded-full text-sm font-semibold">
                  Before
                </span>
              </div>
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="bg-white px-6 py-2 rounded-full text-sm font-semibold">
                  After
                </span>
              </div>
            </div>
            <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 bg-white" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-gray-800 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gray-600 text-sm mb-2">TESTIMONIALS</p>
            <h2 className="text-3xl sm:text-4xl font-light">
              What our customers
              <br />
              have experienced
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200 p-6 rounded-lg"
              >
                <p className="text-sm mb-4">
                  I have been using Glow Can honestly say it is one of the best
                  skincare products I have ever used! My skin is glowing!
                  Hydrated but not...
                </p>
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="text-yellow-400">
                      ★
                    </div>
                  ))}
                </div>
                <p className="font-semibold text-sm mb-1">Steph Durant</p>
                <p className="text-xs text-gray-600">
                  Glow Getter Peptide Mist
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default DehydrationPage;
