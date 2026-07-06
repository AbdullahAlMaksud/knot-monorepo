import { z } from "zod";

export interface VisitorSessionDoc {
  _id?: string;
  sessionId: string; // guestId cookie value - stable across login/logout
  userId: string | null;
  ip: string;
  country: string | null;
  userAgent: string | null;
  currentRoute: string | null;
  totalActiveSeconds: number;
  pageViews: number;
  firstSeenAt: Date;
  lastSeenAt: Date;
}

export interface RouteVisitDoc {
  _id?: string;
  sessionId: string;
  userId: string | null;
  route: string;
  durationSeconds: number;
  enteredAt: Date;
  leftAt: Date;
}

export const heartbeatSchema = z.object({
  route: z.string().min(1).max(200),
  /** Seconds of active (foreground, not idle) time since the last heartbeat. */
  activeSeconds: z.number().min(0).max(300).default(15),
});

export const routeVisitSchema = z.object({
  route: z.string().min(1).max(200),
  durationSeconds: z.number().min(0).max(24 * 60 * 60),
});
