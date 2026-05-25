"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import Image from "next/image";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import {
  countryPhoneOptions,
  getCountryPhoneOption,
} from "@/lib/country-phone-options";
import { Button } from "../ui/button";

type FormData = {
  name: string;
  email: string;
  countryIso2: string;
  phone: string;
  message: string;
};

export default function ContactFormSection() {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      countryIso2: "BD",
      phone: "",
    },
  });

  const selectedCountryIso2 = useWatch({
    control,
    name: "countryIso2",
  });
  const currentPhone = useWatch({
    control,
    name: "phone",
  });
  const selectedCountry = getCountryPhoneOption(selectedCountryIso2);

  useEffect(() => {
    if (
      currentPhone &&
      currentPhone.length > selectedCountry.maxNationalNumberLength
    ) {
      setValue(
        "phone",
        currentPhone.slice(0, selectedCountry.maxNationalNumberLength),
        { shouldValidate: true },
      );
    }
  }, [currentPhone, selectedCountry.maxNationalNumberLength, setValue]);

  const onSubmit = () => {
    setIsComingSoonOpen(true);
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
                  {...register("name", {
                    required: "Name is required",
                    validate: (value) =>
                      value.trim().length >= 2 ||
                      "Name must be at least 2 characters",
                  })}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-[180px_minmax(0,1fr)] gap-3">
                  <div>
                    <Controller
                      name="countryIso2"
                      control={control}
                      rules={{
                        required: "Country code is required",
                      }}
                      render={({ field }) => (
                        <Combobox
                          items={countryPhoneOptions}
                          value={getCountryPhoneOption(field.value)}
                          onValueChange={(value) =>
                            field.onChange(value?.iso2 ?? "")
                          }
                          itemToStringValue={(item) => item.label}
                        >
                          <ComboboxTrigger
                            render={
                              <Button
                                type="button"
                                variant="outline"
                                aria-invalid={
                                  errors.countryIso2 ? true : undefined
                                }
                                className="w-full h-12 justify-between overflow-hidden font-normal rounded-lg border-gray-300 px-4"
                              >
                                <ComboboxValue placeholder="Select code" />
                              </Button>
                            }
                          />
                          <ComboboxContent>
                            <ComboboxInput
                              showTrigger={false}
                              placeholder="Search country..."
                            />
                            <ComboboxEmpty>No country found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item.iso2} value={item}>
                                  <div className="flex w-full min-w-0 items-center justify-between gap-3">
                                    <span className="truncate">
                                      {item.name}
                                    </span>
                                    <span className="shrink-0 text-xs text-gray-500">
                                      {item.dialCode}
                                    </span>
                                  </div>
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      )}
                    />
                    {errors.countryIso2 && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.countryIso2.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: "Contact number is required",
                        validate: {
                          digitsOnly: (value) =>
                            /^\d+$/.test(value) || "Only numbers are allowed",
                          minLength: (value) =>
                            value.length >= 7 ||
                            "Contact number must be at least 7 digits",
                          maxLength: (value) =>
                            value.length <=
                              selectedCountry.maxNationalNumberLength ||
                            `Contact number can be at most ${selectedCountry.maxNationalNumberLength} digits`,
                        },
                      }}
                      render={({ field }) => (
                        <input
                          type="tel"
                          id="phone"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          maxLength={selectedCountry.maxNationalNumberLength}
                          pattern="[0-9]*"
                          value={field.value}
                          onChange={(event) => {
                            const digitsOnly = event.target.value
                              .replace(/\D/g, "")
                              .slice(
                                0,
                                selectedCountry.maxNationalNumberLength,
                              );

                            field.onChange(digitsOnly);
                          }}
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                          placeholder={`Up to ${selectedCountry.maxNationalNumberLength} digits`}
                          aria-invalid={errors.phone ? true : undefined}
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
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
                    validate: (value) =>
                      value.trim().length >= 10 ||
                      "Message must be at least 10 characters",
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

              <Button
                type="submit"
                className="w-full sm:w-auto bg-black text-white px-8 py-6 rounded-full hover:bg-gray-800 transition"
              >
                Let Us Know
              </Button>
            </form>
          </div>

          {/* Image */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-full rounded-lg overflow-hidden">
            <Image
              src="/images/contact/contact1.jpg"
              alt="Get in Touch"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      {isComingSoonOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-coming-soon-title"
          onClick={() => setIsComingSoonOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="contact-coming-soon-title"
              className="text-2xl font-semibold"
            >
              This feature will be available soon!
            </h2>
            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                onClick={() => setIsComingSoonOpen(false)}
                className="rounded-full px-6"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
