export default function IngredientsSection() {
  const ingredients = [
    {
      title: "Moringa Extracts",
      description: "Rich in antioxidants and vitamins for nourished skin",
    },
    {
      title: "Fermented Ingredients",
      description: "Enhanced bioavailability for better absorption",
    },
    {
      title: "Scientific Compounds",
      description: "Proven actives for visible results",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4">
            Our Ingredients
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our formulations blend gentle, skin-loving botanicals and fermented
            ingredients to deliver results you can see and feel—safe, effective,
            and reliable for every skin type.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="h-48 bg-gradient-to-br from-amber-200 to-amber-400" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {ingredient.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {ingredient.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
