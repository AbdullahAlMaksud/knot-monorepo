import Image from "next/image";

const Innovation = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl max-w-[300px] font-semibold mb-8">
              Innovation rooted in science and care
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              At Byou Labs, our mission is to bridge the gap between traditional
              dermatological science and modern consumer needs. Every product we
              develop undergoes rigorous testing in our state-of-the-art
              facilities, ensuring safety, efficacy, and ethical compliance. We
              collaborate with award-winning laboratories and follow strict
              quality protocols approved by the Malaysian Health Ministry.
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
