import { ObjectId } from "mongodb";
import { getDB } from "../../lib/db.js";
import type { ScoreDoc } from "./score.types.js";

const collection = () => getDB().collection<ScoreDoc>("scores");

export async function createScore(input: {
  game: string;
  score: number;
  playerName: string;
  metadata: Record<string, unknown>;
  userId: string | null;
  guestId: string | null;
  country: string | null;
}): Promise<ScoreDoc> {
  const doc: ScoreDoc = {
    game: input.game,
    userId: input.userId,
    guestId: input.userId ? null : input.guestId,
    playerName: input.playerName,
    score: input.score,
    metadata: input.metadata ?? {},
    country: input.country,
    createdAt: new Date(),
  };
  const result = await collection().insertOne(doc as never);
  return { ...doc, _id: result.insertedId.toString() };
}

export async function listScores(filter: {
  game?: string;
  userId?: string;
  guestId?: string;
  page: number;
  limit: number;
}) {
  const query: Record<string, unknown> = {};
  if (filter.game) query.game = filter.game;
  if (filter.userId) query.userId = filter.userId;
  if (filter.guestId) query.guestId = filter.guestId;

  const skip = (filter.page - 1) * filter.limit;

  const [items, total] = await Promise.all([
    collection().find(query).sort({ createdAt: -1 }).skip(skip).limit(filter.limit).toArray(),
    collection().countDocuments(query),
  ]);

  return { items, total, page: filter.page, limit: filter.limit, pages: Math.ceil(total / filter.limit) };
}

export async function getScoreById(id: string): Promise<ScoreDoc | null> {
  if (!ObjectId.isValid(id)) return null;
  return collection().findOne({ _id: new ObjectId(id) } as never);
}

export async function deleteScoreById(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const result = await collection().deleteOne({ _id: new ObjectId(id) } as never);
  return result.deletedCount === 1;
}
