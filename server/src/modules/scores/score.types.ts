import { z } from "zod";

export interface ScoreDoc {
  _id?: string;
  game: string;
  userId: string | null;
  guestId: string | null;
  playerName: string;
  score: number;
  metadata: Record<string, unknown>;
  country: string | null;
  createdAt: Date;
}

export const createScoreSchema = z.object({
  game: z.string().min(1).max(64),
  score: z.number().finite(),
  playerName: z.string().min(1).max(40).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const listScoresQuerySchema = z.object({
  game: z.string().min(1).max(64).optional(),
  mine: z.coerce.boolean().optional(),
  userId: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
