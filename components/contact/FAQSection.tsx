"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is B'You?",
    answer:
      "B'You is a science-backed skincare brand formulated specifically for Bangladeshi skin and climate. Our products are dermatologist certified and developed with expert guidance to deliver safe, effective, and relevant results.",
  },
  {
    question: "Where can I purchase B'You products?",
    answer:
      "B'You products are available through our official website, Facebook page, Instagram and selected authorized retail partners. Please check our website for updated availability.",
  },
  {
    question: "How can I contact the B'You team?",
    answer:
      "You can reach us through our website contact form, official email, or social media platforms. Our team is happy to assist you with knowledge, product information or order-related queries.",
  },
  {
    question: "How long will my order take to arrive?",
    answer:
      "Delivery timelines may vary depending on your location, but most orders are delivered within 2-3 working days after confirmation.",
  },
  {
    question: "How much does shipping cost?",
    answer:
      "Shipping charges depend on your delivery location and any ongoing promotional offers. Final shipping costs are shown at checkout.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns for products that arrive damaged or incorrect. Please contact our support team within the specified return period for assistance.",
  },
  {
    question: "How long does it take to see visible results?",
    answer:
      "Results vary depending on skin type and concern, but consistent daily use typically shows noticeable improvement within 2-4 weeks.",
  },
  {
    question: "How should I store my products?",
    answer:
      "Store your products in a cool, dry place away from direct sunlight to maintain stability and effectiveness.",
  },
  {
    question: "How do I conduct an at-home patch test?",
    answer:
      "Apply a small amount of product to the inside of your wrist or behind your ear and leave it for 24 hours. If no irritation occurs, the product is generally safe for use.",
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
                  <Button
                    variant="ghost"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full flex items-center justify-between text-left py-2 hover:text-gray-600"
                  >
                    <span className="font-medium">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp size={20} className="shrink-0 ml-2" />
                    ) : (
                      <ChevronDown size={20} className="shrink-0 ml-2" />
                    )}
                  </Button>
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
