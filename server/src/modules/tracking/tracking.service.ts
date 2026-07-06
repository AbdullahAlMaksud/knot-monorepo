import { getDB } from "../../lib/db.js";
import type { VisitorSessionDoc, RouteVisitDoc } from "./tracking.types.js";

const sessions = () => getDB().collection<VisitorSessionDoc>("visitor_sessions");
const routeVisits = () => getDB().collection<RouteVisitDoc>("route_visits");

export async function recordHeartbeat(input: {
  sessionId: string;
  userId: string | null;
  ip: string;
  country: string | null;
  userAgent: string | null;
  route: string;
  activeSeconds: number;
}) {
  const now = new Date();
  await sessions().updateOne(
    { sessionId: input.sessionId },
    {
      $set: {
        userId: input.userId,
        ip: input.ip,
        country: input.country,
        userAgent: input.userAgent,
        currentRoute: input.route,
        lastSeenAt: now,
      },
      $inc: { totalActiveSeconds: input.activeSeconds, pageViews: 1 },
      $setOnInsert: { sessionId: input.sessionId, firstSeenAt: now },
    },
    { upsert: true },
  );
}

export async function recordRouteVisit(input: {
  sessionId: string;
  userId: string | null;
  route: string;
  durationSeconds: number;
}) {
  const now = new Date();
  const doc: RouteVisitDoc = {
    sessionId: input.sessionId,
    userId: input.userId,
    route: input.route,
    durationSeconds: input.durationSeconds,
    enteredAt: new Date(now.getTime() - input.durationSeconds * 1000),
    leftAt: now,
  };
  await routeVisits().insertOne(doc as never);
}

export async function listSessions(params: { page: number; limit: number }) {
  const skip = (params.page - 1) * params.limit;
  const [items, total] = await Promise.all([
    sessions().find({}).sort({ lastSeenAt: -1 }).skip(skip).limit(params.limit).toArray(),
    sessions().countDocuments({}),
  ]);
  return { items, total, page: params.page, limit: params.limit, pages: Math.ceil(total / params.limit) };
}

export async function getTrackingStats() {
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [totalSessions, activeLast24h, byCountry, topRoutes, guestVsUser] = await Promise.all([
    sessions().countDocuments({}),
    sessions().countDocuments({ lastSeenAt: { $gte: since24h } }),
    sessions()
      .aggregate([
        { $match: { country: { $ne: null } } },
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ])
      .toArray(),
    routeVisits()
      .aggregate([
        { $group: { _id: "$route", visits: { $sum: 1 }, avgDuration: { $avg: "$durationSeconds" } } },
        { $sort: { visits: -1 } },
        { $limit: 10 },
      ])
      .toArray(),
    sessions()
      .aggregate([
        { $group: { _id: { $cond: [{ $eq: ["$userId", null] }, "guest", "user"] }, count: { $sum: 1 } } },
      ])
      .toArray(),
  ]);

  return {
    totalSessions,
    activeLast24h,
    byCountry: byCountry.map((r) => ({ country: r._id as string, count: r.count as number })),
    topRoutes: topRoutes.map((r) => ({
      route: r._id as string,
      visits: r.visits as number,
      avgDurationSeconds: Math.round((r.avgDuration as number) ?? 0),
    })),
    guestVsUser: Object.fromEntries(guestVsUser.map((r) => [r._id as string, r.count as number])),
  };
}
