// import { betterAuth } from "better-auth";
// import { nextCookies } from "better-auth/next-js";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { getDb, getMongoClient } from "@/lib/mongodb";

// export const auth = betterAuth({
//   database: mongodbAdapter(getDb(), { client: getMongoClient() }),
//   secret: process.env.BETTER_AUTH_SECRET,
//   basePath: "/api/auth",
//   trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
//   emailAndPassword: { enabled: true },
//   plugins: [nextCookies()],
// });

// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDb, getMongoClient } from "@/lib/mongodb";

const DEFAULT_DEV_AUTH_ORIGIN = "http://localhost:3000";
const DEFAULT_DEV_AUTH_HOSTS = ["localhost:3000", "127.0.0.1:3000"];
const isProduction = process.env.NODE_ENV === "production";

const normalizeOrigin = (value?: string | null) => {
  const trimmedValue = value?.trim();
  if (!trimmedValue) {
    return null;
  }

  try {
    return new URL(trimmedValue).origin;
  } catch {
    return null;
  }
};

const normalizeHost = (value?: string | null) => {
  const trimmedValue = value?.trim();
  if (!trimmedValue) {
    return null;
  }

  if (trimmedValue.includes("://")) {
    try {
      return new URL(trimmedValue).host;
    } catch {
      return null;
    }
  }

  return trimmedValue;
};

const configuredAuthOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  process.env.APP_URL,
  process.env.NEXT_PUBLIC_APP_URL,
  process.env.NEXTAUTH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined,
]
  .map((value) => normalizeOrigin(value))
  .filter((value): value is string => Boolean(value));

const configuredAllowedAuthHosts = [
  ...configuredAuthOrigins,
  ...(process.env.BETTER_AUTH_ALLOWED_HOSTS?.split(",") ?? []),
  ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",") ?? []),
]
  .map((value) => normalizeHost(value))
  .filter((value): value is string => Boolean(value));

const fallbackAuthOrigin =
  configuredAuthOrigins[0] ??
  (isProduction ? undefined : DEFAULT_DEV_AUTH_ORIGIN);

const allowedAuthHosts = Array.from(
  new Set([
    ...configuredAllowedAuthHosts,
    ...(isProduction ? [] : DEFAULT_DEV_AUTH_HOSTS),
  ]),
);

const authProtocol: "auto" | "http" = fallbackAuthOrigin?.startsWith("http://")
  ? "http"
  : "auto";

const authBaseURL = {
  allowedHosts: allowedAuthHosts,
  protocol: authProtocol,
  ...(fallbackAuthOrigin ? { fallback: fallbackAuthOrigin } : {}),
};

export const auth = betterAuth({
  database: mongodbAdapter(getDb(), { client: getMongoClient() }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: authBaseURL,
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: true,
    //   sendResetPassword: async ({ user, url }) => {
    //   await resend.emails.send({
    //     from: "no-reply@domain.com",
    //     to: user.email,
    //     subject: "Reset your password",
    //     html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
    //   });
    // },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
    },
  },
});
