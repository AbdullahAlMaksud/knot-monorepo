import { Star } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: "I have been using Glow Can honestly say it is one of the best skincare products I have ever used! My skin is glowing! Hydrated but not greasy at all.",
      name: "Steph Durant",
      image1: "/images/products/product1.jpg",
      image2: "/images/products/product2.jpg",
    },
    {
      id: 2,
      text: "Amazing results! My skin feels so smooth and radiant. I've noticed a significant improvement in my skin tone and texture within just a few weeks.",
      name: "Sarah Johnson",
      image1: "/images/products/product3.jpg",
      image2: "/images/products/product4.jpg",
    },
    {
      id: 3,
      text: "Best skincare purchase ever! The formula is gentle yet effective. Perfect for sensitive skin and delivers visible results without irritation.",
      name: "Maria Garcia",
      image1: "/images/products/product1.jpg",
      image2: "/images/products/product3.jpg",
    },
    {
      id: 4,
      text: "I'm obsessed with this product! My skin has never looked better. The glow is real and I've received so many compliments on my skin.",
      name: "Emily Chen",
      image1: "/images/products/product2.jpg",
      image2: "/images/products/product4.jpg",
    },
    {
      id: 5,
      text: "Absolutely love it! Worth every penny. My skin feels nourished and looks healthier than ever. Highly recommend to anyone.",
      name: "Lisa Anderson",
      image1: "/images/products/product3.jpg",
      image2: "/images/products/product1.jpg",
    },
    {
      id: 6,
      text: "Game changer for my skincare routine! The results are incredible and consistent. My skin has transformed completely.",
      name: "Jessica Lee",
      image1: "/images/products/product4.jpg",
      image2: "/images/products/product2.jpg",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="relative flex flex-col lg:flex-row h-[600px]">
        {/* Left Side - Fixed Header with Black Background */}
        <div className="w-full lg:w-[40%] bg-black flex items-center lg:sticky lg:top-0 h-full z-10">
          <div className="py-12 pl-36">
            <div>
              <p className="text-gray-400 text-xs tracking-[0.2em] uppercase mb-4">
                TESTIMONIALS
              </p>
              <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">
                What our customers
                <br />
                have experienced
              </h2>
            </div>
          </div>
        </div>

        {/* Right Side - White Background with Scrollable Testimonials */}
        <div className="w-full lg:w-[60%] bg-white relative lg:absolute lg:right-0 lg:top-0 h-full">
          <div
            className="overflow-x-scroll scrollbar-hide h-full"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex gap-6 py-12 px-4 sm:px-6 lg:px-8 min-w-max items-center h-full">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white text-black p-8 rounded-3xl w-[340px] shrink-0 flex flex-col border border-gray-100 shadow-sm"
                >
                  <p className="text-base mb-6 leading-relaxed grow">
                    {testimonial.text}
                  </p>
                  <div className="flex gap-3 mb-6">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                      <Image
                        src={testimonial.image1}
                        alt="Product"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                      <Image
                        src={testimonial.image2}
                        alt="Product"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={18} fill="black" stroke="black" />
                    ))}
                  </div>
                  <p className="font-semibold text-base">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
