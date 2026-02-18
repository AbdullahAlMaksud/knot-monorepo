/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethodSection from "@/components/checkout/PaymentMethodSection";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCart } from "@/lib/cart/CartContext";
import { toast } from "sonner";
import { CheckoutFormData, DISCOUNT_AMOUNT, SHIPPING_FEE } from "@/lib/orders/types";
import { authClient } from "@/lib/auth-client";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { id: userId } = session?.user || {};
  const { items: cartItems, clearCart } = useCart();

  const {
    register,
    handleSubmit,
    setError, setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [submitting, setSubmitting] = useState(false);
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

  const onSubmit = async (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    setSubmitError(null);
    setSubmitting(true);

    const payload = {
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

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      //  Handle API validation errors
      if (!res.ok) {
        const message =
          result?.data?.messageForUser ||
          result?.message ||
          "Order failed";

        const backendField = result?.data?.field;
        const formField = fieldMap[backendField];

        //  Set React Hook Form error if field exists
        if (formField) {
          setError(formField, {
            type: "server",
            message,
          });
        }

        throw new Error(message);
      }

      //  after success
      clearCart();
      toast.success(result.message);
      router.push("/checkout/success");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.message || "There was an issue processing your order."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
                  register={register as UseFormRegister<any>}
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
                submitting={submitting}
                submitError={submitError}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
