import { getDB } from "../../lib/db.js";
import type { ScoreDoc } from "../scores/score.types.js";

const collection = () => getDB().collection<ScoreDoc>("scores");

export type LeaderboardPeriod = "all" | "day" | "week" | "month";

function periodStart(period: LeaderboardPeriod): Date | null {
  const now = new Date();
  switch (period) {
    case "day":
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case "week":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "month":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    default:
      return null;
  }
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  playerName: string;
  isGuest: boolean;
  bestScore: number;
  country: string | null;
  achievedAt: Date;
}

export async function getLeaderboard(params: {
  game: string;
  period: LeaderboardPeriod;
  limit: number;
}): Promise<LeaderboardEntry[]> {
  const match: Record<string, unknown> = { game: params.game };
  const since = periodStart(params.period);
  if (since) match.createdAt = { $gte: since };

  const pipeline = [
    { $match: match },
    { $sort: { score: -1 as const } },
    {
      $group: {
        _id: { $ifNull: ["$userId", "$guestId"] },
        bestScore: { $first: "$score" },
        playerName: { $first: "$playerName" },
        userId: { $first: "$userId" },
        country: { $first: "$country" },
        achievedAt: { $first: "$createdAt" },
      },
    },
    { $sort: { bestScore: -1 as const } },
    { $limit: params.limit },
  ];

  const rows = await collection().aggregate(pipeline).toArray();

  return rows.map((row, index) => ({
    rank: index + 1,
    playerId: String(row._id),
    playerName: row.playerName,
    isGuest: !row.userId,
    bestScore: row.bestScore,
    country: row.country ?? null,
    achievedAt: row.achievedAt,
  }));
}
