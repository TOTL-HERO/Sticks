import type { Context, Next } from "hono";
import { supabaseAdmin } from "../lib/supabase.ts";

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid authorization header", statusCode: 401 }, 401);
  }

  const token = authHeader.slice(7);

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    return c.json({ error: "Invalid or expired token", statusCode: 401 }, 401);
  }

  c.set("userId", data.user.id);

  await next();
}
