import Image from "next/image";
import Link from "next/link";
import { concerns, getConcernRows, type Concern } from "@/data/concerns";

const desktopColumnsClass: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

function ConcernCard({
  concern,
  featured,
}: {
  concern: Concern;
  featured: boolean;
}) {
  const Icon = concern.icon;

  return (
    <Link
      href={`/concern/${concern.slug}`}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer block ${
        featured
          ? "h-[340px] sm:h-[380px] md:h-[420px]"
          : "h-[220px] sm:h-[250px] md:h-[280px]"
      }`}
    >
      <Image
        src={concern.image}
        alt={concern.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
          <Icon className="w-5 h-5" />
        </div>
        <h3
          className={`${featured ? "text-xl" : "text-base sm:text-lg"} font-medium mb-1`}
        >
          {concern.title}
        </h3>
        {concern.subtitle && featured ? (
          <p className="text-xs tracking-wider opacity-90 mb-3">
            {concern.subtitle}
          </p>
        ) : null}
        <span className="text-xs sm:text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          LEARN MORE <span>→</span>
        </span>
      </div>
    </Link>
  );
}

const ConcernsSection = () => {
  const rows = getConcernRows(concerns.slice(0, 9)).filter(
    (row) => row.length > 0,
  );

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-gray-600 tracking-wider uppercase mb-2">
            Every Skin Has a Story
          </p>
          <h2 className="text-3xl font-semibold tracking-[0.2em] mb-4">
            Shop by Concerns
          </h2>
          <p className="text-gray-600 max-w-2xl text-sm">
            Click on your skin concern to discover the most suitable solution
            tailored to your needs
          </p>
        </div>

        <div className="space-y-4">
          {rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${desktopColumnsClass[row.length] ?? "md:grid-cols-3"}`}
            >
              {row.map((concern) => (
                <ConcernCard
                  key={concern.id}
                  concern={concern}
                  featured={rowIndex === 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConcernsSection;
