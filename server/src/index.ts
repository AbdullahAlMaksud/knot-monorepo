import { serve } from "@hono/node-server";
import { env } from "./config/env.js";
import { connectDB, mongoClient } from "./lib/db.js";

async function main() {
  await connectDB();

  // Dynamic import matters here: app.ts (via lib/auth.ts) calls getDB() at
  // module-evaluation time, so it must only be loaded once the connection
  // above has resolved.
  const { createApp } = await import("./app.js");
  const app = createApp();

  const server = serve({ fetch: app.fetch, port: env.PORT }, (info) => {
    console.log(`🚀 API listening on http://localhost:${info.port}`);
  });

  const shutdown = async () => {
    console.log("\nShutting down...");
    server.close();
    await mongoClient.close();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  console.error("Fatal error during startup:", err);
  process.exit(1);
});
