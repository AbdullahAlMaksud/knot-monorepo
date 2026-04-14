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
    slug: "acne-clogged-pores",
    title: "Acne & Clogged Pores",
    subtitle: "CLEAR CONGESTION, CALM BREAKOUTS",
    image: "/images/home/care 1.jpg",
    icon: Sparkles,
    summary:
      "Congested pores and frequent breakouts need oil-balancing and pore-clearing actives used consistently.",
    heroDescription:
      "Acne and clogged pores often appear when excess sebum, dead skin buildup, and impurities stay trapped in the skin. A focused routine helps unclog pores, reduce active breakouts, and support clearer-looking skin.",
    understandingTitle: "What Causes Acne & Clogged Pores?",
    understandingDescription:
      "Overproduction of oil, inconsistent cleansing, and pore congestion can trigger acne and visible bumps. Using balancing and exfoliating ingredients gently can improve skin clarity over time.",
    symptoms: [
      "Frequent breakouts",
      "Clogged or enlarged pores",
      "Inflamed pimples",
      "Uneven, congested skin surface",
    ],
    understandingImage: "/images/home/care 1.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "2%",
        name: "Salicylic Acid",
        description:
          "Penetrates pores to dissolve buildup and reduce acne-causing congestion.",
      },
      {
        percentage: "10%",
        name: "Niacinamide",
        description:
          "Helps regulate excess oil and supports calmer, clearer-looking skin.",
      },
      {
        percentage: "0.5%",
        name: "Zinc PCA",
        description:
          "Supports sebum balance and helps reduce visible inflammation.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse Thoroughly",
        description:
          "Wash away oil and impurities without stripping your barrier.",
      },
      {
        number: "02",
        title: "Apply Pore-Care Serum",
        description: "Use 2-3 drops on acne-prone zones to target congestion.",
      },
      {
        number: "03",
        title: "Moisturize Lightly",
        description:
          "Use an oil-free moisturizer to keep skin hydrated and balanced.",
      },
      {
        number: "04",
        title: "Protect With SPF",
        description:
          "Wear sunscreen daily to prevent post-acne marks from darkening.",
      },
    ],
  },
  {
    id: 2,
    slug: "blackheads-whiteheads",
    title: "Blackheads and Whiteheads",
    subtitle: "UNCLOG PORES, SMOOTH THE SURFACE",
    image: "/images/home/care 2.jpg",
    icon: Droplets,
    summary:
      "Persistent blackheads and whiteheads usually point to trapped oil, debris, and slower surface renewal.",
    heroDescription:
      "Blackheads and whiteheads form when pores remain clogged with oil and dead skin cells. With regular exfoliation and balanced hydration, skin texture can look cleaner and more refined.",
    understandingTitle: "Why Do Blackheads and Whiteheads Form?",
    understandingDescription:
      "When pores are blocked, oxidation can create blackheads while closed buildup appears as whiteheads. Gentle exfoliation and non-comedogenic products help prevent recurring congestion.",
    symptoms: [
      "Dark pore dots around nose and T-zone",
      "Small closed bumps under the skin",
      "Uneven texture",
      "Recurring pore congestion",
    ],
    understandingImage: "/images/home/care 2.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "2%",
        name: "BHA Blend",
        description:
          "Helps loosen pore buildup and reduce the appearance of blackheads.",
      },
      {
        percentage: "5%",
        name: "Lactic Acid",
        description:
          "Refines rough texture and supports smoother, more even skin.",
      },
      {
        percentage: "2%",
        name: "Niacinamide",
        description:
          "Helps normalize pore appearance while supporting barrier health.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Start With Clean Skin",
        description:
          "Use a gentle cleanser to remove buildup without irritation.",
      },
      {
        number: "02",
        title: "Use Exfoliating Serum",
        description:
          "Apply targeted actives on congested areas, especially T-zone.",
      },
      {
        number: "03",
        title: "Hydrate Barrier",
        description:
          "Follow with lightweight moisturizer to avoid rebound oiliness.",
      },
      {
        number: "04",
        title: "Repeat Consistently",
        description:
          "Stick to routine daily to minimize recurring blackheads and whiteheads.",
      },
    ],
  },
  {
    id: 3,
    slug: "excess-oil-shine",
    title: "Excess Oil and Shine",
    image: "/images/home/care 3.jpg",
    icon: Clock4,
    summary:
      "If skin looks greasy quickly after cleansing, it likely needs better oil regulation instead of harsh drying.",
    heroDescription:
      "Excess oil and constant shine can make skin feel heavy and increase pore congestion. The right balancing ingredients help control sebum while keeping skin comfortably hydrated.",
    understandingTitle: "What Causes Excess Oil and Shine?",
    understandingDescription:
      "Overactive sebaceous glands, heat, humidity, and over-cleansing can all trigger excess sebum. A balanced routine helps reduce shine without damaging the barrier.",
    symptoms: [
      "Greasy T-zone within hours",
      "Persistent facial shine",
      "Frequent clogged pores",
      "Makeup breaking down quickly",
    ],
    understandingImage: "/images/home/care 3.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "10%",
        name: "Niacinamide",
        description:
          "Helps control excess sebum and improve visible pore quality.",
      },
      {
        percentage: "1%",
        name: "Zinc PCA",
        description: "Supports oil balance and helps keep skin looking fresh.",
      },
      {
        percentage: "2%",
        name: "Salicylic Acid",
        description: "Helps clear oily buildup in pores and reduce congestion.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse Morning and Night",
        description: "Use a gentle cleanser to remove excess oil and sweat.",
      },
      {
        number: "02",
        title: "Apply Oil-Control Serum",
        description: "Focus on the T-zone and visibly shiny areas.",
      },
      {
        number: "03",
        title: "Use Gel Moisturizer",
        description: "Hydrate skin lightly so it stays balanced, not greasy.",
      },
      {
        number: "04",
        title: "Finish With Matte SPF",
        description: "Protect skin daily without adding heavy shine.",
      },
    ],
  },
  {
    id: 4,
    slug: "rough-skin-texture",
    title: "Rough Skin Texture",
    image: "/images/home/care 4.jpg",
    icon: ShieldAlert,
    summary:
      "Rough, bumpy texture often appears when dead skin buildup and dehydration are left untreated.",
    heroDescription:
      "When skin texture feels uneven or coarse, it usually needs gentle resurfacing plus hydration support. Consistent smoothing care helps skin feel softer and look more refined.",
    understandingTitle: "What Causes Rough Skin Texture?",
    understandingDescription:
      "Dead skin accumulation, inadequate exfoliation, and barrier disruption can make skin feel rough to the touch. Mild exfoliants and moisture-binding ingredients can improve texture progressively.",
    symptoms: [
      "Bumpy or grainy skin feel",
      "Uneven makeup application",
      "Dry, flaky patches",
      "Dull and coarse surface",
    ],
    understandingImage: "/images/home/care 4.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "5%",
        name: "Lactic Acid",
        description:
          "Gently exfoliates dead skin to improve softness and clarity.",
      },
      {
        percentage: "1%",
        name: "Hyaluronic Acid",
        description: "Hydrates skin deeply to reduce dry, rough feel.",
      },
      {
        percentage: "2%",
        name: "Ceramide Complex",
        description:
          "Supports barrier repair and keeps texture smooth over time.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse Gently",
        description: "Use non-stripping cleanser to avoid worsening roughness.",
      },
      {
        number: "02",
        title: "Apply Texture Serum",
        description: "Use a mild resurfacing serum in a thin, even layer.",
      },
      {
        number: "03",
        title: "Moisturize Well",
        description: "Seal hydration with barrier-supportive moisturizer.",
      },
      {
        number: "04",
        title: "Use SPF Daily",
        description:
          "Protect newly resurfaced skin from sun-related roughness.",
      },
    ],
  },
  {
    id: 5,
    slug: "fine-lines-wrinkles",
    title: "Fine Lines and Wrinkles",
    image: "/images/home/care 5.jpg",
    icon: Eye,
    summary:
      "Visible lines and wrinkles respond best to routines that support renewal, hydration, and collagen care.",
    heroDescription:
      "Fine lines and wrinkles can show up from repeated facial movement, dehydration, and natural collagen decline. Consistent anti-aging support helps skin look smoother and more supple.",
    understandingTitle: "Why Do Fine Lines and Wrinkles Develop?",
    understandingDescription:
      "Age, UV exposure, and reduced cell turnover gradually make lines more noticeable. Barrier-safe retinoid routines and hydration help soften these visible changes.",
    symptoms: [
      "Expression lines around eyes and mouth",
      "Visible forehead creases",
      "Loss of smoothness",
      "Skin that appears less plump",
    ],
    understandingImage: "/images/home/care 5.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "0.15%",
        name: "Retinol",
        description:
          "Supports skin renewal and helps reduce the look of fine lines.",
      },
      {
        percentage: "1%",
        name: "Niacinamide",
        description:
          "Strengthens barrier function and supports smoother texture.",
      },
      {
        percentage: "1%",
        name: "Hyaluronic Acid",
        description:
          "Hydrates skin to make lines appear softer and less pronounced.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse and Dry",
        description: "Start on clean, dry skin before applying treatment.",
      },
      {
        number: "02",
        title: "Apply Retinol Serum",
        description:
          "Use a small amount at night and build frequency gradually.",
      },
      {
        number: "03",
        title: "Moisturize",
        description:
          "Follow with moisturizer to reduce dryness and irritation.",
      },
      {
        number: "04",
        title: "Morning SPF Is Essential",
        description: "Protect skin daily to prevent further wrinkle formation.",
      },
    ],
  },
  {
    id: 6,
    slug: "uneven-skin-tone",
    title: "Uneven Skin Tone",
    image: "/images/concern/concern4.png",
    icon: Sun,
    summary:
      "Uneven tone and patchy complexion often improve with brightening actives and daily UV protection.",
    heroDescription:
      "Skin tone can look uneven due to sun exposure, acne marks, and inflammation. A targeted brightening routine helps improve clarity and restore a more balanced complexion.",
    understandingTitle: "What Causes Uneven Skin Tone?",
    understandingDescription:
      "Pigmentation triggers like UV damage, post-inflammatory marks, and barrier stress can create patchiness. Gentle corrective ingredients and consistent SPF are key for visible improvement.",
    symptoms: [
      "Patchy complexion",
      "Dark spots and marks",
      "Uneven brightness across face",
      "Post-acne discoloration",
    ],
    understandingImage: "/images/concern/concern4.png",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "10%",
        name: "Vitamin C",
        description: "Brightens skin and helps reduce the look of dark spots.",
      },
      {
        percentage: "2%",
        name: "Alpha Arbutin",
        description: "Targets uneven pigmentation for a more uniform tone.",
      },
      {
        percentage: "4%",
        name: "Niacinamide",
        description:
          "Supports barrier health and improves overall tone consistency.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse Gently",
        description: "Prep skin so brightening ingredients absorb evenly.",
      },
      {
        number: "02",
        title: "Apply Brightening Serum",
        description: "Focus on areas with dark spots and uneven tone.",
      },
      {
        number: "03",
        title: "Hydrate and Seal",
        description:
          "Use moisturizer to support barrier repair during correction.",
      },
      {
        number: "04",
        title: "Use Broad-Spectrum SPF",
        description:
          "Daily sun protection prevents new discoloration and setbacks.",
      },
    ],
  },
  {
    id: 7,
    slug: "loss-of-firmness",
    title: "Loss of Firmness",
    image: "/images/concern/concern3.png",
    icon: Sun,
    summary:
      "When skin feels less bouncy or lifted, targeted firming actives and hydration can help restore resilience.",
    heroDescription:
      "Loss of firmness appears as reduced elasticity and softer facial contours over time. A routine focused on collagen support and hydration can improve skin's lifted appearance.",
    understandingTitle: "Why Does Skin Lose Firmness?",
    understandingDescription:
      "Natural collagen decline, UV stress, and dehydration can make skin feel less taut. Consistent firming ingredients help strengthen and support visible structure.",
    symptoms: [
      "Reduced skin bounce",
      "Softer jawline definition",
      "Skin that feels thinner",
      "Less elastic texture",
    ],
    understandingImage: "/images/concern/concern3.png",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "5%",
        name: "Peptide Complex",
        description:
          "Supports firmer-feeling skin and improved visible elasticity.",
      },
      {
        percentage: "0.15%",
        name: "Retinol",
        description:
          "Promotes skin renewal and supports smoother, tighter-looking skin.",
      },
      {
        percentage: "1%",
        name: "Hyaluronic Acid",
        description:
          "Improves hydration levels to maintain plump, resilient skin.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse and Prep",
        description: "Use a mild cleanser before applying firming treatments.",
      },
      {
        number: "02",
        title: "Apply Firming Serum",
        description: "Focus on face and neck for better overall support.",
      },
      {
        number: "03",
        title: "Moisturize Generously",
        description: "Use a supportive cream to improve bounce and comfort.",
      },
      {
        number: "04",
        title: "Protect Every Morning",
        description: "Use SPF to protect collagen from UV-related breakdown.",
      },
    ],
  },
  {
    id: 8,
    slug: "dull-aging-skin",
    title: "Dull and Aging Skin",
    image: "/images/home/care 6.jpg",
    icon: Sun,
    summary:
      "Aging skin can look tired and dull when renewal slows and hydration drops.",
    heroDescription:
      "Dull and aging skin often shows reduced glow, uneven texture, and lower resilience. A multi-action routine can help revive radiance while supporting long-term skin health.",
    understandingTitle: "What Leads to Dull, Aging Skin?",
    understandingDescription:
      "As cell turnover slows with age, skin may appear less luminous and more fatigued. Combining brightening antioxidants, renewal support, and hydration helps restore a healthier look.",
    symptoms: [
      "Loss of glow",
      "Tired-looking complexion",
      "Uneven, rough texture",
      "Visible early aging signs",
    ],
    understandingImage: "/images/home/care 6.jpg",
    routineImage: "/images/concern/concern2.jpg",
    ingredients: [
      {
        percentage: "10%",
        name: "Vitamin C",
        description:
          "Boosts radiance and supports a brighter, more energized appearance.",
      },
      {
        percentage: "0.15%",
        name: "Retinol",
        description:
          "Encourages renewal to smooth texture and soften aging signs.",
      },
      {
        percentage: "1%",
        name: "Hyaluronic Acid",
        description:
          "Replenishes hydration to improve plumpness and skin comfort.",
      },
    ],
    routineSteps: [
      {
        number: "01",
        title: "Cleanse Daily",
        description:
          "Start with clean skin to help active ingredients work better.",
      },
      {
        number: "02",
        title: "Apply Brightening Treatment",
        description: "Use antioxidant-rich serum to improve clarity and tone.",
      },
      {
        number: "03",
        title: "Nourish With Moisture",
        description:
          "Apply a hydrating moisturizer to restore comfort and suppleness.",
      },
      {
        number: "04",
        title: "Protect With SPF",
        description:
          "Use SPF each morning to protect brightness and firmness gains.",
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
