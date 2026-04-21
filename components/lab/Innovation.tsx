import Image from "next/image";

const Innovation = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl max-w-[300px] font-semibold mb-8">
              Innovation Rooted in Science and Care
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              At <span className="font-bold">B&apos;</span>You, our mission is
              to combine trusted dermatological science with modern skincare
              needs. Each product is developed in advanced facilities,
              rigorously tested for safety, effectiveness, and ethical
              standards. We collaborate with leading global experts &
              laboratories and adhere to strict quality protocols, ensuring
              premium, reliable skincare formulated specifically for Bangladeshi
              skin and climate.
              <strong className="block mt-4">B’You — Just be you.</strong>
            </p>
          </div>

          {/* Right Image */}
          <div className="relative h-[500px] lg:h-auto">
            <Image
              src="/images/lab/innovation.jpg"
              alt="Innovation"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;
