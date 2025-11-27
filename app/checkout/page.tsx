"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethodSection from "@/components/checkout/PaymentMethodSection";
import OrderSummary from "@/components/checkout/OrderSummary";

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

const cartItems = [
  {
    id: 1,
    name: "Hydrating Essence",
    quantity: 1,
    price: 48,
    image: "/images/product-1.jpg",
  },
  {
    id: 2,
    name: "Nourishing Cream",
    quantity: 1,
    price: 48,
    image: "/images/product-2.jpg",
  },
];

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");

  const onSubmit = (data: CheckoutFormData) => {
    console.log({ ...data, paymentMethod, cartItems });
    alert("Order placed successfully!");
  };

  return (
    <Layout>
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-light mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <ShippingForm register={register} errors={errors} />
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
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
