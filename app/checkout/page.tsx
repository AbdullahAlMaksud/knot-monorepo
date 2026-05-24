"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import Layout from "@/components/Layout";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethodSection from "@/components/checkout/PaymentMethodSection";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/lib/cart/CartContext";
import { CheckoutFormData, DISCOUNT_AMOUNT } from "@/lib/orders/types";
import { useAuthSession } from "@/lib/auth-client";
import { useCreateOrder } from "@/services/orders/mutation";
import type { OrderPayloadType } from "@/services/orders/type";
import { getProductById } from "@/services/products/api";
import { getDefaultProductVariant } from "@/services/products/utils";
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
  return (
    <Suspense fallback={null}>
      <CheckoutPageContent />
    </Suspense>
  );
}

function CheckoutPageContent() {
  const { data: session } = useAuthSession();
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

  useEffect(() => {
    setValue("country", DEFAULT_COUNTRY);
  }, [setValue]);

  //  Backend field → frontend field mapping
  const fieldMap: Record<string, keyof CheckoutFormData> = {
    "shipment.name": "name",
    "shipment.email": "email",
    "shipment.phone": "phone",
    "shipment.apartment": "apartment",
    "shipment.city": "city",
    "shipment.district": "state",
    "shipment.postalCode": "postalCode",
    "shipment.country": "country",
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

  const resolveCheckoutItems = async () => {
    return Promise.all(
      checkoutItems.map(async (item) => {
        if (item.variantId) {
          return {
            variantId: item.variantId,
            quantity: item.quantity,
          };
        }

        const product = await getProductById(String(item.id));
        const defaultVariant = getDefaultProductVariant(product);

        return {
          variantId: defaultVariant?._id ?? "",
          quantity: item.quantity,
        };
      }),
    );
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (checkoutItems.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    let items: OrderPayloadType["items"] = [];
    try {
      items = await resolveCheckoutItems();
    } catch {
      setSubmitError("Unable to verify cart item variants. Please try again.");
      return;
    }

    const hasInvalidItem = items.some((item) => !item.variantId);

    if (hasInvalidItem) {
      setSubmitError("One or more cart items are missing a valid variant.");
      return;
    }

    setSubmitError(null);

    const payload: OrderPayloadType = {
      ...(userId ? { customerId: userId } : {}),
      items,
      shipment: {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: formatBangladeshPhone(data.phone),
        apartment: data.apartment?.trim() || undefined,
        city: data.city.trim(),
        district: data.state.trim().toUpperCase(),
        postalCode: data.postalCode.trim(),
        country: DEFAULT_COUNTRY,
      },
      payment: {
        method: "CASH",
      },
      note: data.extraNotes?.trim() || undefined,
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
