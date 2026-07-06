import { getDB } from "../../lib/db.js";
import { DEFAULT_SETTINGS, type UserSettingsDoc } from "./settings.types.js";

const collection = () => getDB().collection<UserSettingsDoc>("user_settings");

export async function getOrCreateSettings(ownerId: string, isGuest: boolean): Promise<UserSettingsDoc> {
  const existing = await collection().findOne({ ownerId });
  if (existing) return existing;

  const doc: UserSettingsDoc = {
    ownerId,
    isGuest,
    ...DEFAULT_SETTINGS,
    updatedAt: new Date(),
  };
  await collection().insertOne(doc as never);
  return doc;
}

export async function updateSettings(
  ownerId: string,
  isGuest: boolean,
  patch: Partial<UserSettingsDoc>,
): Promise<UserSettingsDoc> {
  // Ensure a document exists first so the $set below never has to double as
  // an insert - keeps this safe from Mongo's "$set/$setOnInsert conflict"
  // error when `patch` happens to touch the same fields as the defaults.
  await getOrCreateSettings(ownerId, isGuest);

  const result = await collection().findOneAndUpdate(
    { ownerId },
    { $set: { ...patch, isGuest, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
  return result as unknown as UserSettingsDoc;
}
