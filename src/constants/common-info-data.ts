export interface InfoFeatureData {
  title: string;
  description: string;
}

export const infoFeatures: InfoFeatureData[] = [
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

export const productInfoFeatures: InfoFeatureData[] = infoFeatures.filter(
  (_, i) => i !== 1,
);
