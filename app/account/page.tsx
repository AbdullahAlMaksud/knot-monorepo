"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import AccountTabs from "@/components/account/AccountTabs";
import UserInfoForm from "@/components/account/UserInfoForm";
import ShippingAddressForm from "@/components/account/ShippingAddressForm";
import PasswordChangeForm from "@/components/account/PasswordChangeForm";
import OrderHistorySection from "@/components/account/OrderHistorySection";

type ProfileFormData = {
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
};

type ShippingFormData = {
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
  } = useForm<ProfileFormData>();

  const {
    register: registerShipping,
    handleSubmit: handleSubmitShipping,
    formState: { errors: errorsShipping },
  } = useForm<ShippingFormData>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    formState: { errors: errorsPassword },
  } = useForm<PasswordFormData>();

  const onSubmitProfile = (data: ProfileFormData) => {
    console.log("Profile:", data);
    alert("Profile updated successfully!");
  };

  const onSubmitShipping = (data: ShippingFormData) => {
    console.log("Shipping:", data);
    alert("Shipping address updated successfully!");
  };

  const onSubmitPassword = (data: PasswordFormData) => {
    console.log("Password:", data);
    alert("Password changed successfully!");
  };

  return (
    <Layout>
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-light mb-8">My Account</h1>

          <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "profile" && (
            <div className="space-y-8">
              <UserInfoForm
                register={registerProfile}
                errors={errorsProfile}
                handleSubmit={handleSubmitProfile}
                onSubmit={onSubmitProfile}
              />
              <ShippingAddressForm
                register={registerShipping}
                errors={errorsShipping}
                handleSubmit={handleSubmitShipping}
                onSubmit={onSubmitShipping}
              />
              <PasswordChangeForm
                register={registerPassword}
                errors={errorsPassword}
                watch={watch}
                handleSubmit={handleSubmitPassword}
                onSubmit={onSubmitPassword}
              />
            </div>
          )}

          {activeTab === "orders" && <OrderHistorySection />}
        </div>
      </section>
    </Layout>
  );
}
