import Image from "next/image";
import Link from "next/link";

export default function OurJourneySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image on the left */}
          <div className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
            {/* Placeholder for image */}
            <Image
              src="/images/home/care.jpg"
              alt="Our Journey"
              fill
              className="object-contain"
            />
          </div>

          {/* Dark box with content on the right */}
          <div className="bg-black rounded-3xl p-8  text-white">
            <h2 className="text-3xl font-medium mb-6 leading-tight">
              We care about quality and safety to bring you trusted skincare
            </h2>
            <p className="text-gray-300 mb-8 text-sm leading-relaxed italic">
              Developed in collaboration with award-winning laboratories and
              notified with the Malaysian Health Ministry for your peace of
              mind.
            </p>
            <Link href="/shop">
              <button className="bg-white cursor-pointer text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
