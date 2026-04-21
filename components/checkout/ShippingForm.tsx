"use client";

import { authClient } from "@/lib/auth-client";
import {
  BANGLADESH_DISTRICTS,
  DEFAULT_COUNTRY,
} from "@/lib/checkout/constants";
import { CheckoutFormData } from "@/lib/orders/types";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";

const normalizePhoneForInput = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.startsWith("880") && digitsOnly.length >= 11) {
    return `0${digitsOnly.slice(3)}`.slice(0, 11);
  }

  if (digitsOnly.startsWith("0")) {
    return digitsOnly.slice(0, 11);
  }

  return digitsOnly.slice(0, 10);
};

const sanitizePhoneInput = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 11);

const RequiredLabel = ({
  htmlFor,
  children,
}: {
  htmlFor: keyof CheckoutFormData;
  children: string;
}) => {
  return (
    <label
      className="block text-sm font-medium text-gray-700 mb-2"
      htmlFor={htmlFor}
    >
      {children}
      <span className="text-red-600 ml-1">*</span>
    </label>
  );
};

type ShippingFormProps = {
  control: Control<CheckoutFormData>;
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
};

const ShippingForm = ({
  control,
  register,
  errors,
  setValue,
}: ShippingFormProps) => {
  const { data: session } = authClient.useSession();
  const { id: userId, name, email } = session?.user || {};
  const selectedDistrict = useWatch({
    control,
    name: "state",
  });

  useEffect(() => {
    if (name) setValue("name", name);
    if (email) setValue("email", email);
    setValue("country", DEFAULT_COUNTRY);
  }, [email, name, setValue]);

  useEffect(() => {
    if (!userId) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/shipping-address/by-user-id/${userId}`,
          { cache: "no-store" },
        );

        const result = await res.json();
        if (!res.ok) return;

        const data = result?.data;
        if (!data) return;

        // populate form values if available
        if (data.name) setValue("name", data.name);
        if (data.email) setValue("email", data.email);
        if (data.phone) setValue("phone", normalizePhoneForInput(data.phone));
        if (data.apartment) setValue("apartment", data.apartment);
        if (data.city) setValue("city", data.city);
        if (data.state) setValue("state", data.state);
        if (data.postalCode) setValue("postalCode", data.postalCode);
        if (data.extraNotes) setValue("extraNotes", data.extraNotes);
        setValue("country", DEFAULT_COUNTRY);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddress();
  }, [userId, setValue]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

      <div className="grid grid-cols-1 gap-4 mb-8">
        <div>
          <RequiredLabel htmlFor="name">Name:</RequiredLabel>
          <Input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
              onChange: (event) => {
                event.target.value = event.target.value.replace(/\s{2,}/g, " ");
              },
            })}
            className="w-full px-4 py-2 shadow-none border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            placeholder="Full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <RequiredLabel htmlFor="email">Email:</RequiredLabel>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 shadow-none border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <RequiredLabel htmlFor="phone">Phone:</RequiredLabel>
          <InputGroup>
            <InputGroupAddon align="inline-start" className="pr-4">
              +88
            </InputGroupAddon>
            <InputGroupInput
              id="phone"
              type="tel"
              aria-invalid={errors.phone ? true : undefined}
              {...register("phone", {
                required: "Phone is required",
                minLength: {
                  value: 11,
                  message: "Phone must be 11 digits",
                },
                maxLength: {
                  value: 11,
                  message: "Phone must be 11 digits",
                },
                pattern: {
                  value: /^01\d{9}$/,
                  message: "Use a valid 11 digit Bangladesh mobile number",
                },
                onChange: (event) => {
                  event.target.value = sanitizePhoneInput(event.target.value);
                },
              })}
              inputMode="numeric"
              maxLength={11}
              placeholder="01XXXXXXXXX"
            />
          </InputGroup>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-[0.14em]">
          Address
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <RequiredLabel htmlFor="state">District:</RequiredLabel>
          <Controller
            name="state"
            control={control}
            rules={{ required: "District is required" }}
            render={({ field }) => (
              <Combobox
                items={BANGLADESH_DISTRICTS}
                value={field.value || null}
                onValueChange={(value) => field.onChange(value ?? "")}
                itemToStringValue={(item) => item}
              >
                <ComboboxTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      aria-invalid={errors.state ? true : undefined}
                      className="w-full h-9 justify-between overflow-hidden shadow-none font-normal px-3"
                    >
                      <span className="truncate">
                        <ComboboxValue
                          placeholder={selectedDistrict || "Select district"}
                        />
                      </span>
                      <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                    </Button>
                  }
                />
                <ComboboxContent>
                  <ComboboxInput
                    showTrigger={false}
                    placeholder="Search district..."
                  />
                  <ComboboxEmpty>No district found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            )}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        <div>
          <RequiredLabel htmlFor="city">City/Area:</RequiredLabel>
          <Input
            id="city"
            type="text"
            {...register("city", { required: "City/Area is required" })}
            placeholder="City or area"
            className="shadow-none"
            aria-invalid={errors.city ? true : undefined}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <RequiredLabel htmlFor="postalCode">Postal Code:</RequiredLabel>
          <Input
            id="postalCode"
            type="text"
            {...register("postalCode", {
              required: "Postal code is required",
              minLength: {
                value: 3,
                message: "Postal code must be at least 3 characters",
              },
              onChange: (event) => {
                event.target.value = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 4);
              },
            })}
            inputMode="numeric"
            maxLength={4}
            className="shadow-none"
            placeholder="Postal code"
            aria-invalid={errors.postalCode ? true : undefined}
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.postalCode.message}
            </p>
          )}
        </div>

        <div>
          <RequiredLabel htmlFor="country">Country:</RequiredLabel>
          <Input
            className="shadow-none bg-gray-50 text-gray-600"
            id="country"
            type="text"
            {...register("country", { required: "Country is required" })}
            readOnly
            defaultValue={DEFAULT_COUNTRY}
            aria-invalid={errors.country ? true : undefined}
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="apartment"
        >
          Location:
        </label>
        <Input
          className="shadow-none"
          id="apartment"
          type="text"
          {...register("apartment")}
          placeholder="Flat/House, Road, Area..."
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor="extraNotes"
        >
          Extra Note (optional):
        </label>
        <Textarea
          id="extraNotes"
          {...register("extraNotes")}
          rows={4}
          className="resize-none shadow-none"
          placeholder="Any delivery instructions or landmarks..."
        />
      </div>
    </div>
  );
};

export default ShippingForm;
