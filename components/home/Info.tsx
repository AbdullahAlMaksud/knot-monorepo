import React from "react";
import DermatologistIcon from "@/components/icons/DermatologistIcom";
import SkinTypeIcon from "@/components/icons/SkinTypeIcon";
import Ingredients from "@/components/icons/Ingredients";
import Cruelty from "@/components/icons/Cruelty";
import Eco from "@/components/icons/Eco";

const features = [
  {
    id: 1,
    icon: <DermatologistIcon />,
    title: "DERMATOLOGIST TESTED",
    description: "Safe and effective, tested by professionals",
  },
  {
    id: 2,
    icon: <SkinTypeIcon />,
    title: "FOR ALL SKIN TYPES",
    description: "Gentle formula suitable for sensitive skin",
  },
  {
    id: 3,
    icon: <Ingredients />,
    title: "MADE WITH PREMIUM INGREDIENTS",
    description: "Formulated with high-quality active ingredients",
  },
  {
    id: 4,
    icon: <Cruelty />,
    title: "CRUELTY-FREE",
    description: "Never tested on animals",
  },
  {
    id: 5,
    icon: <Eco />,
    title: "ECO-FRIENDLY PACKAGING",
    description: "Sustainable and recyclable materials",
  },
];

const Info = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center"
            >
              <div className="h-[34px] flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold tracking-wider mb-2 uppercase">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info;
