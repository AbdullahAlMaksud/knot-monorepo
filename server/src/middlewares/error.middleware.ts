import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { env } from "../config/env.js";

export function errorHandler(err: Error, c: Context) {
  if (err instanceof HTTPException) {
    return c.json({ success: false, error: { message: err.message } }, err.status);
  }

  if (err instanceof ZodError) {
    return c.json(
      { success: false, error: { message: "Validation failed", details: err.flatten() } },
      422,
    );
  }

  console.error("Unhandled error:", err);

  return c.json(
    {
      success: false,
      error: {
        message: "Internal server error",
        ...(env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
      },
    },
    500,
  );
}
