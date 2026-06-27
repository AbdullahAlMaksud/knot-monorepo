import apiClient from "@/lib/axios";

export interface SendOtpResponse {
  success: boolean;
  message?: string;
}

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
}

export interface VerifyOtpResponse {
  success?: boolean;
  message?: string;
  data?: { user?: AuthUser };
  token?: string;
  user?: AuthUser;
}

export interface SocialSignInResponse {
  success: boolean;
  url?: string;
  data?: {
    url: string;
  };
}

export const sendEmailOtp = async (
  email: string,
  type: "sign-in" | "sign-up",
): Promise<SendOtpResponse> => {
  const response = await apiClient.post(
    "/auth/email-otp/send-verification-otp",
    {
      email,
      type,
    },
  );
  return response.data;
};

export const verifyEmailOtp = async (
  email: string,
  otp: string,
  name?: string,
): Promise<VerifyOtpResponse> => {
  const body: { email: string; otp: string; name?: string } = {
    email,
    otp,
  };
  if (name) {
    body.name = name;
  }
  const response = await apiClient.post("/auth/sign-in/email-otp", body);
  return response.data;
};

export const updateUser = async (
  name: string,
): Promise<{ status: boolean; message?: string }> => {
  const response = await apiClient.post("/auth/update-user", { name });
  return response.data;
};

export interface SendPhoneOtpResponse {
  message?: string;
}

export interface VerifyPhoneOtpResponse {
  status?: boolean;
  token?: string;
  user?: AuthUser & {
    phoneNumber?: string;
    phoneNumberVerified?: boolean;
    userType?: string;
    mustChangePassword?: boolean;
  };
  message?: string;
}

export interface ResendPhoneOtpResponse {
  success?: boolean;
  message?: string;
  code?: number;
  data?: { phoneNumber?: string };
}

export const sendPhoneOtp = async (
  phoneNumber: string,
): Promise<SendPhoneOtpResponse> => {
  const response = await apiClient.post("/auth/phone-number/send-otp", {
    phoneNumber,
  });
  return response.data;
};

export const verifyPhoneOtp = async (
  phoneNumber: string,
  code: string,
): Promise<VerifyPhoneOtpResponse> => {
  const response = await apiClient.post("/auth/phone-number/verify", {
    phoneNumber,
    code,
  });
  return response.data;
};

export const resendPhoneOtp = async (
  phoneNumber: string,
): Promise<ResendPhoneOtpResponse> => {
  const response = await apiClient.post("/otp/phone-number/resend-otp", {
    phoneNumber,
  });
  return response.data;
};

export const socialSignIn = async (
  provider: "google",
  callbackURL: string,
): Promise<SocialSignInResponse> => {
  const response = await apiClient.post("/auth/sign-in/social", {
    provider,
    callbackURL,
  });
  return response.data;
};
