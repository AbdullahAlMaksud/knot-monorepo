import Image from "next/image";

const Routine = () => {
  const steps = [
    {
      number: "01",
      title: "Cleanse",
      description: "Start with a clean, dry face",
    },
    {
      number: "02",
      title: "Apply Serum",
      description: "Use 2-3 drops and gently press into skin",
    },
    {
      number: "03",
      title: "Mist & Set",
      description: "Follow with peptide mist for hydration lock",
    },
    {
      number: "04",
      title: "Consistency",
      description: "Use morning and night for visible results in 2 weeks",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="/images/concern/concern2.jpg"
              alt="Skincare Routine"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="text-white">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">
              YOUR ROUTINE
            </p>
            <h2 className="text-3xl font-semibold mb-12">
              How to Use for Best Results
            </h2>

            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-6">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                      <span className="text-sm font-medium">{step.number}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Routine;
