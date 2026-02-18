"use client";

import { authClient } from "@/lib/auth-client";
import { CheckoutFormData } from "@/lib/orders/types";
import { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

type ShippingFormProps = {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
};

export default function ShippingForm({
  register,
  errors,
  setValue,
}: ShippingFormProps) {
  const { data: session } = authClient.useSession();
  const { id: userId, name, email } = session?.user || {};

  console.log({session})

  type fullAddress = {
    name: string;
    email: string;
    phone: string;
    apartment?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }

  const [address, setAddress] = useState<fullAddress | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/shipping-address/by-user-id/${userId}`,
          { cache: "no-store" }
        );

        const result = await res.json();
        if (!res.ok) return;

        const data = result?.data;
        if (!data) return;

        setAddress(data);

        // populate form values if available
        if (data.phone) setValue("phone", data.phone);
        if (data.apartment) setValue("apartment", data.apartment);
        if (data.city) setValue("city", data.city);
        if (data.state) setValue("state", data.state);
        if (data.postalCode) setValue("postalCode", data.postalCode);
        if (data.country) setValue("country", data.country);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddress();
  }, [userId, setValue]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            defaultValue={name}
            readOnly={!!name}
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            defaultValue={email}
            readOnly={!!email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <div className="flex">
            <select
              className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              disabled={!!address?.phone}
            >
              <option>+008</option>
              <option>+1</option>
              <option>+44</option>
              <option>+880</option>
            </select>
            <input
              type="tel"
              readOnly={!!address?.phone}
              {...register("phone", { required: "Phone is required" })}
              className="grow px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Apartment, suite, etc.
        </label>
        <input
          type="text"
          {...register("apartment")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            {...register("city", { required: "City is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State/Province
          </label>
          <select
            {...register("state", { required: "State is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white"
          >
            <option value="">Select</option>
            <option value="dhaka">Dhaka</option>
            <option value="ny">New York</option>
            <option value="ca">California</option>
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            {...register("postalCode", { required: "Postal code is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country
        </label>
        <select
          {...register("country", { required: "Country is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white"
        >
          <option value="">Country</option>
          <option value="bangladesh">Bangladesh</option>
          <option value="usa">United States</option>
          <option value="uk">United Kingdom</option>
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
        )}
      </div>
    </div>
  );
}
