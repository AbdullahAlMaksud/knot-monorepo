/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { toast } from "sonner";

type ProfileFormData = {
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
};

type ShippingFormData = {
  apartment?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
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
  const [submittingShippingAddress, setSubmittingShippingAddress] = useState(false);

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
    setValue: setValueShipping, 
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

  const onSubmitShipping = async (data: ShippingFormData) => {
    setSubmittingShippingAddress(true);

    const payload = {
      userId: session?.user?.id,
      address: {
        apartment: data.apartment,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      }
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shipping-address/update`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      //  *Handle API validation errors
      if (!res.ok) {
        const message =
          result?.data?.messageForUser ||
          result?.message ||
          "Failed to update shipping address.";
        throw new Error(message);
      }

      //  after success
      toast.success(result.message);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.message || "There was an error updating the shipping address."
      );
    } finally {
      setSubmittingShippingAddress(false);
    }
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
              {/* <ShippingAddressForm
                register={registerShipping}
                errors={errorsShipping}
                handleSubmit={handleSubmitShipping}
                onSubmit={onSubmitShipping}
                isSubmitting={submittingShippingAddress}
                userId={session.user.id}
              /> */}
              <ShippingAddressForm
                register={registerShipping}
                errors={errorsShipping}
                handleSubmit={handleSubmitShipping}
                setValue={setValueShipping}  
                onSubmit={onSubmitShipping}
                isSubmitting={submittingShippingAddress}
                userId={session.user.id}
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
