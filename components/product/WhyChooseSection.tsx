import Image from "next/image";
import { Droplets, Droplet, Hand, Sparkles, Clock, Leaf } from "lucide-react";
import type { ProductDetail } from "@/data/products";

const stepIcons = [Sparkles, Droplet, Hand, Droplets, Clock];
const ingredientIcons = [Leaf, Droplets, Sparkles, Droplet];

interface WhyChooseSectionProps {
  detail: ProductDetail;
}

export default function WhyChooseSection({ detail }: WhyChooseSectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-3xl sm:text-5xl font-semibold mb-8">
              Why choose this serum?
            </h2>
            <p className="text-gray-700 mb-8 text-sm leading-relaxed">
              {detail.whyChoose.description}
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Ideal for</h3>
              <div className="grid grid-cols-[auto_1fr] text-sm">
                {detail.whyChoose.idealFor.map((item) => (
                  <>
                    <span
                      key={`${item.label}-label`}
                      className="font-semibold text-black pr-6 py-1.5 whitespace-nowrap"
                    >
                      {item.label}
                    </span>
                    <span
                      key={`${item.label}-value`}
                      className="text-gray-700 py-1.5"
                    >
                      {item.value}
                    </span>
                  </>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-6">
                Key Benefits
              </h3>
              <ul className="space-y-3">
                {detail.whyChoose.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <span className="text-black mt-1">•</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
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
              {detail.howToUse.description}
            </p>

            <div className="space-y-8">
              {detail.howToUse.steps.map((step, index) => {
                const Icon = stepIcons[index % stepIcons.length];
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
              {detail.ingredients.description}
            </p>

            <div className="space-y-6">
              {detail.ingredients.items.map((ingredient, index) => {
                const Icon = ingredientIcons[index % ingredientIcons.length];
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
