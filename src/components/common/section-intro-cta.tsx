import Link from "next/link";

type SectionIntroCtaProps = {
  title: string;
  description: string;
  strongText?: string;
  buttonLabel: string;
  buttonHref: string;
  containerClassName?: string;
};

export default function SectionIntroCta({
  title,
  description,
  strongText,
  buttonLabel,
  buttonHref,
  containerClassName,
}: SectionIntroCtaProps) {
  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 ${containerClassName ?? ""}`.trim()}
    >
      <h2 className="text-3xl font-semibold mb-6">{title}</h2>
      <p className="text-gray-600 max-w-4xl mx-auto mb-8">
        {description}
        {strongText ? (
          <strong className="block mt-2">{strongText}</strong>
        ) : null}
      </p>
      <Link
        href={buttonHref}
        className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
