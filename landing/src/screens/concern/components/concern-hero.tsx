import type { Concern } from "@/data/concerns";
import Link from "next/link";

interface ConcernHeroProps {
  concern: Concern;
}

const ConcernHero = ({ concern }: ConcernHeroProps) => {
  const Icon = concern.icon;

  return (
    <section className="relative h-svh overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${concern.image})` }}
        >
          <div className="w-full h-full bg-black/45 sm:bg-black/35" />
        </div>
      </div>
      <div className="relative z-10 flex h-full items-end px-4 pb-24 pt-28 sm:items-center sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-xl text-white lg:max-w-2xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm sm:h-12 sm:w-12">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <p className="mb-2 text-xs tracking-[0.18em] uppercase text-white/80 sm:text-sm">
              Skin Concern
            </p>
            <h1 className="mb-4 text-4xl leading-[0.95] font-semibold tracking-[0.08em] sm:text-5xl sm:tracking-[0.12em] lg:text-7xl lg:tracking-[0.16em]">
              {concern.title}
            </h1>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-white/90 sm:text-base lg:max-w-xl lg:text-lg">
              {concern.heroDescription}
            </p>
            <Link
              href="/shop"
              className="inline-flex min-h-11 min-w-[170px] items-center justify-center rounded-full bg-white px-6 py-2 text-black transition hover:bg-gray-100 sm:min-w-[190px]"
            >
              Shop Solutions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcernHero;
