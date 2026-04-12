import { Sparkles } from "lucide-react";
import type { Concern } from "@/data/concerns";

interface IngredientsProps {
  concern: Concern;
}

const Ingredients = ({ concern }: IngredientsProps) => {
  const ingredients = concern.ingredients;
  const Icon = Sparkles;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-600 mb-4">
            SCIENCE-BACKED INGREDIENTS
          </p>
          <h2 className="text-3xl font-semibold mb-6">
            What Helps Improve {concern.title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            We focus on targeted active ingredients that support visible results
            without making the routine feel overwhelming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ingredients.map((ingredient, index) => {
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium bg-gray-100 px-4 py-2 rounded-full">
                    {ingredient.percentage}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {ingredient.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {ingredient.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
