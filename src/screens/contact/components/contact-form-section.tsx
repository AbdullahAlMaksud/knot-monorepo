"use client";

import { useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { useSubmitContact } from "@/screens/contact/services/mutation";
import { useAuthUser } from "@/hooks/use-auth-user";

type FormData = {
  name: string;
  email: string;
  countryIso2: string;
  phone: string;
  message: string;
};

const ContactFormSection = () => {
  const { mutate: sendContact, isPending } = useSubmitContact();
  const { email: userEmail } = useAuthUser();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      countryIso2: "BD",
      phone: "",
      email: userEmail ?? "",
    },
    mode: "onChange",
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
    if (userEmail) {
      setValue("email", userEmail);
    }
  }, [userEmail, setValue]);

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

  const onSubmit = (data: FormData) => {
    const selectedCountry = getCountryPhoneOption(data.countryIso2);
    let formattedPhone = data.phone.trim();
    if (data.countryIso2 === "BD") {
      const digitsOnly = formattedPhone.replace(/\D/g, "");
      if (digitsOnly.startsWith("880") && digitsOnly.length >= 13) {
        formattedPhone = `0${digitsOnly.slice(3)}`.slice(0, 11);
      } else if (digitsOnly.startsWith("0")) {
        formattedPhone = digitsOnly.slice(0, 11);
      } else {
        formattedPhone = `0${digitsOnly}`.slice(0, 11);
      }
    } else {
      formattedPhone = `${selectedCountry.dialCode}${formattedPhone}`;
    }

    sendContact({
      name: data.name.trim(),
      email: (userEmail || data.email).trim(),
      phone: formattedPhone,
      message: data.message.trim(),
    }, {
      onSuccess: () => {
        reset({
          countryIso2: "BD",
          phone: "",
          email: userEmail ?? "",
        });
      }
    });
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
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  disabled={isPending}
                  {...register("name", {
                    required: "Name is required",
                    validate: (value) =>
                      value.trim().length >= 2 ||
                      "Name must be at least 2 characters",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  disabled={isPending || !!userEmail}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  Contact Number <span className="text-red-500">*</span>
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
                                disabled={isPending}
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
                          disabled={isPending}
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
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  How can we help <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  disabled={isPending}
                  {...register("message", {
                    required: "Message is required",
                    validate: (value) =>
                      value.trim().length >= 10 ||
                      "Message must be at least 10 characters",
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                disabled={isPending}
                className="w-full sm:w-auto bg-black text-white px-8 py-6 rounded-full hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isPending ? "Sending..." : "Let Us Know"}
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
    </section>
  );
};
export default ContactFormSection;
