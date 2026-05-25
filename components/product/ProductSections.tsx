import Image from "next/image";
import {
  CheckCircle2,
  Droplets,
  Feather,
  Leaf,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import type { ApiProduct, ProductSection } from "@/services/products/type";
import { getProductSectionImage } from "@/services/products/utils";

type ProductSectionsProps = {
  product: ApiProduct;
  sections?: ProductSection[];
};

const featureIcons = [Droplets, Sparkles, Leaf, CheckCircle2, Feather];

export default function ProductSections({
  product,
  sections = [],
}: ProductSectionsProps) {
  if (sections.length === 0) return null;

  const bulletItems = sections
    .flatMap((section) => section.items ?? [])
    .filter((item) => item.text);
  const textSections = sections.filter((section) => section.type !== "BULLETS");
  const bulletSections = sections.filter(
    (section) => section.type === "BULLETS",
  );
  const primaryText = textSections[0];
  const primaryBullets = bulletSections[0];
  const firstImage =
    getProductSectionImage(primaryText?.imageKey) ||
    getProductSectionImage(primaryBullets?.imageKey);
  const secondImage =
    getProductSectionImage(primaryBullets?.imageKey) ||
    getProductSectionImage(primaryText?.imageKey);

  return (
    <>
      {bulletItems.length > 0 && (
        <section className="bg-white py-10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 text-center sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
            {bulletItems.slice(0, 5).map((item, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <div key={`${item.text}-${index}`} className="space-y-3">
                  <Icon className="mx-auto size-6 stroke-[1.5]" />
                  <p className="mx-auto max-w-28 text-[10px] font-semibold uppercase leading-tight tracking-[0.18em]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2">
          <div className="flex min-h-[440px] flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
            <h2 className="mb-8 text-3xl font-semibold">
              {primaryText?.title ?? product.name}
            </h2>
            {primaryText?.content && (
              <p className="mb-10 max-w-md text-sm leading-6 text-gray-700">
                {primaryText.content}
              </p>
            )}
            {primaryBullets && (
              <>
                <h3 className="mb-4 text-2xl font-semibold">
                  {primaryBullets.title}
                </h3>
                <ul className="mb-10 max-w-md space-y-2">
                  {(primaryBullets.items ?? []).map((item) => (
                    <li
                      key={`${primaryBullets._id}-${item.text}`}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="mt-2 size-1 rounded-full bg-black" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {product.description && (
              <>
                <h3 className="mb-4 text-2xl font-semibold">Product Note</h3>
                <p className="max-w-md text-sm leading-6 text-gray-700">
                  {product.description}
                </p>
              </>
            )}
          </div>

          {firstImage ? (
            <div className="relative min-h-[440px]">
              <Image
                src={firstImage}
                alt={primaryText?.title ?? product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2">
          {secondImage ? (
            <div className="relative min-h-[440px]">
              <Image
                src={secondImage}
                alt={primaryBullets?.title ?? product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="flex min-h-[440px] flex-col justify-center bg-black px-8 py-12 text-white sm:px-12 lg:px-16">
            <h2 className="mb-8 text-3xl font-semibold">
              {primaryBullets?.title ?? "Details"}
            </h2>
            <div className="space-y-6">
              {(primaryBullets?.items ?? []).map((item, index) => {
                const Icon = [PackageCheck, Sparkles, Leaf, Droplets][
                  index % 4
                ];
                return (
                  <div key={`dark-${item.text}`} className="flex gap-4">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.text}</h3>
                      <p className="mt-1 text-xs leading-5 text-white/65">
                        {primaryText?.content ?? product.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
