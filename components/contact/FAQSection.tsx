"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Figma ipsum component variant main layer?",
    answer:
      "Figma ipsum component variant main layer. Linc ellipse object list undo rectangle. Duplicate bold editor distribute overflow. Arrow italic ipsum device lorem ipsum elit line thumbnail. Vector auto prototype create create bullets link porttitor non. Edit porttitor ipsum figjam selection invite line. Auto italic list ipsum undo ipsum. arrange. Ipsum layer device bold invite outline polygon rotate library. Arrange boolean outline elit align ipsum invite. Image draft plu erat ullamcorper elit. Ipsum porttitor a ipsum sed. Commodo talis port hand lad- horizontal.",
  },
  {
    question: "Figma ipsum component variant main layer?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Detailed answer content goes here.",
  },
  {
    question: "Figma ipsum component variant main layer?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Detailed answer content goes here.",
  },
  {
    question: "Figma ipsum component variant main layer?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Detailed answer content goes here.",
  },
  {
    question: "Figma ipsum component variant main layer?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Detailed answer content goes here.",
  },
  {
    question: "Figma ipsum component variant main layer?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Detailed answer content goes here.",
  },
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-full rounded-lg overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/contact/contact2.jpg"
              alt="FAQ"
              fill
              className="object-cover"
            />
          </div>

          {/* FAQ List */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-light mb-8">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-8">
              Find answers to our most commonly asked questions. If you
              can&apos;t find what you&apos;re looking for, please contact us.
            </p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between text-left py-2 hover:text-gray-600 transition"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp size={20} className="shrink-0 ml-2" />
                    ) : (
                      <ChevronDown size={20} className="shrink-0 ml-2" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
