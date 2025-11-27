"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  transactionId: string;
};

type PaymentMethodSectionProps = {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
};

export default function PaymentMethodSection({
  register,
  errors,
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

      <div className="space-y-3">
        <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="flex items-center">
            <input
              type="radio"
              value="bank-transfer"
              checked={paymentMethod === "bank-transfer"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <span className="font-medium">Bank Transfer</span>
          </div>
        </label>

        <label className="flex items-center justify-between p-4 border-2 border-pink-500 bg-pink-50 rounded-lg cursor-pointer">
          <div className="flex items-center">
            <input
              type="radio"
              value="bkash"
              checked={paymentMethod === "bkash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <span className="font-medium text-pink-600">Bkash</span>
          </div>
        </label>

        <label className="flex items-center justify-between p-4 border-2 border-orange-500 bg-orange-50 rounded-lg cursor-pointer">
          <div className="flex items-center">
            <input
              type="radio"
              value="nagad"
              checked={paymentMethod === "nagad"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <span className="font-medium text-orange-600">Nagad</span>
          </div>
        </label>
      </div>

      {paymentMethod === "bank-transfer" && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Account Name:</span>
            <span className="font-medium">Name</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Country:</span>
            <span className="font-medium">Bangladesh</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Merchant Number:</span>
            <span className="font-medium">00000000000</span>
          </div>
        </div>
      )}

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transaction ID
        </label>
        <input
          type="text"
          {...register("transactionId", {
            required: "Transaction ID is required",
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
          placeholder="Enter transaction ID"
        />
        {errors.transactionId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.transactionId.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-medium"
      >
        Confirm
      </button>
    </div>
  );
}
