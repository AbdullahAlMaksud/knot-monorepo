/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import AccountTabs, { type AccountTab } from "@/components/account/AccountTabs";
import UserInfoForm from "@/components/account/UserInfoForm";
import ShippingAddressForm from "@/components/account/ShippingAddressForm";
import PasswordChangeForm from "@/components/account/PasswordChangeForm";
import OrderHistorySection from "@/components/account/OrderHistorySection";
import CountryPreferenceSection from "@/components/account/CountryPreferenceSection";
import { authClient, useAuthSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useUpdateShippingAddress } from "@/services/shipping-address/mutation";
import type { ShippingAddress } from "@/services/shipping-address/type";

type ProfileFormData = {
  fullName: string;
  lastName: string;
  email: string;
  phone: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function MyAccountPage() {
  const router = useRouter();
  const { data: session, isPending } = useAuthSession();
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    defaultValues: { fullName: "", lastName: "", email: "", phone: "" },
    mode: "onChange",
  });

  const {
    register: registerShipping,
    handleSubmit: handleSubmitShipping,
    formState: { errors: errorsShipping },
    setValue: setValueShipping,
  } = useForm<ShippingAddress>({
    mode: "onChange",
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    reset: resetPassword,
    formState: { errors: errorsPassword },
  } = useForm<PasswordFormData>({
    mode: "onChange",
  });

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
    resetProfile({
      fullName: nameParts[0] ?? "",
      lastName: nameParts.slice(1).join(" ") ?? "",
      email: session.user.email ?? "",
      phone: (session.user as any).phone ?? "",
    });
  }, [session?.user, resetProfile]);

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      await authClient.updateUser({
        name: `${data.fullName} ${data.lastName}`.trim(),
        // @ts-expect-error — additionalFields
        phone: data.phone,
      });
      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update profile.");
    }
  };

  const { mutate: updateShipping, isPending: isShippingUpdating } =
    useUpdateShippingAddress();

  const onSubmitShipping = (data: ShippingAddress) => {
    updateShipping({
      userId: session!.user.id,
      address: data,
    });
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    const { error } = await authClient.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
    });

    if (error) {
      toast.error(error.message ?? "Failed to change password");
      return;
    }
    toast.success("Password changed successfully!");
    resetPassword();
  };

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
                userImage={session?.user?.image ?? undefined}
              />
              <ShippingAddressForm
                register={registerShipping}
                errors={errorsShipping}
                handleSubmit={handleSubmitShipping}
                setValue={setValueShipping}
                onSubmit={onSubmitShipping}
                isSubmitting={isShippingUpdating}
                userId={session?.user?.id ?? ""}
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

          {activeTab === "preference" && <CountryPreferenceSection />}
        </div>
      </div>
    </Layout>
  );
}
