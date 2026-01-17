"use client";

import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Lead Dermatologist",
    credential: "MD, FAAD",
    image: "/images/team/member1.jpg",
    description:
      "With over 15 years of experience in dermatology, Dr. Johnson specializes in cosmetic and medical dermatology. She has been instrumental in developing Byou's core formulations, ensuring each product meets the highest standards of efficacy and safety.",
  },
  {
    id: 2,
    name: "Dr. Aisha Rahman",
    role: "Research Director",
    credential: "PhD, Cosmetic Science",
    image: "/images/team/member2.jpg",
    description:
      "Dr. Rahman brings extensive research expertise in natural ingredients and sustainable skincare. Her innovative approach to formulation has led to breakthrough products that combine science-backed ingredients with environmental responsibility.",
  },
];

const Team2 = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-gray-600 tracking-wider mb-3 text-sm">
            Our Trusted Dermatologists
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 leading-tight">
            Meet the Experts Behind Byou
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Our team of dedicated professionals combines years of expertise in
            dermatology and cosmetic science to create products that truly make
            a difference.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col items-center text-center"
            >
              {/* Image */}
              <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="w-full max-w-[400px]">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-3">{member.role}</p>
                <span className="inline-block bg-black text-white text-xs font-medium px-6 py-2.5 rounded-full uppercase tracking-wide mb-6">
                  {member.credential}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team2;