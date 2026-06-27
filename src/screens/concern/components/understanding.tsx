import Image from "next/image";
import { Check } from "lucide-react";
import type { Concern } from "@/data/concerns";

interface UnderstandingProps {
  concern: Concern;
}

const Understanding = ({ concern }: UnderstandingProps) => {
  const symptoms = concern.symptoms;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-600 mb-4">
              UNDERSTANDING THE ISSUE
            </p>
            <h2 className="text-3xl font-semibold mb-6">
              {concern.understandingTitle}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-12">
              {concern.understandingDescription}
            </p>

            <div className="mb-4">
              <h3 className="text-sm font-semibold tracking-widest uppercase mb-6">
                COMMON SYMPTOMS
              </h3>
              <div className="space-y-4">
                {symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden">
            <Image
              src={concern.understandingImage}
              alt={`Understanding ${concern.title}`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Understanding;
