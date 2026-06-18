import apiClient from "@/lib/axios";

export interface SendOtpResponse {
  success: boolean;
  message?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message?: string;
  data?: any;
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
  type: "sign-in" | "sign-up"
): Promise<SendOtpResponse> => {
  const response = await apiClient.post("/auth/email-otp/send-verification-otp", {
    email,
    type,
  });
  return response.data;
};

export const verifyEmailOtp = async (
  email: string,
  otp: string,
  name?: string
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

export const socialSignIn = async (
  provider: "google",
  callbackURL: string
): Promise<SocialSignInResponse> => {
  const response = await apiClient.post("/auth/sign-in/social", {
    provider,
    callbackURL,
  });
  return response.data;
};
