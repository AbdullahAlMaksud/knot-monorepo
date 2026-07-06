import React from "react";
import DermatologistIcon from "@/components/icons/dermatologist-icom";
import SkinTypeIcon from "@/components/icons/skin-type-icon";
import Ingredients from "@/components/icons/ingredients";
import Cruelty from "@/components/icons/cruelty";
import Eco from "@/components/icons/eco";
import { infoFeatures } from "@/constants/common-info-data";

export interface InfoFeature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const allIcons = [
  <DermatologistIcon key="dermatologist" />,
  <SkinTypeIcon key="skintype" />,
  <Ingredients key="ingredients" />,
  <Cruelty key="cruelty" />,
  <Eco key="eco" />,
];

const defaultFeatures: InfoFeature[] = infoFeatures;

interface InfoProps {
  features?: InfoFeature[];
}

const Info = ({ features = defaultFeatures }: InfoProps) => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:flex-wrap sm:overflow-x-visible sm:justify-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-[calc(50%-12px)] sm:w-44 shrink-0 snap-start"
            >
              <div className="h-[34px] flex items-center justify-center mb-4">
                {feature.icon ||
                  allIcons[
                    infoFeatures.findIndex((f) => f.title === feature.title) %
                      allIcons.length
                  ] ||
                  allIcons[index % allIcons.length]}
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
