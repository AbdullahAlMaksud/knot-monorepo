/**
 * Bootstraps the very first admin account. Needed because better-auth's
 * admin plugin always creates new sign-ups with the default "user" role -
 * there's no logged-in admin yet to promote anyone via /api/admin/users/:id/role.
 *
 * Usage: set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD / SEED_ADMIN_NAME in .env, then:
 *   npm run seed:admin
 */
import { env } from "../config/env.js";
import { connectDB, mongoClient, getDB } from "../lib/db.js";

async function seed() {
  if (!env.SEED_ADMIN_EMAIL || !env.SEED_ADMIN_PASSWORD) {
    console.error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in your .env first.");
    process.exit(1);
  }

  await connectDB();
  const { auth } = await import("../lib/auth.js");

  const existing = await getDB().collection("user").findOne({ email: env.SEED_ADMIN_EMAIL });

  if (existing) {
    await getDB().collection("user").updateOne({ _id: existing._id }, { $set: { role: "admin" } });
    console.log(`✅ Existing user ${env.SEED_ADMIN_EMAIL} promoted to admin.`);
  } else {
    await auth.api.signUpEmail({
      body: {
        email: env.SEED_ADMIN_EMAIL,
        password: env.SEED_ADMIN_PASSWORD,
        name: env.SEED_ADMIN_NAME ?? "Admin",
      },
    });
    await getDB()
      .collection("user")
      .updateOne({ email: env.SEED_ADMIN_EMAIL }, { $set: { role: "admin" } });
    console.log(`✅ Created admin user ${env.SEED_ADMIN_EMAIL}.`);
  }

  await mongoClient.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
