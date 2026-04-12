import {
  Clock4,
  Droplets,
  Eye,
  type LucideIcon,
  ShieldAlert,
  Sparkles,
  Sun,
} from "lucide-react";

export interface ConcernIngredient {
  percentage: string;
  name: string;
  description: string;
}

export interface ConcernRoutineStep {
  number: string;
  title: string;
  description: string;
}

export interface Concern {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  image: string;
  icon: LucideIcon;
  summary: string;
  heroDescription: string;
  understandingTitle: string;
  understandingDescription: string;
  symptoms: string[];
  understandingImage: string;
  routineImage: string;
  ingredients: ConcernIngredient[];
  routineSteps: ConcernRoutineStep[];
}

export const concerns: Concern[] = [
  {
    id: 1,
    slug: "dullness-uneven-tone",
    title: "Dullness & Uneven Tone",
    subtitle: "RESTORE YOUR NATURAL RADIANCE",
    image: "/images/home/care 1.jpg",
    icon: Sparkles,
    summary:
      "When skin looks tired or patchy, the right brightening actives can help bring back clarity and glow.",
    heroDescription:
      "Dullness and uneven tone can make skin look tired even when it is healthy. A targeted brightening routine helps revive radiance, smooth texture, and support a more balanced complexion.",
    understandingTitle: "What Causes Dullness & Uneven Tone?",
    understandingDescription:
      "A buildup of dead skin cells, sun exposure, post-acne marks, and dehydration can all contribute to skin that looks flat or uneven. Consistent use of brightening, barrier-friendly ingredients helps restore clarity over time.",
    symptoms: [
      "Loss of natural glow",
      "Patchy or uneven complexion",
      "Lingering post-acne marks",
      "Rough, tired-looking skin",
    ],
    understandingImage: "/images/home/care 1.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "10%",
        name: "Vitamin C",
        description:
          "Helps brighten dull skin, improve visible clarity, and support a more even-looking tone.",
      },
      {
        percentage: "4%",
        name: "Niacinamide",
        description:
          "Strengthens the skin barrier while helping reduce the look of discoloration and uneven texture.",
      },
      {
        percentage: "2%",
        name: "Alpha Arbutin",
        description:
          "Targets the appearance of dark spots gently for a more refined, balanced complexion.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse Gently",
        description: "Start with a non-stripping cleanser to prep skin.",
      },
      {
        number: "02",
        title: "Apply Brightening Serum",
        description:
          "Press 2-3 drops into clean skin, focusing on uneven areas.",
      },
      {
        number: "03",
        title: "Seal With Moisture",
        description: "Lock in hydration to support glow and smoother texture.",
      },
      {
        number: "04",
        title: "Use SPF Daily",
        description:
          "Protect your progress by minimizing fresh sun-triggered discoloration.",
      },
    ],
  },
  {
    id: 2,
    slug: "dehydration-dryness",
    title: "Dehydration & Dryness",
    subtitle: "REPLENISH COMFORT AND BOUNCE",
    image: "/images/home/care 2.jpg",
    icon: Droplets,
    summary:
      "Water loss leaves skin looking dull and feeling tight, but barrier-supportive hydration can quickly restore comfort.",
    heroDescription:
      "Dehydrated skin often feels tight, rough, or less supple. Rebuilding hydration levels and reinforcing the skin barrier helps restore bounce, softness, and a healthier-looking surface.",
    understandingTitle: "What Causes Dehydration & Dryness?",
    understandingDescription:
      "Harsh cleansers, over-exfoliation, weather changes, and barrier disruption can all lead to water loss. Even oily skin can become dehydrated when it lacks the hydration needed to stay balanced and resilient.",
    symptoms: [
      "Tightness after cleansing",
      "Flaky or rough patches",
      "Skin that looks tired or creased",
      "Reduced softness and bounce",
    ],
    understandingImage: "/images/home/care 2.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "1%",
        name: "Hyaluronic Acid",
        description:
          "Draws water into the skin to improve softness, comfort, and plumpness.",
      },
      {
        percentage: "5%",
        name: "Panthenol",
        description:
          "Supports the barrier and helps reduce the tight, uncomfortable feel of dehydration.",
      },
      {
        percentage: "2%",
        name: "Ceramide Complex",
        description:
          "Reinforces the skin barrier to help prevent future moisture loss.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Use a Mild Cleanser",
        description:
          "Avoid stripping formulas that leave skin squeaky and tight.",
      },
      {
        number: "02",
        title: "Layer Hydration",
        description:
          "Apply serum while skin is slightly damp for better moisture retention.",
      },
      {
        number: "03",
        title: "Follow With Cream",
        description: "Seal in hydration with a barrier-supportive moisturizer.",
      },
      {
        number: "04",
        title: "Stay Consistent",
        description:
          "Use morning and night to steadily restore comfort and resilience.",
      },
    ],
  },
  {
    id: 3,
    slug: "early-aging-signs",
    title: "Early Aging Signs",
    image: "/images/home/care 3.jpg",
    icon: Clock4,
    summary:
      "Fine lines, reduced bounce, and early texture changes respond best to routines that support collagen and hydration together.",
    heroDescription:
      "Early signs of aging often show up as fine lines, reduced elasticity, and skin that does not feel as smooth or plump as before. A preventive routine can help support firmer, healthier-looking skin.",
    understandingTitle: "What Triggers Early Aging Signs?",
    understandingDescription:
      "Sun exposure, stress, dehydration, and natural collagen decline all contribute to changes in firmness and texture. Using targeted antioxidants and hydration can help skin stay resilient for longer.",
    symptoms: [
      "Fine lines around eyes or mouth",
      "Reduced bounce and firmness",
      "Texture that feels less smooth",
      "Skin looking less rested over time",
    ],
    understandingImage: "/images/home/care 3.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "5%",
        name: "Peptides",
        description:
          "Support skin firmness and help soften the look of early fine lines.",
      },
      {
        percentage: "10%",
        name: "Vitamin C",
        description:
          "Provides antioxidant support while improving brightness and overall skin vitality.",
      },
      {
        percentage: "0.5%",
        name: "Bakuchiol",
        description:
          "A gentle active that helps refine texture and support smoother-looking skin.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Prep Skin",
        description:
          "Cleanse and lightly hydrate so active ingredients apply evenly.",
      },
      {
        number: "02",
        title: "Apply Treatment",
        description: "Use a collagen-supportive serum over face and neck.",
      },
      {
        number: "03",
        title: "Moisturize",
        description: "Support elasticity with a nourishing barrier cream.",
      },
      {
        number: "04",
        title: "Protect Daily",
        description: "Finish with SPF every morning to limit photoaging.",
      },
    ],
  },
  {
    id: 4,
    slug: "sensitivity",
    title: "Sensitivity",
    image: "/images/home/care 4.jpg",
    icon: ShieldAlert,
    summary:
      "Skin that reacts easily usually needs calm, low-irritation support that reinforces the barrier instead of pushing it harder.",
    heroDescription:
      "Sensitive skin can feel reactive, uncomfortable, and unpredictable. A minimalist routine focused on soothing ingredients and barrier repair helps reduce visible stress and improve tolerance over time.",
    understandingTitle: "Why Does Skin Become Sensitive?",
    understandingDescription:
      "A weakened barrier, harsh products, environmental triggers, and overuse of strong actives can make skin feel more reactive. Gentle formulations help calm visible redness and reduce the chance of future flare-ups.",
    symptoms: [
      "Visible redness or flushing",
      "Stinging after product use",
      "Dry, compromised barrier",
      "Skin that reacts to weather or friction",
    ],
    understandingImage: "/images/home/care 4.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "5%",
        name: "Panthenol",
        description:
          "Helps calm stressed skin while improving overall comfort and hydration.",
      },
      {
        percentage: "1%",
        name: "Centella Asiatica",
        description:
          "Known for soothing visible irritation and supporting skin recovery.",
      },
      {
        percentage: "2%",
        name: "Ceramides",
        description:
          "Strengthen the barrier to help skin become less reactive over time.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse Carefully",
        description:
          "Use lukewarm water and a gentle cleanser with minimal friction.",
      },
      {
        number: "02",
        title: "Apply Soothing Serum",
        description: "Pat on a calming layer without over-rubbing the skin.",
      },
      {
        number: "03",
        title: "Repair the Barrier",
        description:
          "Use a rich but breathable moisturizer to reduce transepidermal water loss.",
      },
      {
        number: "04",
        title: "Keep the Routine Simple",
        description:
          "Avoid layering too many strong actives while skin is reactive.",
      },
    ],
  },
  {
    id: 5,
    slug: "dark-circles",
    title: "Dark Circles",
    image: "/images/home/care 5.jpg",
    icon: Eye,
    summary:
      "Under-eye darkness often needs a mix of brightening, hydration, and barrier support to look fresher.",
    heroDescription:
      "Dark circles can be influenced by fatigue, dehydration, pigmentation, and a thinner-looking under-eye area. A focused routine helps the eye area appear brighter, smoother, and more awake.",
    understandingTitle: "What Makes Dark Circles More Visible?",
    understandingDescription:
      "Lack of sleep, dryness, genetics, and pigmentation can all contribute to shadowing under the eyes. Gentle hydration and brightening support help the area look more even and refreshed.",
    symptoms: [
      "Shadowing beneath the eyes",
      "Tired-looking eye contour",
      "Dry or crepey under-eye skin",
      "Uneven tone around the orbital area",
    ],
    understandingImage: "/images/home/care 5.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "5%",
        name: "Caffeine",
        description:
          "Helps the under-eye area look more energized and less puffy.",
      },
      {
        percentage: "2%",
        name: "Niacinamide",
        description:
          "Supports a smoother-looking eye contour and more even visible tone.",
      },
      {
        percentage: "1%",
        name: "Hyaluronic Acid",
        description:
          "Hydrates the delicate eye area to soften the look of fine dehydration lines.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Hydrate First",
        description: "Apply on clean skin before heavier creams or sunscreen.",
      },
      {
        number: "02",
        title: "Tap Gently",
        description:
          "Use your ring finger to press product around the eye contour.",
      },
      {
        number: "03",
        title: "Seal With Moisture",
        description: "Layer a gentle moisturizer to keep the area supple.",
      },
      {
        number: "04",
        title: "Use Consistently",
        description:
          "Daily use helps the eye area look brighter and less fatigued over time.",
      },
    ],
  },
  {
    id: 6,
    slug: "sun-damage",
    title: "Sun Damage",
    image: "/images/home/care 6.jpg",
    icon: Sun,
    summary:
      "UV exposure can leave behind spots, roughness, and visible dullness that need brightening and daily protection.",
    heroDescription:
      "Sun damage often appears as uneven tone, rough texture, and loss of radiance. Recovery starts with brightening support, barrier care, and daily sun protection to prevent further visible damage.",
    understandingTitle: "How Does Sun Damage Affect Skin?",
    understandingDescription:
      "Repeated UV exposure can speed up discoloration, dryness, and visible texture changes. A recovery-focused routine helps improve tone and texture while SPF protects against ongoing damage.",
    symptoms: [
      "Dark spots after sun exposure",
      "Rough or leathery texture",
      "Dullness and uneven color",
      "Skin that feels less resilient",
    ],
    understandingImage: "/images/home/care 6.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "10%",
        name: "Vitamin C",
        description:
          "Helps visibly brighten discoloration caused by repeated sun exposure.",
      },
      {
        percentage: "2%",
        name: "Alpha Arbutin",
        description:
          "Works gradually on visible spot intensity for a more even look.",
      },
      {
        percentage: "1%",
        name: "Ectoin",
        description:
          "Supports stressed skin and helps maintain hydration in challenging environments.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse and Reset",
        description:
          "Start with clean skin so brightening actives absorb evenly.",
      },
      {
        number: "02",
        title: "Use Corrective Serum",
        description:
          "Apply a targeted serum over areas of discoloration and roughness.",
      },
      {
        number: "03",
        title: "Moisturize Well",
        description:
          "Support the barrier while skin recovers from visible UV stress.",
      },
      {
        number: "04",
        title: "Never Skip SPF",
        description:
          "Daily broad-spectrum protection is essential to prevent setbacks.",
      },
    ],
  },
  {
    id: 7,
    slug: "sun-damage",
    title: "Sun Damage",
    image: "/images/home/care 6.jpg",
    icon: Sun,
    summary:
      "UV exposure can leave behind spots, roughness, and visible dullness that need brightening and daily protection.",
    heroDescription:
      "Sun damage often appears as uneven tone, rough texture, and loss of radiance. Recovery starts with brightening support, barrier care, and daily sun protection to prevent further visible damage.",
    understandingTitle: "How Does Sun Damage Affect Skin?",
    understandingDescription:
      "Repeated UV exposure can speed up discoloration, dryness, and visible texture changes. A recovery-focused routine helps improve tone and texture while SPF protects against ongoing damage.",
    symptoms: [
      "Dark spots after sun exposure",
      "Rough or leathery texture",
      "Dullness and uneven color",
      "Skin that feels less resilient",
    ],
    understandingImage: "/images/home/care 6.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "10%",
        name: "Vitamin C",
        description:
          "Helps visibly brighten discoloration caused by repeated sun exposure.",
      },
      {
        percentage: "2%",
        name: "Alpha Arbutin",
        description:
          "Works gradually on visible spot intensity for a more even look.",
      },
      {
        percentage: "1%",
        name: "Ectoin",
        description:
          "Supports stressed skin and helps maintain hydration in challenging environments.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse and Reset",
        description:
          "Start with clean skin so brightening actives absorb evenly.",
      },
      {
        number: "02",
        title: "Use Corrective Serum",
        description:
          "Apply a targeted serum over areas of discoloration and roughness.",
      },
      {
        number: "03",
        title: "Moisturize Well",
        description:
          "Support the barrier while skin recovers from visible UV stress.",
      },
      {
        number: "04",
        title: "Never Skip SPF",
        description:
          "Daily broad-spectrum protection is essential to prevent setbacks.",
      },
    ],
  },
  {
    id: 8,
    slug: "sun-damage",
    title: "Sun Damage",
    image: "/images/home/care 6.jpg",
    icon: Sun,
    summary:
      "UV exposure can leave behind spots, roughness, and visible dullness that need brightening and daily protection.",
    heroDescription:
      "Sun damage often appears as uneven tone, rough texture, and loss of radiance. Recovery starts with brightening support, barrier care, and daily sun protection to prevent further visible damage.",
    understandingTitle: "How Does Sun Damage Affect Skin?",
    understandingDescription:
      "Repeated UV exposure can speed up discoloration, dryness, and visible texture changes. A recovery-focused routine helps improve tone and texture while SPF protects against ongoing damage.",
    symptoms: [
      "Dark spots after sun exposure",
      "Rough or leathery texture",
      "Dullness and uneven color",
      "Skin that feels less resilient",
    ],
    understandingImage: "/images/home/care 6.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "10%",
        name: "Vitamin C",
        description:
          "Helps visibly brighten discoloration caused by repeated sun exposure.",
      },
      {
        percentage: "2%",
        name: "Alpha Arbutin",
        description:
          "Works gradually on visible spot intensity for a more even look.",
      },
      {
        percentage: "1%",
        name: "Ectoin",
        description:
          "Supports stressed skin and helps maintain hydration in challenging environments.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse and Reset",
        description:
          "Start with clean skin so brightening actives absorb evenly.",
      },
      {
        number: "02",
        title: "Use Corrective Serum",
        description:
          "Apply a targeted serum over areas of discoloration and roughness.",
      },
      {
        number: "03",
        title: "Moisturize Well",
        description:
          "Support the barrier while skin recovers from visible UV stress.",
      },
      {
        number: "04",
        title: "Never Skip SPF",
        description:
          "Daily broad-spectrum protection is essential to prevent setbacks.",
      },
    ],
  },
  {
    id: 9,
    slug: "sun-damage",
    title: "Sun Damage",
    image: "/images/home/care 6.jpg",
    icon: Sun,
    summary:
      "UV exposure can leave behind spots, roughness, and visible dullness that need brightening and daily protection.",
    heroDescription:
      "Sun damage often appears as uneven tone, rough texture, and loss of radiance. Recovery starts with brightening support, barrier care, and daily sun protection to prevent further visible damage.",
    understandingTitle: "How Does Sun Damage Affect Skin?",
    understandingDescription:
      "Repeated UV exposure can speed up discoloration, dryness, and visible texture changes. A recovery-focused routine helps improve tone and texture while SPF protects against ongoing damage.",
    symptoms: [
      "Dark spots after sun exposure",
      "Rough or leathery texture",
      "Dullness and uneven color",
      "Skin that feels less resilient",
    ],
    understandingImage: "/images/home/care 6.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "10%",
        name: "Vitamin C",
        description:
          "Helps visibly brighten discoloration caused by repeated sun exposure.",
      },
      {
        percentage: "2%",
        name: "Alpha Arbutin",
        description:
          "Works gradually on visible spot intensity for a more even look.",
      },
      {
        percentage: "1%",
        name: "Ectoin",
        description:
          "Supports stressed skin and helps maintain hydration in challenging environments.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse and Reset",
        description:
          "Start with clean skin so brightening actives absorb evenly.",
      },
      {
        number: "02",
        title: "Use Corrective Serum",
        description:
          "Apply a targeted serum over areas of discoloration and roughness.",
      },
      {
        number: "03",
        title: "Moisturize Well",
        description:
          "Support the barrier while skin recovers from visible UV stress.",
      },
      {
        number: "04",
        title: "Never Skip SPF",
        description:
          "Daily broad-spectrum protection is essential to prevent setbacks.",
      },
    ],
  },
];

export function getConcernBySlug(slug: string): Concern | undefined {
  return concerns.find((concern) => concern.slug === slug);
}

export function getConcernRows(items: Concern[]): Concern[][] {
  if (items.length <= 1) {
    return [items];
  }

  const splitMap: Record<number, [number, number]> = {
    6: [2, 4],
    7: [2, 5],
    8: [3, 5],
    9: [3, 6],
  };

  const split = splitMap[items.length];

  if (split) {
    return [
      items.slice(0, split[0]),
      items.slice(split[0], split[0] + split[1]),
    ];
  }

  const firstRowCount = Math.ceil(items.length / 2);
  return [items.slice(0, firstRowCount), items.slice(firstRowCount)];
}
