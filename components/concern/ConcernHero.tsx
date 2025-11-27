import { Droplets } from "lucide-react";
import Link from "next/link";

const ConcernHero = () => {
  return (
    <section className="relative h-[600px] sm:h-[700px] lg:h-[900px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/images/concern/concern-bg.jpg)" }}
        >
          {/* Placeholder for hero image */}
          <div className="w-full h-full bg-black/20" />
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-white max-w-xl">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
            <Droplets />
          </div>
          <p className="text-sm my-2 uppercase">Skin Concern</p>
          <h1 className="text-[32px] tracking-[0.2em] font-semibold mb-4">
            Dehydration
          </h1>
          <p className="text-sm mb-6">
            Dehydrated skin feels tight, looks dull, and shows fine lines more
            prominently. It's a condition that affects all skin types, even oily
            skin.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black px-8 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Shop Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConcernHero;
