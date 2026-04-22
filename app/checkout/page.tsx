"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import Layout from "@/components/Layout";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethodSection from "@/components/checkout/PaymentMethodSection";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/lib/cart/CartContext";
import { CheckoutFormData, DISCOUNT_AMOUNT } from "@/lib/orders/types";
import { authClient } from "@/lib/auth-client";
import { OrderPayloadType, useCreateOrder } from "@/hooks/useOrders";
import {
  clearStoredBuyNowItem,
  getStoredBuyNowItem,
} from "@/lib/checkout/buy-now";
import {
  DEFAULT_COUNTRY,
  DELIVERY_OPTIONS,
  type DeliveryArea,
} from "@/lib/checkout/constants";

const formatBangladeshPhone = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.startsWith("880") && digitsOnly.length >= 13) {
    return `0${digitsOnly.slice(3)}`.slice(0, 11);
  }

  if (digitsOnly.startsWith("0")) {
    return digitsOnly.slice(0, 11);
  }

  return `0${digitsOnly}`.slice(0, 11);
};

export default function CheckoutPage() {
  const { data: session } = authClient.useSession();
  const { id: userId } = session?.user || {};
  const searchParams = useSearchParams();
  const { items: cartItems } = useCart();
  const [buyNowItem] = useState(() => getStoredBuyNowItem());
  const isBuyNowCheckout =
    searchParams.get("mode") === "buy-now" && !!buyNowItem;
  const checkoutItems = useMemo(
    () => (isBuyNowCheckout && buyNowItem ? [buyNowItem] : cartItems),
    [buyNowItem, cartItems, isBuyNowCheckout],
  );

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      country: DEFAULT_COUNTRY,
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const paymentMethod = "cash-on-delivery";
  const selectedDistrict = useWatch({
    control,
    name: "state",
  });
  const deliveryArea: DeliveryArea =
    selectedDistrict?.trim().toLowerCase() === "dhaka"
      ? "inside-dhaka"
      : "outside-dhaka";
  const shippingFee = DELIVERY_OPTIONS[deliveryArea].shippingFee;
  const estimatedDelivery = DELIVERY_OPTIONS[deliveryArea].estimatedDelivery;

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const finalAmount = subtotal - DISCOUNT_AMOUNT + shippingFee;

  useEffect(() => {
    setValue("country", DEFAULT_COUNTRY);
  }, [setValue]);

  //  Backend field → frontend field mapping
  const fieldMap: Record<string, keyof CheckoutFormData> = {
    "shipping.name": "name",
    "shipping.email": "email",
    "shipping.phone": "phone",
    "shipping.apartment": "apartment",
    "shipping.city": "city",
    "shipping.state": "state",
    "shipping.postalCode": "postalCode",
    "shipping.country": "country",
    "shipping.extraNotes": "extraNotes",
  };

  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder({
    clearCartOnSuccess: !isBuyNowCheckout,
    onSuccess: clearStoredBuyNowItem,
    onError: (error: Error & { field?: string }) => {
      const formField = fieldMap[error.field ?? ""];
      if (formField) {
        setError(formField, { type: "server", message: error.message });
      }
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (checkoutItems.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    setSubmitError(null);

    const payload: OrderPayloadType = {
      customerId: userId,
      shipping: {
        name: data.name,
        email: data.email,
        phone: formatBangladeshPhone(data.phone),
        apartment: data.apartment,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: DEFAULT_COUNTRY,
        extraNotes: data.extraNotes,
        deliveryArea,
        estimatedDelivery,
      },
      payment: {
        method: paymentMethod,
        transactionId: "N/A",
      },
      items: checkoutItems.map((i) => ({
        productId: i.id.toString(),
        name: i.name,
        image: i.image,
        unitPrice: i.price,
        quantity: i.quantity,
        subtotal: i.price * i.quantity,
      })),
      totalAmount: subtotal,
      discountAmount: DISCOUNT_AMOUNT,
      shippingFee,
      finalAmount: finalAmount,
    };
    createOrder(payload);
  };

  return (
    <Layout>
      <section className="py-16 sm:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <ShippingForm
                  control={control}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                />

                <PaymentMethodSection
                  deliveryArea={deliveryArea}
                  selectedDistrict={selectedDistrict}
                />
              </form>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={checkoutItems}
                discountAmount={DISCOUNT_AMOUNT}
                shippingFee={shippingFee}
                deliveryLabel={DELIVERY_OPTIONS[deliveryArea].label}
                estimatedDelivery={estimatedDelivery}
                canConfirmOrder={isValid}
                onConfirmOrder={handleSubmit(onSubmit)}
                submitting={isCreatingOrder}
                submitError={submitError}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
