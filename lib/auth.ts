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





import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDb, getMongoClient } from "@/lib/mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(getDb(), { client: getMongoClient() }),
  secret: process.env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
  emailAndPassword: { enabled: true },
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