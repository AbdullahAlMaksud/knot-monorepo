"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import OAuthSignInOptions from "@/components/auth/OAuthSignInOptions";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import {
  countryPhoneOptions,
  getCountryPhoneOption,
} from "@/lib/country-phone-options";
import {
  sendEmailOtp,
  verifyEmailOtp,
  socialSignIn,
  updateUser,
} from "@/services/auth/auth";
import { useAuthSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type SignInFormData = {
  email: string;
  countryIso2: string;
  phone: string;
  otp: string;
  name: string;
};

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { refetch: refetchSession } = useAuthSession();
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      countryIso2: "BD",
      phone: "",
      email: "",
      otp: "",
      name: "",
    },
  });

  const selectedCountryIso2 = useWatch({
    control,
    name: "countryIso2",
  });
  const currentPhone = useWatch({
    control,
    name: "phone",
  });
  const currentEmail = useWatch({
    control,
    name: "email",
  });
  const selectedCountry = getCountryPhoneOption(selectedCountryIso2);

  // Phone input character constraint
  useEffect(() => {
    if (
      currentPhone &&
      currentPhone.length > selectedCountry.maxNationalNumberLength
    ) {
      setValue(
        "phone",
        currentPhone.slice(0, selectedCountry.maxNationalNumberLength),
        { shouldValidate: true },
      );
    }
  }, [currentPhone, selectedCountry.maxNationalNumberLength, setValue]);

  // Resend code countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(
        () => setResendTimer((prev) => prev - 1),
        1000,
      );
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  const handleSendOtp = async (data: SignInFormData) => {
    setIsPending(true);
    try {
      if (activeTab === "email") {
        const res = await sendEmailOtp(data.email, "sign-in");
        if (res.success) {
          toast.success(res.message || "Verification code sent to your email.");
          setOtpSent(true);
          setResendTimer(30);
        } else {
          toast.error(res.message || "Failed to send verification code.");
        }
      } else {
        // Phone mock send OTP
        await new Promise((resolve) => setTimeout(resolve, 800));
        toast.success(
          `Verification code sent to ${selectedCountry.dialCode} ${data.phone}. (Demo OTP: 123456)`,
        );
        setOtpSent(true);
        setResendTimer(30);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.";
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  const handleVerifyOtp = async (data: SignInFormData) => {
    setIsPending(true);
    try {
      if (activeTab === "email") {
        const nameFromEmail =
          data.email
            .split("@")[0]
            .replace(/[^a-zA-Z]/g, " ")
            .trim() || "Customer";
        const formattedName = nameFromEmail
          .split(/\s+/)
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ");
        const res = await verifyEmailOtp(data.email, data.otp, formattedName);
        if (res.token || res.user || res.success) {
          const userObj = res.user || res.data?.user;
          const hasName =
            userObj?.name &&
            userObj.name !== "Customer" &&
            userObj.name.trim().length > 0;
          if (hasName) {
            await refetchSession();
            toast.success("Signed in successfully!");
            router.push(callbackUrl);
            router.refresh();
          } else {
            await refetchSession();
            toast.success("Verification successful!");
            setOtpVerified(true);
          }
        } else {
          toast.error(res.message || "Invalid verification code.");
        }
      } else {
        // Phone mock verify OTP
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (data.otp === "123456") {
          await refetchSession();
          toast.success("Signed in successfully! (Demo)");
          router.push(callbackUrl);
          router.refresh();
        } else {
          toast.error("Invalid verification code. Please try 123456.");
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.";
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  const handleUpdateName = async (data: SignInFormData) => {
    setIsPending(true);
    try {
      const finalName = data.name.trim();
      const updateRes = await updateUser(finalName);
      if (updateRes.status === true) {
        await refetchSession();
        toast.success("Signed in successfully!");
        router.push(callbackUrl);
        router.refresh();
      } else {
        toast.error(updateRes.message || "Failed to update profile name.");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.";
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGooglePending(true);
    try {
      const callbackURL =
        process.env.NEXT_PUBLIC_FRONTEND_URL || window.location.origin;
      const res = await socialSignIn("google", callbackURL);
      const redirectUrl = res.data?.url || res.url;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        toast.error("OAuth redirect URL not found in API response.");
        setIsGooglePending(false);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to connect with Google.";
      toast.error(message);
      setIsGooglePending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <h1 className="text-2xl font-light mb-8 text-right">
        WELCOME BACK, SIGN IN
      </h1>

      {/* Tabs Selector */}
      {!otpSent && !otpVerified && (
        <div className="flex border-b border-gray-200 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={cn(
              "flex-1 pb-3 text-center text-sm font-medium border-b-2 transition-all duration-200",
              activeTab === "email"
                ? "border-black text-black"
                : "border-transparent text-gray-400 hover:text-gray-600",
            )}
          >
            Email Login
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("phone")}
            className={cn(
              "flex-1 pb-3 text-center text-sm font-medium border-b-2 transition-all duration-200",
              activeTab === "phone"
                ? "border-black text-black"
                : "border-transparent text-gray-400 hover:text-gray-600",
            )}
          >
            Phone Login
          </button>
        </div>
      )}

      {/* Forms Content */}
      <div className="transition-all duration-300 ease-in-out">
        {!otpSent && !otpVerified ? (
          <form onSubmit={handleSubmit(handleSendOtp)} className="space-y-6">
            {activeTab === "email" ? (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)] gap-3">
                  <div>
                    <Controller
                      name="countryIso2"
                      control={control}
                      rules={{ required: "Country code is required" }}
                      render={({ field }) => (
                        <Combobox
                          items={countryPhoneOptions}
                          value={getCountryPhoneOption(field.value)}
                          onValueChange={(value) =>
                            field.onChange(value?.iso2 ?? "")
                          }
                          itemToStringValue={(item) => item.label}
                        >
                          <ComboboxTrigger
                            render={
                              <Button
                                type="button"
                                variant="outline"
                                className="w-full h-12 justify-between overflow-hidden font-normal rounded-lg border-gray-300 px-4"
                              >
                                <ComboboxValue placeholder="Code" />
                              </Button>
                            }
                          />
                          <ComboboxContent>
                            <ComboboxInput
                              showTrigger={false}
                              placeholder="Search..."
                            />
                            <ComboboxEmpty>No country found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item.iso2} value={item}>
                                  <div className="flex w-full min-w-0 items-center justify-between gap-3">
                                    <span className="truncate">
                                      {item.name}
                                    </span>
                                    <span className="shrink-0 text-xs text-gray-500">
                                      {item.dialCode}
                                    </span>
                                  </div>
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: "Contact number is required",
                        validate: {
                          digitsOnly: (value) =>
                            /^\d+$/.test(value) || "Only numbers are allowed",
                          minLength: (value) =>
                            value.length >= 7 ||
                            "Contact number must be at least 7 digits",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          type="tel"
                          id="phone"
                          inputMode="numeric"
                          maxLength={selectedCountry.maxNationalNumberLength}
                          value={field.value}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            field.onChange(val);
                          }}
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                          placeholder={`Up to ${selectedCountry.maxNationalNumberLength} digits`}
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end w-full">
              <Button
                type="submit"
                disabled={isPending}
                className="rounded-full px-8 py-3 bg-black w-full hover:bg-gray-800 text-white font-medium"
              >
                {isPending ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          </form>
        ) : otpVerified ? (
          /* Name Input Form */
          <form onSubmit={handleSubmit(handleUpdateName)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  validate: (value) =>
                    value.trim().length >= 2 ||
                    "Name must be at least 2 characters",
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition mb-4"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 mb-4">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-full py-3 bg-black hover:bg-gray-800 text-white font-medium"
              >
                {isPending ? "Saving..." : "Save & Continue"}
              </Button>
            </div>
          </form>
        ) : (
          /* OTP Verification Form */
          <form onSubmit={handleSubmit(handleVerifyOtp)} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Verification Code
                </span>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-xs text-gray-500 hover:text-black underline transition"
                >
                  Change {activeTab === "email" ? "Email" : "Phone"}
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                We sent a 6-digit code to{" "}
                <span className="font-semibold text-gray-700">
                  {activeTab === "email"
                    ? currentEmail
                    : `${selectedCountry.dialCode} ${currentPhone}`}
                </span>
                .
              </p>

              <div className="flex justify-center py-4">
                <Controller
                  name="otp"
                  control={control}
                  rules={{
                    required: "Verification code is required",
                    minLength: {
                      value: 6,
                      message: "Code must be 6 digits",
                    },
                  }}
                  render={({ field }) => (
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </div>
              {errors.otp && (
                <p className="mt-1 text-sm text-red-600 text-center">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div className="text-center">
              {resendTimer > 0 ? (
                <span className="text-xs text-gray-400">
                  Resend code in {resendTimer}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleSendOtp({
                      name: "",
                      email: currentEmail,
                      phone: currentPhone,
                      countryIso2: selectedCountryIso2,
                      otp: "",
                    })
                  }
                  className="text-xs text-black font-semibold hover:underline"
                >
                  Resend code
                </button>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-full py-3 bg-black hover:bg-gray-800 text-white font-medium"
              >
                {isPending ? "Verifying..." : "Verify & Sign in"}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Google Login Option */}
      {!otpVerified && (
        <OAuthSignInOptions
          onGoogleSignIn={handleGoogleSignIn}
          isGooglePending={isGooglePending}
          enabled={true}
        />
      )}
    </div>
  );
}
