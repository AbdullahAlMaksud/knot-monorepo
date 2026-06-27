"use client";

import CurrencyAmount from "@/components/ui/currency-amount";
import { DELIVERY_OPTIONS, type DeliveryArea } from "@/lib/checkout/constants";
import { CurrencyIcon, HandCoins, PackageCheck } from "lucide-react";

type PaymentMethodSectionProps = {
  shippingFee: number;
  currencySymbol?: string;
  estimatedDelivery: string;
  deliveryLabel: string;
  selectedDistrict?: string;
};

export default function PaymentMethodSection({
  shippingFee,
  currencySymbol,
  estimatedDelivery,
  deliveryLabel,
  selectedDistrict,
}: PaymentMethodSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Payment & Delivery</h2>

      <div className="rounded-2xl border border-black bg-black px-5 py-4 text-white mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.18em] text-white/70 mb-2">
            Payment Method
          </p>
          <p className="text-lg font-semibold">Cash on Delivery</p>
          <p className="text-sm text-white/70 mt-1">
            Pay in cash when your order arrives.
          </p>
        </div>
        <PackageCheck color="white" size={40} className="font-extralight" />
      </div>

      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-gray-500 mb-3">
          Delivery Area
        </p>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">{deliveryLabel}</p>
              <p className="text-sm text-gray-500 mt-1">
                Estimated delivery: {estimatedDelivery}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                {selectedDistrict
                  ? `Automatically set from district: ${selectedDistrict}`
                  : "Select your district above to calculate the delivery area automatically."}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="font-semibold text-gray-900">
                <CurrencyAmount amount={shippingFee} currency={currencySymbol} />
              </p>
              <p className="text-xs text-gray-500 mt-1">Shipping</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
