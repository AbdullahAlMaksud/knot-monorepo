import { Sparkles } from "lucide-react";

const Ingredients = () => {
  const ingredients = [
    {
      icon: Sparkles,
      percentage: "2%",
      name: "Alpha Arbutin",
      description:
        "A gentle brightening agent that effectively fades dark spots and hyperpigmentation without irritation.",
    },
    {
      icon: Sparkles,
      percentage: "5%",
      name: "Niacinamide",
      description:
        "Vitamin B3 that strengthens skin barrier, evens tone, and reduces inflammation.",
    },
    {
      icon: Sparkles,
      percentage: "1%",
      name: "Hyaluronic Acid",
      description:
        "Holds 1000x its weight in water to deliver intense, lasting hydration.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-600 mb-4">
            SCIENCE-BACKED INGREDIENTS
          </p>
          <h2 className="text-3xl font-semibold mb-6">
            What Makes Our Formulas Effective
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            We use clinically-proven concentrations of premium ingredients,
            ensuring maximum efficacy without compromise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ingredients.map((ingredient, index) => {
            const Icon = ingredient.icon;
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
