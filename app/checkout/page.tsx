"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethodSection from "@/components/checkout/PaymentMethodSection";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/lib/cart/CartContext";
import { CheckoutFormData, DISCOUNT_AMOUNT, SHIPPING_FEE } from "@/lib/orders/types";
import { authClient } from "@/lib/auth-client";
import { OrderPayloadType, useCreateOrder } from "@/hooks/useOrders";

export default function CheckoutPage() {
  const { data: session } = authClient.useSession();
  const { id: userId } = session?.user || {};
  const { items: cartItems} = useCart();

  const {
    register,
    handleSubmit,
    setError, setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const finalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) - DISCOUNT_AMOUNT + SHIPPING_FEE;

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
    "payment.transactionId": "transactionId",
  };

  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder({
    onError: (error: Error & { field?: string }) => {
      const formField = fieldMap[error.field ?? ""];
      if (formField) {
        setError(formField, { type: "server", message: error.message });
      }
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    const payload: OrderPayloadType = {
      customerId: userId,
      shipping: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        apartment: data.apartment,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      },
      payment: {
        method: paymentMethod,
        transactionId: data.transactionId,
      },
      items: cartItems.map((i) => ({
        productId: i.id.toString(),
        name: i.name,
        image: i.image,
        unitPrice: i.price,
        quantity: i.quantity,
        subtotal: i.price * i.quantity,
      })),
      totalAmount: subtotal,
      discountAmount: DISCOUNT_AMOUNT,
      shippingFee: SHIPPING_FEE,
      finalAmount: finalAmount,
    };
    createOrder(payload);
  }
  
  return (
    <Layout>
      <section className="py-16 sm:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <ShippingForm register={register} errors={errors} setValue={setValue} />

                <PaymentMethodSection
                  register={register}
                  errors={errors}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              </form>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
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
