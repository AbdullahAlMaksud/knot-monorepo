export default function PhilosophySection() {
  const principles = [
    {
      title: "Purity",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nulla porta mi sed erat ultrices scelerisque nunc. Ut eget elementum facilisis cras non cursus turpis.",
    },
    {
      title: "Innovation",
      description:
        "Lorem ipsum dolor sit amet consectetur. Cursus morbi dictus porttitor scelerisque velit pretium nisi. Ipsum risus vel donec nibh.",
    },
    {
      title: "Sustainability",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ultricies a tortor imperdiet nascetur turpis arcu parcius. Eget porttitor ornare dui.",
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="bg-black text-white p-8 sm:p-12 rounded-lg">
            <h2 className="text-3xl sm:text-4xl font-light mb-8">
              Our Philosophy
            </h2>
            <p className="text-gray-300 mb-8">
              At Byou, we believe skincare should be simple, thoughtful, and
              effective. Our philosophy is built on three core principles that
              drive every decision we make.
            </p>
            <div className="space-y-6">
              {principles.map((principle, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[500px] sm:h-[600px] bg-gray-200 rounded-lg overflow-hidden">
            {/* Placeholder for image */}
            <div className="w-full h-full bg-gradient-to-br from-green-200 to-yellow-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
