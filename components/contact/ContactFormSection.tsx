"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactFormSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Thank you for your message! We will get back to you soon.");
    reset();
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4">
              Get in Touch
            </h1>
            <p className="text-gray-600 mb-8">
              Have a question or need assistance? Fill out the form below and
              our team will get back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  How can we help
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register("message", {
                    required: "Message is required",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell us about your inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
              >
                Let Us Know
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-full rounded-lg overflow-hidden">
            <Image
              src="/images/contact/contact1.jpg"
              alt="Get in Touch"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
