"use client";

import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

type ShippingFormData = {
  apartment?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};


type ShippingAddressFormProps = {
  register: UseFormRegister<ShippingFormData>;
  errors: FieldErrors<ShippingFormData>;
  handleSubmit: UseFormHandleSubmit<ShippingFormData>;
  setValue: UseFormSetValue<ShippingFormData>;
  onSubmit: (data: ShippingFormData) => void;
  isSubmitting: boolean;
  userId: string;
};

export default function ShippingAddressForm({
  register,
  errors,
  handleSubmit,
  setValue,
  onSubmit,
  isSubmitting,
  userId,
}: ShippingAddressFormProps) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const getShippingAddressByUserId = async () => {
      try {
        const res = await fetch(
          `/api/v1/shipping-address/by-user-id/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            cache: "no-store",
          },
        );

        const result = await res.json();

        if (!res.ok) return;

        const data = result?.data;
        if (!data) return;

        // populate only if exists
        if (data.apartment) setValue("apartment", data.apartment);
        if (data.city) setValue("city", data.city);
        if (data.state) {
          setValue("state", data.state);
          setSelectedState(data.state);
        }
        if (data.postalCode) setValue("postalCode", data.postalCode);
        if (data.country) {
          setValue("country", data.country);
          setSelectedCountry(data.country);
        }
      } catch (error) {
        console.error("Shipping fetch error:", error);
      }
    };

    if (userId) getShippingAddressByUserId();
  }, [userId, setValue]);

  return (
    <div className="bg-white">
      <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Apartment, suite, etc.
          </label>
          <input
            type="text"
            {...register("apartment")}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              {...register("city")}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.city && (
              <p className="text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              State/Province
            </label>
            <input type="hidden" {...register("state")} />
            <Select
              value={selectedState}
              onValueChange={(value) => {
                setSelectedState(value);
                setValue("state", value, { shouldDirty: true });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="dhaka">Dhaka</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Postal Code
            </label>
            <input
              type="text"
              {...register("postalCode")}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <input type="hidden" {...register("country")} />
          <Select
            value={selectedCountry}
            onValueChange={(value) => {
              setSelectedCountry(value);
              setValue("country", value, { shouldDirty: true });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="bangladesh">Bangladesh</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={isSubmitting} className="rounded-full">
          {isSubmitting ? "Updating..." : "Update Shipping Address"}
        </Button>
      </form>
    </div>
  );
}
