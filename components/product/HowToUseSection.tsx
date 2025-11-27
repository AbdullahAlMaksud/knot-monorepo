export default function HowToUseSection() {
  const steps = [
    { step: "Cleanse", description: "Start with a clean, dry face" },
    {
      step: "Apply Direct",
      description: "Hold 6-8 inches away and mist evenly",
    },
    {
      step: "Massage",
      description: "Gently pat into skin until fully absorbed",
    },
    {
      step: "Pat & Absorb",
      description: "Allow to dry before applying other products",
    },
    {
      step: "Follow Routine",
      description: "Continue with your regular skincare routine",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light mb-8">How to Use</h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{step.step}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[400px] sm:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
