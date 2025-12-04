"use client";

import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

type ShippingFormData = {
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type ShippingAddressFormProps = {
  register: UseFormRegister<ShippingFormData>;
  errors: FieldErrors<ShippingFormData>;
  handleSubmit: UseFormHandleSubmit<ShippingFormData>;
  onSubmit: (data: ShippingFormData) => void;
};

export default function ShippingAddressForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
}: ShippingAddressFormProps) {
  return (
    <div className="bg-white">
      <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apartment, suite, etc. (optional)
          </label>
          <input
            type="text"
            {...register("apartment")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              {...register("city", {
                required: "City is required",
              })}
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
              {...register("state", {
                required: "State is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white"
            >
              <option value="">Select</option>
              <option value="dhaka">Dhaka</option>
              <option value="ny">New York</option>
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">
                {errors.state.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              {...register("postalCode", {
                required: "Postal code is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
            {errors.postalCode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            {...register("country", {
              required: "Country is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white"
          >
            <option value="">Country</option>
            <option value="bangladesh">Bangladesh</option>
            <option value="usa">United States</option>
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-medium"
        >
          Update Shipping Address
        </button>
      </form>
    </div>
  );
}
