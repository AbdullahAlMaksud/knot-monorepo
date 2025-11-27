"use client";

import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Lead Dermatologist",
    credential: "MD, FAAD",
    image: "/images/team/member1.jpg",
  },
  {
    id: 2,
    name: "Dr. Aisha Rahman",
    role: "Lead Dermatologist",
    credential: "MD, FAAD",
    image: "/images/team/member2.jpg",
  },
  {
    id: 3,
    name: "Dr. Maria Garcia",
    role: "Lead Dermatologist",
    credential: "MD, FAAD",
    image: "/images/team/member3.jpg",
  },
  {
    id: 4,
    name: "Dr. Emily Chen",
    role: "Lead Dermatologist",
    credential: "MD, FAAD",
    image: "/images/team/member4.jpg",
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    role: "Lead Dermatologist",
    credential: "MD, FAAD",
    image: "/images/team/member5.jpg",
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    role: "Lead Dermatologist",
    credential: "MD, FAAD",
    image: "/images/team/member2.jpg",
  },
];

const Team = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-7xl p-4 mx-auto ">
          <p className="text-gray-600 tracking-wider uppercase mb-3">
            MEET OUR TEAM
          </p>
          <h2 className="text-3xl  font-semibold mb-6 leading-tight">
            Trusted by Dermatologists.
            <br />
            Backed by Science.
            <br />
            Driven by Results.
          </h2>
          <p className="text-gray-600 max-w-xl text-sm leading-relaxed">
            Our formulations are developed by certified dermatologists and
            skincare researchers committed to delivering safe, effective, and
            halal-certified solutions without compromise.
          </p>
        </div>

        {/* Team Scrollable Container */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex gap-6 pb-4 min-w-max">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group relative w-[280px] aspect-3/4 rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
              >
                {/* Image */}
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Info Card - Shows on hover */}
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                    <span className="inline-block bg-black text-white text-xs font-medium px-6 py-2.5 rounded-full uppercase tracking-wide">
                      {member.credential}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
