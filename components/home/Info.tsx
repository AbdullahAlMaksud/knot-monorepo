import React from "react";
import DermatologistIcon from "@/components/icons/DermatologistIcom";
import SkinTypeIcon from "@/components/icons/SkinTypeIcon";
import Ingredients from "@/components/icons/Ingredients";
import Cruelty from "@/components/icons/Cruelty";
import Eco from "@/components/icons/Eco";
export interface InfoFeature {
  title: string;
  description: string;
}

const icons = [
  <DermatologistIcon key="dermatologist" />,
  <SkinTypeIcon key="skintype" />,
  <Ingredients key="ingredients" />,
  <Cruelty key="cruelty" />,
  <Eco key="eco" />,
];

const defaultFeatures: InfoFeature[] = [
  {
    title: "Dermatologist Certified",
    description: "Safe and effective to use",
  },
  {
    title: "For All Skin Types",
    description: "Gentle formulation suitable for all skin",
  },
  {
    title: "Premium Quality Ingredients",
    description: "Formulated with high quality active ingredients",
  },
  {
    title: "Formulated by Experts",
    description: "Formulation developed by global formulation experts",
  },
  {
    title: "Climate Adapted Performance",
    description: "Compatible in heat and humid weather",
  },
];

interface InfoProps {
  features?: InfoFeature[];
}

const Info = ({ features = defaultFeatures }: InfoProps) => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="h-[34px] flex items-center justify-center mb-4">
                {icons[index % icons.length]}
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
