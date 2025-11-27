import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: "I have been using Glow Can honestly say it is one of the best skincare products I have ever used! My skin is glowing! Hydrated but not...",
      name: "Steph Durant",
    },
    {
      id: 2,
      text: "I have been using Glow Can honestly say it is one of the best skincare products I have ever used! My skin is glowing! Hydrated but not...",
      name: "Steph Durant",
    },
    {
      id: 3,
      text: "I have been using Glow Can honestly say it is one of the best skincare products I have ever used! My skin is glowing! Hydrated but not...",
      name: "Steph Durant",
    },
    {
      id: 4,
      text: "I have been using Glow Can honestly say it is one of the best skincare products I have ever used! My skin is glowing! Hydrated but not...",
      name: "Steph Durant",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-gray-400 text-sm mb-2">TESTIMONIALS</p>
          <h2 className="text-3xl sm:text-4xl font-light">
            What our customers
            <br />
            have experienced
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white text-black p-6 rounded-lg"
            >
              <p className="text-sm mb-4">{testimonial.text}</p>
              <div className="flex gap-2 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded" />
                <div className="w-12 h-12 bg-gray-200 rounded" />
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="black" />
                ))}
              </div>
              <p className="font-semibold text-sm">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
