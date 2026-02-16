import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;

function getClient(): MongoClient {
  if (!client) {
    const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/byou";
    client = new MongoClient(uri);
  }
  return client;
}

/** Synchronous access to db for Better Auth and other sync config. */
export function getDb(): Db {
  return getClient().db();
}

/** For Better Auth MongoDB adapter (optional, enables transactions). */
export function getMongoClient(): MongoClient {
  return getClient();
}

export async function closeMongoConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
  }
}
