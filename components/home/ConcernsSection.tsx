import Image from "next/image";
import Link from "next/link";
import { Clock4, Droplets, Eye, Sparkles, Sun, Wind } from "lucide-react";

const concerns = [
  {
    id: 1,
    title: "Dullness & Uneven Tone",
    subtitle: "RESTORE YOUR NATURAL RADIANCE",
    image: "/images/home/care 1.jpg",
    icon: <Sparkles />,
    size: "large",
  },
  {
    id: 2,
    title: "Dullness & Uneven Tone",
    subtitle: "RESTORE YOUR NATURAL RADIANCE",
    image: "/images/home/care 2.jpg",
    icon: <Droplets />,
    size: "large",
  },
  {
    id: 3,
    title: "Early Aging Signs",
    image: "/images/home/care 3.jpg",
    icon: <Clock4 />,
    size: "small",
  },
  {
    id: 4,
    title: "Sensitivity",
    image: "/images/home/care 4.jpg",
    icon: <Wind />,
    size: "small",
  },
  {
    id: 5,
    title: "Dark Circles",
    image: "/images/home/care 5.jpg",
    icon: <Eye />,
    size: "small",
  },
  {
    id: 6,
    title: "Sun Damage",
    image: "/images/home/care 6.jpg",
    icon: <Sun />,
    size: "small",
  },
];

const ConcernsSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-gray-600 tracking-wider uppercase mb-2">
            ADDRESS YOUR CONCERNS
          </p>
          <h2 className="text-3xl font-semibold tracking-[0.2em] mb-4">
            Every Skin Has a Story
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm">
            Identify your unique skin concerns and discover targeted solutions
            formulated with science-backed ingredients and halal-friendly care.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="space-y-4">
          {/* Top row - 2 large cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First large card */}
            <Link
              href="/concern"
              className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer block"
            >
              <Image
                src={concerns[0].image}
                alt={concerns[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  {concerns[0].icon}
                </div>
                <h3 className="text-xl font-medium mb-1">
                  {concerns[0].title}
                </h3>
                <p className="text-xs tracking-wider opacity-90 mb-3">
                  {concerns[0].subtitle}
                </p>
                <span className="text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  LEARN MORE <span>→</span>
                </span>
              </div>
            </Link>

            {/* Second large card with "Learn More" */}
            <Link
              href="/concern"
              className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer block"
            >
              <Image
                src={concerns[1].image}
                alt={concerns[1].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  {concerns[1].icon}
                </div>
                <h3 className="text-xl font-medium mb-1">
                  {concerns[1].title}
                </h3>
                <p className="text-xs tracking-wider opacity-90 mb-3">
                  {concerns[1].subtitle}
                </p>
                <span className="text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  LEARN MORE <span>→</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Bottom row - 4 small cards in 2x2 grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {concerns.slice(2).map((concern) => (
              <Link
                href="/concern"
                key={concern.id}
                className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer block"
              >
                <Image
                  src={concern.image}
                  alt={concern.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                    {concern.icon}
                  </div>
                  <h3 className="text-base font-medium mb-2">
                    {concern.title}
                  </h3>
                  <span className="text-xs flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    LEARN MORE <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcernsSection;
