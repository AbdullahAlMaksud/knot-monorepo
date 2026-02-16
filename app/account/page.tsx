"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import AccountTabs from "@/components/account/AccountTabs";
import UserInfoForm from "@/components/account/UserInfoForm";
import ShippingAddressForm from "@/components/account/ShippingAddressForm";
import PasswordChangeForm from "@/components/account/PasswordChangeForm";
import OrderHistorySection from "@/components/account/OrderHistorySection";
import { authClient } from "@/lib/auth-client";

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
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    defaultValues: { fullName: "", lastName: "", email: "", phone: "" },
  });

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

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      router.replace("/auth/signin");
      return;
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (!session?.user) return;
    const name = session.user.name ?? "";
    const nameParts = name.trim().split(/\s+/);
    const fullName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") ?? "";
    resetProfile({
      fullName,
      lastName,
      email: session.user.email ?? "",
      phone: "",
    });
  }, [session?.user, resetProfile]);

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

  if (isPending || !session?.user) {
    return (
      <Layout>
        <div className="py-44">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-600">Loading…</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-44">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold mb-8">My Account</h1>

          <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "profile" && (
            <div className="space-y-8">
              <UserInfoForm
                register={registerProfile}
                errors={errorsProfile}
                handleSubmit={handleSubmitProfile}
                onSubmit={onSubmitProfile}
                userImage={session.user.image ?? undefined}
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
      </div>
    </Layout>
  );
}
