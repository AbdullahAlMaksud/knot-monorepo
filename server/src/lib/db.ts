import { MongoClient, type Db } from "mongodb";
import { env } from "../config/env.js";

/**
 * Single MongoClient/Db instance shared across the whole app:
 * - better-auth's mongodb adapter uses `db`
 * - all other modules (scores, settings, tracking...) use the same `db`
 *
 * This avoids opening multiple pools and keeps transactions available to
 * better-auth (it needs the `client` too, not just the `db`).
 */
export const mongoClient = new MongoClient(env.MONGODB_URI);

let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) return db;
  await mongoClient.connect();
  db = mongoClient.db();
  console.log(`✅ MongoDB connected -> ${db.databaseName}`);
  await ensureIndexes(db);
  return db;
}

export function getDB(): Db {
  if (!db) {
    throw new Error("Database not initialized yet. Call connectDB() before getDB().");
  }
  return db;
}

/**
 * Indexes for the app's own collections.
 * better-auth manages indexes for its own collections (user, session, account, verification).
 */
async function ensureIndexes(database: Db) {
  await Promise.all([
    database.collection("scores").createIndex({ userId: 1 }),
    database.collection("scores").createIndex({ game: 1, score: -1 }),
    database.collection("scores").createIndex({ guestId: 1 }),
    database.collection("scores").createIndex({ createdAt: -1 }),

    database.collection("user_settings").createIndex({ userId: 1 }, { unique: true }),

    database.collection("visitor_sessions").createIndex({ sessionId: 1 }, { unique: true }),
    database.collection("visitor_sessions").createIndex({ userId: 1 }),
    database.collection("visitor_sessions").createIndex({ lastSeenAt: -1 }),
    database.collection("visitor_sessions").createIndex({ ip: 1 }),

    database.collection("route_visits").createIndex({ sessionId: 1 }),
    database.collection("route_visits").createIndex({ enteredAt: -1 }),
  ]);
}
