import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";
import type { ApiProduct, ProductSection } from "@/services/products/type";
import { getProductSectionImage } from "@/services/products/utils";

type ProductSectionsProps = {
  product: ApiProduct;
  sections?: ProductSection[];
};

const firstSectionPlaceholderImage = "/images/products/product1.jpg";

const toLucideIconName = (icon?: string): IconName | undefined => {
  if (!icon) return undefined;

  const normalizedIcon = icon
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

  return iconNames.includes(normalizedIcon as IconName)
    ? (normalizedIcon as IconName)
    : undefined;
};

function ProductSectionIcon({ icon }: { icon?: string }) {
  const iconName = toLucideIconName(icon);
  const iconClassName = "size-5";

  if (!iconName) {
    return <CircleCheck className={iconClassName} />;
  }

  return (
    <DynamicIcon
      name={iconName}
      className={iconClassName}
      fallback={() => <CircleCheck className={iconClassName} />}
      aria-hidden="true"
    />
  );
}

export default function ProductSections({
  product,
  sections = [],
}: ProductSectionsProps) {
  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => {
        const isDark = index % 2 === 1;
        const image =
          getProductSectionImage(section.imageKey) ||
          (index === 0 ? firstSectionPlaceholderImage : undefined);
        const items = (section.items ?? []).filter((item) => item.text);
        const imageFirst =
          section.imageAlignment === "LEFT" ||
          (section.imageAlignment !== "RIGHT" && isDark);
        const sectionClasses = isDark
          ? "bg-transparent text-white"
          : "bg-white text-black";
        const textPanelClasses = isDark ? "bg-black" : "bg-white";
        const bodyTextClasses = isDark ? "text-white/70" : "text-gray-700";
        const iconWrapperClasses = isDark
          ? "border-white/20 bg-white/10 text-white"
          : "border-black/10 bg-black text-white";

        const textContent = (
          <div
            className={`flex min-h-[430px] flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 ${textPanelClasses}`}
          >
            {section.title ? (
              <h2 className="max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
                {section.title}
              </h2>
            ) : null}

            {section.content ? (
              <p
                className={`max-w-xl whitespace-pre-line text-sm leading-7 ${
                  section.title ? "mt-6" : ""
                } ${bodyTextClasses}`}
              >
                {section.content}
              </p>
            ) : null}

            {items.length > 0 ? (
              <ul className="mt-8 max-w-xl space-y-4">
                {items.map((item, itemIndex) => (
                  <li
                    key={`${section._id || index}-${item.text}-${itemIndex}`}
                    className="flex items-start gap-4"
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full border ${iconWrapperClasses}`}
                    >
                      <ProductSectionIcon icon={item.icon} />
                    </span>
                    <span
                      className={`pt-2 text-sm leading-6 ${bodyTextClasses}`}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );

        const imageContent = image ? (
          <div className="relative min-h-[360px] overflow-hidden bg-transparent sm:min-h-[430px]">
            <Image
              src={image}
              alt={section.title || product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null;

        return (
          <section key={section._id || `section-${index}`} className={sectionClasses}>
            <div
              className={`mx-auto grid max-w-6xl grid-cols-1 ${
                image ? "lg:grid-cols-2" : ""
              }`}
            >
              {imageFirst ? imageContent : null}
              {textContent}
              {imageFirst ? null : imageContent}
            </div>
          </section>
        );
      })}
    </>
  );
}
