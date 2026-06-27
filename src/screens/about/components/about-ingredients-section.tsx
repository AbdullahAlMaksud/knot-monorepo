import Image from "next/image";

const IngredientsSection = () => {
  const ingredients = [
    {
      title: "Botanical Extracts",
      description:
        "From ginseng to green tea, our products harness the power of traditional Korean botanicals known for their skin-enhancing properties.",
      image: "/images/about/ingredient1.jpg",
    },
    {
      title: "Fermented Ingredients",
      description:
        "We utilize the ancient Korean practice of fermentation to enhance potency and bioavailability of our active ingredients.",
      image: "/images/about/ingredient2.jpg",
    },
    {
      title: "Scientific Compounds",
      description:
        "Our formulations incorporate cutting-edge compounds like peptides, antioxidants, and hyaluronic acid for maximum efficacy.",
      image: "/images/about/ingredient3.jpg",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-6">Our Ingredients</h2>
          <p className="text-gray-700 max-w-4xl mx-auto text-sm sm:text-base leading-relaxed">
            Our formulations blend gentle, skin-loving botanicals with advanced
            active ingredients to deliver results you can see and feel,safe,
            effective, and suitable for every skin type.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="relative rounded-3xl overflow-hidden h-[400px] sm:h-[450px] group"
            >
              {/* Background Image */}
              <Image
                src={ingredient.image}
                alt={ingredient.title}
                fill
                className="object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-medium mb-3">
                  {ingredient.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  {ingredient.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default IngredientsSection;
